import { Capacitor, registerPlugin } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { VOICE_ACCENTS, DEFAULT_VOICE_ACCENT } from '../config/app.js';
import { voiceLog } from './debug.js';
import { isDuplicatePhrase } from './vocab.js';

/**
 * Speech to text using the phone's own speech recognition service
 * (on most phones this is Google's service, which needs internet).
 *
 * The app never records or saves audio itself. The microphone audio is handled by the
 * Android speech service and only the recognized text comes back to the app.
 */

let session = null;
let accent = DEFAULT_VOICE_ACCENT;
let localeIdx = 0; // index into the accent's locale list; moves on if the phone rejects a locale

/** Voice accent from Profile > Voice: 'pk' | 'in' | 'us' | 'uk'. */
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

/** true when the phone has a speech recognition service. */
export async function isVoiceAvailable() {
  if (!isNativeVoice()) return false;
  try {
    const r = await SpeechRecognition.available();
    return !!r.available;
  } catch {
    return false;
  }
}

/**
 * Mic permission state: 'granted' | 'prompt' | 'prompt-with-rationale' | 'denied'.
 * 'denied' means the user picked "Don't allow" more than once (Android will not show the dialog again).
 */
export async function micPermission() {
  try {
    const s = await SpeechRecognition.checkPermissions();
    return s.speechRecognition;
  } catch {
    return 'denied';
  }
}

export async function requestMicPermission() {
  try {
    const s = await SpeechRecognition.requestPermissions();
    return s.speechRecognition;
  } catch {
    return 'denied';
  }
}

// The app's own native plugin (VoicePlugin.java): one recognition run per start().
const Voice = registerPlugin('Voice');

// Timings and limits of the session manager (see GUIDE.md "How voice recognition works").
export const VOICE_TIMING = {
  restartMs: 300, // pause before listening again after silence or a timeout
  busyMs: 600, // error 8 (recognizer busy): wait this long (x tries) before retrying
  maxFailures: 3, // stop after this many failed restarts in a row
  stopWaitMs: 2500, // after "stop", wait this long for the last phrase
  maxSessionMs: 300000 // never listen longer than 5 minutes
};

const ERROR_TEXT = {
  1: 'Network is slow. Check your internet and try again.',
  2: 'You are offline. Voice input needs internet. You can type your answer instead.',
  3: 'The microphone is busy or not working. Close other apps using it and try again.',
  4: 'The speech service had a problem. Please try again.',
  9: 'Microphone permission is missing.',
  10: 'Too many voice requests. Wait a moment and try again.',
  11: 'The speech service disconnected. Please try again.',
  12: 'This voice accent is not available on your phone. Pick another one in Profile > Voice.',
  13: 'This voice accent is not available on your phone. Pick another one in Profile > Voice.'
};
export const NOT_CAUGHT = 'I did not catch that. Try again or type.';

/** Short message for a native error code, or '' for none. */
export function voiceErrorText(code) {
  return ERROR_TEXT[code] || (code ? 'Voice input stopped. Please try again.' : '');
}

/** States: idle, starting, ready, listening, restarting, stopping, error. */
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

const TRANSIENT = new Set([1, 3, 4, 5, 8, 10, 11]);

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
  const msg = message || (reason === 'error' ? voiceErrorText(code) : !s.heard && reason !== 'cancelled' ? NOT_CAUGHT : '');
  voiceLog('end', { reason, code, heard: s.heard, finals: s.finals, runs: s.runs, msg });
  s.state = reason === 'error' ? 'error' : 'idle';
  try {
    s.o.onState && s.o.onState(s.state);
    s.o.onEnd && s.o.onEnd({ reason, code, heard: s.heard, message: msg });
  } catch {
    // UI callback errors must not break voice cleanup
  }
}

// A phrase is final: drop it if it repeats what is already there, else hand it to the screen.
function deliver(s, text, info) {
  const tail = s.o.getTail ? s.o.getTail() : '';
  if (isDuplicatePhrase(text, s.lastFinal, tail)) {
    voiceLog('duplicate dropped', JSON.stringify(text));
    return false;
  }
  s.lastFinal = text;
  s.heard = true;
  s.finals++;
  s.o.onFinal && s.o.onFinal(text, info);
  return true;
}

