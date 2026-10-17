import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { TTS_LANGUAGES } from '../config/app.js';

/**
 * Read aloud using the phone's own text-to-speech engine.
 * Works offline when the phone's voice data is downloaded (most phones ship with it).
 */

let token = 0;
let rangeHandle = null;
let speakingNow = false;
let langChecked = null; // null = not checked yet, true/false = result

export const TTS_MESSAGES = {
  'no-voice': 'No English voice is installed on this phone. Install one in Settings > Text-to-speech output.',
  error: 'Read aloud is not working on this phone right now. You can still read the text on screen.'
};

export function isSpeaking() {
  return speakingNow;
}

let lang = null; // the first of TTS_LANGUAGES the phone's engine supports
const listeners = new Set();

/** fn(speaking) is called whenever reading aloud starts or stops (header mute button). */
export function onSpeakingChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function setSpeaking(v) {
  if (speakingNow === v) return;
  speakingNow = v;
  listeners.forEach(fn => {
    try {
      fn(v);
    } catch {
      // a listener error must not stop reading
    }
  });
}

async function hasLanguage() {
  if (langChecked !== null) return langChecked;
  for (const l of TTS_LANGUAGES) {
    try {
      const r = await TextToSpeech.isLanguageSupported({ lang: l });
      if (r && r.supported) {
        lang = l;
        break;
      }
    } catch {
      // Some engines do not answer this check: use the last choice and let speak() report errors.
      lang = TTS_LANGUAGES[TTS_LANGUAGES.length - 1];
      break;
    }
  }
  // Remember only a success: after the user installs a voice, the next tap finds it (no restart).
  langChecked = lang ? true : null;
  return !!lang;
}

function clearRange() {
  if (rangeHandle) {
    rangeHandle.then(h => h.remove()).catch(() => {});
    rangeHandle = null;
  }
}

/**
 * Speak text. onWord(charIndex) is called when the engine starts a new word (if supported).
 * Resolves { ok: true } when finished, { ok: false, reason } on failure,
 * or { ok: false, reason: 'stopped' } if stopSpeaking() was called.
 */
export async function speak(text, { onWord, rate = 0.9 } = {}) {
  stopSpeaking();
  const my = ++token;
  if (!(await hasLanguage())) return { ok: false, reason: 'no-voice' };
  if (my !== token) return { ok: false, reason: 'stopped' };

  if (onWord) {
    rangeHandle = TextToSpeech.addListener('onRangeStart', info => {
      if (my === token && info) onWord(info.start);
    });
  }
  setSpeaking(true);
  try {
    await TextToSpeech.speak({ text, lang, rate, pitch: 1, volume: 1 });
    return my === token ? { ok: true } : { ok: false, reason: 'stopped' };
  } catch {
    return my === token ? { ok: false, reason: 'error' } : { ok: false, reason: 'stopped' };
  } finally {
    if (my === token) {
      setSpeaking(false);
      clearRange();
    }
  }
}

export function stopSpeaking() {
  token++;
  setSpeaking(false);
  clearRange();
  TextToSpeech.stop().catch(() => {});
}
