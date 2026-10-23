// Data version 3 (src/services/migrate.js): the HR Questions type (hrq) was removed and its saved
// data moves to Fresh Graduate (fresh) by question text. A fixture of version 2 storage holds hrq
// data in every store, for every index of every level. Nothing may be lost. Run: npm run test:storage
import { runMigration, migrateV3, hrqList, mapHrq, rawList, HRQ_SAME, DATA_VERSION, VERSION_KEY } from '../../src/services/migrate.js';
import { CATS, catId } from '../../src/data/questions.js';

const out = [];
const check = (name, ok, got) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || got === undefined ? '' : `\n      got: ${got}`}`);
const clone = v => JSON.parse(JSON.stringify(v));
const LV = ['fresher', 'junior', 'senior'];
const ck = (c, l) => (l === 'fresher' ? c : `${c}@${l}`);
const N = 'Sara Ahmed';
const want = t => HRQ_SAME[t] || t;

// ---- Fixture (version 2 phone)
let n = 0;
const edits = {};
const qedits = {};
const pbest = {};
const hidden = {};
const fav = [];
for (const l of LV) {
  hrqList(l).forEach((_, i) => {
    const k = `${N}|${ck('hrq', l)}|${i}`;
    edits[k] = `hrq answer ${l} ${i}`;
    qedits[k] = `hrq wording ${l} ${i}`;
    pbest[k] = ++n;
    fav.push({ k: `${N}|hrq|${l}|${i}`, n: N, c: 'hrq', l, i });
  });
  hidden[ck('hrq', l)] = hrqList(l)
    .map((_, i) => i)
    .filter(i => i % 4 === 1);
}
// Fresh Graduate already has an answer on the shared opening question: that place is taken.
edits[`${N}|fresh|0`] = 'fresh answer 0';
edits[`${N}|hrq|u1700000000001`] = 'answer to my own HR question';
const custom = { hrq: [{ i: 'u1700000000001', q: 'My own HR question', a: 'My answer' }], fresh: [{ i: 'u1700000000002', q: 'Mine', a: 'A' }] };
const qotd = { d: '2026-10-23', c: 'hrq', lv: 'junior', q: 'What is your notice period, and when can you join?' };
const scr = { s: 'practice', cat: 'hrq', lv: 'senior', i: 0, one: hrqList('senior').indexOf('What kind of culture do you build in your team?') };
const hist = [
  { ts: 2, ck: 'hrq', lk: 'junior', c: 'HR Questions · Junior', s: 6, a: 5, t: 19, d: '10/20/2026', n: N },
  { ts: 1, ck: 'cloud', lk: 'fresher', c: 'Cloud / DevOps · Fresher', s: 7, a: 5, t: 10, d: '10/19/2026', n: N }
];
const pf = { cat: 'hrq', lvl: 'junior', shuf: false, rd: true };
const OLD = {
  [VERSION_KEY]: 2,
  is_edits: edits,
  is_qedits: qedits,
  is_pbest: pbest,
  is_hidden: hidden,
  is_fav: fav,
  is_custom: custom,
  is_qotd: qotd,
  is_scr: scr,
  is_hist: hist,
  is_pf: pf,
  is_profiles: { [N]: { name: N, setup: 1, role: 'HR', roleKey: 'HR' } }
};

const store = new Map(Object.entries(clone(OLD)));
const get = k => (store.has(k) ? clone(store.get(k)) : null);
const set = (k, v) => store.set(k, clone(v));
check('runs on a version 2 phone, marker now 3', runMigration(get, set) && store.get(VERSION_KEY) === 3 && DATA_VERSION === 3);

// ---- Keyed stores: nothing lost, every moved entry on the same question (or the same meaning)
const textAt = key => {
  const [, c0, i] = key.split('|');
  const [c, l = 'fresher'] = c0.split('@');
  return c === 'hrq' ? hrqList(l)[i] : rawList(c, l)[i];
};
for (const [key, name] of [
  ['is_edits', 'answers'],
  ['is_qedits', 'question edits'],
  ['is_pbest', 'best scores']
]) {
  const before = OLD[key];
  const after = store.get(key);
  check(
    `${name}: every value kept (${Object.keys(before).length})`,
    JSON.stringify(Object.values(after).sort()) === JSON.stringify(Object.values(before).sort())
  );
  let bad = '';
  let moved = 0;
  let kept = 0;
  for (const [k, v] of Object.entries(after)) {
    const old = Object.keys(before).find(x => before[x] === v);
    if (/\|u\d+$/.test(k)) continue;
    if (k === old) {
      if (k.includes('|hrq')) kept++;
      continue;
    }
    moved++;
    if (!k.includes('|fresh') || textAt(k) !== want(textAt(old))) bad ||= `${old} -> ${k}`;
  }
  check(`${name}: ${moved} moved to Fresh Graduate, each on the same question or its same-meaning twin`, moved > 40 && !bad, bad);
  check(`${name}: ${kept} kept under the old key because the place was taken (not lost)`, kept < 10);
}
const E = store.get('is_edits');
check('existing Fresh Graduate answer never overwritten', E[`${N}|fresh|0`] === 'fresh answer 0' && E[`${N}|hrq|0`] === 'hrq answer fresher 0');
check('answer to an own HR question moved with it', E[`${N}|fresh|u1700000000001`] === 'answer to my own HR question');
{
  const i = rawList('fresh', 'junior').indexOf('What is your notice period, and when can you join?');
  const old = hrqList('junior').indexOf('What is your notice period, and when can you join?');
  check('appended question: notice period answer now at Fresh Graduate Junior', E[`${N}|fresh@junior|${i}`] === `hrq answer junior ${old}`);
  const r = rawList('fresh', 'fresher').indexOf('Are you willing to relocate or travel for this job?');
  check('a question added to one level only: Junior relocation answer moves to that level', Object.values(E).includes('hrq answer junior 5') && r > 0);
  const s = rawList('fresh', 'fresher').indexOf('How do you handle stress or pressure?');
  check(
    'same meaning: "stress and pressure at work" answer now on "How do you handle stress or pressure?"',
    E[`${N}|fresh|${s}`] === `hrq answer fresher ${4 + 4}`
  );
}

// ---- Hidden, own questions, favourites, Question of the day, open screen, history, form values
const H = store.get('is_hidden');
const hiddenOld = Object.entries(hidden)
  .flatMap(([k, a]) => a.map(i => want(hrqList(k.split('@')[1] || 'fresher')[i])))
  .sort();
const hiddenNew = Object.entries(H)
  .flatMap(([k, a]) => a.map(i => textAt(`x|${k}|${i}`)))
  .sort();
check('hidden: the same questions are hidden', JSON.stringify([...new Set(hiddenNew)]) === JSON.stringify([...new Set(hiddenOld)]));
check('hidden: no hrq list left', !Object.keys(H).some(k => k.startsWith('hrq')));
const C = store.get('is_custom');
check('own questions moved to Fresh Graduate, nothing lost', C.fresh.length === 2 && C.fresh.some(x => x.q === 'My own HR question') && !C.hrq);
const F = store.get('is_fav');
check(
  'favourites: all on Fresh Graduate, key matches, same questions',
  F.every(f => f.c === 'fresh' && f.k === `${N}|fresh|${f.l}|${f.i}`) &&
    JSON.stringify([...new Set(F.map(f => rawList('fresh', f.l)[f.i]))].sort()) === JSON.stringify([...new Set(fav.map(f => want(hrqList(f.l)[f.i])))].sort())
);
const Q = store.get('is_qotd');
check('Question of the day follows its question', Q.c === 'fresh' && Q.lv === 'junior' && Q.q === qotd.q);
const S = store.get('is_scr');
check('open Practice question follows it', S.cat === 'fresh' && rawList('fresh', S.lv)[S.one] === 'What kind of culture do you build in your team?');
const HI = store.get('is_hist');
check(
  'Mock history: hrq entry now Fresh Graduate, others unchanged',
  HI[0].ck === 'fresh' && HI[0].s === 6 && JSON.stringify(HI[1]) === JSON.stringify(hist[1])
);
check('saved form value now Fresh Graduate', store.get('is_pf').cat === 'fresh' && store.get('is_pf').lvl === 'junior');
check('profile unchanged', JSON.stringify(store.get('is_profiles')) === JSON.stringify(OLD.is_profiles));
check('alias: an old saved session with hrq opens Fresh Graduate', catId('hrq') === 'fresh' && CATS.fresh && !CATS.hrq);
check(
  'every hrq question has a place in Fresh Graduate',
  LV.every(l => hrqList(l).every((_, i) => mapHrq(l, i)))
);

// ---- Safe to run again, errors write nothing, version 1 phones run both moves
const snap = JSON.stringify([...store]);
check('second run does nothing', runMigration(get, set) === false && JSON.stringify([...store]) === snap);
const wrote = [];
const r = runMigration(
  k => {
    if (k === 'is_hist') throw new Error('broken storage');
    return clone(OLD)[k] ?? null;
  },
  k => wrote.push(k)
);
check('an error writes nothing (old data kept, marker not set)', r === false && wrote.length === 0);
{
  const v1 = new Map(Object.entries(clone({ ...OLD, [VERSION_KEY]: null })));
  runMigration(
    k => (v1.has(k) ? clone(v1.get(k)) : null),
    (k, v) => v1.set(k, clone(v))
  );
  check('a version 1 phone gets the same result', v1.get(VERSION_KEY) === 3 && JSON.stringify(v1.get('is_edits')) === JSON.stringify(store.get('is_edits')));
}
check('no hrq data: nothing written', Object.keys(migrateV3(k => ({ is_edits: { [`${N}|fresh|1`]: 'x' } })[k] ?? null).writes).length === 0);

console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`${out.length - fails}/${out.length} passed`);
if (fails) process.exit(1);
