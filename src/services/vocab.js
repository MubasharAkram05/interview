// Word helpers for voice matching: normalising, spelling and sound similarity, rare words.
// Pure functions (no DOM, no storage), unit tested in tests/vocab/vocab.test.mjs.
// (The older name-matching engine was removed: the app now aligns what was heard to the user's own
// saved answer, see expected.js.)

import { distance } from 'fastest-levenshtein';
import { doubleMetaphone } from 'double-metaphone';
import COMMON_RAW from '../data/common-words.js';
import { PLACES } from '../data/voice-terms.js';

const COMMON = new Set(COMMON_RAW.split(' '));
const PLACE_WORDS = new Set();
PLACES.forEach(p => p.split(/\s+/).forEach(w => PLACE_WORDS.add(norm(w))));

/** "Node.js," -> "nodejs", "I'm" -> "im". */
export function norm(w) {
  return String(w || '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]/g, '');
}

/** A common English word (SCOWL list): never learned as a voice correction. */
export function isCommon(w) {
  return COMMON.has(norm(w));
}

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
