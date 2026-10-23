// Browser check for setup, Mock From memory and voice settings (no demo profile anywhere).
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/voice-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
const wait = ms => new Promise(r => setTimeout(r, ms));
// Mock picker: tap the parent tile that holds the type (opens its list), then the type.
const pickMock = async c => {
  const single = await p.$(`#mGrid .pt2.cc1[data-c=${c}]`);
  if (single) return single.click();
  if (!(await p.$(`#mGrid .cpop [data-c=${c}]`))) {
    await p.click(`#mGrid .pt2[data-kids~=${c}]`);
    await wait(300);
  }
  await p.click(`#mGrid .cpop [data-c=${c}]`);
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 740 }, hasTouch: true });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.addInitScript(() => {
  window.__skipIntro = true;
});
await p.goto(process.env.UI_URL || 'http://localhost:4173/');
// An older version's demo profile ("Alex Khan") and its edit: both must be deleted at start-up.
await p.evaluate(() => {
  const old = { name: 'Alex Khan', degree: 'BS Computer Science', uni: 'Example University', role: 'Junior Software Developer', skills: 'JavaScript' };
  localStorage.setItem('is_profiles', JSON.stringify({ 'Alex Khan': old }));
  localStorage.setItem('is_active', JSON.stringify('Alex Khan'));
  localStorage.setItem('is_edits', JSON.stringify({ 'Alex Khan|software|0': 'old demo answer' }));
});
await p.reload();
await wait(900);
check(
  'old demo profile deleted',
  await p.evaluate(
    () => Object.keys(JSON.parse(localStorage.getItem('is_profiles') || '{}')).length === 0 && !localStorage.getItem('is_edits').includes('Alex')
  )
);
check('no Alex or Khan anywhere on Home', !/\bAlex\b|\bKhan\b/.test(await p.textContent('body')));

// Practice shows the categories first; tapping one opens the setup form
await p.click('#nPractice');
await wait(500);
check('Practice first tap: categories shown, no form yet', (await p.isVisible('#pcat')) && !(await p.isVisible('#setup')));
await p.evaluate(() => window.pcGo('cloud', 0, 'fresher'));
await wait(500);
check('category tap: setup form appears', await p.isVisible('#setup'));
check(
  'setup form: no banner space (no-ad)',
  await p.evaluate(() => document.documentElement.classList.contains('no-ad') && getComputedStyle(document.getElementById('adSlot')).height === '0px')
);
check('setup: 2 steps', (await p.textContent('#sStepT')).startsWith('Step 1 of 2'));
check('setup: no Alex or Khan anywhere', !/\bAlex\b|\bKhan\b/.test(await p.textContent('body')));
await p.click('#sNext');
await wait(200);
check(
  'setup: name is required (inline error, stays on step 1)',
  (await p.textContent('#sNameErr')).length > 0 && (await p.textContent('#sStepT')).startsWith('Step 1')
);
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
check(
  `setup: key skills follow the role (${roleSugg.slice(0, 4).join(', ')})`,
  roleSugg.includes('AWS') && roleSugg.includes('Docker') && !roleSugg.includes('SEO')
);
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
check(
  `setup: typed text filters the suggestions (${sugg.slice(0, 3).join(', ')})`,
  sugg.some(t => /DevOps/.test(t))
);
await p.click('#sSugg .sg');
await p.fill('#sSkillIn', 'Linux,');
await wait(100);
const skills = await p.$$eval('#sSkills .tg span', x => x.map(e => e.textContent));
check(`setup: skills tag input (${skills.join(', ')})`, skills.join() === 'AWS,DevOps,Linux');
const tagH = await p.$eval('#sSkills .tg button', e => Math.round(e.getBoundingClientRect().height)); // sub-pixel font rendering differs by runner
check(`setup: tag remove button is a real tap target (${tagH}px)`, tagH >= 36);
check('setup: voice accent on the last step, default en-IN', (await p.isVisible('#sAccent')) && (await p.inputValue('#sAccent')) === 'in');
check('setup: no My words field', (await p.locator('#sWords, #sWordIn').count()) === 0 && !/My words/i.test(await p.textContent('#setup')));
check('setup: last button says Save and start', (await p.textContent('#sNext')) === 'Save and start');
await p.click('#sNext');
await wait(800);
check('after saving: the picked category opens in Practice', (await p.isVisible('#practice')) && /Cloud/i.test(await p.textContent('#pCount')));
const prof = await p.evaluate(() => JSON.parse(localStorage.getItem('is_profiles'))['Mubashar Akram']);
check(
  `profile words made automatically (${prof && prof.words.join(', ')})`,
  prof &&
    prof.city === 'Pakpattan' &&
    prof.skills === 'AWS, DevOps and Linux' &&
    prof.setup === 1 &&
    ['Mubashar', 'Akram', 'Pakpattan', 'BS', 'IT', 'AWS', 'Cloud', 'DevOps'].every(w => prof.words.includes(w))
);

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
check(
  `Practice "${q.slice(0, 30)}": generated answer from setup`,
  /introduce yourself|tell me about yourself/i.test(q)
    ? a.startsWith(
        'Good morning, and thank you for this opportunity. My name is Mubashar Akram, and I am from Pakpattan. I am currently pursuing a BS in Information Technology'
      )
    : true
);
check('Practice: no From memory / mode buttons, answer shown', (await p.locator('#pModes, #pHint').count()) === 0 && (await p.isVisible('#pA')));
check('Practice: result panel hidden before speaking', !(await p.isVisible('#pRes')));
check('Practice: mic switched off (PRACTICE_MIC = false), Listen button stays', !(await p.isVisible('#pMic')) && (await p.isVisible('#pSpk')));
check('Header: mute button hidden while nothing is read aloud', !(await p.isVisible('#hMute')));
await p.click('#pA');
await wait(200);
check('Practice: tapping the answer text does not open the editor', !(await p.isVisible('#pEdit')));

