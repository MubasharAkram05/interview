// Browser check of the parent groups (src/data/parents.js) on Home, Practice and Mock, the Home
// search, the searchable role list, and an old saved session of the removed HR Questions type.
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/parents-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
import { PARENTS } from '../../src/data/parents.js';
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
// UI_FONT=dejavu: run with the wide fallback font of the CI machine (it has no Inter).
if (process.env.UI_FONT === 'dejavu')
  await p.addInitScript(() =>
    document.addEventListener('DOMContentLoaded', () => {
      const st = document.createElement('style');
      st.textContent = '*{font-family:"DejaVu Sans" !important}';
      document.head.appendChild(st);
    })
  );
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
check(
  `Home: ${parents.length} parent tiles (hidden ones have no types)`,
  parents.length === 23 && parents[0] === 'general' && parents.includes('mobile') && !parents.includes('game')
);
const kids = await p.$$eval('#hPath .pt2[data-p]', x => x.flatMap(e => (e.dataset.kids ? e.dataset.kids.split(' ') : [e.dataset.c])));
check(`Home: 61 types under the tiles (${kids.length}), HR Questions gone`, kids.length === 61 && new Set(kids).size === 61 && !kids.includes('hrq'));
check(
  'tile: readable name under the icon, no count anywhere on the tiles',
  (await p.textContent('#hPath .pt2[data-p=general] .pl2')).trim() === 'General Interview' &&
    !(await p.$('#hPath .pt2 .pbg')) &&
    (await p.$$eval('#hPath .pt2', x => x.every(e => !/\d/.test(e.textContent) && !/\d/.test(e.getAttribute('aria-label') || ''))))
);
check(
  'single-type tile: its name, no list',
  (await p.textContent('#hPath .pt2[data-p=graphic] .pl2')).trim() === 'Graphic Design' &&
    (await p.getAttribute('#hPath .pt2[data-p=graphic]', 'data-c')) === 'graphic' &&
    !(await p.getAttribute('#hPath .pt2[data-p=graphic]', 'aria-expanded'))
);
check('no list open at start', !(await p.$('.cpop')) && (await p.locator('#hPath .pt2[aria-expanded=true]').count()) === 0);

// Tile boxes on the page (relative to the screen content, so a scroll by the test itself is not a
// shift; any move of a tile inside the content is).
const rects = box =>
  p.$$eval(`${box} .pt2`, x => {
    const m = document.getElementById('main');
    return x.map(e => {
      const r = e.getBoundingClientRect();
      return JSON.stringify([r.left, r.top + m.scrollTop, r.width, r.height].map(v => Math.round(v * 100) / 100));
    });
  });
const popInfo = () =>
  p.evaluate(() => {
    const d = document.querySelector('.cpop');
    if (!d) return null;
    const r = d.getBoundingClientRect();
    const view = document.getElementById('main').getBoundingClientRect();
    const tile = document.querySelector('.pt2[aria-expanded=true]').getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return {
      w: r.width,
      inX: r.left >= 0 && r.right <= innerWidth,
      inGutter: r.left >= 15.5 && r.right <= innerWidth - 15.5,
      inView: r.top >= view.top - 0.5 && r.bottom <= view.bottom + 0.5,
      onTop: d.contains(hit),
      up: d.classList.contains('up'),
      below: r.top >= tile.bottom,
      above: r.bottom <= tile.top,
      dl: Math.round(r.left - tile.left),
      dr: Math.round(r.right - tile.right),
      dc: Math.round(r.left + r.width / 2 - (tile.left + tile.width / 2)),
      text: d.textContent,
      rowTexts: [...d.querySelectorAll('.cc')].map(b => b.textContent.trim()),
      chev: !!d.querySelector('.cpv'),
      head: !!d.querySelector('h1,h2,h3,h4,h5,h6'),
      rows: [...d.querySelectorAll('.cc')].map(b => [
        b.getBoundingClientRect().height,
        b.querySelector('.pc').getBoundingClientRect().width,
        parseFloat(getComputedStyle(b).fontSize)
      ])
    };
  });
