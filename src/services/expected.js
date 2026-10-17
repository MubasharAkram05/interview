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

// Pair scores are memoised: the Mock box re-aligns the whole answer on every partial result, so
// the same word pairs come back again and again. Levenshtein + double metaphone run once per pair
// instead of once per pair per partial (bounded: cleared after 20 000 entries, about 1 MB).
const simCache = new Map();

/** Similarity of a heard and an expected word (0..1), or -1 when they must not be paired. */
function pairSim(h, e, cfg) {
  const a = norm(h);
  const b = norm(e);
  if (a === b) return 1;
  const key = a + '|' + b + '|' + cfg.minSim;
  const hit = simCache.get(key);
  if (hit !== undefined) return hit;
  let out = -1;
  const s = similarity(a, b);
  if (s >= cfg.minSim) out = s;
  else if (soundsAlike(a, b)) out = Math.max(s, cfg.minSim);
  if (simCache.size > 20000) simCache.clear();
  simCache.set(key, out);
  return out;
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
export const wordStatus = r => wordDetail(r).st;

// Mock "From memory" is forgiving, like a language app: a word half right counts as said.
export const LENIENT = { minSim: 0.5, gap: 1 };

/**
 * Answer words found in one spoken phrase, leniently. Returns a Set of expected indices j.
 *  - the phrase is aligned to the answer with LENIENT (spelling 50% alike, or sounds alike),
 *  - joined or split words count too: "bsit" = "BS IT", "pak pattan" = "Pakpattan".
 * These hits are kept for the question ("sticky"), so a red or missed word turns right when the
 * user says it again later, even out of order. Time O(n x m).
 */
export function phraseHits(phrase, expectedText, cfg = LENIENT) {
  const r = alignToExpected(phrase, expectedText, { partial: true, cfg });
  const hits = new Set(r.ops.filter(o => o.type === 'match' || o.type === 'fix').map(o => o.j));
  const H = words(phrase).map(norm);
  const X = words(expectedText).map(norm);
  for (let i = 0; i < H.length; i++) {
    for (let j = 0; j < X.length; j++) {
      // Only when the joined form fits clearly better than either part alone.
      const one = similarity(H[i], X[j]);
      if (j + 1 < X.length && H[i].length >= 3 && one < 0.6 && similarity(H[i], X[j + 1]) < 0.6 && similarity(H[i], X[j] + X[j + 1]) >= 0.8) {
        hits.add(j);
        hits.add(j + 1);
      }
      if (i + 1 < H.length && X[j].length >= 4 && one < 0.6 && similarity(H[i + 1], X[j]) < 0.6 && similarity(H[i] + H[i + 1], X[j]) >= 0.8) hits.add(j);
    }
  }
  return hits;
}

/**
 * Status of every answer word for Mock: the in-order alignment of everything heard (LENIENT),
 * then sticky hits on top (a word said right once stays right). Returns { st, heard } like
 * wordDetail. Time O(n x m) for one alignment (pair scores memoised, see pairSim), space O(n x m);
 * an answer is at most a few hundred words, so this stays a few ms per live update.
 */
export function memoryStatus(heardText, expectedText, sticky = []) {
  const d = wordDetail(alignToExpected(heardText, expectedText, { partial: true, cfg: LENIENT }));
  sticky.forEach(j => {
    if (j < d.st.length) {
      d.st[j] = 'ok';
      delete d.heard[j];
    }
  });
  return d;
}

/**
 * wordStatus plus what was heard for each red word: { st, heard: { [j]: 'words said instead' } }.
 * Extras are given to the red words in order; leftover extras go to the last red word of the gap.
 */
export function wordDetail(r) {
  const st = new Array(r.total).fill('dim');
  const heard = {};
  let miss = [];
  let extra = [];
  const flush = () => {
    const k = Math.min(miss.length, extra.length);
    for (let t = 0; t < k; t++) {
      st[miss[t]] = 'bad';
      heard[miss[t]] = (t === k - 1 ? extra.slice(t) : [extra[t]]).join(' ');
    }
    miss = [];
    extra = [];
  };
  r.ops.forEach(o => {
    if (o.type === 'match' || o.type === 'fix') {
      flush();
      st[o.j] = 'ok';
    } else if (o.type === 'extra') extra.push(o.heard);
    else miss.push(o.j);
  });
  flush();
  return { st, heard };
}

const list = a => (a.length <= 1 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
// 'an' before a vowel sound: 'an IT Support', 'an MBA', 'a BS in ...'.
const article = w => (/^([aeiou]|(mba|mbbs|ms|msc|mcs|mphil|ma|mit|hr|seo|sql)\b)/i.test(w) ? 'an' : 'a');

// Common Pakistani degree short forms, written out for a professional answer.
const DEGREES = [
  [/^bs\s*-?\s*(it|i\.t\.?)$/i, 'BS in Information Technology'],
  [/^(bs\s*-?\s*cs|bscs)$/i, 'BS in Computer Science'],
  [/^(bs\s*-?\s*se|bsse)$/i, 'BS in Software Engineering'],
  [/^(bs\s*-?\s*ai|bsai)$/i, 'BS in Artificial Intelligence'],
  [/^(bs\s*-?\s*ds|bsds)$/i, 'BS in Data Science'],
  [/^bsit$/i, 'BS in Information Technology'],
  [/^bba$/i, 'Bachelor of Business Administration (BBA)'],
  [/^mba$/i, 'Master of Business Administration (MBA)'],
  [/^b\.?\s*com$/i, 'Bachelor of Commerce'],
  [/^m\.?\s*com$/i, 'Master of Commerce'],
  [/^mcs$/i, 'Master of Computer Science (MCS)'],
  [/^mit$/i, 'Master of Information Technology (MIT)'],
  [/^b\.?\s*ed$/i, 'Bachelor of Education (B.Ed)'],
  [/^m\.?\s*ed$/i, 'Master of Education (M.Ed)'],
  [/^(ics|fsc|f\.?sc|fa|i\.?com)$/i, null] // intermediate: keep as typed
];

/** "BS IT student" -> { degree: 'BS in Information Technology', studying: true }. */
export function expandDegree(edu = '') {
  let t = String(edu)
    .trim()
    .replace(/[.\s]+$/, '');
  const studying = /\b(student|studying|pursuing|in progress|final year|semester)\b/i.test(t);
  t = t
    .replace(/\b(student|studying|pursuing|in progress)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  for (const [re, full] of DEGREES) if (re.test(t)) return { degree: full || t, studying };
  return { degree: t, studying };
}

/** "Marketing/Sales" -> "Marketing and Sales", "Cloud/DevOps" -> "Cloud and DevOps". */
export const roleText = r =>
  String(r || '')
    .trim()
    .replace(/\s*\/\s*/g, ' and ');

/**
 * "Introduce yourself" answer built from the setup details (a template, no AI). Sentences whose
 * details are missing are left out. p: { name, edu, city, skills: [] | 'a, b', role }.
 */
export function introTemplate(p = {}) {
  const name = String(p.name || '').trim();
  const city = String(p.city || '').trim();
  const role = roleText(p.role).replace(/^(other|fresher and general)$/i, '');
  const { degree, studying } = expandDegree(p.edu);
  const skills = (Array.isArray(p.skills) ? p.skills : String(p.skills || '').split(/,| and /))
    .map(s => String(s).trim())
    .filter(Boolean)
    .slice(0, 5);
  const out = [];
  if (name && city) out.push(`My name is ${name}, and I am from ${city}.`);
  else if (name) out.push(`My name is ${name}.`);
  else if (city) out.push(`I am from ${city}.`);
  if (degree) out.push(studying ? `I am currently pursuing ${article(degree)} ${degree}.` : `I hold ${article(degree)} ${degree}.`);
  if (skills.length) out.push(`My key skills include ${list(skills)}.`);
  if (role)
    out.push(`I am now looking for ${article(role)} ${role} role where I can ${skills.length ? 'use these skills' : 'learn'}, grow and add value to the team.`);
  return out.join(' ');
}

/** Questions that get the template when no answer is saved. */
export const isIntroQuestion = q => /introduce yourself|tell me about yourself/i.test(String(q || ''));
