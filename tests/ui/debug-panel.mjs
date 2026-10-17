// Browser check for the debug-only ads status panel and the banner slot.
// Needs Playwright (npx playwright or a global install) and a built app served on :4173:
//   npm run build:debug && npx vite preview --port 4173 &   then  node tests/ui/debug-panel.mjs debug
//   npm run build       && npx vite preview --port 4173 &   then  node tests/ui/debug-panel.mjs release
const mode = process.argv[2] || 'debug';
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  [${mode}] ${name}`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 740 }, hasTouch: true });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.addInitScript(() => {
  window.__skipIntro = true;
});
await p.goto(process.env.UI_URL || 'http://localhost:4173/');
await p.waitForTimeout(800);

const box = await p.locator('#ttl').boundingBox();
const hold = async ms => {
  await p.mouse.move(box.x + 20, box.y + box.height / 2);
  await p.mouse.down();
  await p.waitForTimeout(ms);
  await p.mouse.up();
  await p.waitForTimeout(200);
};

await hold(200);
check('short tap on title does not open panel', (await p.locator('#dbgPanel').count()) === 0);
await hold(1150);
if (mode === 'debug') {
  check('hold title 1 s opens panel', await p.isVisible('#dbgPanel'));
  await p.waitForTimeout(1200);
  const text = await p.textContent('#dbgText');
  check(
    'panel shows build, consent, banner, interstitial, log',
    ['Build:', 'Consent:', 'Banner:', 'Interstitial:', 'last 20 ADS: lines'].every(t => text.includes(t))
  );
  check('panel shows git SHA', /git [0-9a-f]{7}/.test(text));
  check('no real ad IDs in panel', !/ca-app-pub-(?!3940256099942544)/.test(text));
  const btns = await p.$$eval('#dbgPanel button', bs => bs.map(x => ({ t: x.textContent.trim(), h: x.getBoundingClientRect().height })));
  check(
    'Copy and Force buttons present, >= 44px',
    btns.some(x => x.t === 'Copy report' && x.h >= 44) && btns.some(x => x.t === 'Force interstitial test' && x.h >= 44)
  );
  check('panel fits 375px, no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await p.click('#dbgForce');
  await p.waitForTimeout(300);
  check('force test reports a reason (no crash)', (await p.textContent('#dbgMsg')).startsWith('Force interstitial:'));
  await p.click('#dbgCopy');
  await p.waitForTimeout(300);
  check('copy gives feedback', (await p.textContent('#dbgMsg')).length > 0);
  check('Voice section in the panel', text.includes('== Voice ==') && /Android SDK/.test(text) && /locale/i.test(text));
  const vb = await p.$eval('#dbgVoice', x => ({ t: x.textContent.trim(), h: x.getBoundingClientRect().height }));
  check('Copy voice report button, >= 44px', vb.t === 'Copy voice report' && vb.h >= 44);
  await p.click('#dbgVoice');
  await p.waitForTimeout(200);
  check('voice report copy gives feedback', (await p.textContent('#dbgMsg')).length > 0);
  await p.click('#dbgClose');
  check('close removes panel', (await p.locator('#dbgPanel').count()) === 0);
  await p.click('#nProfile');
  await p.waitForTimeout(400);
  check('Profile shows build footer with SHA', /Build [0-9a-f]{7}/.test((await p.textContent('#dbgBuild')) || ''));
} else {
  check('release: holding title opens nothing', (await p.locator('#dbgPanel').count()) === 0);
  await p.click('#nProfile');
  await p.waitForTimeout(400);
  check('release: no build footer in Profile', (await p.locator('#dbgBuild').count()) === 0);
}
check('no page errors', errors.length === 0);
await b.close();
console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
