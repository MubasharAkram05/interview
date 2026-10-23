// Play Store phone screenshots from the release web build, 1080x1920 (360x640 at 3x), with a
// fictional profile ("Sara Ahmed"), never real personal data:
//   store-assets/screenshots/1-home.png ... 6-profile.png
// Run: npm run build && npx vite preview --port 4173 &   then  npm run store:screens
// The mic button and voice are native (Android only), so the browser hides them. On the Mock
// screen the script shows the mic button as it looks on a phone and types the answer instead.
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
import fs from 'node:fs';

const URL = process.env.UI_URL || 'http://localhost:4173/';
const OUT = 'store-assets/screenshots';

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.png')) fs.rmSync(`${OUT}/${f}`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 360, height: 640 }, deviceScaleFactor: 3 });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.goto(URL);
await p.evaluate(() => {
  localStorage.clear();
  const day = n => Date.now() - n * 864e5;
  const d = n => new Date(day(n)).toLocaleDateString('en-US');
  localStorage.setItem(
    'is_hist',
    JSON.stringify([
      { c: 'Software Developer', d: d(1), s: 8, ts: day(1) },
      { c: 'HR / General', d: d(3), s: 7, ts: day(3) },
      { c: 'Software Developer', d: d(5), s: 6, ts: day(5) }
    ])
  );
  const me = {
    name: 'Sara Ahmed',
    role: 'Software Engineer',
    roleKey: 'Software Engineer',
    edu: 'BS Computer Science',
    degree: 'BS Computer Science',
    city: 'Lahore',
    exp: 'fresher',
    skillTags: ['JavaScript', 'React', 'SQL'],
    skills: 'JavaScript, React, SQL',
    words: ['Sara', 'Ahmed', 'Lahore'],
    setup: 1
  };
  localStorage.setItem('is_profiles', JSON.stringify({ 'Sara Ahmed': me }));
  localStorage.setItem('is_active', JSON.stringify('Sara Ahmed'));
});
await p.addInitScript(() => {
  window.__skipIntro = true;
});
await p.reload();
await p.waitForTimeout(1500);
if (await p.isVisible('#iGo')) {
  await p.click('#iGo');
  await p.waitForTimeout(800);
}
// Toasts (for example "No English voice" in the browser) never belong in a store screenshot.
await p.addStyleTag({ content: '#toast{display:none!important}' });

// Says the saved answer of the current Mock question by typing it (typed words are checked like
// spoken ones). The first words come from the Hint button; once something is said, the box shows
// the whole saved answer, said words dark and the rest grey. maxWords leaves an answer in progress.
const typeInBox = async text => {
  await p.click('#ansBox');
  await p.keyboard.press('Control+A');
  await p.keyboard.type(text);
  await p.click('#qText'); // leave the box
};
const answerMock = async (maxWords = Infinity) => {
  await p.click('#mHint');
  const hint = (await p.textContent('#mHintT')) || '';
  if (!hint.startsWith('Next: ')) return;
  await typeInBox(hint.slice(6));
  const words = (await p.innerText('#ansBox')).trim().split(/\s+/);
  await typeInBox(words.slice(0, maxWords).join(' '));
  await p.evaluate(() => document.getElementById('mHintT').classList.add('hidden'));
};

const shot = async (name, wait = 800) => {
  await p.waitForTimeout(wait);
  await p.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`Wrote ${OUT}/${name}.png`);
};

await shot('1-home');

await p.evaluate(() => window.startPractice());
await p.waitForTimeout(500);
await p.click('#pPath .pt[data-c="software"]');
// The question and sample answer type in letter by letter (.c gets .in when shown).
await p.waitForFunction(
  () => {
    const L = document.querySelectorAll('#pQt .c, #pA .c');
    return L.length > 40 && [...L].every(c => c.classList.contains('in'));
  },
  null,
  { timeout: 30000 }
);
await shot('2-practice');

await p.evaluate(() => window.startMock());
await shot('3-mock-setup');

await p.click('#mGrid .cp[data-p="software"]'); // open the Software Development group
await p.waitForTimeout(300);
await p.click('#mGrid [data-c="software"]');
await p.waitForTimeout(1200);
const showPhoneMic = () =>
  p.evaluate(() => {
    document.getElementById('mic').classList.remove('hidden');
    document.getElementById('micSt').textContent = '';
  });
await answerMock(24); // an answer in progress: said words dark, the rest still grey
await showPhoneMic();
await shot('4-mock-interview');

// Finish this answer and the other nine, then the results screen.
await answerMock();
for (let i = 1; i < 10; i++) {
  await p.evaluate(() => window.step(1));
  await p.waitForTimeout(400);
  await answerMock();
}
await p.evaluate(() => window.step(1));
await p.waitForSelector('#feedback:not(.hidden)', { timeout: 5000 });
await shot('5-results', 3500); // after the score animation, while the confetti falls

await p.evaluate(() => window.showProfile());
await shot('6-profile');

await b.close();
if (errors.length) {
  console.error('Page errors:', errors);
  process.exit(1);
}
