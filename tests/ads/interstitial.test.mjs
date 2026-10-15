// Unit test for the interstitial rules in src/services/admob.js, with the AdMob, Network and
// Capacitor plugins mocked (tests/ads/mocks.mjs) and a fake clock. Run: npm run test:ads
// Fake clock + DOM stubs
let now = 1_000_000; Date.now = () => now;
const timers = []; globalThis.setTimeout = (f, ms) => { timers.push({ at: now + ms, f }); return timers.length; };
globalThis.clearTimeout = id => { if (timers[id - 1]) timers[id - 1].f = null; };
const advance = async ms => { now += ms; for (const t of timers) if (t.f && t.at <= now) { const f = t.f; t.f = null; await f(); } await tick(); };
const tick = () => new Promise(r => setImmediate(r));
globalThis.window = { addEventListener() {} }; globalThis.document = { visibilityState: 'visible' };
const logs = []; console.log = (...a) => logs.push(a.join(' '));
const m = await import('./mocks.mjs');
const ads = await import('../../src/services/admob.js');
const { INTERSTITIAL_COOLDOWN_MS } = await import('../../src/config/ads.js');
const out = []; const check = (name, cond) => out.push(`${cond ? 'PASS' : 'FAIL'}  ${name}`);

m.state.prepareFails = 2; // first two loads fail -> backoff
await ads.initializeAdMob({ topMargin: () => 70, onSpace: () => {} }); await tick();
check('prepare called after consent/init', m.calls.filter(c => c === 'prepare').length === 1);
check('failed load logged with code', logs.some(l => l.includes('ADS: failed code=3')));
check('retry scheduled at 15s', logs.some(l => l.includes('ADS: retry in 15s')));
await advance(15000);
check('second retry at 30s', logs.some(l => l.includes('ADS: retry in 30s')));
check('only 2 prepares before 30s retry', m.calls.filter(c => c === 'prepare').length === 2);
await advance(30000);
check('third prepare loads', logs.some(l => l === 'ADS: loaded'));

// Launch rule: rewind clock to 5 s after app start
const t0 = now; now = 1_000_000 + 5000;
check('skip within 10 s of launch', !(await ads.showInterstitialAtBreak('interview_finished')) && logs.at(-1).includes('too soon after app start'));
now = t0;
check('shows at natural break when loaded', await ads.showInterstitialAtBreak('interview_finished'));
check('banner hidden while interstitial open', m.calls.at(-2) === 'hideBanner' || m.calls.includes('hideBanner'));
check('second break while open skipped', !(await ads.showInterstitialAtBreak('practice_question_4')));
m.emit('id'); await tick();
check('dismissed logged', logs.includes('ADS: dismissed'));
check('banner resumed after dismiss', m.calls.includes('resumeBanner'));
check('reloaded after dismiss', m.calls.filter(c => c === 'prepare').length === 4);
await advance(INTERSTITIAL_COOLDOWN_MS + 1000);
check('never twice in a row (next break skipped even after cooldown)', !(await ads.showInterstitialAtBreak('practice_question_8')) && logs.at(-1).includes('twice in a row'));
check('break after a skipped one can show', await ads.showInterstitialAtBreak('practice_question_12'));
m.emit('id'); await tick();
ads.skipInterstitialBreak('practice_question_16', 'recording');
check('recording skip logged', logs.at(-1).includes('reason=recording'));
check('cooldown blocks early show', !(await ads.showInterstitialAtBreak('interview_finished')) && logs.at(-1).includes('cooldown'));
await advance(INTERSTITIAL_COOLDOWN_MS);
document.visibilityState = 'hidden';
check('background skip', !(await ads.showInterstitialAtBreak('interview_finished')) && logs.at(-1).includes('background'));
document.visibilityState = 'visible';
ads.setBannerSuppressed('dialog', true);
check('dialog open skip', !(await ads.showInterstitialAtBreak('interview_finished')) && logs.at(-1).includes('dialog'));
ads.setBannerSuppressed('dialog', false);
check('no ad IDs in any log line', !logs.some(l => l.includes('ca-app-pub')));
console.info(out.join('\n'));
console.info('--- ADS log lines ---\n' + logs.filter(l => l.startsWith('ADS:')).join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
