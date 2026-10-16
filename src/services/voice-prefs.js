// Voice settings and personal vocabulary, stored on the phone only (localStorage via storage.js):
//   is_voice_accent  'in' | 'pk' | 'us' | 'uk'
//   is_voice_smart   true/false  (Smart name matching)
//   is_voice_words   My words text, one per line ("Pakpattan: pak pattan" adds an alias)
//   is_voice_mem     learned corrections [{ prev, heard, fix, at }]
import { getItem, setItem } from './storage.js';
import { DEFAULT_VOICE_ACCENT, VOICE_ACCENTS } from '../config/app.js';
import { buildVocab, parseMyWords } from './vocab.js';
import { DEMO } from '../data/questions.js';

const MAX_MEMORY = 50;

export function voiceAccent() {
  const a = getItem('is_voice_accent', DEFAULT_VOICE_ACCENT);
  return VOICE_ACCENTS[a] ? a : DEFAULT_VOICE_ACCENT;
}
export function setAccentPref(a) {
  setItem('is_voice_accent', VOICE_ACCENTS[a] ? a : DEFAULT_VOICE_ACCENT);
}

export function smartMatching() {
  return getItem('is_voice_smart', true) !== false;
}
export function setSmartMatching(on) {
  setItem('is_voice_smart', !!on);
}

export function myWordsText() {
  return getItem('is_voice_words', '') || '';
}
export function setMyWordsText(t) {
  setItem('is_voice_words', String(t || '').slice(0, 4000));
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

/**
 * The profile name used for voice, or '' for the built-in demo profile ("Alex Khan" is sample data,
 * not the user: its name must never become a chip, a hint or a name-matching target).
 */
export function realName(profile = {}) {
  const name = String(profile.name || '').trim();
  if (!name) return '';
  const demo = DEMO[name];
  return demo && Object.keys(demo).every(k => demo[k] === profile[k]) ? '' : name;
}

// Cached candidate list: rebuilt only when My words, the profile name or learned corrections change.
let cache = { key: '', vocab: null };
export function userVocab(profile = {}) {
  const words = myWordsText();
  const name = realName(profile);
  const memory = corrections();
  const key = JSON.stringify([words, name, memory]);
  if (cache.key !== key) cache = { key, vocab: buildVocab({ myWords: parseMyWords(words), name, memory }) };
  return cache.vocab;
}

/** Up to 6 chip words: My words first, then the profile name. Empty when there are none. */
export function chipWords(profile = {}) {
  const out = [];
  const add = w => {
    const t = String(w || '').trim();
    if (t && t.length <= 24 && !out.some(x => x.toLowerCase() === t.toLowerCase()) && out.length < 6) out.push(t);
  };
  parseMyWords(myWordsText()).forEach(m => add(m.word));
  realName(profile).split(/\s+/).forEach(add);
  return out;
}
