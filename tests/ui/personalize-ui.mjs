// Browser check for personalised answers: the "Personalize for <category>" sheet, session-only
// values, and Practice text == Mock expected text.
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/personalize-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const URL = process.env.UI_URL || 'http://localhost:4173/';
const out = [];
const check = (name, ok, got) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || got === undefined ? '' : `\n      got: ${got}`}`);
const wait = ms => new Promise(r => setTimeout(r, ms));

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 360, height: 640 } });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.goto(URL);
await p.evaluate(
  () =>
    new Promise(r => {
      localStorage.clear();
      const q = indexedDB.deleteDatabase('InterviewSimulator');
      q.onsuccess = q.onerror = q.onblocked = () => r();
    })
);
await p.evaluate(() => {
  const me = {
    name: 'Sara Ahmed',
    role: 'Software Engineer',
    roleKey: 'Software Engineer',
    edu: 'BSCS student',
    degree: 'BSCS student',
    city: 'Lahore',
    exp: 'fresher',
    skillTags: ['JavaScript', 'React', 'Python'],
    skills: 'JavaScript, React and Python',
    words: ['Sara', 'Ahmed', 'Lahore'],
    setup: 1
  };
  localStorage.setItem('is_profiles', JSON.stringify({ 'Sara Ahmed': me }));
  localStorage.setItem('is_active', JSON.stringify('Sara Ahmed'));
  localStorage.setItem('is_shuf', 'false');
});
await p.addInitScript(() => {
  window.__skipIntro = true;
});
await p.reload();
await wait(1200);
if (await p.isVisible('#iGo')) {
  await p.click('#iGo');
  await wait(600);
}

const sheetOpen = () => p.isVisible('#psheet');
const open = async c => {
  await p.evaluate(c => window.home(), c);
  await wait(300);
  if (await p.isVisible('#dlg')) {
    await p.click('#dYes'); // leave the Mock interview
    await wait(400);
  }
  await p.evaluate(c => window.pcGo(c, 0, 'fresher'), c);
  await wait(500);
};
// The Practice answer once it has typed in (letters get .in when shown).
const practiceText = async () => {
  await p.waitForFunction(() => [...document.querySelectorAll('#pA .c')].every(c => c.classList.contains('in')), null, { timeout: 30000 }).catch(() => {});
  return (await p.textContent('#pA')).replace(/\s+/g, ' ').trim();
};
const storage = () => p.evaluate(() => ({ profiles: localStorage.getItem('is_profiles'), all: JSON.stringify({ ...localStorage }) }));

// Generic and matching categories: no sheet
await open('situational');
check('generic category (Situational): no sheet', !(await sheetOpen()) && (await p.isVisible('#practice')));
check('generic category: no "Edit details" link', !(await p.isVisible('#pPers')));
await open('java');
check('matching role (Software Engineer -> Java, same family): no sheet', !(await sheetOpen()) && (await p.isVisible('#practice')));

// Mismatch: Customer Service
const before = await storage();
await open('customer');
check('mismatched category: sheet opens', await sheetOpen());
check(
  'sheet title and text',
  (await p.textContent('#psT')) === 'Personalize for Customer Service' &&
    /set for Software Engineer.*will not change your profile/.test(await p.textContent('#psM'))
);
const chips = await p.$$eval('#psChips button', x => x.map(e => e.textContent));
check(`chips from the suggested skills (${chips.slice(0, 3).join(', ')}...)`, chips.length >= 6 && !chips.includes('JavaScript'));
await p.click('#psUse');
await wait(200);
check('"Use these" with no skills: message, sheet stays open', (await sheetOpen()) && (await p.textContent('#psErr')) === 'Add at least one skill or tap Skip');
const btnH = await p.$eval('#psUse', e => e.getBoundingClientRect().height);
check(`buttons at least 44px (${btnH}px)`, btnH >= 44);
await p.click('#psChips button:nth-child(1)');
await p.fill('#psSkills', `${await p.inputValue('#psSkills')}, Patience`);
await p.fill('#psProj', 'a summer job at a call centre');
await p.click('#psUse');
await wait(600);
check('"Use these": sheet closes, Practice opens', !(await sheetOpen()) && (await p.isVisible('#practice')));
const pt = await practiceText();
check('answer uses the typed skills and project', /Patience/.test(pt) && /call centre/.test(pt) && /Customer Service Representative role/.test(pt), pt);
check('answer has no profile skills or role', !/JavaScript|React|Python|Software Engineer/.test(pt), pt);
check('"Edit details" link shown for a mismatched category', await p.isVisible('#pPers'));
const after = await storage();
check('profile storage identical after session values', after.profiles === before.profiles);
check('session values are never stored', !/Patience|call centre/.test(after.all));

// Practice text == Mock expected text (same question, same state)
await p.evaluate(() => {
  document.getElementById('cat').value = 'customer';
  document.getElementById('lvl').value = 'fresher';
  window.home();
});
await wait(200);
await p.evaluate(() => window.startInterview());
await wait(900);
check('Mock: no second sheet for the same category in this session', !(await sheetOpen()) && (await p.isVisible('#interview')));
const mq = await p.textContent('#qText');
await p.click('#ansBox');
await p.keyboard.type('Good');
await p.click('#qText');
await wait(300);
const mockRef = (await p.innerText('#ansBox')).replace(/\s+/g, ' ').trim();
check(`Practice text equals Mock expected text ("${mq.trim()}")`, mockRef === pt, `${mockRef}\n      practice: ${pt}`);

// Edit details reopens the sheet prefilled, profile untouched
await open('customer');
await p.click('#pPers');
await wait(300);
check('"Edit details" reopens the sheet prefilled', (await sheetOpen()) && /Patience/.test(await p.inputValue('#psSkills')));
await p.fill('#psSkills', 'Listening');
await p.click('#psUse');
await wait(600);
check('edited values show at once', /Listening/.test(await practiceText()));
check('profile still identical', (await storage()).profiles === before.profiles);

// A saved own answer always wins
await p.evaluate(() => window.editA());
await wait(300);
await p.fill('#pEdit', 'This is my own saved answer for this question.');
await p.evaluate(() => window.saveA());
await wait(800);
check('saved own answer wins over the sample', (await practiceText()) === 'This is my own saved answer for this question.');

// Skip: defaults, not asked again this session; asked again after a restart
await open('accounting');
check('another mismatched category: sheet opens', await sheetOpen());
await p.click('#psSkip');
await wait(600);
const acc = await practiceText();
check('Skip: category default skills', /Bookkeeping/.test(acc) && !/JavaScript/.test(acc), acc);
await open('accounting');
check('Skip: no sheet again in this session', !(await sheetOpen()));
await p.reload();
await wait(1500);
if (await p.isVisible('#iGo')) {
  await p.click('#iGo');
  await wait(600);
}
await open('accounting');
check('after a restart the sheet shows again', await sheetOpen());
await p.click('#psSkip');
await wait(400);
await open('customer');
check('after a restart session values are gone (sheet asks again)', (await sheetOpen()) && (await p.inputValue('#psSkills')) === '');

check('no page errors', errors.length === 0, errors.join(' | '));
await b.close();
console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`${out.length - fails}/${out.length} passed`);
if (fails) process.exit(1);
