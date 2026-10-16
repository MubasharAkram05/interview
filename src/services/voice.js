import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { VOICE_LANGUAGES } from '../config/app.js';

/**
 * Speech to text using the phone's own speech recognition service
 * (on most phones this is Google's service, which needs internet).
 *
 * The app never records or saves audio itself. The microphone audio is handled by the
 * Android speech service and only the recognized text comes back to the app.
 */

let session = null; // { onText, onEnd, text, alts, timer, sawListening, handles }
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

export function isListening() {
  return !!session;
}

function finish(reason) {
  const s = session;
  if (!s) return;
  session = null;
  clearInterval(s.timer);
  s.handles.forEach(h => h.then(x => x.remove()).catch(() => {}));
  try {
    s.onEnd && s.onEnd({ text: s.text, alts: s.alts, reason });
  } catch {
    // UI callback errors must not break voice cleanup.
  }
}

/**
 * Start listening. onText(text, alternatives) gets the live text for this session plus up to
 * 5 alternative transcripts (the read-along picks the one that fits the answer best).
 * onEnd({ text, alts, reason }) runs once when listening ends for any reason.
 * Resolves true when listening started.
 */
export async function startListening({ onText, onEnd }) {
  if (session) stopListening();
  const s = { onText, onEnd, text: '', alts: [], timer: null, sawListening: false, offSince: 0, startedAt: Date.now(), handles: [], retried: false };
  session = s;

  s.handles.push(
    SpeechRecognition.addListener('partialResults', data => {
      if (session !== s) return;
      const alts = ((data && data.matches) || []).filter(Boolean);
      if (alts.length) {
        s.text = alts[0];
        s.alts = alts;
        onText && onText(alts[0], alts);
      }
    })
  );

  const begin = () =>
    SpeechRecognition.start({
      language: voiceLanguage(),
      maxResults: 5,
      partialResults: true,
      popup: false
    });

  // If the phone's speech service rejects this language (it stops at once and hears nothing),
  // move to the next language and try again one time.
  const tryNextLanguage = async () => {
    if (s.retried || langIdx >= VOICE_LANGUAGES.length - 1) return false;
    s.retried = true;
    langIdx++;
    s.sawListening = false;
    s.offSince = 0;
    s.startedAt = Date.now();
    try {
      await begin();
      return true;
    } catch {
      return false;
    }
  };

  try {
    await begin();
  } catch {
    if (!(await tryNextLanguage())) {
      finish('error');
      return false;
    }
  }

  // The plugin does not report errors (no speech, network) after start() resolves,
  // so we poll its listening flag and close the session when it turns off.
  s.timer = setInterval(async () => {
    if (session !== s) return;
    try {
      const r = await SpeechRecognition.isListening();
      if (r.listening) {
        s.sawListening = true;
        s.offSince = 0;
      } else {
        // Stopped within 2 s with no text at all: most likely the language is not supported.
        if (!s.text && Date.now() - s.startedAt < 2000 && (await tryNextLanguage())) return;
        if (!s.sawListening && !s.text) {
          if (Date.now() - s.startedAt > 3000) finish('error');
          return;
        }
        // Wait one more tick so the final result (sent after end of speech) is not lost.
        if (!s.offSince) s.offSince = Date.now();
        else finish('ended');
      }
    } catch {
      finish('error');
    }
  }, 500);
  // Safety stop: Android ends a session after a pause, this covers stuck sessions.
  setTimeout(() => {
    if (session === s) stopListening();
  }, 90000);
  return true;
}

/** Stop listening now (user tap, screen change, app in background). */
export function stopListening() {
  if (!session) return;
  // stop() on Android never resolves its promise, so it is not awaited.
  try {
    SpeechRecognition.stop().catch(() => {});
  } catch {
    // ignore
  }
  finish('stopped');
}
