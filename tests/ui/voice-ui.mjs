// Browser check for setup, chips, Practice modes and voice settings (no demo profile anywhere).
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/voice-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
const wait = ms => new Promise(r => setTimeout(r, ms));

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 740 }, hasTouch: true });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.goto('http://localhost:4173/');
// An older version's demo profile ("Alex Khan") and its edit: both must be deleted at start-up.
await p.evaluate(() => {
  const old = { name: 'Alex Khan', degree: 'BS Computer Science', uni: 'Example University', role: 'Junior Software Developer', skills: 'JavaScript' };
  localStorage.setItem('is_profiles', JSON.stringify({ 'Alex Khan': old }));
  localStorage.setItem('is_active', JSON.stringify('Alex Khan'));
  localStorage.setItem('is_edits', JSON.stringify({ 'Alex Khan|software|0': 'old demo answer' }));
});
await p.reload();
await wait(900);
check('old demo profile deleted', await p.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('is_profiles') || '{}')).length === 0 && !localStorage.getItem('is_edits').includes('Alex')));
check('no Alex or Khan anywhere on Home', !/\bAlex\b|\bKhan\b/.test(await p.textContent('body')));

// First tap on Practice opens the setup screen
await p.click('#nPractice');
await wait(500);
check('Practice first tap: setup screen appears', await p.isVisible('#setup'));
check('setup: step progress', (await p.textContent('#sStepT')).startsWith('Step 1 of 3'));
check('setup: no Alex or Khan anywhere', !/\bAlex\b|\bKhan\b/.test(await p.textContent('body')));
await p.click('#sNext');
await wait(200);
check('setup: name is required (inline error, stays on step 1)', (await p.textContent('#sNameErr')).length > 0 && (await p.textContent('#sStepT')).startsWith('Step 1'));
await p.fill('#sName', 'Mubashar_1');
check('setup: inline validation, letters and spaces only', /letters/i.test(await p.textContent('#sNameErr')));
await p.fill('#sName', 'Mubashar Akram');
check('setup: valid name clears the error', (await p.textContent('#sNameErr')) === '');
await p.fill('#sEdu', 'BS IT student');
await p.fill('#sCity', 'Pakpattan');
await p.click('#sNext');
await wait(200);
await p.selectOption('#sRole', 'Cloud/DevOps');
await p.click('#sExp button:nth-child(2)');
await p.fill('#sSkillIn', 'AWS');
await p.keyboard.press('Enter');
await p.fill('#sSkillIn', 'Dev');
await wait(100);
const sugg = await p.$$eval('#sSugg .sg', x => x.map(e => e.textContent));
check(`setup: skill suggestions from the interview list (${sugg.slice(0, 3).join(', ')})`, sugg.some(t => /DevOps/.test(t)));
await p.click('#sSugg .sg');
await p.fill('#sSkillIn', 'Linux,');
await wait(100);
const skills = await p.$$eval('#sSkills .tg span', x => x.map(e => e.textContent));
check(`setup: skills tag input (${skills.join(', ')})`, skills.join() === 'AWS,DevOps,Linux');
const tagH = await p.$eval('#sSkills .tg button', e => e.getBoundingClientRect().height);
check(`setup: tag remove button is a real tap target (${tagH}px)`, tagH >= 36);
await p.click('#sNext');
await wait(200);
const words = await p.$$eval('#sWords .tg span', x => x.map(e => e.textContent));
check(`setup: My words prefilled with name parts and city (${words.join(', ')})`, words.join() === 'Mubashar,Akram,Pakpattan');
await p.fill('#sWordIn', 'Kubernetes');
await p.keyboard.press('Enter');
check('setup: accent default en-IN', (await p.inputValue('#sAccent')) === 'in');
check('setup: last button says Save and start', (await p.textContent('#sNext')) === 'Save and start');
await p.click('#sNext');
await wait(600);
check('after saving: straight into Practice', await p.isVisible('#pcat'));
const prof = await p.evaluate(() => JSON.parse(localStorage.getItem('is_profiles'))['Mubashar Akram']);
check('profile stored on the phone with setup data', prof && prof.city === 'Pakpattan' && prof.skills === 'AWS, DevOps and Linux' && prof.words.includes('Kubernetes') && prof.setup === 1);
check('Edit my details link on Practice start screen', await p.isVisible('#pcat .linkb'));

