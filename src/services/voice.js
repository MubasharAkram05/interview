import { Capacitor, registerPlugin } from '@capacitor/core';
import { VOICE_ACCENTS, DEFAULT_VOICE_ACCENT } from '../config/app.js';
import { voiceLog, isDebugBuild } from './debug.js';
import { VOICE_FILTER, noiseGate, confidenceFilter, dedupeFinal } from './voice-filter.js';

/**
 * Speech to text using the phone's own speech recognition service (VoicePlugin.java; on most
 * phones Google's service, which needs internet). The app never records or saves audio itself.
 *
 * How one mic tap works (see GUIDE.md "How voice recognition works"):
 *  - One recognizer session runs. Live words (partial results) are only shown, never written.
 *  - When the session ends with a final result, the result passes the noise gate, the confidence
 *    filter and the duplicate check, and only then is handed to the screen, once.
 *  - The next session starts only if this one had real speech. A session with no real speech
 *    stops the mic with "Tap the mic to continue". No blind restart loop.
 *  - Tap the mic again: stop now; the last final still arrives and is used.
 */

let session = null;
let accent = DEFAULT_VOICE_ACCENT;
let localeIdx = 0; // index into the accent's locale list; moves on if the phone rejects a locale

/** Voice accent from Profile > Voice: 'in' | 'pk' | 'us' | 'uk'. */
export function setVoiceAccent(key) {
  const k = VOICE_ACCENTS[key] ? key : DEFAULT_VOICE_ACCENT;
  if (k !== accent) localeIdx = 0;
  accent = k;
}

export function voiceLanguage() {
  const list = VOICE_ACCENTS[accent].locales;
  return list[Math.min(localeIdx, list.length - 1)];
}

export function isNativeVoice() {
  return Capacitor.isNativePlatform();
}

// The app's own native plugin (VoicePlugin.java).
const Voice = registerPlugin('Voice');

/** true when the phone has a speech recognition service. */
export async function isVoiceAvailable() {
  if (!isNativeVoice()) return false;
  try {
    const r = await Voice.info();
    return !!r.available;
  } catch {
    return false;
  }
}

/**
 * Mic permission state: 'granted' | 'prompt' | 'prompt-with-rationale' | 'denied'.
 * 'denied' means Android will not show the dialog again (Settings is the only way).
 */
export async function micPermission() {
  try {
    const s = await Voice.checkPermissions();
    return s.microphone;
  } catch {
    return 'denied';
  }
}

export async function requestMicPermission() {
  try {
    const s = await Voice.requestPermissions({ permissions: ['microphone'] });
    return s.microphone;
  } catch {
    return 'denied';
  }
}

/** Opens this app's page in Android Settings. Resolves false if that failed. */
export async function openAppSettings() {
  try {
    await Voice.openSettings();
    return true;
  } catch {
    return false;
  }
}

// Session control and recognizer timing.
export const VOICE_TIMING = {
  nextSessionMs: 250, // pause before the next session after a session with real speech
  busyRetryMs: 600, // error 8 (recognizer busy): retry once after this
  stopWaitMs: 2000, // after "stop", wait this long for the last final
  maxSessionMs: 300000, // never listen longer than 5 minutes per tap
  completeMs: 4000, // EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS
  possiblyMs: 3000, // EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS
  minimumMs: 15000 // EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS
};

const ERROR_TEXT = {
  1: 'Network is slow. Check your internet and tap the mic to try again.',
  2: 'You are offline. Voice input needs internet. You can type your answer instead.',
  3: 'The microphone is busy or not working. Close other apps using it and try again.',
  4: 'The speech service had a problem. Tap the mic to try again.',
  8: 'The speech service is busy. Tap the mic to try again.',
  9: 'Microphone permission is missing. Allow it in Android Settings > Apps > Interview Simulator > Permissions.',
  10: 'Too many voice requests. Wait a moment and try again.',
  11: 'The speech service disconnected. Tap the mic to try again.',
  12: 'This voice accent is not available on your phone. Pick another one in Profile > Voice.',
  13: 'This voice accent is not available on your phone. Pick another one in Profile > Voice.'
};
export const NOT_CAUGHT = 'I did not catch that. Tap the mic to continue.';
export const TAP_TO_CONTINUE = 'Tap the mic to continue.';

/** Short message for a native error code, or '' for none. */
export function voiceErrorText(code) {
  return ERROR_TEXT[code] || (code ? 'Voice input stopped. Tap the mic to try again.' : '');
}

/** States: idle, starting, ready, listening, stopping, error. */
export function voiceState() {
  return session ? session.state : 'idle';
}

export function isListening() {
  return !!session && !session.stopping;
}

/** Debug panel: phone and recognizer facts (no text). */
export async function voiceInfo() {
  try {
    return { ...(await Voice.info()), accent, locale: voiceLanguage() };
  } catch {
    return { accent, locale: voiceLanguage() };
  }
}

