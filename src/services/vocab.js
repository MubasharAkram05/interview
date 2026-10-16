// Personal vocabulary and voice text correction.
//
// The phone's speech service does not know names like "Mubashar" or "Pakpattan", so it writes the
// closest word it knows ("ubashar", "mu bashar", "official"). This module fixes what it safely can:
//   1. Builds a vocabulary: My words (+ aliases), profile name and hometown, interview/tech terms,
//      and rare words from saved answers and the question.
//   2. Corrects a heard text against it: exact aliases, learned corrections, split acronyms
//      ("a w s"), split words ("mu bashar"), and near spellings of rare words (edit distance plus a
//      sound code). Common English words, places and numbers are never changed automatically.
//   3. Name slot: after "my name is" / "myself" the next word becomes the profile name if it is not
//      already close to it.
//   4. Practice: snaps heard words to the saved answer being read, in order, never adding words.
// Pure functions (no DOM, no storage), so everything is unit tested in Node.

import { distance } from 'fastest-levenshtein';
import { doubleMetaphone } from 'double-metaphone';
import COMMON_RAW from '../data/common-words.js';
import { TERMS, PLACES } from '../data/voice-terms.js';

// All thresholds in one place. Similarity is 1 - editDistance / longerLength (0..1).
export const VOCAB_CONFIG = {
  replace: 0.78, // a rare heard word becomes a vocabulary word at this similarity
  phoneticMin: 0.5, // sound codes match: still need at least this spelling similarity
  strong: 0.9, // joining split words ("mu bashar") needs this
  practiceSnap: 0.65, // Practice: heard word snaps to the saved answer word at this similarity
  minLen: 3, // never touch words shorter than this
  maxLenGap: 3, // only compare words whose lengths differ by at most this
  alignWindow: 6, // Practice: how far ahead in the saved answer to look
  pickMargin: 1, // another alternative must score this much higher than the first one
  dupSimilarity: 0.9, // a new phrase this similar to the last one is a duplicate
  maxHints: 100 // words sent to the speech service as hints (Android 13+)
};

const COMMON = new Set(COMMON_RAW.split(' '));
const PLACE_WORDS = new Set();
PLACES.forEach(p => p.split(/\s+/).forEach(w => PLACE_WORDS.add(norm(w))));
const NAME_TRIGGERS = [['my', 'name', 'is'], ['myself']];

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

const isNumber = w => /^\d+([.,]\d+)?$/.test(String(w || '').replace(/[^\d.,]/g, '')) && /\d/.test(w);

/** Spelling similarity 0..1, tolerant to one dropped first or last letter ("ubashar"). */
export function similarity(a, b, tolerant = true) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const r = 1 - distance(a, b) / Math.max(a.length, b.length);
  let d = 0;
  if (tolerant && b.length >= 5 && a.length >= 4) {
    if (a === b.slice(1) || a === b.slice(0, -1)) d = 0.92;
    else if (b === a.slice(1) || b === a.slice(0, -1)) d = 0.92;
  }
  return Math.max(r, d);
}

function codes(key) {
  const [p, s] = doubleMetaphone(key);
  return [p, s].filter(Boolean);
}