const scrollTop = () => p.evaluate(() => document.getElementById('hSearch').scrollIntoView());
await scrollTop();
await wait(200);
for (const [name, id] of [
  ['left', 'general'],
  ['middle', 'software'],
  ['right', 'web']
]) {
  // The tile near the top of the screen, so the list has room below it.
  await p.$eval(`#hPath .pt2[data-p=${id}]`, e => e.scrollIntoView({ block: 'start' }));
  // Wait until the page is still (the Home cards above finish loading), then measure.
  let before = await rects('#hPath');
  for (let n = 0; n < 20; n++) {
    await wait(150);
    const again = await rects('#hPath');
    if (JSON.stringify(again) === JSON.stringify(before)) break;
    before = again;
  }
  await p.click(`#hPath .pt2[data-p=${id}]`);
  await wait(300);
  const during = await rects('#hPath');
  const r = await popInfo();
  check(
    `${name} tile: opening the list moves no tile`,
    JSON.stringify(before) === JSON.stringify(during),
    before.map((b, k) => (b === during[k] ? '' : `${k}: ${b} -> ${during[k]}`)).filter(Boolean)[0]
  );
  check(
    `${name} tile: list under the tile, on top of the rows below, not clipped, inside the gutters, ${Math.round(r.w)}px wide`,
    r.below && r.onTop && r.inView && r.inX && r.inGutter && r.w >= 180 && r.w <= 260,
    JSON.stringify(r)
  );
  const aligned = name === 'left' ? r.dl === 0 : name === 'right' ? r.dr === 0 : Math.abs(r.dc) <= 1;
  check(`${name} tile: list ${name === 'middle' ? 'centred on' : `${name} aligned with`} the tile`, aligned, JSON.stringify([r.dl, r.dc, r.dr]));
  check(
    `${name} tile: rows 28px icon, 15px text, at least 44px, no chevron, no title, no parent name`,
    r.rows.every(([h, ic, fs]) => h >= 44 && Math.round(ic) === 28 && fs === 15) &&
      !r.chev &&
      !r.head &&
      !/General Interview|Software Development/.test(r.text) &&
      !r.rowTexts.some(t => ['General Interview', 'Software Development', 'Cloud'].includes(t)),
    JSON.stringify(r)
  );
  await p.keyboard.press('Escape');
  await wait(200);
  check(
    `${name} tile: Escape closes it, focus back on the tile, no tile moved`,
    !(await p.$('.cpop')) &&
      (await p.evaluate(() => document.activeElement.dataset.p)) === id &&
      JSON.stringify(await rects('#hPath')) === JSON.stringify(before)
  );
}
check('a tile with a list: aria-expanded and aria-controls', (await p.getAttribute('#hPath .pt2[data-p=general]', 'aria-controls')) === 'hPath-pop');
await p.click('#hPath .pt2[data-p=general]');
await wait(250);
check(
  'list has a label (for screen readers) and the tile is highlighted',
  (await p.getAttribute('.cpop', 'aria-label')) === 'General Interview' &&
    (await p.$eval('#hPath .pt2[data-p=general]', e => e.classList.contains('on') && e.getAttribute('aria-expanded') === 'true'))
);
check('list rows can take focus (first row focused)', await p.evaluate(() => document.activeElement.closest('.cpop') !== null));
await p.click('#hPath .pt2[data-p=software]');
await wait(250);
check(
  'another tile: this list closes, the other opens (one at a time)',
  (await p.locator('.cpop').count()) === 1 &&
    (await p.getAttribute('#hPath .pt2[data-p=general]', 'aria-expanded')) === 'false' &&
    (await p.getAttribute('#hPath .pt2[data-p=software]', 'aria-expanded')) === 'true'
);
await p.click('#hPath .pt2[data-p=software]');
await wait(200);
check('tap the same tile: it closes', !(await p.$('.cpop')));
// Outside tap: only closes (the single-type tile under the tap does not open its type).
await p.click('#hPath .pt2[data-p=software]');
await wait(250);
// A single-type tile that the list does not cover (the list is wider with some fonts).
const spot = await p.evaluate(() => {
  const r = document.querySelector('.cpop').getBoundingClientRect();
  const view = document.getElementById('main').getBoundingClientRect();
  for (const t of document.querySelectorAll('#hPath .pt2.cc1')) {
    const b = t.getBoundingClientRect();
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const covered = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    if (!covered && y > view.top && y < view.bottom) return { x, y, c: t.dataset.c };
  }
  return null;
});
await p.mouse.click(spot.x, spot.y);
await wait(300);
check(`outside tap only closes the list (the ${spot.c} tile under it does not open)`, !(await p.$('.cpop')) && !(await p.isVisible('#csheet')));
// Back button closes the list first, the screen stays.
await p.click('#hPath .pt2[data-p=general]');
await wait(250);
await p.evaluate(() => window.hwBack());
await wait(200);
check('back button closes the list first, still on Home', !(await p.$('.cpop')) && (await p.isVisible('#home')));
await p.click('#hPath .pt2[data-p=general]');
await wait(250);
await p.click('.cpop .cc[data-c=fresh]');
await wait(300);
check(
  'choosing a type closes the list and opens the type',
  !(await p.$('.cpop')) && (await p.isVisible('#csheet')) && /^Fresh Graduate · /.test(await p.textContent('#csT'))
);
await p.evaluate(() => window.closeCS && window.closeCS());
await p.$eval('#hPath .pt2[data-p=graphic]', e => e.scrollIntoView({ block: 'center' }));
await wait(200);
await p.click('#hPath .pt2[data-p=graphic]');
await wait(300);
check('single-type tile opens the type directly', (await p.isVisible('#csheet')) && /^Graphic Design · /.test(await p.textContent('#csT')));
await p.evaluate(() => window.closeCS && window.closeCS());
await wait(200);