// Mock: From memory only, no chips, bigger box; heard words aligned to the saved answer
await p.evaluate(() => window.home());
await wait(300);
await p.evaluate(() => window.startMock());
await wait(500);
check('Mock start screen: Edit my details link', await p.isVisible('#mock .linkb'));
await p.click('#mSeg button:nth-child(1)');
await pickMock('fresh');
await wait(1200);
if (await p.isVisible('#dlg')) {
  await p.click('#dYes');
  await wait(900);
}
await p.evaluate(() => document.documentElement.style.setProperty('--ad-slot', '64px')); // banner under the header
await wait(150);
check(
  'Mock: the session page fits the screen (no scroll)',
  await p.evaluate(() => {
    const m = document.getElementById('main');
    return m.scrollHeight <= m.clientHeight + 1;
  })
);
check('Mock: no Free answer / From memory toggle, no chips', (await p.locator('#mModes, #vChips, #micLive').count()) === 0);
const boxH = await p.$eval('#ansBox', e => e.getBoundingClientRect().height);
check(`Mock: answer box fills the free space (${Math.round(boxH)}px)`, boxH >= 200);
check('Mock: empty box explains what to do', /tap here to type/i.test(await p.textContent('#ansBox')));
check('Mock: no Type button any more', (await p.locator('#mTypeB').count()) === 0);
check(
  'Mock: the mic sits in the Hint / Clear row, not between Prev and Next',
  (await p.locator('.mtools #mic').count()) === 1 && (await p.locator('.mctl #mic').count()) === 0
);
await p.click('#mHint');
await wait(100);
const hintT = (await p.textContent('#mHintT')).trim();
check(`Mock: Hint shows the next 3 words of the saved answer ("${hintT}")`, (await p.isVisible('#mHintT')) && /^Next: \S+ \S+ \S+$/.test(hintT));
const hintH = await p.$eval('#mHint', e => e.getBoundingClientRect().height);
check(`Mock: Hint button >= 44px (${hintH}px)`, hintH >= 44);
// What the phone heard (restored from storage), like a language app: the whole saved answer is
// shown in order; said words dark, "Lahore" said in place of "Pakpattan" red, the rest dull.
// "Python" is not in the answer and is never written.
const q0 = await p.textContent('#qText');
await p.evaluate(() => {
  const o = JSON.parse(localStorage.getItem('is_scr'));
  o.idx = 0;
  o.heard = o.cur.map(() => []);
  o.heard[0] = 'my name is Mubashir Akram Python and I am from Lahore I am currently pursuing a BS in Information Technology'.split(' ').map(w => ({ w }));
  o.answers[0] = 'My name is Mubashar Akram, and I am from';
  localStorage.setItem('is_scr', JSON.stringify(o));
});
// The app reads IndexedDB first; drop it so the edited localStorage copy is used.
await p.evaluate(
  () =>
    new Promise(r => {
      const q = indexedDB.deleteDatabase('InterviewSimulator');
      q.onsuccess = q.onerror = q.onblocked = () => r();
    })
);
await p.reload();
await wait(1200);
const shown = (await p.textContent('#ansBox')).replace(/\s+/g, ' ').trim();
const intro = /introduce yourself|tell me about yourself/i.test(q0);
if (intro) {
  const ref = await p.evaluate(() => document.querySelectorAll('#ansBox .aw').length);
  check(
    `Mock: the whole saved answer is shown in order ("${shown.slice(0, 60)}...")`,
    shown.startsWith('Good morning, and thank you for this opportunity. My name is Mubashar Akram, and I am from Pakpattan. I am currently pursuing') &&
      ref > 15
  );
  const ok = await p.$$eval('#ansBox .aw.said', x => x.map(e => e.textContent).join(' '));
  check(
    `Mock: said words dark, saved spelling ("${ok}")`,
    ok.startsWith('My name is Mubashar Akram, and I am from I am currently pursuing a BS in Information Technology')
  );
  check('Mock: the word said wrong is red', (await p.$$eval('#ansBox .aw.wrongw', x => x.map(e => e.textContent).join())) === 'Pakpattan.');
  check('Mock: words not said are dull', (await p.locator('#ansBox .aw.notsaid').count()) > 5);
  await p.click('#ansBox .aw.wrongw');
  await wait(200);
  const tip = await p.evaluate(() => {
    const t = document.getElementById('wTip').getBoundingClientRect();
    const w = document.querySelector('#ansBox .aw.wrongw').getBoundingClientRect();
    return { text: document.getElementById('wTip').textContent, above: t.bottom <= w.top + 1 && t.bottom > w.top - 30, visible: t.height > 0 };
  });
  check(`Mock: tap a red word shows what was said just above it ("${tip.text}")`, tip.visible && tip.above && tip.text === 'You said "Lahore"');
  const row = await p.evaluate(() => ['.mctl .mnav', '#nBtn'].map(q => document.querySelector(q).getBoundingClientRect()));
  check('Mock: Previous and Next side by side', row[0].right <= row[1].left && Math.abs(row[0].top - row[1].top) < 4);
  check('Mock: tapping a red word shows the bubble, it does not start typing', !(await p.evaluate(() => document.getElementById('ansBox').isContentEditable)));
  const dimC = await p.$eval('#ansBox .aw.notsaid', e => getComputedStyle(e).color);
  const okC = await p.$eval('#ansBox .aw.said', e => getComputedStyle(e).color);
  check(`Mock: dull and dark colours differ (${dimC} vs ${okC})`, dimC !== okC);
}
check('Mock: voice never writes free text ("Python")', !/Python|Lahore/.test(shown));
// Score: one right sentence out of a long answer (other questions empty) is far from 10/10
const sc0 = await p.evaluate(async () => {
  window.mGo(Number(document.getElementById('qCount').textContent.split('/')[1]) - 1); // the last question
  await new Promise(r => setTimeout(r, 300));
  document.getElementById('nBtn').click();
  await new Promise(r => setTimeout(r, 500));
  const y = document.getElementById('dYes');
  if (y && !document.getElementById('dlg').classList.contains('hidden')) y.click();
  await new Promise(r => setTimeout(r, 600));
  return document.getElementById('score').textContent;
});
check(`Mock score counts every answer word, not only the right ones ("${sc0}")`, /^\d+ \/ 10$/.test(sc0.trim()) && parseInt(sc0, 10) < 5);
await p.evaluate(() => history.back());
await wait(500);
await p.evaluate(() => window.startMock());
await wait(400);
await pickMock('fresh');
await wait(1200);
if (await p.isVisible('#dlg')) {
  await p.click('#dYes');
  await wait(900);
}
await p.click('#ansBox');
check(
  'Mock: tapping the box starts typing',
  await p.evaluate(() => document.getElementById('ansBox').isContentEditable && document.activeElement.id === 'ansBox')
);
await p.keyboard.type(' Pakpatan');
await p.click('#qText');
await wait(200);
const typed = await p.evaluate(() => JSON.parse(localStorage.getItem('is_scr')).answers[0]);
check(`Mock: typed words are checked like spoken ones ("${typed}")`, intro ? /Pakpattan/.test(typed) : typed.length > 0);
await p.evaluate(() => window.editDetails());
await wait(400);
await p.fill('#sName', 'Sara Ali');
await p.click('#sNext');
await wait(150);
await p.click('#sNext');
await wait(700);
check('Edit my details: only one profile is kept', await p.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('is_profiles'))).join() === 'Sara Ali'));

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