function soundsAlike(a, b) {
  if (a.length < 3 || b.length < 3) return false;
  const ca = codes(a);
  const cb = codes(b);
  return ca.some(c => c.length >= 2 && cb.includes(c));
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
 * My words lines: "Mubashar", "Pakpattan: Pakistan, pak pattan" (word, then aliases after a colon).
 * An alias is replaced exactly, even if it is a common word or a place, because the user added it.
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
 * Build the vocabulary.
 * opts: { myWords: [{word, aliases}], profile: {name, city, skills}, answers: [text], questions: [text], terms }
 */
export function buildVocab({ myWords = [], profile = {}, answers = [], questions = [], terms = TERMS } = {}) {
  const targets = new Map(); // key -> { text, key, len, source }
  const alias = new Map(); // heard key (may be two words joined) -> text
  const known = new Set(); // every word seen in answers/questions/my words (already correct as heard)
  const add = (text, source) => {
    const t = String(text || '').trim();
    const key = norm(t);
    if (key.length < 2 || /^\d+$/.test(key)) return;
    const old = targets.get(key);
    const rank = { my: 3, profile: 3, term: 2, answer: 1 };
    if (!old || rank[source] > rank[old.source]) targets.set(key, { text: t, key, len: key.length, source });
  };

  myWords.forEach(({ word, aliases = [] }) => {
    add(word, 'my');
    known.add(norm(word));
    aliases.forEach(a => alias.set(norm(a), word));
  });
  const name = String(profile.name || '').trim();
  name.split(/\s+/).filter(Boolean).forEach(n => add(n, 'profile'));
  String(profile.city || '')
    .split(/[\s,]+/)
    .filter(w => w.length > 2)
    .forEach(c => add(c, 'profile'));
  terms.forEach(t => add(t, 'term'));
  [...answers, ...questions].forEach(text => {
    String(text || '')
      .replace(/\{\w+\}/g, ' ')
      .split(/\s+/)
      .forEach(raw => {
        const core = raw.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9+#]+$/g, '');
        const key = norm(core);
        if (!key) return;
        known.add(key);
        if (key.length >= 4 && !/\d/.test(key) && !COMMON.has(key) && !PLACE_WORDS.has(key)) add(core, 'answer');
      });
  });
  const list = [...targets.values()];
  list.forEach(t => (t.codes = codes(t.key)));
  return {
    targets,
    list,
    alias,
    known,
    nameTokens: name.split(/\s+/).filter(Boolean)
  };
}

function bestTarget(key, vocab, cfg, tolerant = true) {
  let best = null;
  for (const t of vocab.list) {
    if (Math.abs(t.len - key.length) > cfg.maxLenGap) continue;
    const s = similarity(key, t.key, tolerant);
    const phon = s >= cfg.phoneticMin && soundsAlike(key, t.key);
    const ok = s >= cfg.replace || phon;
    if (!ok) continue;
    const score = s + (phon ? 0.05 : 0);
    if (!best || score > best.score) best = { t, score, s, phon };
  }
  return best;
}

/** Is this heard word allowed to be changed by spelling similarity? */
function protectedWord(core, key, cfg) {
  if (!key || key.length < cfg.minLen) return true;
  if (isNumber(core)) return true;
  if (COMMON.has(key) || PLACE_WORDS.has(key)) return true;
  return false;
}

/**
 * Correct a heard text. Returns { text, changes: [{ from, to, rule, index }] }.
 * opts: { smart: true, memory: [{prev, heard, fix}], cfg }
 * With smart = false only aliases and learned corrections are applied.
 */
export function correctText(text, vocab, opts = {}) {
  const cfg = { ...VOCAB_CONFIG, ...(opts.cfg || {}) };
  const smart = opts.smart !== false;
  const memory = opts.memory || [];
  const toks = split(text);
  const words = toks.map((t, i) => (t.space == null ? i : -1)).filter(i => i >= 0);
  const changes = [];
  const put = (wi, to, rule, span = 1) => {
    const ti = words[wi];
    const from = words.slice(wi, wi + span).map(k => toks[k].core).join(' ');
    if (from === to) return;
    changes.push({ from, to, rule, index: wi });
    toks[ti].core = to;
    // Joined words: keep the last word's punctuation and drop the words in between.
    if (span > 1) {
      toks[ti].post = toks[words[wi + span - 1]].post;
      for (let k = 1; k < span; k++) {
        const tk = words[wi + k];
        toks[tk] = { pre: '', core: '', post: '', gone: true };
        if (toks[tk - 1] && toks[tk - 1].space != null) toks[tk - 1].space = '';
      }
    }
  };
  const key = wi => norm(toks[words[wi]].core);

  for (let wi = 0; wi < words.length; wi++) {
    const tok = toks[words[wi]];
    if (tok.gone || !tok.core) continue;
    const k = key(wi);
    const prev = wi > 0 ? key(wi - 1) : '';
    const next = wi + 1 < words.length ? key(wi + 1) : '';

    // 1. Aliases the user added (one word or two words joined).
    if (next && vocab.alias.has(k + next)) {
      put(wi, vocab.alias.get(k + next), 'alias', 2);
      continue;
    }
    if (vocab.alias.has(k)) {
      put(wi, vocab.alias.get(k), 'alias');
      continue;
    }
    // 2. Learned corrections: same heard word after the same previous word.
    const mem = memory.find(m => m.heard === k && m.prev === prev);
    if (mem) {
      put(wi, mem.fix, 'memory');
      continue;
    }
    if (!smart) continue;

    // 3. Spelled-out acronym: "a w s" -> AWS (only if the letters exactly make a known term).
    if (k.length === 1 && /[a-z]/.test(k)) {
      let joined = k;
      let n = 1;
      while (wi + n < words.length && n < 6 && key(wi + n).length === 1) {
        joined += key(wi + n);
        n++;
        const t = vocab.targets.get(joined);
        if (t && n >= 2 && joined.length >= 2) {
          put(wi, t.text, 'acronym', n);
          break;
        }
      }
      if (toks[words[wi]].core !== tok.core || changes.some(c => c.index === wi)) continue;
    }

    // 4. Split word: "mu bashar" -> Mubashar, "dev ops" -> DevOps (strong match only).
    if (next && !isNumber(tok.core) && !isNumber(toks[words[wi + 1]].core)) {
      const joined = k + next;
      if (joined.length >= 5 && !(vocab.known.has(k) && vocab.known.has(next) && !vocab.targets.has(joined))) {
        const exact = vocab.targets.get(joined);
        const b = exact ? { t: exact, s: 1 } : bestTarget(joined, vocab, { ...cfg, replace: cfg.strong, phoneticMin: 2 }, false);
        // "am ubashar": the second word alone already matches, so do not glue "am" to it.
        const alone = b && !exact && (COMMON.has(k) || COMMON.has(next)) && (similarity(next, b.t.key) >= cfg.replace || similarity(k, b.t.key) >= cfg.replace);
        // Two common words ("follow up") are joined only into my words, names and tech terms
        // ("java script" -> JavaScript), never into a word taken from the answers ("follow-up").
        const bothCommon = COMMON.has(k) && COMMON.has(next);
        if (b && !alone && b.s >= cfg.strong && !(bothCommon && (b.s < 1 || b.t.source === 'answer'))) {
          put(wi, b.t.text, 'merge', 2);
          continue;
        }
      }
    }

    // 5. One word.
    if (protectedWord(tok.core, k, cfg)) continue;
    const exact = vocab.targets.get(k);
    if (exact) {
      // Already right; only fix capitals of names, my words and terms ("aws" -> AWS).
      if (exact.source !== 'answer' && tok.core !== exact.text) put(wi, exact.text, 'case');
      continue;
    }
    if (vocab.known.has(k)) continue; // a real word from the answers: never replace with a worse match
    const b = bestTarget(k, vocab, cfg);
    if (b) put(wi, b.t.text, b.s >= cfg.replace ? 'spelling' : 'sound');
  }

  // 6. Name slot: "my name is <word>" / "myself <word>" -> profile name.
  if (smart && vocab.nameTokens.length) nameSlot(toks, words, vocab, cfg, put, key);

  return { text: join(toks.filter(t => !t.gone)).replace(/ {2,}/g, ' '), changes };
}

function nameSlot(toks, words, vocab, cfg, put, key) {
  const nt = vocab.nameTokens;
  for (let wi = 0; wi < words.length; wi++) {
    for (const trig of NAME_TRIGGERS) {
      if (trig.some((w, j) => key(wi + j) !== w)) continue;
      const at = wi + trig.length;
      if (at >= words.length || toks[words[at]].gone) continue;
      const first = key(at);
      if (!first || toks[words[at]].pre.includes('{')) continue; // a {placeholder}, not speech
      // "myself as a developer" stays. After "myself" a common word is taken as a misheard name only
      // when the phrase ends there: "myself wishing", "myself wishing, from ...", "myself wishing and ...".
      if (trig[0] === 'myself' && (COMMON.has(first) || PLACE_WORDS.has(first))) {
        const after = at + 1 < words.length ? key(at + 1) : '';
        const ends = !after || /[,.!?;:]$/.test(toks[words[at]].post) || ['and', 'from', 'i', 'im'].includes(after);
        if (PLACE_WORDS.has(first) || !ends || first.length <= 3) continue;
      }
      if (similarity(first, norm(nt[0])) >= cfg.replace) {
        if (toks[words[at]].core !== nt[0]) put(at, nt[0], 'case');
      } else {
        put(at, nt[0], 'name-slot');
      }
      // Second name word: replace only a rare word or one close to the surname.
      if (nt[1] && at + 1 < words.length && !toks[words[at + 1]].gone) {
        const second = key(at + 1);
        const close = similarity(second, norm(nt[1])) >= cfg.replace;
        if (close || (!COMMON.has(second) && !PLACE_WORDS.has(second) && !isNumber(toks[words[at + 1]].core) && second.length >= 3)) {
          if (toks[words[at + 1]].core !== nt[1]) put(at + 1, nt[1], close ? 'case' : 'name-slot');
        }
      }
    }
  }
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
      if (t.core !== ref[best] && norm(ref[best]) !== k) snapped++;
      if (norm(ref[best]) !== k) t.core = ref[best];
      p = best + 1;
    }
  });
  return { text: join(toks), snapped };
}

