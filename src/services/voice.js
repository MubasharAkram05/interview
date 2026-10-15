import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { VOICE_LANGUAGE } from '../config/app.js';

/**
 * Speech to text using the phone's own speech recognition service
 * (on most phones this is Google's service, which needs internet).
 *
 * The app never records or saves audio itself. The microphone audio is handled by the
 * Android speech service and only the recognized text comes back to the app.
 */

let session = null; // { onText, onEnd, text, timer, sawListening, handles }

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
    s.onEnd && s.onEnd({ text: s.text, reason });
  } catch {
    // UI callback errors must not break voice cleanup.
  }
}

/**
 * Start listening. onText(text) gets live partial text for this session.
 * onEnd({ text, reason }) runs once when listening ends for any reason.
 * Resolves true when listening started.
 */
export async function startListening({ onText, onEnd }) {
  if (session) stopListening();
  const s = { onText, onEnd, text: '', timer: null, sawListening: false, offSince: 0, startedAt: Date.now(), handles: [] };
  session = s;

  s.handles.push(
    SpeechRecognition.addListener('partialResults', data => {
      if (session !== s) return;
      const t = (data && data.matches && data.matches[0]) || '';
      if (t) {
        s.text = t;
        onText && onText(t);
      }
    })
  );

  try {
    await SpeechRecognition.start({
      language: VOICE_LANGUAGE,
      maxResults: 1,
      partialResults: true,
      popup: false
    });
  } catch (e) {
    finish('error');
    return false;
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
      } else if (s.sawListening) {
        // Wait one more tick so the final result (sent after end of speech) is not lost.
        if (!s.offSince) s.offSince = Date.now();
        else finish('ended');
      } else if (Date.now() - s.startedAt > 3000) {
        finish('error');
      }
    } catch {
      finish('error');
    }
  }, 600);
  // Safety stop: Android ends a session after a pause, this covers stuck sessions.
  setTimeout(() => {
    if (session === s) stopListening();
  }, 60000);
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