// Per-session records for the debug voice report (debug builds only; never in release).
const records = [];
let recordForTests = false;
export function _recordVoiceForTests() {
  recordForTests = true;
}
function record(r) {
  if (!recordForTests && !isDebugBuild()) return;
  records.push(r);
  while (records.length > 12) records.shift();
}
/** Debug voice report: one Practice attempt (expected text, heard text, alignment, score). */
export function notePractice(r) {
  record({ kind: 'practice', at: new Date().toISOString().slice(11, 19), ...r });
}
/** Last recognizer sessions: language, n-best with confidence, max RMS, drops, changes, committed. */
export function recentVoiceSessions() {
  return records.slice();
}

function setState(s, st) {
  if (s.state === st) return;
  s.state = st;
  voiceLog('state', st);
  try {
    s.o.onState && s.o.onState(st);
  } catch {
    // UI errors must not break the session
  }
}

function finish(s, reason, code = 0, message = '') {
  if (session !== s) return;
  session = null;
  clearTimeout(s.timer);
  clearTimeout(s.stopTimer);
  clearTimeout(s.safety);
  s.handles.forEach(h => Promise.resolve(h).then(x => x && x.remove()).catch(() => {}));
  let msg = message;
  if (!msg && reason === 'error') msg = voiceErrorText(code);
  if (!msg && reason === 'empty') msg = s.committed ? TAP_TO_CONTINUE : NOT_CAUGHT;
  if (!msg && reason === 'stopped' && !s.committed) msg = NOT_CAUGHT;
  voiceLog('end', { reason, code, committed: s.committed, sessions: s.runs, msg });
  s.state = reason === 'error' ? 'error' : 'idle';
  try {
    s.o.onState && s.o.onState(s.state);
    s.o.onEnd && s.o.onEnd({ reason, code, heard: s.committed > 0, message: msg });
  } catch {
    // UI callback errors must not break voice cleanup
  }
}

function choose(s, cands) {
  try {
    if (s.o.choose) return s.o.choose(cands);
  } catch {
    // fall through to the first guess
  }
  return { text: cands[0].text, index: cands[0].index, changes: [], why: 'first guess' };
}

async function begin(s) {
  s.timer = null;
  if (session !== s || s.stopping) return;
  s.runs++;
  s.run = { n: s.runs, at: new Date().toISOString().slice(11, 19), language: voiceLanguage(), hints: 0, nbest: [], maxRms: null, dropped: [], changes: [], picked: '', committed: '', end: '' };
  record(s.run);
  setState(s, 'starting');
  const opts = {
    language: voiceLanguage(),
    maxResults: 5,
    completeMs: VOICE_TIMING.completeMs,
    possiblyMs: VOICE_TIMING.possiblyMs,
    minimumMs: VOICE_TIMING.minimumMs,
    bias: s.o.bias
  };
  try {
    const r = await Voice.start(opts);
    s.run.hints = (r && r.hints) || 0;
    voiceLog('start', { session: s.runs, locale: opts.language, sdk: r && r.sdk, biasing: r && r.biasing, hints: r && r.hints });
  } catch (e) {
    voiceLog('start failed', String((e && e.message) || e));
    s.run.end = 'start failed';
    finish(s, 'error', 4);
  }
}

// One final result: gates, then hand it to the screen once.
function onFinal(s, d) {
  const run = s.run;
  if (!run || run.final) return; // a session commits at most one final
  run.final = true;
  const matches = (d.matches || []).filter(Boolean);
  run.maxRms = typeof d.maxRms === 'number' ? d.maxRms : s.levelMax;
  run.nbest = matches.map((t, i) => ({ text: t, score: d.scores && typeof d.scores[i] === 'number' ? Math.round(d.scores[i] * 100) / 100 : null }));
  const noise = noiseGate(run.maxRms, s.o.filter);
  if (noise) {
    run.dropped.push({ text: matches[0], why: noise });
    voiceLog('dropped', noise, JSON.stringify(matches[0]));
    return;
  }
  run.speech = true;
  const { cands, dropped } = confidenceFilter(matches, d.scores, s.o.filter);
  run.dropped.push(...dropped);
  if (!cands.length) {
    voiceLog('dropped: low confidence', JSON.stringify(matches[0]));
    return;
  }
  const c = choose(s, cands);
  run.picked = `#${c.index + 1} (${c.why || ''})`;
  run.changes = c.changes || [];
  const dd = dedupeFinal(c.text, s.recent, Date.now(), s.o.filter);
  if (!dd.text) {
    run.dropped.push({ text: c.text, why: dd.why });
    voiceLog('dropped', dd.why, JSON.stringify(c.text));
    return;
  }
  if (dd.why) run.dropped.push({ text: c.text, why: dd.why });
  s.recent.push({ text: c.text, at: Date.now() });
  s.committed++;
  run.committed = dd.text;
  voiceLog('final', { nbest: run.nbest, maxRms: run.maxRms, picked: run.picked, changes: run.changes.map(x => `${x.from}>${x.to} (${x.why})`), committed: dd.text });
  try {
    s.o.onFinal && s.o.onFinal(dd.text, { index: c.index, changes: c.changes || [], raw: matches[c.index] });
  } catch {
    // UI errors must not break the session
  }
}