/**
 * Pick the best of the speech service's alternatives after correction. The first one wins unless
 * another one scores at least pickMargin higher and has about the same number of words (so a
 * different alternative can fix a word, but never adds a phrase that was not said).
 */
export function pickBest(alts, vocab, opts = {}) {
  const cfg = { ...VOCAB_CONFIG, ...(opts.cfg || {}) };
  const list = (alts || []).filter(a => a && a.trim());
  if (!list.length) return { text: '', index: -1, changes: [], raw: '' };
  const n0 = list[0].trim().split(/\s+/).length; // raw word count of the first alternative
  const scored = list.map((raw, index) => {
    const r = correctText(raw, vocab, opts);
    const keys = r.text.split(/\s+/).map(norm).filter(Boolean);
    const score = keys.filter(k => vocab.targets.has(k) || vocab.known.has(k)).length;
    return { ...r, raw, index, score, words: raw.trim().split(/\s+/).length };
  });
  let best = scored[0];
  scored.slice(1).forEach(c => {
    // Fewer words is fine (split words joined); more than one extra word could be a phrase never said.
    if (c.words <= n0 + 1 && c.score >= scored[0].score + cfg.pickMargin && c.score > best.score) best = c;
  });
  return best;
}

/** Normalized phrase for duplicate checks. */
export function phraseKey(t) {
  return String(t || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * True when a new final phrase repeats what is already there: same as the last phrase, contained
 * in the end of the text box, or at least dupSimilarity similar to the last phrase.
 */
export function isDuplicatePhrase(next, last, tail = '', cfg = VOCAB_CONFIG) {
  const n = phraseKey(next);
  if (!n) return true;
  const l = phraseKey(last);
  if (l && (n === l || 1 - distance(n, l) / Math.max(n.length, l.length) >= cfg.dupSimilarity)) return true;
  const t = phraseKey(tail);
  if (t && n.length >= 8 && t.slice(-Math.max(n.length * 2, 40)).includes(n)) return true;
  return false;
}

/**
 * Hint words for the speech service (Android 13+): My words, profile name and hometown, then
 * rare words and terms from the question and answers. Short words only, never sentences.
 */
export function hintWords(vocab, cfg = VOCAB_CONFIG) {
  const order = ['my', 'profile', 'term', 'answer'];
  const out = [];
  order.forEach(src => {
    vocab.list
      .filter(t => t.source === src && t.text.split(/\s+/).length <= 2 && t.text.length <= 24)
      .forEach(t => out.length < cfg.maxHints && !out.includes(t.text) && out.push(t.text));
  });
  return out;
}

/**
 * Learn from the user's edit of the answer box: exactly one word changed (same word count).
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
  if (!heard || !fix || heard.length < 2) return null;
  return { prev: i > 0 ? norm(a[i - 1]) : '', heard, fix };
}
