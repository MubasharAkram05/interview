// Safe name matching for voice text.
//
// The phone's speech service does not know names like "Mubashar", so it writes the closest word it
// knows ("Mubashir", "official"). This module fixes only what it safely can:
//   - Candidates are ONLY: My words, the profile name, and words the user corrected before.
//   - A heard word is replaced when it is close in spelling (normalized edit distance <= 0.35) or
//     sounds the same (double metaphone), AND it is not a common English word. A common word is
//     replaced only in a name slot ("my name is ...", "I am Xxx", "this is Xxx", "I'm Xxx"),
//     or when it sounds like a My word AND is spelled very close to it.
//   - Countries and cities are never changed ("Pakpattan" never becomes "Pakistan" and the other
//     way round), numbers and words shorter than 3 letters are never changed, a word is never
//     replaced by a more common word, and at most 3 words change per sentence.
//   - Lookup uses sound-code and length buckets, so a sentence costs about O(words x bucket size),
//     not O(words x vocabulary).
// Pure functions (no DOM, no storage), unit tested in tests/vocab/vocab.test.mjs.

import { distance } from 'fastest-levenshtein';
import { doubleMetaphone } from 'double-metaphone';
import COMMON_RAW from '../data/common-words.js';
import { PLACES } from '../data/voice-terms.js';
import { INTERVIEW_VOCAB } from '../data/interview-vocab.js';

// All thresholds in one place. Similarity is 1 - editDistance / longerLength (0..1).
export const VOCAB_CONFIG = {
  maxDistance: 0.35, // replace when normalized edit distance is at most this (similarity >= 0.65)
  phoneticMinSim: 0.4, // same sound code still needs at least this spelling similarity
  commonStrongSim: 0.75, // a common word outside a name slot: same sound AND at least this similar
  mergeSim: 0.9, // "mu bashar" -> Mubashar: two heard words joined must be this close
  minLen: 3, // never touch words shorter than this
  maxLenGap: 3, // only compare words whose lengths differ by at most this
  maxChangesPerSentence: 3,
  alignWindow: 6, // Practice: how far ahead in the saved answer to look
  practiceSnap: 0.65, // Practice: heard word snaps to the saved answer word at this similarity
  maxHints: 100, // strings sent to the speech service (Android 13+)
  maxHintLen: 40 // longest hint string
};

const COMMON = new Set(COMMON_RAW.split(' '));
// Interview vocabulary: built once, duplicate-free and case-insensitive (first spelling wins).
export const IV_LIST = (() => {
  const seen = new Map();
  INTERVIEW_VOCAB.flat().forEach(t => {
    const k = String(t).toLowerCase().trim();
    if (k && !seen.has(k)) seen.set(k, String(t).trim());
  });
  return [...seen.values()];
})();
// Every word of the list is protected: the name matcher never replaces it ("Python" stays Python).
const IV_WORDS = new Set(IV_LIST.flatMap(t => t.split(/\s+/).map(w => norm(w)).filter(Boolean)));
export function isInterviewWord(w) {
  return IV_WORDS.has(norm(w));
}
const PLACE_WORDS = new Set();
PLACES.forEach(p => p.split(/\s+/).forEach(w => PLACE_WORDS.add(norm(w))));
// Name slots: the word after these. For "i am", "im", "this is" only a capitalized word counts
// ("I am Mubasher" yes, "I am from" no); after "my name is" any word.
const NAME_TRIGGERS = [
  { words: ['my', 'name', 'is'], needCap: false },
  { words: ['myself'], needCap: true },
  { words: ['this', 'is'], needCap: true },
  { words: ['i', 'am'], needCap: true },
  { words: ['im'], needCap: true }
];