// Practice: Introduce yourself uses the generated answer; modes
await p.evaluate(() => window.pcGo('fresh', 0, 'fresher'));
await wait(900);
const q = (await p.textContent('#pQt')).trim();
const a = (await p.textContent('#pA')).trim();
check(`Practice "${q.slice(0, 30)}": generated answer from setup`, /introduce yourself|tell me about yourself/i.test(q) ? a.startsWith('My name is Mubashar Akram. I am a BS IT student from Pakpattan.') : true);
check('Practice: Read it mode shows the answer', (await p.getAttribute('#pModes [data-m=read]', 'aria-pressed')) === 'true' && !(await p.$eval('#pWrap', e => e.classList.contains('hidetext'))));
await p.click('#pModes [data-m=memory]');
await wait(200);
check('Practice: From memory hides the answer, Hint shown', (await p.$eval('#pWrap', e => e.classList.contains('hidetext'))) && (await p.isVisible('#pHint')));
await p.click('#pHint');
check('Practice: Hint shows the next words', (await p.locator('#pA .pw.peek').count()) === 3);
await p.click('#pModes [data-m=read]');
check('Practice: result panel hidden before speaking', !(await p.isVisible('#pRes')));
const modeH = await p.$eval('#pModes button', e => e.getBoundingClientRect().height);
check(`Practice: mode buttons >= 44px (${modeH}px)`, modeH >= 44);

// Mock: chips from the user's data and question keywords; Edit my details updates them
await p.evaluate(() => window.home());
await wait(300);
await p.evaluate(() => window.startMock());
await wait(500);
check('Mock start screen: Edit my details link', await p.isVisible('#mock .linkb'));
await p.click('#mStart');
await wait(1200);
if (await p.isVisible('#dlg')) {
  await p.click('#dYes');
  await wait(900);
}
const chips = await p.$$eval('#vChips .vchip:not(.kw)', c => c.map(x => x.textContent));
check(`Mock chips: name and My words only (${chips.join(', ')})`, chips.join() === 'Mubashar,Akram,Pakpattan,Kubernetes');
check('Mock chips: no Alex or Khan', !chips.some(c => /Alex|Khan/.test(c)));
const ch = await p.$eval('#vChips .vchip', x => x.getBoundingClientRect().height);
check(`Mock chips: tap target >= 44px (${ch}px)`, ch >= 44);
await p.fill('#ansBox', 'I am from');
await p.focus('#ansBox');
await p.evaluate(() => {
  const a = document.getElementById('ansBox');
  a.setSelectionRange(a.value.length, a.value.length);
});
await p.tap('#vChips .vchip:nth-child(3)');
check(`chip inserts at the cursor: "${await p.inputValue('#ansBox')}"`, (await p.inputValue('#ansBox')) === 'I am from Pakpattan');
await p.evaluate(() => window.editDetails());
await wait(400);
await p.fill('#sName', 'Sara Ali');
await p.click('#sNext');
await wait(150);
await p.click('#sNext');
await wait(150);
await p.click('#sNext');
await wait(700);
const chips2 = await p.$$eval('#vChips .vchip:not(.kw)', c => c.map(x => x.textContent));
check(`Edit my details: name change updates the chips (${chips2.join(', ')})`, chips2.includes('Sara') && chips2.includes('Ali') && !chips2.includes('Mubashar'));

// Profile > Voice: accent, My words, learned corrections
await p.evaluate(() => localStorage.setItem('is_voice_mem', JSON.stringify([{ prev: 'am', heard: 'officer', fix: 'Sara', at: 1 }])));
await p.reload();
await wait(900);
await p.evaluate(() => window.showProfile());
await wait(400);
check('Profile > Voice: accent picker (en-IN first)', /India/.test(await p.textContent('#vAccent option:first-child')));
check('Profile > Voice: My words shown', (await p.textContent('#vWords')).includes('Kubernetes'));
check('Profile > Voice: learned corrections listed', (await p.textContent('#vMem')).includes('"officer" becomes "Sara"'));
await p.click('#vMem .vmrow button');
check('learned correction deleted', (await p.evaluate(() => JSON.parse(localStorage.getItem('is_voice_mem') || '[]').length)) === 0);
check('no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
check('no page errors', errors.length === 0);
if (errors.length) console.log(errors.join('\n'));
await b.close();
console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
