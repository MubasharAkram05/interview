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

// ---- Home: parent tile grid
const tilesOf = box => p.$$eval(`${box} .pt2[data-p]`, x => x.map(e => e.dataset.p));
const parents = await tilesOf('#hPath');
check(`Home: ${parents.length} parent tiles (hidden ones have no types)`, parents.length === 20 && parents[0] === 'general' && !parents.includes('mobile'));
const kids = await p.$$eval('#hPath .pt2[data-p]', x => x.flatMap(e => (e.dataset.kids ? e.dataset.kids.split(' ') : [e.dataset.c])));
check(`Home: 26 types under the tiles (${kids.length}), HR Questions gone`, kids.length === 26 && new Set(kids).size === 26 && !kids.includes('hrq'));
check(
  'tile: short name, full name for screen readers, count badge',
  (await p.textContent('#hPath .pt2[data-p=general] .pl2')).trim() === 'General' &&
    /^General Interview, 3 types$/.test(await p.getAttribute('#hPath .pt2[data-p=general]', 'aria-label')) &&
    (await p.textContent('#hPath .pt2[data-p=general] .pbg')).trim() === '3'
);
check(
  'single-type tile: the type short name, no badge, no dropdown',
  (await p.textContent('#hPath .pt2[data-p=cloud] .pl2')).trim() === 'Cloud' &&
    (await p.getAttribute('#hPath .pt2[data-p=cloud]', 'aria-label')) === 'Cloud Engineer' &&
    !(await p.$('#hPath .pt2[data-p=cloud] .pbg')) &&
    !(await p.getAttribute('#hPath .pt2[data-p=cloud]', 'aria-expanded'))
);
check('no panel open at start', !(await p.$('#hPath .cpanel')) && (await p.locator('#hPath .pt2[aria-expanded=true]').count()) === 0);

// The panel must sit right after the last tile of the tapped tile's row.
const panelAt = box =>
  p.$eval(`${box} .pgrid2`, g => {
    const cols = getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length;
    const items = [...g.children];
    const panel = g.querySelector('.cpanel');
    const tiles = items.filter(e => e.classList.contains('pt2'));
    const before = panel ? items.indexOf(panel) : -1; // tiles before the panel
    const open = g.querySelector('.pt2[aria-expanded=true]');
    const i = tiles.indexOf(open);
    const end = Math.min(Math.floor(i / cols) * cols + cols - 1, tiles.length - 1);
    const pr = panel && panel.getBoundingClientRect();
    const tr = open && open.getBoundingClientRect();
    return {
      cols,
      ok: !!panel && before === end + 1,
      below: !!panel && pr.top >= tr.bottom - 1,
      full: !!panel && Math.abs(pr.width - g.getBoundingClientRect().width) < 1
    };
  });
for (const [name, id] of [
  ['first row', 'software'],
  ['middle row', 'itnet'],
  ['last row', 'finance']
]) {
  await p.click(`#hPath .pt2[data-p=${id}]`);
  await wait(300);
  const r = await panelAt('#hPath');
  check(`${name}: panel full width, under the row, after its last tile (${r.cols} columns)`, r.ok && r.below && r.full, JSON.stringify(r));
}
check('only one panel open at a time', (await p.locator('#hPath .cpanel').count()) === 1 && (await p.locator('#hPath .pt2[aria-expanded=true]').count()) === 1);
check('tapped tile highlighted', await p.$eval('#hPath .pt2[data-p=finance]', e => e.classList.contains('on')));
check(
  'panel: full parent name in its header and label',
  (await p.textContent('#hPath .cpanel h4')).trim() === 'Finance and Banking' &&
    (await p.getAttribute('#hPath .cpanel', 'aria-label')) === 'Finance and Banking'
);
const rows = await p.$$eval('#hPath .cpanel .cc', x =>
  x.map(e => [e.dataset.c, e.getBoundingClientRect().height, !!e.querySelector('.pc'), !!e.querySelector('.cpv')])
);
check('panel rows: icon, name, chevron, at least 48px', rows.length === 2 && rows.every(([, h, ic, ch]) => h >= 48 && ic && ch), JSON.stringify(rows));
await p.click('#hPath .pt2[data-p=finance]');
await wait(300);
check('tap the same tile: panel closes', !(await p.$('#hPath .cpanel')) && (await p.getAttribute('#hPath .pt2[data-p=finance]', 'aria-expanded')) === 'false');
// Keyboard
await p.focus('#hPath .pt2[data-p=general]');
await p.keyboard.press('Enter');
await wait(300);
check('keyboard: Enter opens a panel', (await p.getAttribute('#hPath .pt2[data-p=general]', 'aria-expanded')) === 'true');
await p.focus('#hPath .cpanel .cc');
await p.keyboard.press('Escape');
await wait(200);
check(
  'keyboard: Escape closes it and focus goes back to the tile',
  !(await p.$('#hPath .cpanel')) && (await p.evaluate(() => document.activeElement.dataset.p)) === 'general'
);
await p.click('#hPath .pt2[data-p=general]');
await wait(300);
await p.click('#hPath .cpanel .cc[data-c=fresh]');
await wait(300);
check('panel row opens the type', (await p.isVisible('#csheet')) && /^Fresh Graduate · /.test(await p.textContent('#csT')));
await p.evaluate(() => window.closeCS && window.closeCS());
await p.click('#hPath .pt2[data-p=cloud]');
await wait(300);
check('single-type tile opens the type directly', (await p.isVisible('#csheet')) && /^Cloud Engineer · /.test(await p.textContent('#csT')));
await p.evaluate(() => window.closeCS && window.closeCS());
await wait(200);

