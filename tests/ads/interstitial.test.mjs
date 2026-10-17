// Unit tests for src/services/admob.js with AdMob, Network and Capacitor mocked
// (tests/ads/mocks.mjs) and a fake clock. Run: npm run test:ads
let now = 1_000_000;
Date.now = () => now;
let timers = [];
globalThis.setTimeout = (f, ms) => {
  timers.push({ at: now + (ms || 0), f });
  return timers.length;
};
globalThis.clearTimeout = id => {
  if (timers[id - 1]) timers[id - 1].f = null;
};
const tick = () => new Promise(r => setImmediate(r));
const advance = async ms => {
  const end = now + ms;
  for (;;) {
    const due = timers.filter(t => t.f && t.at <= end).sort((a, b) => a.at - b.at)[0];
    if (!due) break;
    now = Math.max(now, due.at);
    const f = due.f;
    due.f = null;
    await f();
    await tick();
  }
  now = end;
  await tick();
};
const docListeners = {};
globalThis.window = { addEventListener() {} };
globalThis.document = {
  visibilityState: 'visible',
  addEventListener: (e, f) => (docListeners[e] ||= []).push(f)
};
const fireDoc = e => (docListeners[e] || []).forEach(f => f());
const logs = [];
console.log = (...a) => logs.push(a.join(' '));

