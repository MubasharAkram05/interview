// Browser check for setup, chips, Mock From memory and voice settings (no demo profile anywhere).
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

// Practice shows the categories first; tapping one opens the setup form
await p.click('#nPractice');
await wait(500);
check('Practice first tap: categories shown, no form yet', (await p.isVisible('#pcat')) && !(await p.isVisible('#setup')));
await p.evaluate(() => window.pcGo('cloud', 0, 'fresher'));
await wait(500);
check('category tap: setup form appears', await p.isVisible('#setup'));
check('setup: 2 steps', (await p.textContent('#sStepT')).startsWith('Step 1 of 2'));
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
check('setup: role picked from the category (Cloud/DevOps)', (await p.inputValue('#sRole')) === 'Cloud/DevOps');
const roleSugg = await p.$$eval('#sSugg .sg', x => x.map(e => e.textContent.replace(/^\+\s*/, '')));
check(`setup: key skills follow the role (${roleSugg.slice(0, 4).join(', ')})`, roleSugg.includes('AWS') && roleSugg.includes('Docker') && !roleSugg.includes('SEO'));
await p.selectOption('#sRole', 'Marketing/Sales');
await wait(100);
const mkSugg = await p.$$eval('#sSugg .sg', x => x.map(e => e.textContent.replace(/^\+\s*/, '')));
check(`setup: another role gives its own skills (${mkSugg.slice(0, 3).join(', ')})`, mkSugg.includes('SEO') && !mkSugg.includes('AWS'));
await p.selectOption('#sRole', 'Cloud/DevOps');
await p.click('#sExp button:nth-child(2)');
await p.fill('#sSkillIn', 'AWS');
await p.keyboard.press('Enter');
await p.fill('#sSkillIn', 'Dev');
await wait(100);
const sugg = await p.$$eval('#sSugg .sg', x => x.map(e => e.textContent));
check(`setup: typed text filters the suggestions (${sugg.slice(0, 3).join(', ')})`, sugg.some(t => /DevOps/.test(t)));
await p.click('#sSugg .sg');
await p.fill('#sSkillIn', 'Linux,');
await wait(100);
const skills = await p.$$eval('#sSkills .tg span', x => x.map(e => e.textContent));
check(`setup: skills tag input (${skills.join(', ')})`, skills.join() === 'AWS,DevOps,Linux');
const tagH = await p.$eval('#sSkills .tg button', e => e.getBoundingClientRect().height);
check(`setup: tag remove button is a real tap target (${tagH}px)`, tagH >= 36);
check('setup: voice accent on the last step, default en-IN', (await p.isVisible('#sAccent')) && (await p.inputValue('#sAccent')) === 'in');
check('setup: no My words field', (await p.locator('#sWords, #sWordIn').count()) === 0 && !/My words/i.test(await p.textContent('#setup')));
check('setup: last button says Save and start', (await p.textContent('#sNext')) === 'Save and start');
await p.click('#sNext');
await wait(800);
check('after saving: the picked category opens in Practice', (await p.isVisible('#practice')) && /Cloud/i.test(await p.textContent('#pCount')));
const prof = await p.evaluate(() => JSON.parse(localStorage.getItem('is_profiles'))['Mubashar Akram']);
check(`profile words made automatically (${prof && prof.words.join(', ')})`, prof && prof.city === 'Pakpattan' && prof.skills === 'AWS, DevOps and Linux' && prof.setup === 1 && ['Mubashar', 'Akram', 'Pakpattan', 'BS', 'IT', 'AWS', 'Cloud', 'DevOps'].every(w => prof.words.includes(w)));