// ---- Search: a flat list above the grid
const search = async q => {
  await p.fill('#hSearch', q);
  await wait(250);
  return p.$$eval('#hPath .cres [data-c]', x => x.map(e => e.dataset.c));
};
check('search by role label ("ai engineer") finds Data and Analytics', (await search('ai engineer')).includes('data'));
check('search by parent label ("banking") finds both its types', (await search('banking')).join() === 'accounting,finance');
check('search by keyword ("call centre") finds Customer Service', (await search('call centre')).join() === 'customer');
await search('banking');
check(
  'results: parent name under each type, list above the grid',
  /Finance and Banking/.test(await p.textContent('#hPath .cres .cc[data-c=accounting] small')) &&
    (await p.$eval('#hPath', e => e.firstElementChild.classList.contains('cres'))) &&
    (await p.locator('#hPath .pgrid2 .pt2[data-p]').count()) === 20
);
await search('sql developer');
check('single result shows its parent as a subtitle', /Database/.test(await p.textContent('#hPath .cres [data-c=sql] small')));
await p.click('#hPath .cres [data-c=sql]');
await wait(300);
check('tapping a result opens the type', (await p.isVisible('#csheet')) && /^SQL Developer · /.test(await p.textContent('#csT')));
await p.evaluate(() => window.closeCS && window.closeCS());
await search('zzzz qqqq');
check('no match: "No category found"', (await p.textContent('#hPath .cpe')).trim() === 'No category found');
await search('');
check('clear search: list gone, grid stays', !(await p.$('#hPath .cres')) && (await tilesOf('#hPath')).length === 20);

// ---- Practice and Mock use the same grid
await p.evaluate(() => window.startPractice());
await wait(400);
check('Practice: same grid', (await tilesOf('#pPath')).length === 20);
await p.evaluate(() => window.startMock());
await wait(400);
check('Mock: same grid', (await tilesOf('#mGrid')).length === 20);
await p.click('#mGrid .pt2[data-p=software]');
await wait(300);
check('Mock: panel opens under its row', (await panelAt('#mGrid')).ok);
check('level tabs: only levels with questions (3 today)', (await p.locator('#mSeg button').count()) === 3);

// ---- Columns, sizes, labels and resize
await p.evaluate(() => window.home());
await wait(300);
await p.click('#hPath .pt2[data-p=sales]'); // single type: opens the sheet, no panel
await p.evaluate(() => window.closeCS && window.closeCS());
await p.click('#hPath .pt2[data-p=itnet]');
await wait(300);
// CI and some phones have a wider font than Inter: check the labels with a wide one too.
const wideFont = process.env.UI_WIDE_FONT !== '0';
if (wideFont) await p.addStyleTag({ content: '*{font-family:"DejaVu Sans",Verdana,sans-serif !important}' });
for (const [w, h, want] of [
  [360, 740, 4],
  [375, 740, 4],
  [412, 860, 4],
  [768, 1024, 6],
  [1024, 768, 8]
]) {
  await p.setViewportSize({ width: w, height: h });
  await wait(300);
  const r = await panelAt('#hPath');
  const sw = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  const m = await p.$$eval('#hPath .pt2', x => ({
    minH: Math.min(...x.map(e => e.getBoundingClientRect().height)),
    over: x
      .map(e => e.querySelector('.pl2'))
      .filter(
        l =>
          l.scrollWidth > l.clientWidth + 1 ||
          l.scrollHeight > l.clientHeight + 1 ||
          l.getBoundingClientRect().height > parseFloat(getComputedStyle(l).lineHeight) * 2 + 1
      )
      .map(l => l.textContent)
  }));
  check(`${w}px: ${want} columns (${r.cols}), no horizontal scroll`, r.cols === want && sw <= 0, sw);
  check(`${w}px: tiles at least 88px (${Math.round(m.minH)}px), no label overflows`, m.minH >= 88 && !m.over.length, m.over.join());
  check(`${w}px: open panel moved to the end of its row`, r.ok && r.below, JSON.stringify(r));
}
await p.setViewportSize({ width: 375, height: 740 });
await wait(200);
for (const theme of ['light', 'dark']) {
  await p.evaluate(t => (document.documentElement.dataset.theme = t), theme);
  await wait(100);
  const c = await p.$eval('#hPath .cpanel .cc .cpt', e => {
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
    const bg = lum(getComputedStyle(e.closest('.cpin')).backgroundColor);
    return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
  });
  const t = await p.$eval('#hPath .pt2[data-p=general] .pl2', e => {
    const lum = s => {
      const [r, g, b2] = s
        .match(/\d+(\.\d+)?/g)
        .map(Number)
        .slice(0, 3)
        .map(v => v / 255)
        .map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b2;
    };
    return (lum(getComputedStyle(document.querySelector('.app')).backgroundColor) + 0.05) / (lum(getComputedStyle(e).color) + 0.05);
  });
  check(`${theme} mode: panel row ${c.toFixed(1)}:1 and tile label ${(t < 1 ? 1 / t : t).toFixed(1)}:1 (at least 4.5)`, c >= 4.5 && (t < 1 ? 1 / t : t) >= 4.5);
}
await p.evaluate(() => (document.documentElement.dataset.theme = 'light'));

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