const m = await import('./mocks.mjs');
const { INTERSTITIAL_COOLDOWN_MS, INTERSTITIAL_MIN_AFTER_LAUNCH_MS: MIN_LAUNCH } = await import('../../src/config/ads.js');
const out = [];
const check = (name, cond) => out.push(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
let n = 0;
const last = () => logs.at(-1) || '';

// ---- Scenario A: load failures, backoff, rules (from PR #4)
{
  m.reset();
  m.state.prepareFails = 2;
  const { ads } = await (async () => {
    timers = [];
    logs.length = 0;
    const ads = await import(`../../src/services/admob.js?s=${++n}`);
    m.state.prepareFails = 2;
    await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
    await tick();
    return { ads };
  })();
  const start = now;
  check('A1 prepare called after consent/init', m.calls.filter(c => c === 'prepare').length === 1);
  check('A2 failed load logged with code', logs.some(l => l.includes('ADS: failed code=3')));
  check('A3 retry scheduled at 15s', logs.some(l => l.includes('ADS: retry in 15s')));
  await advance(15000);
  check('A4 second retry at 30s', logs.some(l => l.includes('ADS: retry in 30s')));
  await advance(30000);
  check('A5 third prepare loads', logs.some(l => l.startsWith('ADS: loaded')));
  const t0 = now;
  now = start + 5000;
  check('A6 skip right after launch', !(await ads.showInterstitialAtBreak('interview_finished')) && last().includes('too soon'));
  now = Math.max(t0, start + MIN_LAUNCH + 1000);
  check('A7 shows at natural break when loaded', await ads.showInterstitialAtBreak('interview_finished'));
  check('A8 banner hidden while interstitial open', m.calls.includes('hideBanner'));
  check('A9 second break while open skipped', !(await ads.showInterstitialAtBreak('practice_question_4')));
  m.emit('id');
  await tick();
  check('A10 dismissed -> banner resumed + reload', m.calls.includes('resumeBanner') && m.calls.filter(c => c === 'prepare').length === 4);
  await advance(INTERSTITIAL_COOLDOWN_MS + 1000);
  check('A11 never twice in a row', !(await ads.showInterstitialAtBreak('practice_question_8')) && last().includes('twice in a row'));
  check('A12 break after a skipped one can show', await ads.showInterstitialAtBreak('practice_question_12'));
  m.emit('id');
  await tick();
  ads.skipInterstitialBreak('practice_question_16', 'recording');
  check('A13 recording skip logged', last().includes('reason=recording'));
  check('A14 cooldown blocks early show', !(await ads.showInterstitialAtBreak('interview_finished')) && last().includes('cooldown'));
  await advance(INTERSTITIAL_COOLDOWN_MS);
  document.visibilityState = 'hidden';
  check('A15 background skip', !(await ads.showInterstitialAtBreak('interview_finished')) && last().includes('background'));
  document.visibilityState = 'visible';
  ads.setBannerSuppressed('dialog', true);
  check('A16 dialog open skip names the reason', !(await ads.showInterstitialAtBreak('interview_finished')) && last().includes('screen covered: dialog'));
  ads.setBannerSuppressed('dialog', false);
}

// ---- Scenario B (fix): prepare resolves but the Loaded event is lost -> still ready
{
  m.reset();
  m.state.prepareSilentLoad = true;
  timers = [];
  logs.length = 0;
  const ads = await import(`../../src/services/admob.js?s=${++n}`);
  m.state.prepareSilentLoad = true;
  await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
  await tick();
  check('B1 ready from prepare() even without Loaded event', ads.getAdsDebugState().interstitial.ready === true);
  await advance(MIN_LAUNCH + 1000);
  check('B2 and it shows at a break', await ads.showInterstitialAtBreak('interview_finished'));
}

// ---- Scenario C (fix): prepare never answers -> timeout, retry
{
  m.reset();
  timers = [];
  logs.length = 0;
  const ads = await import(`../../src/services/admob.js?s=${++n}`);
  m.state.prepareHangs = true;
  await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
  await tick();
  check('C1 loading while prepare hangs', ads.getAdsDebugState().interstitial.loading === true);
  await advance(45000);
  check('C2 timeout logged as failure', logs.some(l => l.includes('ADS: failed code=timeout')));
  check('C3 retry scheduled after timeout', logs.some(l => l.includes('ADS: retry in 15s')));
  m.state.prepareHangs = false;
  await advance(15000);
  check('C4 retry loads', ads.getAdsDebugState().interstitial.ready === true);
}

// ---- Scenario D (fix): dismissed event lost -> recover when our page is visible again
{
  m.reset();
  timers = [];
  logs.length = 0;
  const ads = await import(`../../src/services/admob.js?s=${++n}`);
  await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
  await tick();
  await advance(MIN_LAUNCH + 1000);
  await ads.showInterstitialAtBreak('interview_finished');
  document.visibilityState = 'hidden';
  fireDoc('visibilitychange');
  await advance(5000);
  document.visibilityState = 'visible';
  fireDoc('visibilitychange');
  await advance(2000);
  const st = ads.getAdsDebugState();
  check('D1 open state cleared without Dismissed event', st.interstitial.open === false && logs.some(l => l.includes('dismissed event missing')));
  check('D2 banner no longer hidden for interstitial', !st.banner.hiddenFor.includes('interstitial'));
}

// ---- Scenario E (fix): banner calibration from the real native position
{
  m.reset();
  timers = [];
  logs.length = 0;
  const ads = await import(`../../src/services/admob.js?s=${++n}`);
  const space = [];
  // header bottom 98 (with a 24px status bar), so the banner should start at 104
  await ads.initializeAdMob({ layout: () => ({ headerBottom: 98, safeTop: 24 }), onSpace: h => space.push(h) });
  await tick();
  check('E1 slot reserved at 50 before load', space.includes(50));
  check('E2 first margin = 98 + 6 - 24 = 80', m.calls.includes('showBanner:80'));
  // Phone where the plugin did NOT add the inset: banner really at 80 (24px too high, over the header)
  m.state.adLayout = { found: true, visible: true, top: 80, height: 50, width: 320 };
  m.emit('bl');
  await advance(400);
  check('E3 wrong position detected and banner rebuilt +24', m.calls.includes('removeBanner') && m.calls.includes('showBanner:104'));
  m.state.adLayout = { found: true, visible: true, top: 104, height: 50, width: 320 };
  m.emit('bl');
  await advance(400);
  check('E4 correct position: no further rebuild', m.calls.filter(c => c.startsWith('showBanner')).length === 2);
  check('E5 debug state shows wanted/real top', ads.getAdsDebugState().banner.desiredTop === 104 && ads.getAdsDebugState().banner.actualTop === 104);
  // Real height differs from 50 -> slot follows the native height
  m.state.adLayout = { found: true, visible: true, top: 104, height: 52, width: 320 };
  ads.requestBannerRelayout();
  await advance(400);
  check('E6 slot follows real native height', space.at(-1) === 52);
  // Never more than 2 corrections
  m.state.adLayout = { found: true, visible: true, top: 60, height: 52, width: 320 };
  m.emit('bl');
  await advance(400);
  m.emit('bl');
  await advance(400);
  m.emit('bl');
  await advance(400);
  check('E7 at most 2 corrections', ads.getAdsDebugState().banner.corrections === 2);
  check('E8 still wrong after 2 corrections: banner hidden, never over the header', ads.getAdsDebugState().banner.hiddenFor.includes('misplaced') && m.calls.at(-1) === 'hideBanner');
  // Next screen change: a fresh banner with its own checks (the limit is per banner, not per session)
  const before = m.calls.filter(c => c.startsWith('showBanner')).length;
  ads.requestBannerRelayout();
  await advance(400);
  check('E9 screen change: rebuilt and checked again', m.calls.filter(c => c.startsWith('showBanner')).length === before + 1 && ads.getAdsDebugState().banner.corrections === 0 && !ads.getAdsDebugState().banner.hiddenFor.includes('misplaced'));
  // Suppressed by the welcome screen: hidden, and interstitial breaks skip
  ads.setBannerSuppressed('intro', true);
  check('E10 welcome screen hides the banner', ads.getAdsDebugState().banner.hiddenFor.includes('intro'));
  ads.setBannerSuppressed('intro', false);
}

// ---- Scenario F: force test ignores cooldown/launch, respects load state; no real IDs
{
  m.reset();
  timers = [];
  logs.length = 0;
  const ads = await import(`../../src/services/admob.js?s=${++n}`);
  m.state.prepareHangs = true;
  await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
  await tick();
  const r1 = await ads.forceInterstitialTest();
  check('F1 force respects load state', r1.startsWith('not loaded'));
  m.state.prepareHangs = false;
  await advance(45000 + 15000);
  const r2 = await ads.forceInterstitialTest();
  check('F2 force shows once loaded', r2 === 'shown' && ads.getAdsDebugState().interstitial.shown === 1);
  await ads.showInterstitialAtBreak('interview_finished');
  check('F3 force ignores nothing for real breaks: already open skip', last().includes('already open'));
  const json = JSON.stringify(ads.getAdsDebugState());
  check('F4 debug state has only Google test IDs', !/ca-app-pub-(?!3940256099942544)/.test(json));
}

// ---- Scenario P: Mock session page puts the banner at the bottom, other pages at the top
{
  m.reset();
  timers = [];
  logs.length = 0;
  const ads = await import(`../../src/services/admob.js?s=${++n}`);
  await ads.initializeAdMob({ layout: () => ({ headerBottom: 98, safeTop: 24, viewportH: 800, safeBottom: 20 }), onSpace: () => {} });
  await tick();
  m.emit('bl');
  await advance(400);
  check('P1 banner starts at the top', m.calls.includes('pos:TOP_CENTER') && !m.calls.includes('pos:BOTTOM_CENTER'));
  ads.setBannerPlacement('bottom');
  await tick();
  check('P2 Mock session: rebuilt at BOTTOM_CENTER', m.calls.includes('removeBanner') && m.calls.includes('pos:BOTTOM_CENTER'));
  check('P3 debug state shows the placement', ads.getAdsDebugState().banner.placement === 'bottom');
  // Phone where the plugin does not add the gesture-bar inset: banner bottom at 800, wanted 780.
  m.state.adLayout = { found: true, visible: true, top: 750, height: 50, width: 320 };
  m.emit('bl');
  await advance(400);
  check('P4 bottom banner over the gesture bar is lifted by 20px', m.calls.includes('showBanner:20'));
  const before = m.calls.filter(c => c.startsWith('showBanner')).length;
  ads.setBannerPlacement('bottom');
  await tick();
  check('P5 same placement again: no rebuild', m.calls.filter(c => c.startsWith('showBanner')).length === before);
  ads.setBannerPlacement('top');
  await tick();
  check('P6 leaving the page restores the top banner', m.calls.filter(c => c === 'pos:TOP_CENTER').length >= 2);
}

// ---- Scenario E: consent flow (UMP) before any ad request
async function freshAds() {
  // Let the previous module finish its async start-up, then drop its timers (ids stay unique,
  // so an old module's clearTimeout can never cancel a new module's timer).
  await tick();
  await tick();
  timers.forEach(t => (t.f = null));
  m.calls.length = 0;
  logs.length = 0;
  const ads = await import(`../../src/services/admob.js?s=${++n}`);
  return ads;
}
{
  m.reset();
  let ads = await freshAds();
  await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
  await tick();
  await tick();
  const ci = m.calls.findIndex(c => c.startsWith('consent:'));
  const ii = m.calls.findIndex(c => c.startsWith('init:'));
  check('E1 consent asked before the SDK starts', ci >= 0 && ii > ci);
  check('E2 not child-directed, not under age of consent', m.calls[ii].includes('"tagForChildDirectedTreatment":false') && m.calls[ii].includes('"tagForUnderAgeOfConsent":false') && m.calls[ci].includes('"tagForUnderAgeOfConsent":false'));
  check('E3 consent not required: no form, ads start', !m.calls.includes('consentForm') && ads.getAdsDebugState().interstitial !== undefined && m.calls.includes('prepare'));

  m.reset();
  m.state.consent = { status: 'REQUIRED', isConsentFormAvailable: true, canRequestAds: false };
  m.state.formResult = { status: 'OBTAINED', canRequestAds: true, privacyOptionsRequirementStatus: 'REQUIRED' };
  ads = await freshAds();
  await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
  check('E4 consent required: form shown before ads', m.calls.includes('consentForm') && m.calls.indexOf('consentForm') < m.calls.findIndex(c => c.startsWith('init:')));
  check('E5 privacy options entry needed (EEA/UK)', ads.needsPrivacyOptions() === true);

  m.reset();
  m.state.consent = { status: 'REQUIRED', isConsentFormAvailable: true, canRequestAds: false };
  m.state.formResult = { status: 'REQUIRED', canRequestAds: false };
  ads = await freshAds();
  let space = -1;
  const started = await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: h => (space = h) });
  check('E6 consent refused: no SDK start, no ad request, slot collapsed', started === false && !m.calls.some(c => c.startsWith('init:')) && !m.calls.includes('prepare') && !m.calls.some(c => c.startsWith('showBanner')) && space === 0);

  m.reset();
  m.state.consent = 'throw';
  ads = await freshAds();
  const ok = await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
  check('E7 no network for consent: no crash, SDK still starts (Google decides)', ok === true && m.calls.some(c => c.startsWith('init:')));
}

