// Browser check of the data version 2 move (src/services/migrate.js) on a phone that has version 1
// data: the answer of a question that moved to a new type shows there, the 28 tiles are listed.
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/migrate-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const URL = process.env.UI_URL || 'http://localhost:4173/';
const out = [];
const check = (name, ok, got) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || got === undefined ? '' : `\n      got: ${got}`}`);
const wait = ms => new Promise(r => setTimeout(r, ms));

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 360, height: 640 } });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.goto(URL);
await wait(1500); // let the first start finish (on an empty phone it writes the version marker)
await p.evaluate(
  () =>
    new Promise(r => {
      localStorage.clear();
      const q = indexedDB.deleteDatabase('InterviewSimulator');
      q.onsuccess = q.onerror = q.onblocked = () => r();
    })
);
// Version 1 data: Cloud Junior question 8 was "How would you secure an S3 bucket?" (4 opening
// questions + field question 4); Fresh Graduate Junior question 12 was the conflict question.
await p.evaluate(() => {
  const me = {
    name: 'Sara Ahmed',
    role: 'Cloud/DevOps',
    roleKey: 'Cloud/DevOps',
    edu: 'BSCS',
    city: 'Lahore',
    exp: 'fresher',
    skillTags: ['AWS'],
    skills: 'AWS',
    words: [],
    setup: 1
  };
  localStorage.setItem('is_profiles', JSON.stringify({ 'Sara Ahmed': me }));
  localStorage.setItem('is_active', JSON.stringify('Sara Ahmed'));
  localStorage.setItem('is_shuf', 'false');
  localStorage.setItem('is_dv', 'null'); // version 1 phones have no marker ("null" = deleted, wins over IndexedDB)
  localStorage.setItem(
    'is_edits',
    JSON.stringify({
      'Sara Ahmed|cloud@junior|8': 'My saved S3 answer that must follow the question.',
      'Sara Ahmed|cloud@junior|9': 'My saved CI/CD answer.',
      'Sara Ahmed|fresh@junior|12': 'My saved conflict answer.'
    })
  );
  localStorage.setItem('is_fav', JSON.stringify([{ k: 'Sara Ahmed|cloud|junior|8', n: 'Sara Ahmed', c: 'cloud', l: 'junior', i: 8 }]));
});
await p.addInitScript(() => {
  window.__skipIntro = true;
});
await p.reload();
await wait(1500);

const st = await p.evaluate(() => ({
  dv: localStorage.getItem('is_dv'),
  e: JSON.parse(localStorage.getItem('is_edits')),
  f: JSON.parse(localStorage.getItem('is_fav'))
}));
check('version marker written', st.dv === '2');
check('S3 answer moved to Cyber Security', st.e['Sara Ahmed|cyber@junior|9'] === 'My saved S3 answer that must follow the question.', JSON.stringify(st.e));
check('CI/CD answer moved up one place in Cloud', st.e['Sara Ahmed|cloud@junior|8'] === 'My saved CI/CD answer.');
check('conflict answer moved to HR Round', st.e['Sara Ahmed|hround@junior|4'] === 'My saved conflict answer.');
check('favourite follows the question', st.f[0].c === 'cyber' && st.f[0].i === 9);

// Practice shows the saved answer on the moved question
await p.evaluate(() => window.pcGo('cyber', 9, 'junior'));
await wait(400);
if (await p.isVisible('#psheet')) {
  await p.click('#psSkip');
  await wait(400);
}
check('Practice: the question is the S3 question', /S3 bucket/.test(await p.textContent('#pQ')), await p.textContent('#pQ'));
await p.waitForFunction(() => [...document.querySelectorAll('#pA .c')].every(c => c.classList.contains('in')), null, { timeout: 30000 }).catch(() => {});
check('Practice: the saved answer shows', /My saved S3 answer/.test(await p.textContent('#pA')));

// 28 tiles in Mock and Practice, new ones next to related ones
await p.evaluate(() => window.home());
await wait(300);
await p.evaluate(() => window.startMock && window.startMock());
await wait(500);
const tiles = await p.$$eval('#mGrid .mt', x => x.map(e => e.dataset.c));
check(`Mock: 28 tiles (${tiles.length})`, tiles.length === 28);
check('Mock: Web and IT Support after Software Developer', tiles.slice(0, 3).join() === 'software,web,it');

// A second start does not move anything again
await p.reload();
await wait(1500);
const again = await p.evaluate(() => JSON.parse(localStorage.getItem('is_edits')));
check('restart: data unchanged', JSON.stringify(again) === JSON.stringify(st.e));

check('no page errors', errors.length === 0, errors.join(' | '));
await b.close();
console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`${out.length - fails}/${out.length} passed`);
if (fails) process.exit(1);
