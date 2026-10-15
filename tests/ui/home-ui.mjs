// Browser check for the home screen, header, theme switch and mock interview spacing.
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/home-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 740 } });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.goto('http://localhost:4173/');
await p.evaluate(() => localStorage.setItem('is_hist', JSON.stringify([{ c: 'Software Developer', d: '10/14/2026', s: 7, ts: Date.now() - 864e5 }])));
await p.reload();
await p.waitForTimeout(900);

const homeText = await p.textContent('#home');
check('home has no "Last session" card (history exists)', !/Last session/i.test(homeText) && (await p.locator('#retryLastBtn').count()) === 0);
check('header has no theme button', (await p.locator('header.bar [data-i="moon"], header.bar [onclick*="Theme"]').count()) === 0);
check('header shows logo on home', await p.isVisible('#hLogo'));

const q1 = await p.textContent('.qotdq');
await p.click('#hSeg button:nth-child(3)');
await p.waitForTimeout(200);
await p.evaluate(() => window.showProfile());
await p.waitForTimeout(300);
await p.evaluate(() => window.home());
await p.waitForTimeout(500);
check('question of the day stays the same after level change', (await p.textContent('.qotdq')) === q1);
await p.reload();
await p.waitForTimeout(800);
check('question of the day stays the same after restart', (await p.textContent('.qotdq')) === q1);
const saved = await p.evaluate(() => JSON.parse(localStorage.getItem('is_qotd')));
const t = new Date();
const today = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
check('pick is saved for today', saved?.d === today && saved.q === q1);
await p.evaluate(() => localStorage.setItem('is_qotd', JSON.stringify({ ...JSON.parse(localStorage.getItem('is_qotd')), d: '2000-01-01' })));
await p.reload();
await p.waitForTimeout(800);
const q2 = await p.textContent('.qotdq');
check('a new day gives a different question', q2 !== q1);

await p.click('#qotdBtn');
await p.waitForTimeout(600);
check('Practice it opens that question', (await p.textContent('#pQt')).trim() === q2.trim());

await p.evaluate(() => window.showProfile());
await p.waitForTimeout(400);
check('Profile has visible Dark mode switch', await p.isVisible('#pThemeBox'));
const before = await p.evaluate(() => document.documentElement.dataset.theme);
await p.click('#pThemeBox label');
await p.waitForTimeout(200);
const after = await p.evaluate(() => document.documentElement.dataset.theme);
check('switch changes theme', before !== after && (await p.isChecked('#darkSw')) === (after === 'dark'));
await p.reload();
await p.waitForTimeout(700);
check('theme is remembered', (await p.evaluate(() => document.documentElement.dataset.theme)) === after);
check('header back button hides logo', await p.evaluate(() => { window.showProfile(); return true; }) && !(await p.isVisible('#hLogo')));

await p.evaluate(() => window.startMock());
await p.waitForTimeout(400);
await p.evaluate(() => window.startInterview());
await p.waitForTimeout(1500);
if (await p.isVisible('#dlg')) { await p.click('#dYes'); await p.waitForTimeout(1200); }
const gap = await p.evaluate(() => {
  const q = document.querySelector('#interview .qbody').getBoundingClientRect();
  const t = document.getElementById('qText').getBoundingClientRect();
  const a = document.getElementById('ansBox').getBoundingClientRect();
  return { emptyBelowText: q.bottom - t.bottom, gapToBox: a.top - q.bottom };
});
check(`mock: no empty space between question and answer box (${Math.round(gap.emptyBelowText)}px + ${Math.round(gap.gapToBox)}px)`, gap.emptyBelowText <= 2 && gap.gapToBox <= 12);
check('no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
check('no page errors', errors.length === 0);
await b.close();
console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
