// Browser regression checks for bugs fixed in the production audit.
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/regress-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const URL = process.env.UI_URL || 'http://localhost:4173/';
const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
const b = await chromium.launch();
const me = name => ({
  name,
  role: 'Software Engineer',
  roleKey: 'Software Engineer',
  edu: 'BS IT',
  degree: 'BS IT',
  city: 'Lahore',
  exp: 'fresher',
  skillTags: ['JavaScript'],
  skills: 'JavaScript',
  words: [name],
  setup: 1
});

async function page(seed) {
  const p = await b.newPage({ viewport: { width: 360, height: 640 } });
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  await p.goto(URL);
  await p.evaluate(() => localStorage.clear());
  await p.evaluate(
    () =>
      new Promise(r => {
        const q = indexedDB.deleteDatabase('InterviewSimulator');
        q.onsuccess = q.onerror = q.onblocked = () => r();
      })
  );
  await p.evaluate(seed);
  await p.reload();
  return { p, errors };
}

// 1. Corrupt saved data: the welcome screen still offers Get Started (was stuck on the spinner).
{
  const { p, errors } = await page(() => {
    localStorage.setItem('is_hist', 'oops{');
    localStorage.setItem('is_fav', '"x"');
    localStorage.setItem('is_qstreak', '[1,2]');
  });
  const ok = await p.waitForSelector('#iGo:not(.hidden)', { timeout: 6000 }).then(
    () => true,
    () => false
  );
  check('R1 corrupt storage: Get Started still appears', ok);
  await p.click('#iGo').catch(() => {});
  await p.waitForTimeout(600);
  check('R2 corrupt storage: Home opens, no page error', (await p.isVisible('#home')) && errors.length === 0);
  await p.close();
}

// 2. A real user named like the old demo profile keeps their profile.
{
  const { p } = await page(
    `localStorage.setItem('is_profiles', ${JSON.stringify(JSON.stringify({ 'Ali Khan': me('Ali Khan') }))}); localStorage.setItem('is_active', '"Ali Khan"');`
  );
  await p.waitForTimeout(800);
  const kept = await p.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('is_profiles') || '{}')));
  check('R3 real user "Ali Khan" (saved through setup) is kept', kept.includes('Ali Khan'));
  await p.close();
}
// 2b. ...but the old built-in sample (no setup flag) is still removed.
{
  const { p } = await page(() => {
    localStorage.setItem('is_profiles', JSON.stringify({ 'Alex Khan': { name: 'Alex Khan' } }));
    localStorage.setItem('is_active', JSON.stringify('Alex Khan'));
  });
  await p.waitForTimeout(800);
  const kept = await p.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('is_profiles') || '{}')));
  check('R4 old sample profile (never set up) is removed', !kept.includes('Alex Khan'));
  await p.close();
}

// 3. Restoring an old saved Mock session without answers/idx does not break the screen.
{
  const { p, errors } = await page(() => {
    const n = {
      name: 'Test User',
      role: 'Software Engineer',
      roleKey: 'Software Engineer',
      edu: 'BS IT',
      city: 'Lahore',
      exp: 'fresher',
      skillTags: [],
      skills: '',
      words: [],
      setup: 1
    };
    localStorage.setItem('is_profiles', JSON.stringify({ 'Test User': n }));
    localStorage.setItem('is_active', JSON.stringify('Test User'));
    localStorage.setItem(
      'is_scr',
      JSON.stringify({ s: 'interview', cat: 'fresh', lv: 'fresher', cur: [{ q: 'Tell me about yourself.', a: 'I am a graduate.' }] })
    );
  });
  await p.waitForTimeout(1000);
  check(
    'R5 old saved Mock session (no answers/idx) restores without errors',
    errors.length === 0 && (await p.evaluate(() => document.getElementById('qText')?.textContent.length > 0))
  );
  await p.close();
}

// 4. Names with an apostrophe or hyphen are accepted.
{
  const { nameError } = await import('../../src/services/setup.js');
  check("R6 name check: D'Souza and Abdul-Rahman accepted", nameError("Maria D'Souza") === '' && nameError('Abdul-Rahman Ali') === '');
}

await b.close();
console.info(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