// PR C and PR D: these parents hold 5 types each and open a list.
for (const [id, list] of [
  ['software', 'software,java,cpp,python,dotnet'],
  ['web', 'web,frontend,backend,fullstack,wordpress'],
  ['mobile', 'mobile,android,flutter,rn,ios'],
  ['data', 'data,analyst,bidev,datasci,dataeng'],
  ['ai', 'aiml,mleng,genai,cv,nlp'],
  ['database', 'dbgen,sql,dba,etl,nosql']
]) {
  await p.$eval(`#hPath .pt2[data-p=${id}]`, e => e.scrollIntoView({ block: 'center' }));
  await wait(200);
  const multi = (await p.getAttribute(`#hPath .pt2[data-p=${id}]`, 'data-kids')) === list.replace(/,/g, ' ');
  await p.click(`#hPath .pt2[data-p=${id}]`);
  await wait(300);
  const rows = await p.$$eval('.cpop [data-c]', x => x.map(e => e.dataset.c));
  check(`${id}: tile opens a list of its 5 types (${rows.join()})`, multi && rows.join() === list);
  const cut = await p.$$eval('.cpop .cpt', x =>
    x
      .filter(e => {
        const lines = Math.round(e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight));
        return lines > 2 || e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1;
      })
      .map(e => e.textContent)
  );
  check(`${id}: long names wrap to at most 2 lines, nothing cut`, !cut.length, cut.join());
  await p.keyboard.press('Escape');
  await wait(200);
}
check(
  'Mobile list: first row named like the parent, long names wrap',
  await (async () => {
    await p.$eval('#hPath .pt2[data-p=mobile]', e => e.scrollIntoView({ block: 'center' }));
    await wait(200);
    await p.click('#hPath .pt2[data-p=mobile]');
    await wait(300);
    const first = (await p.textContent('.cpop [data-c=mobile]')).trim();
    const lines = await p.$eval('.cpop [data-c=mobile] .cpt', e => Math.round(e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight)));
    await p.keyboard.press('Escape');
    await wait(200);
    return first === 'Mobile App Development' && lines >= 1 && lines <= 2;
  })()
);
check(
  'AI and Database lists: first row named like the parent',
  await (async () => {
    await p.click('#hPath .pt2[data-p=ai]');
    await wait(300);
    const a = (await p.textContent('.cpop [data-c=aiml]')).trim();
    await p.keyboard.press('Escape');
    await wait(200);
    await p.click('#hPath .pt2[data-p=database]');
    await wait(300);
    const d = (await p.textContent('.cpop [data-c=dbgen]')).trim();
    await p.click('.cpop [data-c=dbgen]');
    await wait(300);
    const opened = (await p.isVisible('#csheet')) && /^Database · /.test(await p.textContent('#csT'));
    await p.evaluate(() => window.closeCS && window.closeCS());
    await wait(200);
    return a === 'AI and Machine Learning' && d === 'Database' && opened;
  })()
);

