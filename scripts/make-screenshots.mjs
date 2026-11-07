// Play Store phone screenshots from the release web build, at a real phone's width: 393 CSS px
// at 1080/393 = 2.748x, so every PNG is 1080 px wide, with a fictional profile ("Alex",
// Software Engineer), never real personal data. Two sets, app UI only (no status bar):
//   store-assets/screenshots/1-home.png ... 6-profile.png         1080x1920 (9:16)
//   store-assets/screenshots-tall/1-home.png ... 6-profile.png    1080x2160 (2:1, the Play maximum)
// Run: npm run build && npx vite preview --port 4173 &   then  npm run store:screens
// The mic button and voice are native (Android only), so the browser hides them. On the Mock
// screen the script shows the mic button as it looks on a phone and types the answer instead.
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import zlib from 'node:zlib';

/**
 * Keep only the top `rows` pixel rows of an 8-bit RGB, non-interlaced PNG (what the browser
 * writes). Each PNG row filter only uses the row above it, so dropping rows at the bottom needs
 * no re-filtering: inflate, cut, deflate, new height in IHDR. The image stays RGB (no alpha).
 */
function cropPngHeight(png, rows) {
  const chunks = [];
  for (let o = 8; o < png.length;) {
    const len = png.readUInt32BE(o);
    chunks.push({ type: png.toString('latin1', o + 4, o + 8), data: png.subarray(o + 8, o + 8 + len) });
    o += 12 + len;
  }
  const ihdr = Buffer.from(chunks[0].data);
  const width = ihdr.readUInt32BE(0);
  const height = ihdr.readUInt32BE(4);
  if (ihdr[8] !== 8 || ihdr[9] !== 2 || ihdr[12] !== 0) throw new Error('expected an 8-bit RGB PNG');
  if (height === rows) return png;
  if (height < rows) throw new Error(`screenshot is ${height} px tall, needs ${rows}`);
  const raw = zlib.inflateSync(Buffer.concat(chunks.filter(c => c.type === 'IDAT').map(c => c.data)));
  ihdr.writeUInt32BE(rows, 4);
  const chunk = (type, data) => {
    const head = Buffer.alloc(8);
    head.writeUInt32BE(data.length, 0);
    head.write(type, 4, 'latin1');
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(zlib.crc32(Buffer.concat([Buffer.from(type, 'latin1'), data])) >>> 0, 0);
    return Buffer.concat([head, data, crc]);
  };
  return Buffer.concat([
    png.subarray(0, 8),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw.subarray(0, rows * (1 + width * 3)))),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

const URL = process.env.UI_URL || 'http://localhost:4173/';
const TALL = process.argv.includes('--tall');
const OUT = TALL ? 'store-assets/screenshots-tall' : 'store-assets/screenshots';
// 393 CSS px wide at 2.748x = 1080 px. Output height: 1920 px = 698.67 CSS px, which is no
// whole number, so the page is 699 px tall (1921 px) and the bottom pixel row (empty space under
// the bottom nav) is cut from the PNG; nothing is stretched. The tall set is 786 CSS px = exactly
// 2160 px, nothing cut.
const W = 393;
const SCALE = 1080 / W;
const OUT_H = TALL ? 2160 : 1920;
const H = Math.ceil(OUT_H / SCALE - 1e-9);

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.png')) fs.rmSync(`${OUT}/${f}`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
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
      // Three days in a row: Home shows a 3 day streak, 3 interviews and best score 8/10.
      { c: 'Software Developer', d: d(1), s: 8, ts: day(1) },
      { c: 'HR / General', d: d(2), s: 7, ts: day(2) },
      { c: 'Software Developer', d: d(3), s: 6, ts: day(3) }
    ])
  );
  const me = {
    name: 'Alex',
    role: 'Software Engineer',
    roleKey: 'Software Engineer',
    edu: 'BS Computer Science',
    degree: 'BS Computer Science',
    city: 'Lahore',
    exp: 'fresher',
    skillTags: ['JavaScript', 'React', 'SQL'],
    skills: 'JavaScript, React, SQL',
    words: ['Alex', 'Lahore'],
    setup: 1
  };
  localStorage.setItem('is_profiles', JSON.stringify({ Alex: me }));
  localStorage.setItem('is_active', JSON.stringify('Alex'));
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

// Every screen starts at the top: no scroll left over from a previous step, fonts and images loaded.
const settle = () =>
  p.evaluate(async () => {
    window.scrollTo(0, 0);
    const m = document.getElementById('main');
    if (m) m.scrollTop = 0;
    await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter(i => !i.complete)
        .map(i => new Promise(r => i.addEventListener('load', r, { once: true }) || i.addEventListener('error', r, { once: true })))
    );
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
const shot = async (name, wait = 800, { top = true } = {}) => {
  await p.waitForTimeout(wait);
  if (top) await settle();
  fs.writeFileSync(`${OUT}/${name}.png`, cropPngHeight(await p.screenshot(), OUT_H));
  console.log(`Wrote ${OUT}/${name}.png`);
};

await shot('1-home');

await p.evaluate(() => window.startPractice());
await p.waitForTimeout(500);
// The grid shows parent tiles: open Software Development, then pick Software Developer in its list.
await p.click('#pPath .cp[data-p="software"]');
await p.waitForTimeout(300);
await p.click('#pPath-pop [data-c="software"]');
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
await p.waitForTimeout(600);
await p.click('#mGrid .cp[data-p="software"]'); // Mock setup with the Software Development list open
await shot('3-mock-setup', 1000, { top: false }); // the open list may scroll the page to fit
await p.click('#mGrid-pop [data-c="software"]');
await p.waitForTimeout(1200);
const showPhoneMic = () =>
  p.evaluate(() => {
    document.getElementById('mic').classList.remove('hidden');
    document.getElementById('micSt').textContent = '';
  });
// An answer in progress: said words dark, the rest still grey. 23 words ends at "Science"; word 24
// ("and") would also match a later "and". Then show the box from its first line.
await answerMock(23);
await p.evaluate(() => {
  document.getElementById('ansBox').scrollTop = 0;
});
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
// One run makes both sets: the 9:16 set, then the same steps again for the 2:1 set.
if (!TALL) {
  const r = spawnSync(process.execPath, [process.argv[1], '--tall'], { stdio: 'inherit' });
  process.exit(r.status ?? 1);
}
