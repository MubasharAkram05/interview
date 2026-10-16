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
check(`accent list: ${accents.join(', ')}`, accents.join() === 'Pakistan,India,US,UK');
check('default accent is Pakistan', (await p.inputValue('#vAccent')) === 'pk');
check('Smart name matching is on by default', await p.isChecked('#vSmart'));
check('My words loaded', (await p.inputValue('#vWords')).includes('Kubernetes'));
await p.selectOption('#vAccent', 'uk');
check('accent change is saved', (await p.evaluate(() => localStorage.getItem('is_voice_accent'))) === '"uk"');
await p.fill('#vWords', 'Kubernetes\nTestcity: Test city\nDevOps');
await p.click('[onclick="saveMyWords()"]');
check('My words saved', (await p.evaluate(() => JSON.parse(localStorage.getItem('is_voice_words')))).includes('DevOps'));
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

// Learn from an edit, then Undo
await p.fill('#ansBox', 'I am from Pakistan');
await p.evaluate(() => document.getElementById('ansBox').dispatchEvent(new Event('focus')));
await p.fill('#ansBox', 'I am from Testcity');
await p.evaluate(() => document.getElementById('ansBox').dispatchEvent(new Event('change')));
await p.waitForTimeout(200);
const tt = await p.textContent('#toast');
check(`edit learned with Undo toast: "${tt.trim()}"`, /Learned/.test(tt) && (await p.isVisible('#toast .tundo')));
check('correction saved', (await p.evaluate(() => JSON.parse(localStorage.getItem('is_voice_mem') || '[]').length)) === 1);
await p.click('#toast .tundo');
check('Undo removes the learned correction', (await p.evaluate(() => JSON.parse(localStorage.getItem('is_voice_mem') || '[]').length)) === 0);
check('no "Pauses are fine" text anywhere', !(await p.evaluate(() => document.body.innerText.includes('Pauses are fine'))));
check('no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
check('no page errors', errors.length === 0);
await b.close();
console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
