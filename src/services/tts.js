import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { TTS_LANGUAGE } from '../config/app.js';

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

async function hasLanguage() {
  if (langChecked !== null) return langChecked;
  try {
    const r = await TextToSpeech.isLanguageSupported({ lang: TTS_LANGUAGE });
    langChecked = !!r.supported;
  } catch {
    // Some engines do not answer this check. Let speak() try and report its own error.
    langChecked = true;
  }
  return langChecked;
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
export async function speak(text, { onWord, rate = 0.95 } = {}) {
  stopSpeaking();
  const my = ++token;
  if (!(await hasLanguage())) return { ok: false, reason: 'no-voice' };
  if (my !== token) return { ok: false, reason: 'stopped' };

  if (onWord) {
    rangeHandle = TextToSpeech.addListener('onRangeStart', info => {
      if (my === token && info) onWord(info.start);
    });
  }
  speakingNow = true;
  try {
    await TextToSpeech.speak({ text, lang: TTS_LANGUAGE, rate, pitch: 1, volume: 1 });
    return my === token ? { ok: true } : { ok: false, reason: 'stopped' };
  } catch {
    return my === token ? { ok: false, reason: 'error' } : { ok: false, reason: 'stopped' };
  } finally {
    if (my === token) {
      speakingNow = false;
      clearRange();
    }
  }
}

export function stopSpeaking() {
  token++;
  speakingNow = false;
  clearRange();
  TextToSpeech.stop().catch(() => {});
}
