// Voice settings and the user's own words, stored on the phone only (localStorage via storage.js):
//   is_voice_accent  'in' | 'pk' | 'us' | 'uk'
//   is_voice_mem     learned corrections [{ prev, heard, fix, at }]
// My words, name, city and skills live in the profile (setup screen).
import { getItem, setItem } from './storage.js';
import { DEFAULT_VOICE_ACCENT, VOICE_ACCENTS } from '../config/app.js';
import { norm, isCommon } from './vocab.js';

const MAX_MEMORY = 50;

export function voiceAccent() {
  const a = getItem('is_voice_accent', DEFAULT_VOICE_ACCENT);
  return VOICE_ACCENTS[a] ? a : DEFAULT_VOICE_ACCENT;
}
export function setAccentPref(a) {
  setItem('is_voice_accent', VOICE_ACCENTS[a] ? a : DEFAULT_VOICE_ACCENT);
}

export function corrections() {
  return getItem('is_voice_mem', []) || [];
}
export function addCorrection(pair) {
  if (!pair) return;
  // One entry per heard word (the newest fix wins): that is how applyCorrections uses them.
  const list = corrections().filter(m => m.heard !== pair.heard);
  list.unshift({ ...pair, at: Date.now() });
  setItem('is_voice_mem', list.slice(0, MAX_MEMORY));
}
export function removeCorrection(i) {
  const list = corrections();
  list.splice(i, 1);
  setItem('is_voice_mem', list);
}

/**
 * Learned corrections in use: a heard word the user later said right in Mock is written as the
 * right word from then on. Only single whole words are swapped; everything else stays as heard.
 * Time O(words) per text (a Map lookup per word).
 */
export function applyCorrections(text) {
  const list = corrections();
  if (!list.length) return String(text || '');
  const fix = new Map(list.filter(m => m && m.heard && m.fix).map(m => [m.heard, m.fix]));
  return String(text || '')
    .split(/(\s+)/)
    .map(t => {
      const f = fix.get(norm(t));
      return f && /\S/.test(t) ? f : t;
    })
    .join('');
}

/**
 * Remember a correction from Mock: the phone heard `heard` where the saved answer has `fix`, and
 * the user then said the word right. Only one heard word for one answer word, both 2+ letters, and
 * never a common English word ("Lahore" for "Pakpattan" can be learned, "the" for "a" cannot).
 */
export function learnCorrection(heard, fix, prev = '') {
  const h = norm(heard);
  const f = String(fix || '').replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9+#]+$/g, '');
  if (!h || /\s/.test(String(heard).trim()) || h.length < 2 || isCommon(h) || !f || norm(f).length < 2 || norm(f) === h) return false;
  addCorrection({ prev: norm(prev), heard: h, fix: f });
  return true;
}
