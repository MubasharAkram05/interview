import { Network } from '@capacitor/network';
import { getAdsDebugState, forceInterstitialTest, setBannerSuppressed } from '../services/admob.js';
import { debugReady, recentAdsLog } from '../services/debug.js';
import { nativeAppInfo, nativeAdLayout } from '../services/native-info.js';

/**
 * Hidden ads status panel for DEBUG builds only.
 * Open: press and hold the app title in the header for 1 second.
 * This file is only included when the web app is built with `--mode debug`
 * (__DEBUG_TOOLS__), and it also refuses to run unless the native build is debuggable.
 * It never shows real ad unit IDs or secrets.
 */

const HOLD_MS = 1000;
let panel = null;
let timer = null;
let appInfo = null;

const $ = id => document.getElementById(id);

export async function installDebugPanel() {
  const isDebug = await debugReady;
  if (!isDebug) return; // release or non-debuggable build: nothing is installed
  appInfo = await nativeAppInfo();
  showBuildFooter();
  const title = $('ttl');
  if (!title) return;
  let holdTimer = null;
  const start = () => {
    clearTimeout(holdTimer);
    holdTimer = setTimeout(openPanel, HOLD_MS);
  };
  const cancel = () => clearTimeout(holdTimer);
  title.addEventListener('pointerdown', start);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(e => title.addEventListener(e, cancel));
  title.addEventListener('contextmenu', e => e.preventDefault());
  title.style.webkitUserSelect = 'none';
  title.style.userSelect = 'none';
}

function buildLine() {
  const v = appInfo ? `${appInfo.versionName} (${appInfo.versionCode})` : 'web';
  return `Build ${__GIT_SHA__} · ${__BUILD_TIME__} · debug · v${v}`;
}

function showBuildFooter() {
  const box = $('pPrefBox');
  if (!box || $('dbgBuild')) return;
  const el = document.createElement('div');
  el.id = 'dbgBuild';
  el.className = 'note';
  el.style.marginTop = '12px';
  el.style.wordBreak = 'break-all';
  el.textContent = buildLine() + ' · hold the title for the ads status panel';
  box.appendChild(el);
}

async function report() {
  const s = getAdsDebugState();
  const layout = await nativeAdLayout();
  let net = 'unknown';
  try {
    net = (await Network.getStatus()).connected ? 'online' : 'offline';
  } catch {
    // ignore
  }
  const a = appInfo || {};
  const b = s.banner;
  const i = s.interstitial;
  const c = s.consent;
  const fmt = v => (v === null || v === undefined || v === '' ? '-' : v);
  const lines = [
    '== Interview Simulator ads report ==',
    `Build: ${appInfo ? (a.debug ? 'debug' : 'NOT debuggable') : 'browser'} | version ${fmt(a.versionName)} (${fmt(a.versionCode)}) | git ${__GIT_SHA__} | built ${__BUILD_TIME__}`,
    `Device: ${fmt(a.device)} | Android SDK ${fmt(a.sdkInt)} | WebView ${fmt(a.webView)} | density ${fmt(a.density)}`,
    `Network: ${net}`,
    '',
    `Consent: status=${fmt(c.status)} canRequestAds=${fmt(c.canRequestAds)} formShown=${c.formShown} privacyOptions=${c.privacyOptionsRequired}${c.error ? ' error=' + c.error : ''}`,
    `Ads SDK started: ${s.ready}`,
    '',
    `Banner: state=${b.state} error=${fmt(b.errorCode)} height=${fmt(b.height)} marginTop=${fmt(b.marginTop)}`,
    `  headerBottom=${fmt(b.headerBottom)} safeTop=${fmt(b.safeTop)} wantedTop=${fmt(b.desiredTop)} realTop=${fmt(b.actualTop)} adjust=${b.adjust} corrections=${b.corrections}`,
    `  hiddenFor=${b.hiddenFor.join(',') || '-'}`,
    `  native: ${layout ? `found=${layout.found} visible=${fmt(layout.visible)} top=${fmt(round(layout.top))} h=${fmt(round(layout.height))} w=${fmt(round(layout.width))} webViewTop=${fmt(round(layout.webViewTop))} insetTop=${fmt(round(layout.insetTop))}` : 'unavailable'}`,
    '',
    `Interstitial: ready=${i.ready} loading=${i.loading} open=${i.open}`,
    `  prepared=${i.prepared} loaded=${i.loaded} failed=${i.failed} shown=${i.shown} lastError=${fmt(i.lastErrorCode)} nextRetryIn=${i.nextRetryInS === null ? '-' : i.nextRetryInS + 's'}`,
    `  cooldownLeft=${i.cooldownLeftS}s sinceLaunch=${i.sinceLaunchS}s lastBreak=${fmt(i.lastBreak)} lastSkip=${fmt(i.lastSkip)} lastBreakShowedAd=${i.lastBreakShowedAd}`,
    '',
    `Config: testing=${s.config.isTesting} cooldown=${s.config.cooldownMs}ms minAfterLaunch=${s.config.minAfterLaunchMs}ms practiceEvery=${s.config.practiceEvery}`,
    `  banner=${s.config.bannerAdId} interstitial=${s.config.interstitialAdId}`,
    '',
    '-- last 20 ADS: lines --',
    ...recentAdsLog(20)
  ];
  return lines.join('\n');
}

function round(v) {
  return typeof v === 'number' ? Math.round(v) : v;
}

async function refresh() {
  if (!panel) return;
  $('dbgText').textContent = await report();
}

function openPanel() {
  if (panel) return;
  setBannerSuppressed('debugpanel', true); // keep taps off the native banner while the panel is open
  panel = document.createElement('div');
  panel.id = 'dbgPanel';
  panel.setAttribute('role', 'dialog');
  panel.innerHTML = `
    <div class="dbg-card">
      <div class="dbg-head"><b>Ads status (debug build)</b><button id="dbgClose" aria-label="Close">✕</button></div>
      <pre id="dbgText">Loading…</pre>
      <div class="dbg-row">
        <button id="dbgCopy">Copy report</button>
        <button id="dbgForce">Force interstitial test</button>
      </div>
      <div id="dbgMsg" class="dbg-msg" role="status" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(panel);
  $('dbgClose').onclick = closePanel;
  $('dbgCopy').onclick = copyReport;
  $('dbgForce').onclick = async () => {
    msg('Trying to show an interstitial…');
    const r = await forceInterstitialTest();
    msg('Force interstitial: ' + r);
    refresh();
  };
  refresh();
  timer = setInterval(refresh, 1000);
}

function closePanel() {
  clearInterval(timer);
  if (panel) panel.remove();
  panel = null;
  setBannerSuppressed('debugpanel', false);
}

function msg(t) {
  const m = $('dbgMsg');
  if (m) m.textContent = t;
}

async function copyReport() {
  const text = await report();
  try {
    await navigator.clipboard.writeText(text);
    msg('Copied. Paste it into your message to the developer.');
    return;
  } catch {
    // fall back below
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  ta.remove();
  msg(ok ? 'Copied. Paste it into your message to the developer.' : 'Copy blocked. Long-press the text above, Select all, Copy.');
}
