// One-time move of saved per-question data when interview types change (data version 2).
//
// Saved data points at a question by its position in the type's list (index i): answers and
// question edits (is_edits, is_qedits), best scores (is_pbest), hidden questions (is_hidden),
// favourites (is_fav), the Question of the day (is_qotd) and the open Practice question (is_scr).
// Version 2 split four types. Ids stay the same, so only the lists below changed:
//   cloud: "How would you secure an S3 bucket?" moved to the new Cyber Security type (cyber)
//   fresh: "How do you handle conflict with a teammate?" moved to the new HR Round type (hround)
// and every later question of those two lists moved up one place. Each saved entry is matched by
// its QUESTION TEXT in the old list and moved to the place that text has now.
//
// Pure: reads through get(key), returns the new values; nothing is written here. main.js writes
// them together with the version marker, so a second run does nothing. If anything goes wrong the
// caller writes nothing: old data is kept, never deleted. Tested in tests/storage/migrate.test.mjs.
import { HEAD, TAIL, MID, LVH, LVT, LVX, MYEX } from '../data/questions.js';

export const DATA_VERSION = 2;
export const VERSION_KEY = 'is_dv';

// Field questions of version 1 for the types whose list changed (texts only).
const V1_MID = {
  cloud: [
    'What is cloud computing and what are its main service models?',
    'Explain the shared responsibility model.',
    'What is IAM and the principle of least privilege?',
    'What is Infrastructure as Code and why use it?',
    'How would you secure an S3 bucket?',
    'Explain a basic CI/CD pipeline.'
  ],
  fresh: [
    'What is the biggest lesson you learned in college?',
    'Do you prefer teamwork or individual work?',
    'How do you handle stress or pressure?',
    'Describe a time you showed leadership.',
    'Are you willing to learn new skills and work flexible hours?',
    'Do you have any questions for us?',
    'What motivates you to do your best work?',
    'What do you know about our company?',
    'How do you handle conflict with a teammate?',
    'Describe a time you failed and what you learned.',
    'How do you prioritize tasks and manage your time?',
    'Why did you choose your degree, and what have you gained from it?',
    'How would your teachers or friends describe you?'
  ]
};
// Where a question of a changed type may have moved to.
const MOVED_TO = { cloud: ['cyber'], fresh: ['hround'] };
// Questions reworded in version 2 (same meaning, same place), old text -> new text.
export const RENAMED = {
  'Do you have any questions for us?': 'What would you like to ask us about this job?',
  'What do you know about our company?': 'What have you learned about our company before this interview?',
  'Why do you want to work in IT?': 'Why do you want to work in software development?'
};

const LEVELS = ['fresher', 'junior', 'senior'];
const q0 = x => (Array.isArray(x) ? x[0] : x);

/**
 * Question texts of a type and level in index order: the same list (and the same i) as bank() in
 * src/main.js, before any filtering. mid: the field questions to use (default: today's list).
 */
export function rawList(c, level, mid = MID[c]) {
  if (!mid) return [];
  const L =
    level === 'fresher'
      ? [...HEAD, ...mid, ...TAIL, ...(MYEX[c] || [])]
      : [...(LVH[level] || []), ...mid, ...((LVX[level] || {})[c] || []), ...(LVT[level] || [])];
  return L.map(q0);
}

/** "cloud@junior" -> ["cloud", "junior"]; "cloud" -> ["cloud", "fresher"]. */
const splitCK = ck => {
  const [c, l] = String(ck).split('@');
  return [c, l || 'fresher'];
};
const joinCK = (c, l) => (!l || l === 'fresher' ? c : `${c}@${l}`);

/**
 * New place of question i of type c at a level, or null when it did not change (or is unknown, or
 * a question the user added: those have "u..." ids and stay where they are).
 */
export function mapQuestion(c, level, i) {
  if (!V1_MID[c] || !LEVELS.includes(level)) return null;
  const n = Number(i);
  if (typeof i === 'string' && !/^\d+$/.test(i)) return null;
  if (!Number.isInteger(n) || n < 0) return null;
  const old = rawList(c, level, V1_MID[c])[n];
  if (old == null) return null;
  const text = RENAMED[old] || old;
  for (const t of [c, ...MOVED_TO[c]]) {
    const j = rawList(t, level).indexOf(text);
    if (j >= 0) return t === c && j === n ? null : { c: t, i: j };
  }
  return null; // not found: keep the entry exactly as it is
}

// "name|cloud@junior|7" -> mapped key, or null.
function mapKey(k) {
  const s = String(k);
  const a = s.lastIndexOf('|');
  const b = s.lastIndexOf('|', a - 1);
  if (a < 0 || b < 0) return null;
  const [c, l] = splitCK(s.slice(b + 1, a));
  const m = mapQuestion(c, l, s.slice(a + 1));
  return m ? `${s.slice(0, b)}|${joinCK(m.c, l)}|${m.i}` : null;
}

const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

