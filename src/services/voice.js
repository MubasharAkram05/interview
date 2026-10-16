import { Capacitor, registerPlugin } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { VOICE_LANGUAGES } from '../config/app.js';

/**
 * Speech to text using the phone's own speech recognition service
 * (on most phones this is Google's service, which needs internet).
 *
 * The app never records or saves audio itself. The microphone audio is handled by the
 * Android speech service and only the recognized text comes back to the app.
 */

let session = null; // { onEnd, heard, stopping, handles, safety, stopTimer }
let langIdx = 0; // index into VOICE_LANGUAGES; moves on (for this app run) if a language fails

export function voiceLanguage() {
  return VOICE_LANGUAGES[Math.min(langIdx, VOICE_LANGUAGES.length - 1)];
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

// The app's own native plugin (VoicePlugin.java): biasing, continuous sessions, error codes.
const Voice = registerPlugin('Voice');

export function isListening() {
  return !!session && !session.stopping;
}

const ERROR_TEXT = {
  1: 'Network is slow. Check your internet and try again.',
  2: 'No internet. Voice input needs internet. You can type your answer instead.',
  3: 'The microphone is busy or not working. Close other apps using it and try again.',
  4: 'The speech service had a problem. Please try again.',
  9: 'Microphone permission is missing.',
  10: 'Too many voice requests. Wait a moment and try again.',
  11: 'The speech service disconnected. Please try again.'
};

/** Short message for a native error code, or '' for none. */
export function voiceErrorText(code) {
  return ERROR_TEXT[code] || (code ? 'Voice input stopped. Please try again.' : '');
}

function finish(reason, code = 0) {
  const s = session;
  if (!s) return;
  session = null;
  clearTimeout(s.safety);
  clearTimeout(s.stopTimer);
  s.handles.forEach(h => Promise.resolve(h).then(x => x && x.remove()).catch(() => {}));
  try {
    s.onEnd && s.onEnd({ reason, code, heard: s.heard });
  } catch {
    // UI callback errors must not break voice cleanup.
  }
}

/**
 * Start listening.
 *  onPartial(alts)  live guesses for the phrase being spoken (best first, up to 5)
 *  onSegment(alts)  a finished phrase (best first, up to 5)
 *  onLevel(db)      mic loudness, for the button animation
 *  onEnd({ reason: 'ended' | 'stopped' | 'error', code, heard })  once, at the end
 * bias: words the speaker is likely to say (Android 13+ uses them to pick the right word).
 * continuous: keep listening through pauses until stopListening() or two silent runs.
 * Resolves true when listening started.
 */
export async function startListening({ onPartial, onSegment, onLevel, onEnd, bias = [], continuous = true, silenceMs = 3000 }) {
  if (session) cancelListening();
  const s = { onEnd, heard: false, stopping: false, handles: [], safety: null, stopTimer: null };
  session = s;
  const mine = fn => data => session === s && fn(data);

  s.handles.push(
    Voice.addListener('partial', mine(d => {
      const alts = ((d && d.matches) || []).filter(Boolean);
      if (alts.length) onPartial && onPartial(alts);
    })),
    Voice.addListener('segment', mine(d => {
      const alts = ((d && d.matches) || []).filter(Boolean);
      if (!alts.length) return;
      // Some recognizers send the same phrase twice (segment + final result).
      if (s.last === alts[0]) return;
      s.last = alts[0];
      s.heard = true;
      onSegment && onSegment(alts);
    })),
    Voice.addListener('level', mine(d => onLevel && onLevel(d.db))),
    Voice.addListener('end', mine(async d => {
      const code = (d && d.code) || 0;
      // Language not supported here (12, 13): switch to the next language and go on.
      if ((code === 12 || code === 13) && !s.heard && langIdx < VOICE_LANGUAGES.length - 1) {
        langIdx++;
        try {
          await begin();
          return;
        } catch {
          // fall through to finish
        }
      }
      finish(s.stopping ? 'stopped' : d.reason || 'ended', code);
    }))
  );

  const begin = () =>
    Voice.start({
      language: voiceLanguage(),
      maxResults: 5,
      continuous,
      maxEmpty: 2,
      silenceMs,
      bias: [...new Set(bias)].slice(0, 200)
    });

  try {
    await begin();
  } catch {
    finish('error', -1);
    return false;
  }
  // Safety stop for a session that never ends (3 minutes).
  s.safety = setTimeout(() => session === s && cancelListening(), 180000);
  return true;
}

/** Stop listening and keep the last phrase (onEnd follows when it has arrived). */
export function stopListening() {
  const s = session;
  if (!s || s.stopping) return;
  s.stopping = true;
  Voice.stop().catch(() => {});
  s.stopTimer = setTimeout(() => session === s && finish('stopped'), 2500);
}

/** Stop now and drop anything not yet heard (screen change, app in background). */
export function cancelListening() {
  if (!session) return;
  Voice.cancel().catch(() => {});
  finish('stopped');
}