// A tile near the bottom navigation: the list opens upward and stays fully visible.
await p.evaluate(() => {
  const m = document.getElementById('main');
  const t = document.querySelector('#hPath .pt2[data-p=finance]');
  m.scrollTop += t.getBoundingClientRect().bottom - m.getBoundingClientRect().bottom + 2;
});
await wait(250);
const nearBefore = await rects('#hPath');
await p.click('#hPath .pt2[data-p=finance]');
await wait(300);
const nb = await popInfo();
const navTop = await p.evaluate(() => document.querySelector('nav').getBoundingClientRect().top);
const popBottom = await p.$eval('.cpop', e => e.getBoundingClientRect().bottom);
check(
  'near the bottom: opens upward, fully visible, above the bottom navigation',
  nb.up && nb.above && nb.inView && nb.onTop && popBottom <= navTop,
  JSON.stringify(nb)
);
check('near the bottom: no tile moved', JSON.stringify(nearBefore) === JSON.stringify(await rects('#hPath')));
await p.keyboard.press('Escape');

// ---- Search: a flat list above the grid
const search = async q => {
  await p.fill('#hSearch', q);
  await wait(250);
  return p.$$eval('#hPath .cres [data-c]', x => x.map(e => e.dataset.c));
};
check('search by role label ("ai engineer") finds Data and Analytics', (await search('ai engineer')).includes('data'));
check('search by parent label ("banking") finds both its types', (await search('banking')).join() === 'accounting,finance');
check('search by keyword ("call centre") finds Customer Service', (await search('call centre')).join() === 'customer');
check(
  'search: new roles by keyword (MongoDB, Power BI, LLM, ETL)',
  (await search('mongodb')).join() === 'nosql' &&
    (await search('power bi')).join() === 'analyst,bidev' &&
    (await search('llm')).join() === 'genai' &&
    (await search('etl')).includes('etl')
);
await search('banking');
check(
  'results: parent name under each type, list above the grid',
  /Finance and Banking/.test(await p.textContent('#hPath .cres .cc[data-c=accounting] small')) &&
    (await p.$eval('#hPath', e => e.firstElementChild.classList.contains('cres'))) &&
    (await p.locator('#hPath .pgrid2 .pt2[data-p]').count()) === 23
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
check('clear search: list gone, grid stays', !(await p.$('#hPath .cres')) && (await tilesOf('#hPath')).length === 23);

// ---- Practice and Mock use the same grid and list
await p.evaluate(() => window.startPractice());
await wait(400);
check('Practice: same grid', (await tilesOf('#pPath')).length === 23);
await p.click('#pPath .pt2[data-p=software]');
await wait(250);
check('Practice: same floating list', (await p.locator('#pPath .cpop .cc').count()) === 5);
await p.keyboard.press('Escape');
await p.evaluate(() => window.startMock());
await wait(400);
check('Mock: same grid', (await tilesOf('#mGrid')).length === 23);
const mBefore = await rects('#mGrid');
await p.click('#mGrid .pt2[data-p=software]');
await wait(250);
check(
  'Mock: list opens, no tile moves',
  (await p.locator('#mGrid .cpop .cc').count()) === 5 && JSON.stringify(mBefore) === JSON.stringify(await rects('#mGrid'))
);
await p.keyboard.press('Escape');
check('level tabs: only levels with questions (3 today)', (await p.locator('#mSeg button').count()) === 3);

// ---- Columns, sizes, labels and resize
await p.evaluate(() => window.home());
await wait(300);
// Every tile name of the config (shown or not yet shown), at 13px in a real tile: at most 2 lines,
// no word cut or clipped, no ellipsis; icons at least 76px.
const ALL = PARENTS.map(x => x.tileLabel);
for (const w of [360, 375, 412]) {
  await p.setViewportSize({ width: w, height: 800 });
  await wait(250);
  const r = await p.evaluate(names => {
    const g = document.querySelector('#hPath .pgrid2');
    const icon = Math.min(...[...g.querySelectorAll('.pt2 .pc')].map(e => e.getBoundingClientRect().width));
    const probe = g.querySelector('.pt2').cloneNode(true);
    g.appendChild(probe);
    const l = probe.querySelector('.pl2');
    // Inter (when the phone has it) and Liberation Sans (Arial / Roboto-like widths, on every test
    // machine): the names must fit at 13px with both.
    const fonts = ['Liberation Sans', ...(document.fonts.check('600 13px Inter') ? ['Inter'] : [])];
    const bad = fonts.flatMap(f =>
      names
        .filter(n => {
          l.style.fontSize = '';
          l.style.setProperty('font-family', `"${f}"`, 'important');
          l.textContent = n;
          const lh = parseFloat(getComputedStyle(l).lineHeight);
          const lines = Math.round(l.scrollHeight / lh);
          return lines > 2 || l.scrollWidth > l.clientWidth + 1 || l.scrollHeight > l.clientHeight + 1 || getComputedStyle(l).fontSize !== '13px';
        })
        .map(n => `${n} (${f})`)
    );
    probe.remove();
    return { icon, bad };
  }, ALL);
  check(`${w}px: icons at least 76px (${Math.round(r.icon)}px)`, r.icon >= 76);
  check(`${w}px: all ${ALL.length} tile names fit in 2 lines at 13px, no cut word`, !r.bad.length, r.bad.join(', '));
}
// CI and some phones have a wider font than Inter: check the labels with a wide one too.
await p.addStyleTag({ content: '*{font-family:"DejaVu Sans",Verdana,sans-serif !important}' });
for (const [w, h, want] of [
  [360, 740, 3],
  [375, 740, 3],
  [412, 860, 3],
  [768, 1024, 4],
  [1024, 768, 6]
]) {
  await p.setViewportSize({ width: w, height: h });
  await wait(300);
  await scrollTop();
  const cols = await p.$eval('#hPath .pgrid2', g => getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length);
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
  check(`${w}px: ${want} columns (${cols}), no horizontal scroll`, cols === want && sw <= 0, sw);
  check(`${w}px: tiles at least 128px (${Math.round(m.minH)}px), no label overflows (wide font)`, m.minH >= 128 && !m.over.length, m.over.join());
  // Right-column tile: the list stays on screen; then a resize moves it with its tile.
  const right = await p.evaluate(n => document.querySelectorAll('#hPath .pt2')[n - 1].dataset.p, cols);
  const multi = await p.$(`#hPath .pt2[data-p=${right}][aria-expanded]`);
  const id = multi ? right : 'software';
  await p.click(`#hPath .pt2[data-p=${id}]`);
  await wait(250);
  const r = await popInfo();
  check(`${w}px: list ${Math.round(r.w)}px wide, inside the screen and gutters`, r.inX && r.inGutter && r.w >= 180 && r.w <= 260, JSON.stringify(r));
  await p.keyboard.press('Escape');
}
await p.setViewportSize({ width: 375, height: 740 });
await wait(200);
await scrollTop();
await p.click('#hPath .pt2[data-p=itnet]');
await wait(250);
await p.setViewportSize({ width: 768, height: 1024 });
await wait(300);
const rz = await popInfo();
check('rotation or resize: the open list moves with its tile', rz && (rz.below || rz.above) && rz.inX && rz.inGutter, JSON.stringify(rz));
await p.keyboard.press('Escape');
await p.setViewportSize({ width: 375, height: 740 });
await wait(200);
for (const theme of ['light', 'dark']) {
  await p.evaluate(t => (document.documentElement.dataset.theme = t), theme);
  await scrollTop();
  await p.click('#hPath .pt2[data-p=general]');
  await wait(250);
  const lum = `s => { const [r, g, b2] = s.match(/\\d+(\\.\\d+)?/g).map(Number).slice(0, 3).map(v => v / 255).map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b2; }`;
  const [c, t] = await p.evaluate(src => {
    const L = eval(src);
    const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    const row = document.querySelector('.cpop .cc .cpt');
    const label = document.querySelector('#hPath .pt2[data-p=web] .pl2');
    return [
      ratio(L(getComputedStyle(row).color), L(getComputedStyle(document.querySelector('.cpop')).backgroundColor)),
      ratio(L(getComputedStyle(label).color), L(getComputedStyle(document.querySelector('.app')).backgroundColor))
    ];
  }, lum);
  check(`${theme} mode: list row ${c.toFixed(1)}:1 and tile label ${t.toFixed(1)}:1 (at least 4.5)`, c >= 4.5 && t >= 4.5);
  await p.keyboard.press('Escape');
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
check(
  'typing filters the roles (matching group and the current one kept)',
  opts.includes('Cyber Security') && opts.includes('SOC Analyst') && opts.includes('HR') && !opts.includes('Software Engineer'),
  opts.join()
);
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