// is_edits, is_qedits, is_pbest: { "name|ck|i": value }. Builds a new object, so entries whose
// places shift never overwrite each other. If a new place is already taken, this store is left
// exactly as it was (nothing is ever overwritten or deleted).
function moveKeyed(o, report, name) {
  if (!isObj(o)) return null;
  const out = {};
  const moved = [];
  Object.keys(o).forEach(k => {
    const nk = mapKey(k);
    if (nk) moved.push([k, nk]);
    else out[k] = o[k];
  });
  if (!moved.length) return null;
  const lines = [];
  for (const [k, nk] of moved) {
    if (nk in out) return null;
    out[nk] = o[k];
    lines.push(`${name}: ${k} -> ${nk}`);
  }
  report.push(...lines);
  return out;
}

// is_hidden: { ck: [i, ...] }
function moveHidden(o, report) {
  if (!isObj(o)) return null;
  const out = {};
  let changed = false;
  const add = (ck, i) => {
    out[ck] = out[ck] || [];
    if (!out[ck].includes(i)) out[ck].push(i);
  };
  Object.entries(o).forEach(([ck, list]) => {
    if (!Array.isArray(list)) return (out[ck] = list);
    const [c, l] = splitCK(ck);
    if (!out[ck]) out[ck] = [];
    list.forEach(i => {
      const m = mapQuestion(c, l, i);
      if (!m) return add(ck, i);
      changed = true;
      add(joinCK(m.c, l), m.i);
      report.push(`is_hidden: ${ck} ${i} -> ${joinCK(m.c, l)} ${m.i}`);
    });
  });
  return changed ? out : null;
}

// is_fav: [{ k: "name|c|level|i", n, c, l, i }]
function moveFav(a, report) {
  if (!Array.isArray(a)) return null;
  let changed = false;
  const out = a.map(f => {
    if (!isObj(f)) return f;
    const m = mapQuestion(f.c, f.l || 'fresher', f.i);
    if (!m) return f;
    changed = true;
    report.push(`is_fav: ${f.c} ${f.l} ${f.i} -> ${m.c} ${m.i}`);
    return { ...f, c: m.c, i: m.i, k: `${f.n}|${m.c}|${f.l}|${m.i}` };
  });
  return changed ? out : null;
}

// is_qotd: { d, c, lv, q } (by text): a renamed or moved question follows its text.
function moveQotd(o, report) {
  if (!isObj(o) || !o.q || !V1_MID[o.c]) {
    if (isObj(o) && RENAMED[o.q]) return { ...o, q: RENAMED[o.q] };
    return null;
  }
  const lv = o.lv || 'fresher';
  const i = rawList(o.c, lv, V1_MID[o.c]).indexOf(o.q);
  const m = i >= 0 ? mapQuestion(o.c, lv, i) : null;
  const q = RENAMED[o.q] || o.q;
  if (!m && q === o.q) return null;
  report.push(`is_qotd: ${o.c} -> ${m ? m.c : o.c}`);
  return { ...o, c: m ? m.c : o.c, q };
}

// is_scr: the open Practice screen. One question (Question of the day) is kept by its id.
function moveScr(o, report) {
  if (!isObj(o) || o.s !== 'practice' || o.one == null) return null;
  const m = mapQuestion(o.cat, o.lv || 'fresher', o.one);
  if (!m) return null;
  report.push(`is_scr: ${o.cat} ${o.one} -> ${m.c} ${m.i}`);
  return { ...o, cat: m.c, one: m.i, i: 0 };
}

/**
 * Compute the version 2 data. get(key) reads a stored value. Returns { writes, report }: writes
 * holds only the keys that change. Mock history (is_hist), saved Mock sessions and own added
 * questions (is_custom) need no change: every old type id still exists.
 */
export function migrateV2(get) {
  const report = [];
  const writes = {};
  const put = (k, v) => v && (writes[k] = v);
  put('is_edits', moveKeyed(get('is_edits'), report, 'is_edits'));
  put('is_qedits', moveKeyed(get('is_qedits'), report, 'is_qedits'));
  put('is_pbest', moveKeyed(get('is_pbest'), report, 'is_pbest'));
  put('is_hidden', moveHidden(get('is_hidden'), report));
  put('is_fav', moveFav(get('is_fav'), report));
  put('is_qotd', moveQotd(get('is_qotd'), report));
  put('is_scr', moveScr(get('is_scr'), report));
  return { writes, report };
}

/**
 * Run the migration once. get(key) / set(key, value) read and write storage. The moved data and the
 * version marker are written together; with the marker already set nothing happens, so running it
 * again is safe. On any error nothing is written and the old data stays as it was.
 * Returns true when it ran.
 */
export function runMigration(get, set) {
  try {
    if ((Number(get(VERSION_KEY)) || 0) >= DATA_VERSION) return false;
    const { writes } = migrateV2(get);
    Object.entries(writes).forEach(([k, v]) => set(k, v));
    set(VERSION_KEY, DATA_VERSION);
    return true;
  } catch {
    return false;
  }
}
