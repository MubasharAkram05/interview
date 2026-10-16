// Practice: expected-text matching. The user reads (or says from memory) their saved answer; the
// app aligns what the phone heard to that answer and writes the saved words, so names and rare
// words come out exactly as saved ("Mubashir" -> Mubashar, "Pakpattan" stays Pakpattan).
// Pure functions, unit tested in tests/practice/expected.test.mjs.
import { norm, similarity, soundsAlike } from './vocab.js';

export const ALIGN_CONFIG = {
  minSim: 0.6, // a heard word stands for an expected word at this spelling similarity...
  gap: 1 // ...or when they sound the same. Cost of an extra or a missed word.
};

const words = t =>
  String(t || '')
    .split(/\s+/)
    .filter(w => norm(w));

/** Similarity of a heard and an expected word (0..1), or -1 when they must not be paired. */
function pairSim(h, e, cfg) {
  const a = norm(h);
  const b = norm(e);
  if (a === b) return 1;
  const s = similarity(a, b);
  if (s >= cfg.minSim) return s;
  if (soundsAlike(a, b)) return Math.max(s, cfg.minSim);
  return -1;
}

/**
 * Word-level alignment by dynamic programming (edit distance over words).
 * Pairing a heard word with an expected word costs (1 - similarity) and is allowed only when they
 * are similar enough or sound the same; an extra heard word or a missed expected word costs `gap`.
 * Time O(n x m), space O(n x m) for n heard and m expected words.
 *
 * Returns {
 *   ops: [{ type: 'match' | 'fix' | 'extra' | 'missed' | 'pending', heard, expected, j, i }],
 *        (i = index of the heard word, j = index of the expected word)
 *   text: what is written (expected words for every pair, heard words for extras; nothing for
 *         missed words: an expected word is never written without a heard word next to it),
 *   matched, total, extra, missed, score (percent of expected words matched)
 * }
 * partial: true while the user is still reading: expected words after the last matched one are
 * 'pending', not 'missed'.
 */
export function alignToExpected(heardText, expectedText, { partial = false, cfg = ALIGN_CONFIG } = {}) {
  const H = words(heardText);
  const X = words(expectedText);
  const n = H.length;
  const m = X.length;
  const INF = 1e9;
  const cost = Array.from({ length: n + 1 }, () => new Float64Array(m + 1));
  const sims = Array.from({ length: n }, () => new Float64Array(m));
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) sims[i][j] = pairSim(H[i], X[j], cfg);
  for (let i = 1; i <= n; i++) cost[i][0] = i * cfg.gap;
  for (let j = 1; j <= m; j++) cost[0][j] = j * cfg.gap;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const s = sims[i - 1][j - 1];
      const pair = s < 0 ? INF : cost[i - 1][j - 1] + (1 - s);
      cost[i][j] = Math.min(pair, cost[i - 1][j] + cfg.gap, cost[i][j - 1] + cfg.gap);
    }
  }
  // Backtrack (prefer pairs, then extras, then misses).
  const ops = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    const s = i > 0 && j > 0 ? sims[i - 1][j - 1] : -1;
    if (i > 0 && j > 0 && s >= 0 && Math.abs(cost[i][j] - (cost[i - 1][j - 1] + (1 - s))) < 1e-9) {
      ops.push({ type: norm(H[i - 1]) === norm(X[j - 1]) ? 'match' : 'fix', heard: H[i - 1], expected: X[j - 1], j: j - 1, i: i - 1, sim: s });
      i--;
      j--;
    } else if (i > 0 && Math.abs(cost[i][j] - (cost[i - 1][j] + cfg.gap)) < 1e-9) {
      ops.push({ type: 'extra', heard: H[i - 1], i: i - 1 });
      i--;
    } else {
      ops.push({ type: 'missed', expected: X[j - 1], j: j - 1 });
      j--;
    }
  }
  ops.reverse();
  if (partial) {
    const last = Math.max(-1, ...ops.filter(o => o.type === 'match' || o.type === 'fix').map(o => o.j));
    ops.forEach(o => {
      if (o.type === 'missed' && o.j > last) o.type = 'pending';
    });
  }
  const matched = ops.filter(o => o.type === 'match' || o.type === 'fix').length;
  return {
    ops,
    text: ops
      .filter(o => o.type !== 'missed' && o.type !== 'pending')
      .map(o => (o.type === 'extra' ? o.heard : o.expected))
      .join(' '),
    matched,
    total: m,
    extra: ops.filter(o => o.type === 'extra').length,
    missed: ops.filter(o => o.type === 'missed').length,
    score: m ? Math.round((matched / m) * 100) : 0
  };
}

/**
 * Colour of every expected word, like a language app (the whole saved answer is shown):
 *  'ok'  = said (match or fix),
 *  'bad' = said wrong: the user said other words in its place (an extra heard word in the same
 *          gap between two said words; one extra marks one word, in order),
 *  'dim' = not said (missed or not reached yet).
 * Uses the ops of alignToExpected. Time O(n + m).
 */
export function wordStatus(r) {
  const st = new Array(r.total).fill('dim');
  let miss = [];
  let extra = 0;
  const flush = () => {
    miss.slice(0, extra).forEach(j => (st[j] = 'bad'));
    miss = [];
    extra = 0;
  };
  r.ops.forEach(o => {
    if (o.type === 'match' || o.type === 'fix') {
      flush();
      st[o.j] = 'ok';
    } else if (o.type === 'extra') extra++;
    else miss.push(o.j);
  });
  flush();
  return st;
}

const list = a => (a.length <= 1 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
const article = w => (/^[aeiou]/i.test(w) ? 'an' : 'a');

/**
 * "Introduce yourself" answer built from the setup details (a template, no AI). Sentences whose
 * details are missing are left out. p: { name, edu, city, skills: [] | 'a, b', role }.
 */
export function introTemplate(p = {}) {
  const name = String(p.name || '').trim();
  const edu = String(p.edu || '').trim();
  const city = String(p.city || '').trim();
  const role = String(p.role || '').trim();
  const skills = (Array.isArray(p.skills) ? p.skills : String(p.skills || '').split(','))
    .map(s => String(s).trim())
    .filter(Boolean)
    .slice(0, 5);
  const out = [];
  if (name) out.push(`My name is ${name}.`);
  if (edu && city) out.push(`I am ${article(edu)} ${edu} from ${city}.`);
  else if (edu) out.push(`I am ${article(edu)} ${edu}.`);
  else if (city) out.push(`I am from ${city}.`);
  if (skills.length) out.push(`My skills include ${list(skills)}.`);
  if (role) out.push(`I am looking for ${article(role)} ${role} position.`);
  return out.join(' ');
}

/** Questions that get the template when no answer is saved. */
export const isIntroQuestion = q => /introduce yourself|tell me about yourself/i.test(String(q || ''));
