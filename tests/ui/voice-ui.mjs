// Browser check for the voice UI: Profile > Voice (accent only), no chips, no vocabulary system.
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/voice-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 740 }, hasTouch: true });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.goto('http://localhost:4173/');
// The phone case: an "Alex Khan" demo profile saved by an older version, plus old vocabulary data.
await p.evaluate(() => {
  const old = { name: 'Alex Khan', degree: 'BSCS', uni: 'Old University', role: 'Developer', skills: 'Java' };
  localStorage.setItem('is_profiles', JSON.stringify({ 'Alex Khan': old, 'Sara Ali': { name: 'Sara Ali', role: 'Tester' } }));
  localStorage.setItem('is_active', JSON.stringify('Alex Khan'));
  localStorage.setItem('is_voice_words', JSON.stringify('Kubernetes'));
  localStorage.setItem('is_voice_mem', JSON.stringify([{ prev: 'am', heard: 'officer', fix: 'Test' }]));
  localStorage.setItem('is_voice_smart', 'true');
});
await p.reload();
await p.waitForTimeout(900);

// Profile > Voice: accent picker only
await p.evaluate(() => window.showProfile());
await p.waitForTimeout(400);
check('Profile has a Voice section', await p.isVisible('#pVoiceBox'));
const accents = await p.$$eval('#vAccent option', o => o.map(x => x.textContent));
check(`accent list: ${accents.join(', ')}`, accents.length === 4 && /India/.test(accents[0]) && accents.every(a => a.startsWith('English')));
check('default accent is en-IN', (await p.inputValue('#vAccent')) === 'in');
await p.selectOption('#vAccent', 'uk');
check('accent change is saved', (await p.evaluate(() => localStorage.getItem('is_voice_accent'))) === '"uk"');
check('no My words editor', (await p.locator('#vWords').count()) === 0 && !(await p.evaluate(() => document.body.innerText.includes('My words'))));
check('no Save my words button', (await p.locator('text=Save my words').count()) === 0);
check('no Smart name matching switch', (await p.locator('#vSmart').count()) === 0);
check('no learned corrections list', (await p.locator('#vMem').count()) === 0);
check(
  'old vocabulary data deleted from the phone',
  await p.evaluate(() => ['is_voice_words', 'is_voice_mem', 'is_voice_smart'].every(k => localStorage.getItem(k) === null))
);

// Mock: no chips at all (Alex / Khan or anything else)
await p.evaluate(() => window.startMock());
await p.waitForTimeout(500);
await p.click('#mStart');
await p.waitForTimeout(900);
check('no chips row under the answer box', (await p.locator('#vChips, .vchip').count()) === 0);
check('no Alex/Khan anywhere on the Mock screen', !(await p.evaluate(() => /\bAlex\b|\bKhan\b/.test(document.getElementById('interview').innerText))));
check('live bar hidden when not listening', !(await p.isVisible('#micLive')));
await p.fill('#ansBox', 'I typed this');
check('typing works', (await p.inputValue('#ansBox')) === 'I typed this');
check('no "Pauses are fine" text anywhere', !(await p.evaluate(() => document.body.innerText.includes('Pauses are fine'))));
check('no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
check('no page errors', errors.length === 0);
await b.close();
console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
