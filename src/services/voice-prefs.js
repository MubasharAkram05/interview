// Voice settings, stored on the phone only (localStorage via storage.js):
//   is_voice_accent  'in' | 'pk' | 'us' | 'uk'
import { getItem, setItem } from './storage.js';
import { DEFAULT_VOICE_ACCENT, VOICE_ACCENTS, TECH_HINTS } from '../config/app.js';
import { DEMO } from '../data/questions.js';

export function voiceAccent() {
  const a = getItem('is_voice_accent', DEFAULT_VOICE_ACCENT);
  return VOICE_ACCENTS[a] ? a : DEFAULT_VOICE_ACCENT;
}
export function setAccentPref(a) {
  setItem('is_voice_accent', VOICE_ACCENTS[a] ? a : DEFAULT_VOICE_ACCENT);
}

/**
 * The profile name used for voice, or '' for the built-in demo profile. "Alex Khan" is sample
 * data, not the user: its name is never sent as a hint or used to pick a guess, even if the demo
 * profile was saved by an older version or its details were edited.
 */
export function realName(profile = {}) {
  const name = String(profile.name || '').trim();
  const demo = Object.keys(DEMO).map(n => n.toLowerCase());
  return !name || demo.includes(name.toLowerCase()) ? '' : name;
}

/** Profile name words, lowercase, for picking the best guess. */
export function nameKeys(profile = {}) {
  return new Set(
    realName(profile)
      .toLowerCase()
      .split(/\s+/)
      .map(w => w.replace(/[^a-z0-9]/g, ''))
      .filter(Boolean)
  );
}

/** Hints for the speech service (Android 13+): the profile name, then the short tech list. */
export function voiceHints(profile = {}) {
  return [...realName(profile).split(/\s+/).filter(Boolean), ...TECH_HINTS];
}