// The run ended without a final for the last live text: keep what the user saw.
function commitPending(s) {
  if (!s.pending) return;
  const p = s.pending;
  s.pending = null;
  voiceLog('commit partial', JSON.stringify(p.text));
  deliver(s, p.text, { ...p, fromPartial: true });
}

function choose(s, alts) {
  try {
    return s.o.choose ? s.o.choose(alts) : { text: alts[0], index: 0, changes: [] };
  } catch {
    return { text: alts[0], index: 0, changes: [] };
  }
}

async function begin(s) {
  if (session !== s || s.stopping) return;
  s.runs++;
  setState(s, 'starting');
  const opts = { language: voiceLanguage(), maxResults: 5, partialResults: true, silenceMs: s.o.silenceMs, segmented: true, bias: s.o.bias };
  try {
    const r = await Voice.start(opts);
    voiceLog('start', { run: s.runs, locale: opts.language, sdk: r && r.sdk, segmented: r && r.segmented, biasing: r && r.biasing, hints: r && r.hints, silenceMs: opts.silenceMs });
  } catch (e) {
    voiceLog('start failed', String((e && e.message) || e));
    onError(s, -1);
  }
}

function restart(s, ms, why) {
  if (session !== s || s.stopping) return;
  setState(s, 'restarting');
  voiceLog('restart', { in: ms, why, failures: s.failures });
  clearTimeout(s.timer);
  s.timer = setTimeout(() => begin(s), ms);
}

function onError(s, code) {
  // Locale not supported (12, 13): next locale of the accent, does not count as a failure.
  const list = VOICE_ACCENTS[accent].locales;
  if ((code === 12 || code === 13) && localeIdx < list.length - 1) {
    localeIdx++;
    voiceLog('locale rejected, next', voiceLanguage());
    return restart(s, 0, 'locale');
  }
  if (code === 2 || code === 9 || code === 12 || code === 13) return finish(s, 'error', code);
  s.failures++;
  if (s.failures > VOICE_TIMING.maxFailures) {
    return finish(s, 'error', code, 'Voice input stopped after 3 tries. Please try again or type your answer.');
  }
  const ms = code === 8 ? VOICE_TIMING.busyMs * s.failures : VOICE_TIMING.restartMs * 2 ** (s.failures - 1);
  restart(s, ms, `error ${code}`);
}

function onEnd(s, d) {
  const reason = (d && d.reason) || 'done';
  const code = (d && d.code) || 0;
  voiceLog('run end', { reason, code, ms: d && d.ms });
  if (s.stopping || reason === 'stopped') {
    commitPending(s);
    return finish(s, 'stopped');
  }
  if (reason === 'error') {
    commitPending(s);
    if (TRANSIENT.has(code) || code === 12 || code === 13 || code === 2 || code === 9) return onError(s, code);
    return finish(s, 'error', code);
  }
  // done (results) or nomatch (6/7: silence or nothing understood): listen again.
  commitPending(s);
  if (reason === 'done') s.failures = 0;
  if (Date.now() - s.lastSpeechAt > s.o.maxSilentMs) return finish(s, 'silence');
  restart(s, VOICE_TIMING.restartMs, reason === 'nomatch' ? `silence ${code}` : 'phrase done');
}

/**
 * Start a voice session (Mock and Practice share it).
 *  bias: hint words (Android 13+), choose(alts) -> { text, index, changes }: picks and corrects
 *  the best alternative, getTail(): end of the text box (duplicate check),
 *  onState(state), onPartial(text, info), onFinal(text, info), onLevel(db),
 *  onEnd({ reason: stopped | silence | error | cancelled, code, heard, message }).
 *  maxSilentMs: stop after this long without speech. silenceMs: hint for the recognizer.
 * Resolves true when the first run started.
 */
