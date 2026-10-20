// Data version 2 (src/services/migrate.js): saved per-question data follows its question when
// interview types were split. A fixture of version 1 storage covers every per-question store.
// Run: npm run test:storage
import { migrateV2, runMigration, rawList, mapQuestion, RENAMED, DATA_VERSION, VERSION_KEY } from '../../src/services/migrate.js';
import { CATS, MYEX, LVEX } from '../../src/data/questions.js';

const out = [];
const check = (name, ok, got) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || got === undefined ? '' : `\n      got: ${got}`}`);
const clone = v => JSON.parse(JSON.stringify(v));

// Version 1 field questions of the two lists that changed (as shipped before the split).
const V1 = {
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
const LV = ['fresher', 'junior', 'senior'];
const ck = (c, l) => (l === 'fresher' ? c : `${c}@${l}`);
const oldText = (c, l, i) => (V1[c] ? rawList(c, l, V1[c]) : rawList(c, l))[i];
const newText = (c, l, i) => rawList(c, l)[i];
const want = t => RENAMED[t] || t;

// ---- Fixture: every index of every level of the changed types, plus untouched ones
const N = 'Sara Ahmed';
const edits = {};
const qedits = {};
const pbest = {};
const hidden = {};
const fav = [];
let score = 0;
for (const c of ['cloud', 'fresh', 'software', 'marketing'])
  for (const l of LV) {
    const n = (V1[c] ? rawList(c, l, V1[c]) : rawList(c, l)).length;
    for (let i = 0; i < n; i++) {
      edits[`${N}|${ck(c, l)}|${i}`] = `answer ${c} ${l} ${i}`;
      qedits[`${N}|${ck(c, l)}|${i}`] = `my wording ${c} ${l} ${i}`;
      pbest[`${N}|${ck(c, l)}|${i}`] = ++score; // unique, so each value can be traced
      fav.push({ k: `${N}|${c}|${l}|${i}`, n: N, c, l, i });
    }
    hidden[ck(c, l)] = [...Array(n).keys()].filter(i => i % 3 === 0 || (V1[c] || [])[i - 4] === 'How would you secure an S3 bucket?');
  }
edits[`${N}|cloud|u1700000000000`] = 'answer to my own question';
const custom = { cloud: [{ i: 'u1700000000000', q: 'My own cloud question', a: 'My answer' }] };
const hist = [{ ts: 1, ck: 'cloud', lk: 'junior', c: 'Cloud / DevOps / Security · Junior', s: 7, a: 5, t: 10, d: '1/1/2026', n: N }];
const s3Fresher = rawList('cloud', 'fresher', V1.cloud).indexOf('How would you secure an S3 bucket?');
const qotd = { d: '2026-10-20', c: 'cloud', lv: 'fresher', q: 'How would you secure an S3 bucket?' };
const scr = { s: 'practice', cat: 'cloud', lv: 'fresher', i: 0, one: s3Fresher };
const OLD = {
  is_edits: edits,
  is_qedits: qedits,
  is_pbest: pbest,
  is_hidden: hidden,
  is_fav: fav,
  is_custom: custom,
  is_hist: hist,
  is_qotd: qotd,
  is_scr: scr,
  is_profiles: { [N]: { name: N, setup: 1 } }
};

const store = new Map(Object.entries(clone(OLD)));
const get = k => (store.has(k) ? clone(store.get(k)) : null);
const set = (k, v) => store.set(k, clone(v));
const ran = runMigration(get, set);
check('migration runs on version 1 data', ran && store.get(VERSION_KEY) === DATA_VERSION);

// ---- Every keyed entry still exists and sits on the same question text
for (const [key, name] of [
  ['is_edits', 'answers'],
  ['is_qedits', 'question edits'],
  ['is_pbest', 'best scores']
]) {
  const before = OLD[key];
  const after = store.get(key);
  check(`${name}: nothing lost (${Object.keys(before).length} entries)`, Object.keys(after).length === Object.keys(before).length);
  check(`${name}: every value kept`, JSON.stringify(Object.values(after).sort()) === JSON.stringify(Object.values(before).sort()));
  let bad = '';
  for (const [k, v] of Object.entries(after)) {
    const [, c0, i] = k.split('|');
    if (String(i).startsWith('u')) continue;
    const [c, l = 'fresher'] = c0.split('@');
    const [, oc0, oi] = Object.keys(before)
      .find(x => before[x] === v)
      .split('|');
    const [oc, ol = 'fresher'] = oc0.split('@');
    if (l !== ol || newText(c, l, +i) !== want(oldText(oc, ol, +oi))) bad ||= `${k} (was ${oc0}|${oi})`;
  }
  check(`${name}: every entry is on the same question as before`, !bad, bad);
}

// ---- The moved question, and Fresh Graduate (unchanged places)
const E2 = store.get('is_edits');
for (const l of LV) {
  const s3 = rawList('cloud', l, V1.cloud).indexOf('How would you secure an S3 bucket?');
  const s3New = rawList('cyber', l).indexOf('How would you secure an S3 bucket?');
  check(`${l}: S3 bucket answer moved from Cloud to Cyber Security`, E2[`${N}|${ck('cyber', l)}|${s3New}`] === `answer cloud ${l} ${s3}`);
  // Fresh Graduate only got questions at the end: the shipped list is the start of the new one.
  const added = ((l === 'fresher' ? MYEX.fresh : LVEX[l].fresh) || []).length;
  const v1 = rawList('fresh', l, V1.fresh)
    .slice(0, rawList('fresh', l).length - added)
    .map(want);
  check(`${l}: Fresh Graduate shipped list is the start of the new list`, rawList('fresh', l).slice(0, v1.length).join('|') === v1.join('|'));
  check(`${l}: Fresh Graduate has new questions at the end`, added > 0 && rawList('fresh', l).length === v1.length + added);
}
check(
  'Fresh Graduate: every saved entry stays exactly where it was',
  Object.keys(edits)
    .filter(k => /\|fresh(@|\|)/.test(k))
    .every(k => E2[k] === edits[k])
);
check(
  'Fresh Graduate: no index mapping',
  [0, 8, 12, 20].every(i => LV.every(l => mapQuestion('fresh', l, i) === null))
);
check(
  'renamed question keeps its answer',
  newText('fresh', 'junior', 4 + 5) === RENAMED['Do you have any questions for us?'] && E2[`${N}|fresh@junior|9`] === 'answer fresh junior 9'
);
check(
  'unchanged types untouched',
  Object.keys(edits)
    .filter(k => /\|(software|marketing)/.test(k))
    .every(k => E2[k] === edits[k])
);
check("own added question's answer untouched", E2[`${N}|cloud|u1700000000000`] === 'answer to my own question');

// ---- Hidden, favourites, Question of the day, open screen, untouched stores
const H2 = store.get('is_hidden');
const hiddenTexts = h =>
  Object.entries(h)
    .flatMap(([k, a]) => a.map(i => `${k.split('@')[1] || 'fresher'}|${want(newText(k.split('@')[0], k.split('@')[1] || 'fresher', i))}`))
    .sort();
const hiddenOld = Object.entries(hidden)
  .flatMap(([k, a]) => a.map(i => `${k.split('@')[1] || 'fresher'}|${want(oldText(k.split('@')[0], k.split('@')[1] || 'fresher', i))}`))
  .sort();
check('hidden questions: same questions hidden', JSON.stringify(hiddenTexts(H2)) === JSON.stringify(hiddenOld));
check('hidden: S3 bucket now hidden in Cyber Security', (H2.cyber || []).includes(rawList('cyber', 'fresher').indexOf('How would you secure an S3 bucket?')));
const F2 = store.get('is_fav');
check('favourites: nothing lost', F2.length === fav.length);
check(
  'favourites: same questions, key matches the entry',
  F2.every((f, j) => newText(f.c, f.l, f.i) === want(oldText(fav[j].c, fav[j].l, fav[j].i)) && f.k === `${N}|${f.c}|${f.l}|${f.i}`)
);
check('Question of the day follows the moved question', store.get('is_qotd').c === 'cyber' && store.get('is_qotd').q === qotd.q);
const S2 = store.get('is_scr');
check('open Practice question follows it', S2.cat === 'cyber' && newText('cyber', 'fresher', S2.one) === 'How would you secure an S3 bucket?');
check(
  'own added questions and Mock history unchanged',
  JSON.stringify(store.get('is_custom')) === JSON.stringify(custom) && JSON.stringify(store.get('is_hist')) === JSON.stringify(hist)
);
check(
  'Mock history type ids all still exist',
  hist.every(h => CATS[h.ck])
);
check('profiles unchanged', JSON.stringify(store.get('is_profiles')) === JSON.stringify(OLD.is_profiles));

// ---- Safe to run again; failure writes nothing
const snap = JSON.stringify([...store]);
check('second run does nothing', runMigration(get, set) === false && JSON.stringify([...store]) === snap);
const bad = new Map(Object.entries(clone(OLD)));
const wrote = [];
const r = runMigration(
  k => {
    if (k === 'is_fav') throw new Error('broken storage');
    return bad.get(k) ?? null;
  },
  k => wrote.push(k)
);
check('an error writes nothing (old data kept, marker not set)', r === false && wrote.length === 0);
check('new install (no data): only the marker', JSON.stringify(Object.keys(migrateV2(() => null).writes)) === '[]');
const taken = clone(OLD);
taken.is_edits[`${N}|cyber|${rawList('cyber', 'fresher').indexOf('How would you secure an S3 bucket?')}`] = 'already here';
check('every moved entry is reported', migrateV2(k => OLD[k] ?? null).report.length > 0);
check('a place already taken: that store is left as it was', migrateV2(k => taken[k] ?? null).writes.is_edits === undefined);
check(
  'unknown index or own question id: not moved',
  mapQuestion('cloud', 'fresher', 999) === null && mapQuestion('cloud', 'fresher', 'u123') === null && mapQuestion('nope', 'fresher', 1) === null
);

console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`${out.length - fails}/${out.length} passed`);
if (fails) process.exit(1);