/** "Node.js," -> "nodejs", "I'm" -> "im". */
export function norm(w) {
  return String(w || '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]/g, '');
}

export function isCommon(w) {
  return COMMON.has(norm(w));
}

export function isPlace(w) {
  return PLACE_WORDS.has(norm(w));
}

const isNumber = w => /\d/.test(String(w || ''));

/** Spelling similarity 0..1 (1 - edit distance / longer length). */
export function similarity(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  return 1 - distance(a, b) / Math.max(a.length, b.length);
}

function codes(key) {
  const [p, s] = doubleMetaphone(key);
  return [...new Set([p, s].filter(c => c && c.length >= 2))];
}

/** Same double-metaphone sound code (words of 3+ letters only). */
export function soundsAlike(a, b) {
  if (!a || !b || a.length < 3 || b.length < 3) return false;
  const cb = codes(b);
  return codes(a).some(c => cb.includes(c));
}

/** Split text into word and space tokens; each word keeps its leading/trailing punctuation. */
function split(text) {
  return String(text || '')
    .split(/(\s+)/)
    .filter(t => t !== '')
    .map(t => {
      if (/^\s+$/.test(t)) return { space: t };
      const m = t.match(/^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9+#]*)$/);
      return { pre: m[1], core: m[2], post: m[3] };
    });
}

function join(tokens) {
  return tokens.map(t => (t.space != null ? t.space : t.pre + t.core + t.post)).join('');
}

/**
 * My words lines: "Mubashar", "Pakpattan: pak pattan" (word, then aliases after a colon).
 * An alias is replaced exactly, even if it is a common word, because the user added it.
 */
export function parseMyWords(text) {
  const out = [];
  String(text || '')
    .split(/[\n;]+/)
    .map(l => l.trim())
    .filter(Boolean)
    .forEach(line => {
      const [w, rest] = line.split(':');
      const word = (w || '').trim();
      if (!word) return;
      const aliases = (rest || '')
        .split(',')
        .map(a => a.trim())
        .filter(Boolean);
      out.push({ word, aliases });
    });
  return out;
}

/**
 * Build the candidate list.
 * opts: { myWords: [{word, aliases}], name: 'Mubashar Akram', city, skills: [..], memory: [{heard, fix}] }
 * Returns { targets: Map key->{text,key,len,source}, keys: Set, byCode, byLen, alias, memory, nameTokens }.
 */
export function buildVocab({ myWords = [], name = '', city = '', skills = [], memory = [] } = {}) {
  const targets = new Map();
  const alias = new Map(); // heard key (one word, or two words joined) -> text
  const mem = new Map(); // learned correction: heard key -> [{ prev, fix }]
  const add = (text, source) => {
    const t = String(text || '').trim();
    const key = norm(t);
    if (key.length < 2 || /^\d+$/.test(key) || targets.has(key)) return;
    targets.set(key, { text: t, key, len: key.length, source });
  };
  myWords.forEach(({ word, aliases = [] }) => {
    word
      .split(/\s+/)
      .filter(Boolean)
      .forEach(w => add(w, 'my'));
    aliases.forEach(a => alias.set(norm(a), word));
  });
  const nameTokens = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  nameTokens.forEach(n => add(n, 'name'));
  String(city || '')
    .split(/[\s,]+/)
    .filter(w => w.length > 2)
    .forEach(c => add(c, 'city'));
  skills.forEach(sk => String(sk).split(/\s+/).forEach(w => !COMMON.has(norm(w)) && add(w, 'skill')));
  memory.forEach(m => {
    if (!m || !m.heard || !m.fix) return;
    const k = norm(m.heard);
    mem.set(k, [...(mem.get(k) || []), { prev: m.prev || '', fix: m.fix }]);
    add(m.fix, 'memory');
  });
  const byCode = new Map();
  const byLen = new Map();
  targets.forEach(t => {
    t.codes = codes(t.key);
    t.codes.forEach(c => byCode.set(c, [...(byCode.get(c) || []), t]));
    byLen.set(t.len, [...(byLen.get(t.len) || []), t]);
  });
  return { targets, keys: new Set(targets.keys()), byCode, byLen, alias, memory: mem, nameTokens, city: String(city || '').trim(), skills };
}

/** Bucketed lookup: targets with the same sound code or a similar length. */
function nearby(key, vocab, cfg) {
  const out = new Set();
  codes(key).forEach(c => (vocab.byCode.get(c) || []).forEach(t => out.add(t)));
  for (let l = key.length - cfg.maxLenGap; l <= key.length + cfg.maxLenGap; l++) (vocab.byLen.get(l) || []).forEach(t => out.add(t));
  return out;
}

/** Best safe candidate for one heard word, or null. slot = the word is in a name slot. */
function match(key, vocab, cfg, slot) {
  const common = COMMON.has(key);
  const kc = codes(key);
  let best = null;
  nearby(key, vocab, cfg).forEach(t => {
    if (Math.abs(t.len - key.length) > cfg.maxLenGap) return;
    if (COMMON.has(t.key) && !common) return; // never replace with a more common word
    const s = similarity(key, t.key);
    const phon = s >= cfg.phoneticMinSim && t.codes.some(c => kc.includes(c));
    const close = s >= 1 - cfg.maxDistance;
    let ok;
    // Short words ("ads", "IaaS"): almost exact spelling, or a same-sounding name in a name slot.
    if (key.length <= 4 || t.len <= 4) ok = s >= 0.75 || (slot && phon);
    else if (!common || slot) ok = close || phon;
    else ok = phon && s >= cfg.commonStrongSim; // a real English word: only a strong sound-alike
    if (!ok) return;
    const score = s + (phon ? 0.05 : 0);
    if (!best || score > best.score) best = { t, s, phon, score };
  });
  return best;
}

function learned(vocab, k, prev) {
  const list = vocab.memory.get(k);
  if (!list) return '';
  const m = list.find(x => x.prev === prev) || (PLACE_WORDS.has(k) ? null : list[0]);
  return m ? m.fix : '';
}

/** Word indexes that are name slots. */
function nameSlots(toks, words) {
  const slots = new Set();
  const key = wi => norm(toks[words[wi]].core);
  for (let wi = 0; wi < words.length; wi++) {
    for (const trig of NAME_TRIGGERS) {
      if (trig.words.some((w, j) => wi + j >= words.length || key(wi + j) !== w)) continue;
      const at = wi + trig.words.length;
      if (at >= words.length) continue;
      const core = toks[words[at]].core;
      if (trig.needCap && !/^[A-Z]/.test(core)) continue;
      slots.add(at);
      // A surname right after the first name is in the slot too ("my name is Mubashir Akram").
      if (at + 1 < words.length && /^[A-Z]/.test(toks[words[at + 1]].core)) slots.add(at + 1);
    }
  }
  return slots;
}

/**
 * Correct a heard text. Returns { text, changes: [{ from, to, why }] }.
 * opts: { smart: true, cfg }. With smart = false only aliases and learned corrections apply.
 */
export function correctText(text, vocab, opts = {}) {
  const cfg = { ...VOCAB_CONFIG, ...(opts.cfg || {}) };
  const smart = opts.smart !== false;
  const toks = split(text);
  const words = toks.map((t, i) => (t.space == null ? i : -1)).filter(i => i >= 0);
  const slots = nameSlots(toks, words);
  const changes = [];
  let inSentence = 0;
  const key = wi => norm(toks[words[wi]].core);
  const put = (wi, to, why, span = 1) => {
    const ti = words[wi];
    const from = words
      .slice(wi, wi + span)
      .map(k => toks[k].core)
      .join(' ');
    if (from === to) return;
    changes.push({ from, to, why });
    inSentence++;
    toks[ti].core = to;
    if (span > 1) {
      toks[ti].post = toks[words[wi + span - 1]].post;
      for (let k = 1; k < span; k++) {
        const tk = words[wi + k];
        toks[tk] = { pre: '', core: '', post: '', gone: true };
        if (toks[tk - 1] && toks[tk - 1].space != null) toks[tk - 1].space = '';
      }
    }
  };

  for (let wi = 0; wi < words.length; wi++) {
    const tok = toks[words[wi]];
    if (tok.gone || !tok.core) continue;
    const k = key(wi);
    const next = wi + 1 < words.length ? key(wi + 1) : '';
    const capped = inSentence >= cfg.maxChangesPerSentence;

    // 1. Aliases the user typed in My words (exact, one word or two joined).
    if (!capped && next && vocab.alias.has(k + next)) {
      put(wi, vocab.alias.get(k + next), 'alias', 2);
    } else if (!capped && vocab.alias.has(k)) {
      put(wi, vocab.alias.get(k), 'alias');
    } else if (!capped && learned(vocab, k, wi > 0 ? key(wi - 1) : '')) {
      // 2. A correction the user made before. For a place word the previous word must match too,
      // so one fix of "from Pakistan" does not change every "Pakistan".
      put(wi, learned(vocab, k, wi > 0 ? key(wi - 1) : ''), 'learned from your edit');
    } else if (vocab.targets.has(k)) {
      // 3. Already right: only fix capitals ("mubashar" -> "Mubashar").
      const t = vocab.targets.get(k);
      if (tok.core !== t.text && !COMMON.has(k)) put(wi, t.text, 'capitals');
    } else if (smart && !capped) {
      // 4. Split name: "mu bashar" -> Mubashar (strong match only, never with a place word).
      let merged = false;
      if (next && !PLACE_WORDS.has(k) && !PLACE_WORDS.has(next) && !isNumber(tok.core) && !isNumber(toks[words[wi + 1]].core)) {
        const joined = k + next;
        const t = [...nearby(joined, vocab, cfg)].find(x => similarity(joined, x.key) >= cfg.mergeSim && !(COMMON.has(k) && COMMON.has(next) && x.key !== joined));
        if (t && joined.length >= 5) {
          put(wi, t.text, 'joined split word', 2);
          merged = true;
        }
      }
      // 5. One word.
      if (!merged && k.length >= cfg.minLen && !isNumber(tok.core) && !PLACE_WORDS.has(k) && !IV_WORDS.has(k)) {
        const slot = slots.has(wi);
        const b = match(k, vocab, cfg, slot);
        if (b) put(wi, b.t.text, `${b.phon ? 'sounds like' : 'spelled like'} ${b.t.source === 'name' ? 'profile name' : b.t.source === 'memory' ? 'a learned word' : 'My word'} (${b.s.toFixed(2)})${slot ? ', name slot' : ''}`);
      }
    }
    if (/[.!?]$/.test(toks[words[wi]].post)) inSentence = 0; // new sentence, new change budget
  }
  return { text: join(toks.filter(t => !t.gone)).replace(/ {2,}/g, ' '), changes };
}

/**
 * Practice: snap heard words to the saved answer being read, in order. A heard word becomes the
 * answer word when they are at least practiceSnap similar; words are never added.
 * Bounded alignment: O(heard words x alignWindow).
 */
export function snapToReference(text, reference, opts = {}) {
  const cfg = { ...VOCAB_CONFIG, ...(opts.cfg || {}) };
  const ref = String(reference || '')
    .split(/\s+/)
    .map(w => w.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9+#]+$/g, ''))
    .filter(Boolean);
  const toks = split(text);
  let p = 0;
  let snapped = 0;
  toks.forEach(t => {
    if (t.space != null || !t.core) return;
    const k = norm(t.core);
    if (!k || isNumber(t.core)) return;
    let best = -1;
    let bestS = 0;
    for (let j = p; j < Math.min(ref.length, p + cfg.alignWindow); j++) {
      const s = similarity(k, norm(ref[j]));
      if (s > bestS) {
        best = j;
        bestS = s;
      }
      if (s === 1) break;
    }
    if (best >= 0 && bestS >= cfg.practiceSnap) {
      if (norm(ref[best]) !== k) {
        snapped++;
        t.core = ref[best];
      }
      p = best + 1;
    }
  });
  return { text: join(toks), snapped };
}

/**
 * Hints for the speech service (Android 13+), most relevant first, at most 100 short strings:
 *   1. My words, aliases, the profile name, city and skills (the user's own words)
 *   2. `first` (Practice: the words of the answer being read, names first)
 *   3. interview words and phrases that appear in `context` (the current question)
 *   4. the rest of the interview vocabulary
 */
export function hintWords(vocab, { first = [], context = '' } = {}, cfg = VOCAB_CONFIG) {
  const out = [];
  const push = w => {
    const t = String(w || '').trim();
    if (t && t.length <= cfg.maxHintLen && out.length < cfg.maxHints && !out.some(x => x.toLowerCase() === t.toLowerCase())) out.push(t);
  };
  vocab.targets.forEach(t => t.source === 'my' && push(t.text));
  vocab.alias.forEach(word => push(word));
  vocab.nameTokens.forEach(push);
  if (vocab.city) push(vocab.city);
  (vocab.skills || []).forEach(push);
  first.forEach(push);
  const ctx = ` ${String(context || '').toLowerCase().replace(/[^a-z0-9/.+#\s]/g, ' ').replace(/\s+/g, ' ')} `;
  IV_LIST.filter(t => ctx.includes(` ${t.toLowerCase()} `)).forEach(push);
  IV_LIST.forEach(push);
  return out;
}

/** Interview words (single words or phrases) found in a text: Mock keyword chips. */
export function keywordsIn(text, max = 4) {
  const ctx = ` ${String(text || '').toLowerCase().replace(/[^a-z0-9/.+#\s]/g, ' ').replace(/\s+/g, ' ')} `;
  return IV_LIST.filter(t => t.length > 3 && !COMMON.has(t.toLowerCase()) && ctx.includes(` ${t.toLowerCase()} `)).slice(0, max);
}

/** Rare words of a text (not common, not places, 4+ letters): Practice hints. */
export function rareWords(text, max = 20) {
  const out = [];
  String(text || '')
    .split(/\s+/)
    .forEach(raw => {
      const core = raw.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9+#]+$/g, '');
      const k = norm(core);
      if (k.length >= 4 && !/\d/.test(k) && !COMMON.has(k) && !PLACE_WORDS.has(k) && out.length < max && !out.includes(core)) out.push(core);
    });
  return out;
}

/**
 * Learn from the user's edit of dictated text: exactly one word changed (same word count).
 * Returns { prev, heard, fix } or null. Nothing leaves the phone.
 */
export function learnFromEdit(before, after) {
  const a = String(before || '').trim().split(/\s+/).filter(Boolean);
  const b = String(after || '').trim().split(/\s+/).filter(Boolean);
  if (!a.length || a.length !== b.length) return null;
  const diff = [];
  for (let i = 0; i < a.length; i++) if (norm(a[i]) !== norm(b[i])) diff.push(i);
  if (diff.length !== 1) return null;
  const i = diff[0];
  const heard = norm(a[i]);
  const fix = b[i].replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9+#]+$/g, '');
  if (!heard || !fix || heard.length < 2 || norm(fix) === heard) return null;
  return { prev: i > 0 ? norm(a[i - 1]) : '', heard, fix };
}
