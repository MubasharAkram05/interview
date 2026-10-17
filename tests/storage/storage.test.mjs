// Unit tests for src/services/storage.js (localforage mocked, localStorage faked). npm run test:storage
const ls = new Map();
let lsFull = false;
globalThis.localStorage = {
  getItem: k => (ls.has(k) ? ls.get(k) : null),
  setItem: (k, v) => {
    if (lsFull) throw new Error('QuotaExceededError');
    ls.set(k, String(v));
  },
  removeItem: k => ls.delete(k)
};
const { db } = await import('./mocks.mjs');
const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
let n = 0;
const fresh = () => import(`../../src/services/storage.js?s=${++n}`);

// 1. Corrupt JSON never crashes and never comes back as a raw string.
ls.set('is_hist', 'oops{');
ls.set('is_fav', '"x"');
let s = await fresh();
await s.initStorage();
check('S1 corrupt JSON list -> default []', Array.isArray(s.getItem('is_hist', [])) && s.getItem('is_hist', []).length === 0);
check('S2 wrong type (string where a list is expected) -> default', Array.isArray(s.getItem('is_fav', [])) && s.getItem('is_fav', []).length === 0);
check('S3 corrupt key removed from localStorage', !ls.has('is_hist'));

// 2. localStorage is the newest copy: an older IndexedDB value never rolls data back.
ls.clear();
db.clear();
db.set('is_hist', [{ s: 1 }]);
ls.set('is_hist', JSON.stringify([{ s: 1 }, { s: 2 }]));
s = await fresh();
await s.initStorage();
check('S4 newest (localStorage) copy wins over an older IndexedDB copy', s.getItem('is_hist', []).length === 2);
check('S5 IndexedDB brought up to date', db.get('is_hist').length === 2);

// 3. A deleted key stays deleted even if the IndexedDB delete did not land.
s.removeItem('is_hist');
db.set('is_hist', [{ s: 1 }]); // simulate the background delete never happening
s = await fresh();
await s.initStorage();
check('S6 cleared history does not come back after restart', s.getItem('is_hist', []).length === 0 && !db.has('is_hist'));

// 4. localStorage cleared (or full): IndexedDB copy is used.
ls.clear();
db.clear();
db.set('is_profiles', { A: { name: 'A' } });
s = await fresh();
await s.initStorage();
check('S7 IndexedDB used when localStorage is empty', s.getItem('is_profiles', {}).A.name === 'A');

// 5. Quota full: the stale localStorage copy is dropped so the newer IndexedDB copy wins.
ls.set('is_fav', JSON.stringify(['old']));
s = await fresh();
await s.initStorage();
lsFull = true;
s.setItem('is_fav', ['new']);
await new Promise(r => setTimeout(r, 0));
lsFull = false;
check('S8 quota error drops the stale localStorage copy', !ls.has('is_fav'));
s = await fresh();
await s.initStorage();
check('S9 next start reads the newer value', s.getItem('is_fav', [])[0] === 'new');

// 6. Shapes.
check('S10 object default with a list stored -> default', JSON.stringify((s.setItem('is_pbest', [1]), s.getItem('is_pbest', {}))) === '{}');
check('S11 missing key -> default', s.getItem('is_nothing', 'x') === 'x');

console.info(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
