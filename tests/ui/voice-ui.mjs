// Browser check for the voice UI: Profile > Voice settings, My words chips and the Undo toast.
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/voice-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 740 }, hasTouch: true });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.goto('http://localhost:4173/');
await p.evaluate(() => {
  const prof = { name: 'Test User', city: 'Testcity', degree: 'BS CS', uni: 'Example University', role: 'Developer', skills: 'AWS, DevOps' };
  localStorage.setItem('is_profiles', JSON.stringify({ 'Test User': prof }));
  localStorage.setItem('is_active', JSON.stringify('Test User'));
  localStorage.setItem('is_voice_words', JSON.stringify('Kubernetes\nTestcity: Test city'));
});
await p.reload();
await p.waitForTimeout(900);

// Profile > Voice
await p.evaluate(() => window.showProfile());
await p.waitForTimeout(400);
check('Profile has a Voice section', await p.isVisible('#pVoiceBox'));
const accents = await p.$$eval('#vAccent option', o => o.map(x => x.textContent));
check(`accent list: ${accents.join(', ')}`, accents.length === 4 && /India/.test(accents[0]) && accents.every(a => a.startsWith('English')));
check('default accent is en-IN', (await p.inputValue('#vAccent')) === 'in');
check('My words hint text', (await p.textContent('label[for=vWords]')).includes('Add names and rare words here'));
check('Smart name matching is on by default', await p.isChecked('#vSmart'));
check('My words loaded', (await p.inputValue('#vWords')).includes('Kubernetes'));
await p.selectOption('#vAccent', 'uk');
check('accent change is saved', (await p.evaluate(() => localStorage.getItem('is_voice_accent'))) === '"uk"');
await p.fill('#vWords', 'Kubernetes\nTestcity: Test city\nDevOps');
check('no Save my words button (saves while typing)', (await p.locator('text=Save my words').count()) === 0);
check('My words saved by typing', (await p.evaluate(() => JSON.parse(localStorage.getItem('is_voice_words')))).includes('DevOps'));
check('empty learned list shows guidance', (await p.textContent('#vMem')).includes('Nothing learned yet'));
await p.evaluate(() => window.editProfile());
await p.waitForTimeout(200);
check('Hometown field in the profile form', (await p.inputValue('#f_city')) === 'Testcity');
await p.evaluate(() => window.cancelProfile());

// Mock: chips under the answer box
await p.evaluate(() => window.startMock());
await p.waitForTimeout(500);
await p.click('#mStart');
await p.waitForTimeout(900);
const chips = await p.$$eval('#vChips .vchip', c => c.map(x => x.textContent));
check(`chips: ${chips.join(', ')}`, chips.length > 0 && chips.length <= 6 && chips[0] === 'Kubernetes' && chips.includes('Test') && chips.includes('Testcity'));
const h = await p.$eval('#vChips .vchip', x => x.getBoundingClientRect().height);
check(`chip tap target >= 44px (${h}px)`, h >= 44);
await p.fill('#ansBox', 'I am from');
await p.focus('#ansBox');
await p.evaluate(() => {
  const a = document.getElementById('ansBox');
  a.setSelectionRange(a.value.length, a.value.length);
});
await p.tap('#vChips .vchip:nth-child(3)');
check(`chip inserts at cursor: "${await p.inputValue('#ansBox')}"`, (await p.inputValue('#ansBox')) === `I am from ${chips[2]}`);
check('live preview hidden when not listening', !(await p.isVisible('#micLive')));

// Typing alone is not learned (only an edit right after dictation is; dictation needs a phone).
await p.fill('#ansBox', 'I am from Pakistan');
await p.evaluate(() => document.getElementById('ansBox').dispatchEvent(new Event('focus')));
await p.fill('#ansBox', 'I am from Testcity');
await p.evaluate(() => document.getElementById('ansBox').dispatchEvent(new Event('change')));
await p.waitForTimeout(200);
check('typed edit without dictation is not learned', (await p.evaluate(() => JSON.parse(localStorage.getItem('is_voice_mem') || '[]').length)) === 0);
// Learned corrections list: shows and deletes.
await p.evaluate(() => localStorage.setItem('is_voice_mem', JSON.stringify([{ prev: 'am', heard: 'officer', fix: 'Test', at: 1 }])));
await p.reload();
await p.waitForTimeout(900);
await p.evaluate(() => window.showProfile());
await p.waitForTimeout(300);
check('learned correction listed in Profile > Voice', (await p.textContent('#vMem')).includes('"officer" becomes "Test"'));
await p.click('#vMem .vmrow button');
check('learned correction deleted', (await p.evaluate(() => JSON.parse(localStorage.getItem('is_voice_mem') || '[]').length)) === 0 && (await p.textContent('#vMem')).includes('Nothing learned yet'));
check('no "Pauses are fine" text anywhere', !(await p.evaluate(() => document.body.innerText.includes('Pauses are fine'))));
check('no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
// Demo profile: its name ("Alex Khan") is sample data and must not become chips.
await p.evaluate(() => {
  localStorage.removeItem('is_profiles');
  localStorage.removeItem('is_active');
  localStorage.removeItem('is_voice_words');
  indexedDB.deleteDatabase('InterviewSimulator');
});
await p.reload();
await p.waitForTimeout(900);
await p.evaluate(() => window.startMock());
await p.waitForTimeout(400);
await p.click('#mStart');
await p.waitForTimeout(900);
const demoChips = await p.$$eval('#vChips .vchip', c => c.map(x => x.textContent));
check(`demo profile: no Alex/Khan chips (${demoChips.join(', ') || 'none'})`, !demoChips.includes('Alex') && !demoChips.includes('Khan'));
check('no chips -> row hidden', demoChips.length > 0 || !(await p.isVisible('#vChips')));
// The phone case: an "Alex Khan" demo profile saved by an older version (different details).
await p.evaluate(() => {
  const old = { name: 'Alex Khan', degree: 'BSCS', uni: 'Old University', role: 'Developer', skills: 'Java' };
  localStorage.setItem('is_profiles', JSON.stringify({ 'Alex Khan': old, 'Sara Ali': { name: 'Sara Ali', role: 'Tester' } }));
  localStorage.setItem('is_active', JSON.stringify('Alex Khan'));
  indexedDB.deleteDatabase('InterviewSimulator');
});
await p.reload();
await p.waitForTimeout(900);
await p.evaluate(() => window.startMock());
await p.waitForTimeout(400);
await p.click('#mStart');
await p.waitForTimeout(900);
const oldChips = await p.$$eval('#vChips .vchip', c => c.map(x => x.textContent));
check(`old saved demo profile: no Alex/Khan chips (${oldChips.join(', ') || 'none'})`, !oldChips.includes('Alex') && !oldChips.includes('Khan') && !(await p.isVisible('#vChips')));
check('no page errors', errors.length === 0);
await b.close();
console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