// Practice: Read it only (no mode buttons); Introduce yourself uses the generated answer
await p.evaluate(() => window.home());
await wait(300);
await p.evaluate(() => window.startPractice());
await wait(300);
check('Edit my details link on Practice start screen', await p.isVisible('#pcat .linkb'));
await p.evaluate(() => window.pcGo('fresh', 0, 'fresher'));
await wait(900);
const q = (await p.textContent('#pQt')).trim();
const a = (await p.textContent('#pA')).trim();
check(`Practice "${q.slice(0, 30)}": generated answer from setup`, /introduce yourself|tell me about yourself/i.test(q) ? a.startsWith('My name is Mubashar Akram. I am a BS IT student from Pakpattan.') : true);
check('Practice: no From memory / mode buttons, answer shown', (await p.locator('#pModes, #pHint').count()) === 0 && (await p.isVisible('#pA')));
check('Practice: result panel hidden before speaking', !(await p.isVisible('#pRes')));

// Mock: Free answer / From memory, chips from the user's data
await p.evaluate(() => window.home());
await wait(300);
await p.evaluate(() => window.startMock());
await wait(500);
check('Mock start screen: Edit my details link', await p.isVisible('#mock .linkb'));
await p.click('#mGrid .mt[data-c=fresh]');
await p.click('#mSeg button:nth-child(1)');
await p.click('#mStart');
await wait(1200);
if (await p.isVisible('#dlg')) {
  await p.click('#dYes');
  await wait(900);
}
check('Mock: Free answer is the default, Hint hidden', (await p.getAttribute('#mModes [data-m=free]', 'aria-pressed')) === 'true' && !(await p.isVisible('#mHint')));
await p.click('#mModes [data-m=memory]');
await wait(150);
check('Mock: From memory shows Hint', (await p.getAttribute('#mModes [data-m=memory]', 'aria-pressed')) === 'true' && (await p.isVisible('#mHint')));
await p.click('#mHint');
await wait(100);
const hintT = (await p.textContent('#mHintT')).trim();
check(`Mock: Hint shows the next 3 words of the saved answer ("${hintT}")`, (await p.isVisible('#mHintT')) && /^Next: \S+ \S+ \S+$/.test(hintT));
const modeH = await p.$eval('#mModes button', e => e.getBoundingClientRect().height);
check(`Mock: mode buttons >= 44px (${modeH}px)`, modeH >= 44);
check('Mock: mode is remembered', (await p.evaluate(() => JSON.parse(localStorage.getItem('is_mmode')))) === 'memory');
await p.click('#mModes [data-m=free]');
const chips = await p.$$eval('#vChips .vchip:not(.kw)', c => c.map(x => x.textContent));
check(`Mock chips: name and the user's own words (${chips.join(', ')})`, chips.join() === 'Mubashar,Akram,Pakpattan,AWS,DevOps,Linux');
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
await wait(700);
const chips2 = await p.$$eval('#vChips .vchip:not(.kw)', c => c.map(x => x.textContent));
check(`Edit my details: name change updates the chips (${chips2.join(', ')})`, chips2.includes('Sara') && chips2.includes('Ali') && !chips2.includes('Mubashar'));

// Profile > Voice: accent and learned corrections (My words stay hidden)
await p.evaluate(() => localStorage.setItem('is_voice_mem', JSON.stringify([{ prev: 'am', heard: 'officer', fix: 'Sara', at: 1 }])));
await p.reload();
await wait(900);
await p.evaluate(() => window.showProfile());
await wait(400);
check('Profile > Voice: accent picker (en-IN first)', /India/.test(await p.textContent('#vAccent option:first-child')));
check('Profile > Voice: My words not shown', (await p.locator('#vWords').count()) === 0 && !/My words/i.test(await p.textContent('#form')));
check('Profile > Voice: learned corrections listed', (await p.textContent('#vMem')).includes('"officer" becomes "Sara"'));
await p.click('#vMem .vmrow button');
check('learned correction deleted', (await p.evaluate(() => JSON.parse(localStorage.getItem('is_voice_mem') || '[]').length)) === 0);
check('no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
check('no page errors', errors.length === 0);
if (errors.length) console.log(errors.join('\n'));
await b.close();
console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
