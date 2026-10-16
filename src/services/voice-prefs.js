// Voice settings and personal vocabulary, stored on the phone only (localStorage via storage.js):
//   is_voice_accent  'pk' | 'in' | 'us' | 'uk'
//   is_voice_smart   true/false  (Smart name matching)
//   is_voice_words   My words text, one per line ("Pakpattan: Pakistan" adds an alias)
//   is_voice_mem     learned corrections [{ prev, heard, fix, at }]
import { getItem, setItem } from './storage.js';
import { DEFAULT_VOICE_ACCENT, VOICE_ACCENTS } from '../config/app.js';
import { buildVocab, parseMyWords } from './vocab.js';

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

// Cached vocabulary: rebuilt only when My words, the profile, the saved answers or the question change.
let cache = { key: '', vocab: null };
export function userVocab({ profile = {}, answers = [], question = '' } = {}) {
  const words = myWordsText();
  const key = JSON.stringify([words, profile.name || '', profile.city || '', answers.length, answers.join('\u0001').length, answers.slice(-3), question]);
  if (cache.key !== key) {
    cache = {
      key,
      vocab: buildVocab({ myWords: parseMyWords(words), profile: { name: profile.name, city: profile.city }, answers, questions: [question] })
    };
  }
  return cache.vocab;
}

/** Up to 6 chip words: My words first, then the profile name and hometown. */
export function chipWords(profile = {}) {
  const out = [];
  const add = w => {
    const t = String(w || '').trim();
    if (t && t.length <= 24 && !out.some(x => x.toLowerCase() === t.toLowerCase()) && out.length < 6) out.push(t);
  };
  parseMyWords(myWordsText()).forEach(m => add(m.word));
  String(profile.name || '').split(/\s+/).forEach(add);
  String(profile.city || '').split(/,/).forEach(add);
  return out;
}
