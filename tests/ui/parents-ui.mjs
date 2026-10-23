// Browser check of the parent groups (src/data/parents.js) on Home, Practice and Mock, the Home
// search, the searchable role list, and an old saved session of the removed HR Questions type.
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/parents-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const URL = process.env.UI_URL || 'http://localhost:4173/';
const out = [];
const check = (name, ok, got) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || got === undefined ? '' : `\n      got: ${got}`}`);
const wait = ms => new Promise(r => setTimeout(r, ms));

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 740 }, hasTouch: true });
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.goto(URL);
await wait(1500); // the first start on an empty phone writes the version marker
await p.evaluate(
  () =>
    new Promise(r => {
      localStorage.clear();
      const q = indexedDB.deleteDatabase('InterviewSimulator');
      q.onsuccess = q.onerror = q.onblocked = () => r();
    })
);
const ME = {
  name: 'Sara Ahmed',
  role: 'HR',
  roleKey: 'HR',
  edu: 'BBA',
  city: 'Lahore',
  exp: 'fresher',
  skillTags: ['Recruitment'],
  skills: 'Recruitment',
  words: [],
  setup: 1
};
await p.evaluate(me => {
  localStorage.setItem('is_profiles', JSON.stringify({ 'Sara Ahmed': me }));
  localStorage.setItem('is_active', JSON.stringify('Sara Ahmed'));
  localStorage.setItem('is_dv', '2'); // a version 2 phone
  // An open Mock session and history of the removed HR Questions type.
  localStorage.setItem(
    'is_scr',
    JSON.stringify({
      s: 'interview',
      cat: 'hrq',
      lv: 'fresher',
      idx: 0,
      cur: [{ i: 4, q: 'Are you willing to relocate or travel for this job?', a: 'Yes.' }],
      answers: [''],
      heard: [[]],
      ok: [[]]
    })
  );
  localStorage.setItem(
    'is_hist',
    JSON.stringify([{ ts: 1, ck: 'hrq', lk: 'fresher', c: 'HR Questions · Fresher', s: 6, a: 1, t: 10, d: '10/20/2026', n: 'Sara Ahmed' }])
  );
}, ME);
await p.addInitScript(() => {
  window.__skipIntro = true;
});
await p.reload();
await wait(1500);

// ---- Old HR Questions session and history open as Fresh Graduate
check('old HR Questions Mock session opens', await p.isVisible('#interview'));
check('its question is shown', /relocate/.test(await p.textContent('#qText')));
const st = await p.evaluate(() => ({
  scr: JSON.parse(localStorage.getItem('is_scr')),
  hist: JSON.parse(localStorage.getItem('is_hist')),
  dv: localStorage.getItem('is_dv')
}));
check('saved session and history now point at Fresh Graduate, marker 3', st.scr.cat === 'fresh' && st.hist[0].ck === 'fresh' && st.dv === '3');
await p.evaluate(() => window.home());
await wait(300);
if (await p.isVisible('#dlg')) {
  await p.click('#dYes');
  await wait(400);
}

// ---- Home: parent groups
const parents = await p.$$eval('#hPath .cp[data-p]', x => x.map(e => e.dataset.p));
check(`Home: ${parents.length} parents shown (hidden ones have no types)`, parents.length === 20 && parents[0] === 'general' && !parents.includes('mobile'));
const types = await p.$$eval('#hPath [data-c]', x => x.map(e => e.dataset.c));
check(`Home: 26 types (${types.length}), HR Questions gone`, types.length === 26 && !types.includes('hrq'));
check('Home: count shown on a group', /General Interview\s*\(3\)/.test(await p.textContent('#hPath .cp[data-p=general]')));
check(
  'Home: single-type parent shows the type name',
  (await p.textContent('#hPath .cp[data-p=cloud]')).trim() === 'Cloud Engineer' && !(await p.getAttribute('#hPath .cp[data-p=cloud]', 'aria-expanded'))
);
check('Home: groups closed at start', (await p.locator('#hPath .cp[aria-expanded=true]').count()) === 0 && !(await p.isVisible('#hPath .cc[data-c=fresh]')));
await p.click('#hPath .cp[data-p=general]');
await wait(300);
check(
  'tap a group: it opens with its types',
  (await p.getAttribute('#hPath .cp[data-p=general]', 'aria-expanded')) === 'true' && (await p.isVisible('#hPath .cc[data-c=fresh]'))
);
await p.click('#hPath .cp[data-p=software]');
await wait(300);
check(
  'only one group open at a time',
  (await p.getAttribute('#hPath .cp[data-p=general]', 'aria-expanded')) === 'false' &&
    (await p.getAttribute('#hPath .cp[data-p=software]', 'aria-expanded')) === 'true' &&
    !(await p.isVisible('#hPath .cc[data-c=fresh]'))
);
const rot = await p.$eval('#hPath .cp[data-p=software] .cpv', e => getComputedStyle(e).transform);
check('chevron turns on the open group', rot !== 'none', rot);
await p.click('#hPath .cp[data-p=software]');
await wait(300);
check('tap again: it closes', (await p.getAttribute('#hPath .cp[data-p=software]', 'aria-expanded')) === 'false');
// Keyboard: Tab to a group and press Enter.
await p.focus('#hPath .cp[data-p=itnet]');
await p.keyboard.press('Enter');
await wait(300);
check('keyboard: Enter opens a group', (await p.getAttribute('#hPath .cp[data-p=itnet]', 'aria-expanded')) === 'true');
await p.keyboard.press('Tab');
check('keyboard: Tab goes into the open group', (await p.evaluate(() => document.activeElement.dataset.c)) === 'it');
const sizes = await p.$$eval('#hPath .cp, #hPath .cc', x =>
  x.filter(e => e.offsetParent && getComputedStyle(e.parentElement).visibility !== 'hidden').map(e => e.getBoundingClientRect().height)
);
check(`tap targets at least 44px (smallest ${Math.min(...sizes)}px)`, Math.min(...sizes) >= 44);
await p.click('#hPath .cp[data-p=cloud]');
await wait(300);
check('single-type parent opens the type directly', (await p.isVisible('#csheet')) && /^Cloud Engineer · /.test(await p.textContent('#csT')));
await p.evaluate(() => window.closeCS && window.closeCS());
await wait(200);

// ---- Search
const search = async q => {
  await p.fill('#hSearch', q);
  await wait(250);
  return p.$$eval('#hPath [data-c]', x => x.map(e => e.dataset.c));
};
check('search by role label ("ai engineer") finds Data and Analytics', (await search('ai engineer')).includes('data'));
check('search by parent label ("banking") finds both its types', (await search('banking')).join() === 'accounting,finance');
check('search by keyword ("call centre") finds Customer Service', (await search('call centre')).join() === 'customer');
await search('banking');
check(
  'results: open group, parent name under each type',
  (await p.getAttribute('#hPath .cp[data-p=finance]', 'aria-expanded')) === 'true' &&
    /Finance and Banking/.test(await p.textContent('#hPath .cc[data-c=accounting] small'))
);
await search('sql developer');
check('single result shows its parent as a subtitle', /Database/.test(await p.textContent('#hPath [data-c=sql] small')));
await p.click('#hPath [data-c=sql]');
await wait(300);
check('tapping a result opens the type', (await p.isVisible('#csheet')) && /^SQL Developer · /.test(await p.textContent('#csT')));
await p.evaluate(() => window.closeCS && window.closeCS());
await search('zzzz qqqq');
check('no match: "No category found"', (await p.textContent('#hPath .cpe')).trim() === 'No category found');
await search('');
check('clear search: all groups back, closed', (await p.$$eval('#hPath .cp[data-p]', x => x.length)) === 20);

// ---- Practice and Mock use the same picker
await p.evaluate(() => window.startPractice());
await wait(400);
check('Practice: grouped picker', (await p.$$eval('#pPath .cp[data-p]', x => x.length)) === 20);
await p.evaluate(() => window.startMock());
await wait(400);
check('Mock: grouped picker', (await p.$$eval('#mGrid .cp[data-p]', x => x.length)) === 20);
check('level tabs: only levels with questions (3 today)', (await p.locator('#mSeg button').count()) === 3);

// ---- Layout: phone, tablet, desktop; light and dark
for (const [w, h] of [
  [375, 740],
  [768, 1024],
  [1024, 768]
]) {
  await p.setViewportSize({ width: w, height: h });
  await p.evaluate(() => window.home());
  await wait(300);
  const sw = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  check(`${w}px: no horizontal scroll`, sw <= 0, sw);
}
for (const theme of ['light', 'dark']) {
  await p.evaluate(t => (document.documentElement.dataset.theme = t), theme);
  await wait(100);
  const c = await p.$eval('#hPath .cp[data-p=general] .cpt', e => {
    const lum = s => {
      const [r, g, b2] = s
        .match(/\d+(\.\d+)?/g)
        .map(Number)
        .slice(0, 3)
        .map(v => v / 255)
        .map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b2;
    };
    const fg = lum(getComputedStyle(e).color);
    const bg = lum(getComputedStyle(e.closest('.cpg')).backgroundColor);
    return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
  });
  check(`${theme} mode: group label contrast ${c.toFixed(1)}:1 (at least 4.5)`, c >= 4.5);
}

// ---- Profile role list: searchable, grouped, same values
const before = await p.evaluate(() => localStorage.getItem('is_profiles'));
await p.evaluate(() => window.editDetails());
await wait(400);
if (await p.isVisible('#sNext')) {
  await p.click('#sNext');
  await wait(300);
}
const groupsR = await p.$$eval('#sRole optgroup', x => x.map(e => e.label));
check('roles grouped by parent', groupsR[0] === 'General Interview' && groupsR.includes('Software Development') && groupsR.at(-1) === 'More roles');
check('current role still selected', (await p.inputValue('#sRole')) === 'HR');
await p.fill('#sRoleQ', 'cyber');
await wait(200);
const opts = await p.$$eval('#sRole option', x => x.map(e => e.value).filter(Boolean));
check('typing filters the roles (current one kept)', opts.includes('Cyber Security') && opts.length <= 2, opts.join());
await p.fill('#sRoleQ', 'graphic');
await wait(200);
check('one match: picked', (await p.inputValue('#sRole')) === 'Graphic Designer');
await p.fill('#sRoleQ', '');
await wait(200);
const all = await p.$$eval('#sRole option', x => x.map(e => e.value).filter(Boolean));
check(
  `every role value still offered (${all.length})`,
  all.includes('Software Engineer') && all.includes('Fresher/General') && all.includes('Other') && all.includes('HR')
);
await p.evaluate(() => history.back());
await wait(400);
check('profile storage unchanged (no save)', (await p.evaluate(() => localStorage.getItem('is_profiles'))) === before);

// ---- No new storage keys
const keys = await p.evaluate(() => Object.keys(localStorage));
const known = [
  'is_profiles',
  'is_active',
  'is_hist',
  'is_fav',
  'is_edits',
  'is_qedits',
  'is_custom',
  'is_hidden',
  'is_theme',
  'is_scr',
  'is_pf',
  'is_pclv',
  'is_voice_accent',
  'is_voice_mem',
  'is_pbest',
  'is_qotd',
  'is_qstreak',
  'is_dv',
  'is_voice_smart',
  'is_voice_words'
]; // the last two: old keys, deleted at start
check(
  'no new storage keys',
  keys.every(k => known.includes(k)),
  keys.filter(k => !known.includes(k)).join()
);

check('no page errors', errors.length === 0, errors.join(' | '));
await b.close();
console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`${out.length - fails}/${out.length} passed`);
if (fails) process.exit(1);