function onEnd(s, d) {
  const reason = (d && d.reason) || 'done';
  const code = (d && d.code) || 0;
  if (s.run) {
    s.run.end = `${reason}${code ? ' ' + code : ''} after ${d && d.ms} ms`;
    if (s.run.maxRms === null && typeof d.maxRms === 'number') s.run.maxRms = d.maxRms;
  }
  voiceLog('session end', { reason, code, ms: d && d.ms, maxRms: d && d.maxRms });
  if (s.stopping || reason === 'stopped') return finish(s, 'stopped');
  if (reason === 'error') {
    const list = VOICE_ACCENTS[accent].locales;
    if ((code === 12 || code === 13) && localeIdx < list.length - 1) {
      // Locale not supported: next locale of the accent.
      localeIdx++;
      voiceLog('locale rejected, next', voiceLanguage());
      return next(s, 0);
    }
    if (code === 8 && !s.busyRetried) {
      s.busyRetried = true;
      return next(s, VOICE_TIMING.busyRetryMs);
    }
    if ((code === 6 || code === 7) && !(s.run && s.run.speech)) return finish(s, 'empty');
    return finish(s, 'error', code);
  }
  // done / nomatch: continue only after real speech.
  if (s.run && s.run.speech) return next(s, VOICE_TIMING.nextSessionMs);
  return finish(s, 'empty');
}

function next(s, ms) {
  if (session !== s || s.stopping) return;
  clearTimeout(s.timer);
  s.timer = setTimeout(() => begin(s), ms);
}

/**
 * Start listening for one mic tap (Mock and Practice share it).
 *  bias: hint strings (Android 13+). choose(cands) -> { text, index, changes, why }: picks and
 *  corrects one of the guesses ({ text, score, index }). onState(state), onPartial(text) (show
 *  only), onFinal(text, info) (write it), onLevel(db), onEnd({ reason, code, heard, message }).
 *  filter: overrides for VOICE_FILTER (tests).
 * Resolves true when the first session started.
 */
export async function startListening(o = {}) {
  if (session) cancelListening();
  const s = {
    o: { bias: [], filter: VOICE_FILTER, ...o },
    state: 'idle',
    runs: 0,
    run: null,
    committed: 0,
    recent: [],
    levelMax: null,
    busyRetried: false,
    stopping: false,
    handles: [],
    timer: null,
    stopTimer: null,
    safety: null
  };
  s.o.bias = [...new Set(s.o.bias || [])].slice(0, 100);
  session = s;
  const mine = fn => d => session === s && fn(d || {});
  voiceLog('mic on', { accent, locale: voiceLanguage(), hints: s.o.bias.length });

  s.handles.push(
    Voice.addListener('ready', mine(() => setState(s, 'ready'))),
    Voice.addListener('speech', mine(() => setState(s, 'listening'))),
    Voice.addListener('speechEnd', mine(d => voiceLog('speech end', { ms: d.ms }))),
    Voice.addListener('level', mine(d => {
      if (typeof d.db === 'number' && (s.levelMax === null || d.db > s.levelMax)) s.levelMax = d.db;
      s.o.onLevel && s.o.onLevel(d.db);
    })),
    Voice.addListener('partial', mine(d => {
      const t = (d.matches || []).filter(Boolean)[0];
      if (!t) return;
      if (s.state !== 'listening' && s.state !== 'stopping') setState(s, 'listening');
      s.o.onPartial && s.o.onPartial(t); // live bar only, never the answer box
    })),
    Voice.addListener('final', mine(d => onFinal(s, d))),
    Voice.addListener('end', mine(d => {
      s.levelMax = null;
      onEnd(s, d);
    }))
  );
  s.safety = setTimeout(() => session === s && stopListening(), VOICE_TIMING.maxSessionMs);
  await begin(s);
  return session === s;
}

/** Tap to stop: stop now; the last final still arrives and is used, then onEnd. */
export function stopListening() {
  const s = session;
  if (!s || s.stopping) return;
  s.stopping = true;
  voiceLog('stop pressed', { state: s.state });
  if (s.timer) {
    // Between sessions: nothing is listening, finish now.
    clearTimeout(s.timer);
    s.timer = null;
    return finish(s, 'stopped');
  }
  setState(s, 'stopping');
  Voice.stop().catch(() => {});
  s.stopTimer = setTimeout(() => finish(s, 'stopped'), VOICE_TIMING.stopWaitMs);
}

/** Stop now and drop anything not yet heard (screen change, app in background). */
export function cancelListening() {
  const s = session;
  if (!s) return;
  s.stopping = true;
  Voice.cancel().catch(() => {});
  finish(s, 'cancelled');
}
