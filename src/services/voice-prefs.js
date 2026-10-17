// Voice settings and the user's own words, stored on the phone only (localStorage via storage.js):
//   is_voice_accent  'in' | 'pk' | 'us' | 'uk'
//   is_voice_mem     learned corrections [{ prev, heard, fix, at }]
// My words, name, city and skills live in the profile (setup screen).
import { getItem, setItem } from './storage.js';
import { DEFAULT_VOICE_ACCENT, VOICE_ACCENTS } from '../config/app.js';
import { buildVocab } from './vocab.js';

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
  const list = corrections().filter(m => !(m.prev === pair.prev && m.heard === pair.heard));
  list.unshift({ ...pair, at: Date.now() });
  setItem('is_voice_mem', list.slice(0, MAX_MEMORY));
}
export function removeCorrection(i) {
  const list = corrections();
  list.splice(i, 1);
  setItem('is_voice_mem', list);
}

// Cached vocabulary: rebuilt only when the profile's words or the learned corrections change.
let cache = { key: '', vocab: null };
export function userVocab(p = {}) {
  const myWords = (p.words || []).map(word => ({ word, aliases: [] }));
  const memory = corrections();
  const key = JSON.stringify([p.words || [], p.name || '', p.city || '', p.skillTags || [], memory]);
  if (cache.key !== key) cache = { key, vocab: buildVocab({ myWords, name: p.name || '', city: p.city || '', skills: p.skillTags || [], memory }) };
  return cache.vocab;
}

/** Chips under the answer box: the name parts and My words (max 6), only the user's own data. */
export function chipWords(p = {}) {
  const out = [];
  const add = w => {
    const t = String(w || '').trim();
    if (t && t.length <= 24 && !out.some(x => x.toLowerCase() === t.toLowerCase()) && out.length < 6) out.push(t);
  };
  String(p.name || '')
    .split(/\s+/)
    .forEach(add);
  (p.words || []).forEach(add);
  return out;
}