export async function startListening(o = {}) {
  if (session) cancelListening();
  const s = {
    o: { silenceMs: 3000, maxSilentMs: 30000, bias: [], ...o },
    state: 'idle',
    runs: 0,
    finals: 0,
    failures: 0,
    heard: false,
    lastFinal: '',
    lastAlts: [],
    pending: null,
    stopping: false,
    lastSpeechAt: Date.now(),
    handles: [],
    timer: null,
    stopTimer: null,
    safety: null
  };
  s.o.bias = [...new Set(s.o.bias || [])].slice(0, 100);
  session = s;
  const mine = fn => d => session === s && fn(d || {});
  voiceLog('session', { accent, locale: voiceLanguage(), hints: s.o.bias.length, silenceMs: s.o.silenceMs, maxSilentMs: s.o.maxSilentMs });

  s.handles.push(
    Voice.addListener('ready', mine(() => setState(s, 'ready'))),
    Voice.addListener('speech', mine(() => {
      s.lastSpeechAt = Date.now();
      setState(s, 'listening');
    })),
    Voice.addListener('speechEnd', mine(d => voiceLog('speech end', { ms: d.ms }))),
    Voice.addListener('note', mine(d => voiceLog('note', d.msg))),
    Voice.addListener('level', mine(d => s.o.onLevel && s.o.onLevel(d.db))),
    Voice.addListener('partial', mine(d => {
      const alts = (d.matches || []).filter(Boolean);
      if (!alts.length) return;
      s.lastSpeechAt = Date.now();
      if (s.state !== 'listening' && s.state !== 'stopping') setState(s, 'listening');
      const c = choose(s, alts);
      s.pending = { text: c.text, raw: alts[c.index] || alts[0], index: c.index, changes: c.changes || [] };
      if (Date.now() - (s.lastPartialLog || 0) > 1000) {
        s.lastPartialLog = Date.now();
        voiceLog('partial', { raw: alts[0], text: c.text });
      }
      s.o.onPartial && s.o.onPartial(c.text, s.pending);
    })),
    Voice.addListener('final', mine(d => {
      const alts = (d.matches || []).filter(Boolean);
      if (!alts.length) return;
      s.lastSpeechAt = Date.now();
      s.failures = 0;
      // The same utterance delivered twice (segment result + the run's final result) can come with a
      // different best alternative; compare the raw alternatives too.
      if (s.lastAlts.some(a => alts.some(x => isDuplicatePhrase(x, a)))) {
        voiceLog('duplicate dropped (same utterance)', JSON.stringify(alts[0]));
        s.pending = null;
        return;
      }
      s.lastAlts = alts;
      const c = choose(s, alts);
      s.pending = null;
      voiceLog('final', { alts, scores: d.scores, used: c.index, text: c.text, changes: (c.changes || []).map(x => `${x.from}>${x.to} (${x.rule})`), segment: !!d.segment });
      deliver(s, c.text, { raw: alts[c.index] || alts[0], index: c.index, changes: c.changes || [], scores: d.scores });
    })),
    Voice.addListener('end', mine(d => onEnd(s, d)))
  );
  s.safety = setTimeout(() => session === s && stopListening(), VOICE_TIMING.maxSessionMs);
  await begin(s);
  return session === s;
}

/** Stop listening and keep the last phrase (onEnd follows when it has arrived). */
export function stopListening() {
  const s = session;
  if (!s || s.stopping) return;
  s.stopping = true;
  voiceLog('stop pressed', { state: s.state });
  if (s.state === 'restarting') {
    // Between runs: nothing is listening, finish now.
    clearTimeout(s.timer);
    commitPending(s);
    return finish(s, 'stopped');
  }
  setState(s, 'stopping');
  Voice.stop().catch(() => {});
  s.stopTimer = setTimeout(() => {
    commitPending(s);
    finish(s, 'stopped');
  }, VOICE_TIMING.stopWaitMs);
}

/** Stop now and drop anything not yet heard (screen change, app in background). */
export function cancelListening() {
  const s = session;
  if (!s) return;
  s.stopping = true;
  Voice.cancel().catch(() => {});
  finish(s, 'cancelled');
}