// ---- Scenario H: never during mic recording; retry cap
{
  m.reset();
  const ads = await freshAds();
  await ads.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
  await tick();
  await advance(MIN_LAUNCH + 1000);
  let recording = true;
  ads.setInterstitialBlocker(() => recording);
  check('H1 no interstitial while the mic records', !(await ads.showInterstitialAtBreak('interview_finished')) && last().includes('mic is recording'));
  recording = false;
  check('H2 shows once recording stopped', await ads.showInterstitialAtBreak('interview_finished'));
  ads.setInterstitialBlocker(null);

  m.reset();
  m.state.prepareFails = 1000;
  const ads2 = await freshAds();
  m.state.prepareFails = 1000;
  await ads2.initializeAdMob({ layout: () => ({ headerBottom: 74, safeTop: 0 }), onSpace: () => {} });
  await tick();
  await tick();
  // 30 minutes in 1-minute steps (each step lets the async load attempt finish).
  for (let i = 0; i < 30; i++) await advance(60 * 1000);
  const prepares = m.calls.filter(c => c === 'prepare').length;
  check(`H3 failed loads stop after the retry cap (${prepares} tries in 30 min)`, prepares <= 1 + 6 && logs.some(l => l.includes('retry limit reached')));
}

// ---- Scenario G: config rules
{
  const cfg = await import('../../src/config/ads.js');
  check('G1 release cooldown is 3 minutes (no Vite debug flag in tests)', cfg.INTERSTITIAL_COOLDOWN_MS === 180000);
  check('G2 tests and default builds use Google test IDs', !cfg.USE_PRODUCTION_ADS && cfg.ADS_CONFIG.isTesting && cfg.ADS_CONFIG.appId === cfg.TEST_IDS.appId);
  check('G3 placeholder production IDs are reported', cfg.productionIdProblems().length === 3);
  check('G4 test IDs are refused as production IDs', cfg.productionIdProblems(cfg.TEST_IDS).length === 3);
  check('G5 well-formed real-looking IDs pass', cfg.productionIdProblems({ appId: 'ca-app-pub-1234567890123456~1234567890', bannerAdId: 'ca-app-pub-1234567890123456/1234567890', interstitialAdId: 'ca-app-pub-1234567890123456/0987654321' }).length === 0);
  check('G6 never child-directed', cfg.ADS_CONFIG.tagForChildDirectedTreatment === false && cfg.ADS_CONFIG.tagForUnderAgeOfConsent === false);
}

check('Z1 no ad IDs in any log line', !logs.some(l => l.includes('ca-app-pub')));
console.info(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
