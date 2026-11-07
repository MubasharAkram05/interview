// Banner slot in the browser: open / close animation (350 ms ease-out), reduced motion, and the
// slot layout on Home, Practice, Mock, Mock interview, Results and Profile in light and dark
// mode, with the normal and the wide (DejaVu) font. The slot logic itself (network, idle,
// busy, consent) is unit-tested in tests/ads; the web build has no native banner.
//   npm run build && npx vite preview --port 4173 &   then  node tests/ui/adslot-ui.mjs
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));
const URL = process.env.UI_URL || 'http://localhost:4173/';
const out = [];
const check = (name, ok, info = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !info ? '' : '  ' + info}`);
const b = await chromium.launch();
const SLOT = 68;
const ME = {
  name: 'Alex',
  role: 'Software Engineer',
  roleKey: 'Software Engineer',
  edu: 'BS Computer Science',
  degree: 'BS Computer Science',
  city: 'Lahore',
  exp: 'fresher',
  skillTags: ['JavaScript'],
  skills: 'JavaScript',
  words: ['Alex'],
  setup: 1
};

async function open({ font = 'normal', reduced = false } = {}) {
  const p = await b.newPage({ viewport: { width: 360, height: 640 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  await p.goto(URL);
  await p.evaluate(me => {
    localStorage.clear();
    localStorage.setItem('is_profiles', JSON.stringify({ Alex: me }));
    localStorage.setItem('is_active', JSON.stringify('Alex'));
  }, ME);
  if (font === 'dejavu')
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
  await p.waitForTimeout(1200);
  if (await p.isVisible('#iGo')) {
    await p.click('#iGo');
    await p.waitForTimeout(600);
  }
  return { p, errors };
}

// Header bottom, slot top / height and the top of the visible screen content.
const geo = p =>
  p.evaluate(() => {
    const r = s => document.querySelector(s).getBoundingClientRect();
    const scr = [...document.querySelectorAll('.scr')].find(s => !s.classList.contains('hidden'));
    return {
      header: Math.round(r('header.bar').bottom),
      slotTop: Math.round(r('#adSlot').top),
      slotH: Math.round(r('#adSlot').height),
      main: Math.round(r('#main').top),
      screen: scr ? scr.id : null,
      screenTop: scr ? Math.round(scr.getBoundingClientRect().top) : null
    };
  });
const setSlot = (p, h, anim = false) =>
  p.evaluate(
    ([h, anim]) => {
      document.documentElement.classList.toggle('ad-anim', anim);
      document.documentElement.style.setProperty('--ad-slot', h + 'px');
    },
    [h, anim]
  );

// ---- First paint: no animation class, web build has no slot
{
  const { p, errors } = await open();
  const g = await geo(p);
  check(
    'A1 first paint: no animation class, web slot 0 px, content right under the header',
    !(await p.evaluate(() => document.documentElement.classList.contains('ad-anim'))) && g.slotH === 0 && g.main === g.header
  );
  check('A2 screen changes report to admob.js without errors (web, no banner)', errors.length === 0, errors.join(' | '));

  // ---- Animation: 0 -> 68 px in about 350 ms, ease-out (more than half way at half time)
  const samples = await p.evaluate(
    SLOT =>
      new Promise(done => {
        const el = document.getElementById('adSlot');
        const root = document.documentElement;
        root.classList.add('ad-anim');
        void el.offsetHeight;
        root.style.setProperty('--ad-slot', SLOT + 'px');
        const t0 = performance.now();
        const s = [];
        const f = () => {
          const t = performance.now() - t0;
          s.push([Math.round(t), el.getBoundingClientRect().height]);
          if (t < 520) requestAnimationFrame(f);
          else done(s);
        };
        requestAnimationFrame(f);
      }),
    SLOT
  );
  const at = ms => samples.reduce((a, c) => (Math.abs(c[0] - ms) < Math.abs(a[0] - ms) ? c : a))[1];
  const firstFull = (samples.find(([, h]) => h >= SLOT - 0.5) || [9999])[0];
  check('A3 expand is animated (not instant)', at(40) < SLOT - 10, JSON.stringify(samples.slice(0, 4)));
  check('A4 expand is ease-out (more than half the height at half the time)', at(175) > SLOT / 2 && at(175) < SLOT, String(at(175)));
  check('A5 expand ends at about 350 ms at the full 68 px', firstFull >= 300 && firstFull <= 450 && at(500) === SLOT, String(firstFull));
  const t = await p.evaluate(() => getComputedStyle(document.getElementById('adSlot')).transitionDuration);
  check('A6 transition 0.35 s while .ad-anim is on', t === '0.35s', t);
  await setSlot(p, SLOT, false);
  const t2 = await p.evaluate(() => getComputedStyle(document.getElementById('adSlot')).transitionDuration);
  check('A7 without .ad-anim the old 0.2 s (form screens) is kept', t2 === '0.2s', t2);

  // ---- Collapse 68 -> 0 is animated too
  const mid = await p.evaluate(
    () =>
      new Promise(done => {
        const el = document.getElementById('adSlot');
        document.documentElement.classList.add('ad-anim');
        document.documentElement.style.setProperty('--ad-slot', '0px');
        setTimeout(() => done(el.getBoundingClientRect().height), 120);
      })
  );
  check('A8 collapse is animated (part way after 120 ms)', mid > 0 && mid < SLOT, String(mid));
  await p.close();
}

// ---- Reduced motion: no animation
{
  const { p } = await open({ reduced: true });
  const h = await p.evaluate(
    SLOT =>
      new Promise(done => {
        const el = document.getElementById('adSlot');
        document.documentElement.classList.add('ad-anim');
        document.documentElement.style.setProperty('--ad-slot', SLOT + 'px');
        requestAnimationFrame(() => done(el.getBoundingClientRect().height));
      }),
    SLOT
  );
  const d = await p.evaluate(() => getComputedStyle(document.getElementById('adSlot')).transitionDuration);
  check('B1 reduced motion: the slot changes at once, no transition', h === SLOT && d === '0s', `${h} ${d}`);
  await p.close();
}

// ---- Layout with the slot open (68 px) and closed (0 px) on every main screen
const screens = [
  ['Home', async () => {}],
  [
    'Practice',
    async p => {
      await p.evaluate(() => window.startPractice());
      await p.waitForTimeout(400);
      await p.click('#pPath .cp[data-p="software"]');
      await p.waitForTimeout(300);
      await p.click('#pPath-pop [data-c="software"]');
      await p.waitForTimeout(700);
    }
  ],
  [
    'Mock',
    async p => {
      await p.evaluate(() => window.startMock());
      await p.waitForTimeout(500);
    }
  ],
  [
    'Mock interview',
    async p => {
      await p.click('#mGrid .cp[data-p="software"]');
      await p.waitForTimeout(300);
      await p.click('#mGrid-pop [data-c="software"]');
      await p.waitForTimeout(900);
    }
  ],
  [
    'Results',
    async p => {
      for (let i = 0; i < 10; i++) {
        await p.evaluate(() => window.step(1));
        await p.waitForTimeout(150);
      }
      await p.waitForSelector('#feedback:not(.hidden)', { timeout: 5000 });
      await p.waitForTimeout(300);
    }
  ],
  [
    'Profile',
    async p => {
      await p.evaluate(() => window.showProfile());
      await p.waitForTimeout(500);
    }
  ]
];
for (const font of ['normal', 'dejavu']) {
  for (const theme of ['light', 'dark']) {
    const { p, errors } = await open({ font });
    await p.evaluate(t => (document.documentElement.dataset.theme = t), theme);
    for (const [name, go] of screens) {
      await go(p);
      await setSlot(p, SLOT);
      await p.waitForTimeout(260);
      const o = await geo(p);
      const bg = await p.evaluate(() => [getComputedStyle(document.getElementById('adSlot')).backgroundColor, getComputedStyle(document.body).backgroundColor]);
      await setSlot(p, 0);
      await p.waitForTimeout(260);
      const c = await geo(p);
      const ok = o.slotTop === o.header && o.slotH === SLOT && o.main === o.header + SLOT && c.slotH === 0 && c.main === c.header && o.screen === c.screen;
      check(`C ${font} font, ${theme}: ${name} - slot right under the header, content below it (open ${SLOT} / closed 0)`, ok, JSON.stringify({ o, c }));
      check(
        `C ${font} font, ${theme}: ${name} - empty slot uses the page background (no grey strip)`,
        bg[0] !== 'rgba(0, 0, 0, 0)' && bg[0] !== '',
        bg.join(' / ')
      );
    }
    check(`C ${font} font, ${theme}: no page errors`, errors.length === 0, errors.join(' | '));
    await p.close();
  }
}

// ---- .no-ad forms keep no slot even when the slot is open
{
  const { p } = await open();
  await setSlot(p, SLOT);
  await p.evaluate(() => window.editDetails());
  await p.waitForTimeout(400);
  const g = await geo(p);
  check('D1 Setup (.no-ad): no slot even when open', g.screen === 'setup' && g.slotH === 0, JSON.stringify(g));
  await p.close();
}

await b.close();
console.info(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
