import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { AdMob, AdmobConsentStatus, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, InterstitialAdPluginEvents } from '@capacitor-community/admob';
import { ADS_CONFIG } from '../config/ads.js';
import { adsLog } from './debug.js';
import { nativeAdLayout } from './native-info.js';

/**
 * AdMob with Google UMP consent (EEA/UK).
 *
 * Banner: ONE standard 320x50 banner, placed by the native SDK at TOP_CENTER just under the
 * app header. The web page keeps a matching spacer (#adSlot) under the header, so the banner
 * never covers any content. After it loads, the real native position is measured: a banner
 * outside its slot is hidden.
 *
 * The slot (spacer) follows the network, never the ad:
 * - Online: the slot is reserved and stays reserved while the ad loads, is slow, has no fill,
 *   is retried or comes late. An ad never opens or closes the slot.
 * - Offline (no network at all, confirmed after 1 s): the banner is hidden at once and the slot
 *   closes smoothly (350 ms ease-out).
 * - Network back: if ads are off because the consent check or the SDK start failed, both run
 *   again (same UMP calls; a consent form waits for the next screen change). The banner loads
 *   hidden. The slot opens smoothly only when the user is idle (no touch or scroll for 1.5 s and
 *   not scrolled to the very bottom) or at a screen change, and the banner is shown only 150 ms
 *   after the slot has finished opening, so a tap during the slide can never hit the ad.
 * - The slot never opens or closes while the page is busy (mic recording, Mock answer in progress).
 *
 * Every call is wrapped so a failed or offline ad never blocks or crashes the app.
 */

const INTERSTITIAL_LOAD_TIMEOUT_MS = 45000; // a load that never answers counts as failed
const INTERSTITIAL_OPEN_TIMEOUT_MS = 180000; // safety net if "dismissed" never arrives
const BANNER_MAX_CORRECTIONS = 2;
const BANNER_TOLERANCE_PX = 2;

let ready = false; // SDK initialized and consent allows ads
let privacyOptionsRequired = false;
const consent = { status: 'not asked', canRequestAds: null, formShown: false, error: null };

// Interstitial state
const appStart = Date.now();
let interstitialReady = false;
let interstitialLoading = false;
let interstitialOpen = false;
let interstitialShownAt = 0;
let lastInterstitialAt = 0; // when the last interstitial was actually shown (0 = never)
let shownThisOpen = false; // the open interstitial reached the screen (Showed or Dismissed event)
let lastBreakShowedAd = false; // never show at two breaks in a row
let retryIndex = 0;
let retryTimer = null;
let nextRetryAt = 0;
let loadTimer = null;
let openTimer = null;
const istats = { prepared: 0, loaded: 0, failed: 0, shown: 0, lastErrorCode: null, lastSkip: null, lastBreak: null };

// Banner state: 'off' (no banner), 'requested' (loading), 'loaded', 'failed'
let bannerState = 'off';
let bannerMargin = -1; // margin (dp = CSS px) the current banner was created with
let bannerAdjust = 0; // correction learned from the real native position
let bannerCorrections = 0;
let relayoutTimer = null;
// A banner request that never answers (no Loaded and no FailedToLoad) counts as failed.
const BANNER_REQUEST_TIMEOUT_MS = 60000;
let bannerRequestTimer = null;
let bannerRequestId = 0;
// No fill while online: try again later (60 s, 2 min, 4 min, then every 8 min).
const BANNER_RETRY_MS = [60000, 120000, 240000, 480000];
let bannerRetryTimer = null;
let bannerRetries = 0;
const bstats = { errorCode: null, height: 0, headerBottom: null, safeTop: null, desiredTop: null, actualTop: null, native: null, retries: 0 };
const suppressed = new Set(); // reasons the banner is hidden right now (dialog, consent form, interstitial)

// Callbacks from the page
let getLayout = () => ({ headerBottom: 0, safeTop: 0 }); // CSS px

// Banner slot. First paint decides the start state (decideBannerSlot). After that it changes
// only with the network (see the top of this file), never because of the ad itself.
const SLOT_REVEAL_DELAY_MS = 150; // banner shown this long after the slot has finished opening
const SLOT_IDLE_MS = 1500; // the slot opens only after this long without a touch or scroll
const SLOT_POLL_MS = 250;
const SLOT_ANIM_SAFETY_MS = 1000; // an animation that never reports its end counts as done
const OFFLINE_CONFIRM_MS = 1000; // "offline" must still be true after this long (no flapping)
let slotDecided = false;
let slotFull = 0; // CSS px of an open slot: gap + banner + gap
let slotHeight = 0; // CSS px of #adSlot now: slotFull or 0
let bannerSession = false; // native app with the banner enabled
let slotWant = null; // pending change: true (open), false (close) or null (none)
let slotMoving = false; // an open / close animation is running
let slotTimer = null;
let revealTimer = null;
let online = true;
let offlineTimer = null;
let starting = false; // the consent check and the SDK start are running
let adsOff = null; // why ads are off: 'consent-error', 'refused', 'init-failed' or null
let listenersAdded = false;
let layoutWatched = false;
let netWatched = false;
let screenWaiters = []; // a deferred consent form waits here for the next screen change
// The page applies the slot height (applySlot returns a promise that settles when the
// animation has ended) and says whether the user is busy or idle (quiet).
let page = {
  applySlot: () => Promise.resolve(),
  quiet: () => ({ idleMs: Infinity, atBottom: false, busy: false, hidden: false })
};

const native = () => Capacitor.isNativePlatform();

// The page tells admob.js when an interstitial must never open (mic recording).
let isBusy = () => false;
/** fn() returns true while an interstitial must not open (for example while the mic records). */
export function setInterstitialBlocker(fn) {
  isBusy = typeof fn === 'function' ? fn : () => false;
}

/**
 * Decide the banner slot at first paint (no animation) and return its height in CSS px.
 * Native build with the banner on and online at launch: gap + 50 + gap, kept whatever the ad
 * does (loads, fails, no fill, late, retried). Offline at launch: 0; it opens later when the
 * network comes back and ads can run. Later calls return the current height.
 */
export function decideBannerSlot(isOnline = typeof navigator === 'undefined' || navigator.onLine !== false) {
  if (slotDecided) return slotHeight;
  slotDecided = true;
  online = isOnline;
  bannerSession = native() && ADS_CONFIG.enableBanner;
  slotFull = bannerSession ? ADS_CONFIG.bannerGapTop + ADS_CONFIG.bannerReserveHeight + ADS_CONFIG.bannerGapBottom : 0;
  slotHeight = online ? slotFull : 0;
  // A closed slot has no banner: it stays hidden until the slot has opened.
  if (bannerSession && !slotHeight) suppressed.add('slot');
  return slotHeight;
}

/**
 * Ask for consent (only shows a form where the law needs it), then start the SDK and
 * the banner. No ad request is made before consent is resolved. If this fails because the
 * phone is offline (or UMP / the SDK failed), it runs again when the network comes back.
 */
export async function initializeAdMob({ layout, slot } = {}) {
  if (!native()) return false;
  if (layout) getLayout = layout;
  if (slot) page = { ...page, ...slot };
  decideBannerSlot(); // normally already decided at first paint
  watchNetwork();
  return startAds({ deferForm: false });
}

/**
 * The page calls this on every screen change: a waiting consent form may open now, and a
 * waiting slot change may run now (the new screen starts at the top, so nothing moves under
 * the user's finger).
 */
export function notifyScreenChange() {
  const w = screenWaiters;
  screenWaiters = [];
  w.forEach(f => f());
  pumpSlot(true);
}

const nextScreenChange = () => new Promise(r => screenWaiters.push(r));

// The consent check and the SDK start. At launch as before; again (deferForm: true) when the
// network comes back while ads are off. Same UMP calls in both cases; only on a re-run does a
// consent form wait for the next screen change.
async function startAds({ deferForm }) {
  if (ready || starting) return ready;
  starting = true;
  try {
    const ok = await consentAndInit(deferForm);
    if (!ok) return false;
  } finally {
    starting = false;
  }
  ready = true;
  adsOff = null;
  adsLog('init ok');
  addListeners();
  watchLayout();
  preloadInterstitial();
  if (online) requestSlot(true);
  startBanner();
  return true;
}

async function consentAndInit(deferForm) {
  let canRequestAds = true;
  let failed = false;
  try {
    let info = await AdMob.requestConsentInfo({ tagForUnderAgeOfConsent: ADS_CONFIG.tagForUnderAgeOfConsent });
    consent.status = info.status;
    if (info.isConsentFormAvailable && info.status === AdmobConsentStatus.REQUIRED) {
      consent.formShown = true;
      if (deferForm) {
        // Never while the user is using a screen: the form opens at the next screen change.
        consent.formDeferred = true;
        adsLog('consent form waits for the next screen change');
        await nextScreenChange();
        consent.formDeferred = false;
      }
      info = await AdMob.showConsentForm();
      consent.status = info.status;
    }
    canRequestAds = info.canRequestAds !== false;
    privacyOptionsRequired = info.privacyOptionsRequirementStatus === 'REQUIRED';
  } catch (e) {
    // Offline or UMP error: consent is unknown, so no ads for now (no SDK start, no banner, no
    // interstitial). It is asked again when the network comes back (and at the next launch).
    consent.error = 'consent request failed (offline or UMP error)';
    canRequestAds = false;
    failed = true;
  }
  consent.canRequestAds = canRequestAds;
  adsLog('consent', 'status=' + consent.status, 'canRequestAds=' + canRequestAds);
  if (!canRequestAds) {
    adsOff = failed ? 'consent-error' : 'refused';
    adsLog('skipped: consent does not allow ads');
    return false;
  }
  consent.error = null;

  try {
    await AdMob.initialize({
      initializeForTesting: ADS_CONFIG.isTesting,
      tagForChildDirectedTreatment: ADS_CONFIG.tagForChildDirectedTreatment,
      tagForUnderAgeOfConsent: ADS_CONFIG.tagForUnderAgeOfConsent
    });
  } catch {
    adsOff = 'init-failed';
    adsLog('init failed');
    return false;
  }
  return true;
}

function errCode(err) {
  return err && err.code !== undefined ? err.code : '?';
}

function addListeners() {
  if (listenersAdded) return;
  listenersAdded = true;
  try {
    AdMob.addListener(BannerAdPluginEvents.SizeChanged, size => {
      // Only recorded: the slot never changes. hideBanner() reports height 0, so ignore that.
      if (suppressed.size || bannerState === 'off' || bannerState === 'failed') return;
      const h = size && size.height ? size.height : 0;
      if (h > 0) bstats.height = h;
    });
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      clearTimeout(bannerRequestTimer);
      clearTimeout(bannerRetryTimer);
      bannerRetries = 0;
      bannerState = 'loaded';
      adsLog('banner loaded');
      if (suppressed.size) AdMob.hideBanner().catch(() => {});
      setTimeout(checkBannerPosition, 300);
    });
    AdMob.addListener(BannerAdPluginEvents.FailedToLoad, err => {
      // The plugin destroys a banner that failed. Collapse the slot; retry later (no fill) or
      // when back online.
      bannerFailed(errCode(err));
    });
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => interstitialLoaded('event'));
    AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, err => {
      // Also fired by showInterstitial() when nothing was prepared (code -1).
      interstitialFailed(errCode(err));
    });
    AdMob.addListener(InterstitialAdPluginEvents.Showed, () => {
      adsLog('showed');
      markInterstitialShown();
    });
    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      adsLog('dismissed');
      markInterstitialShown(); // dismissed means it was on screen, even if Showed was missed
      interstitialClosed();
    });
    AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, err => {
      istats.lastErrorCode = errCode(err);
      adsLog('failed to show', 'code=' + istats.lastErrorCode);
      interstitialClosed();
    });
  } catch {
    // Listener errors are not fatal.
  }
}

async function isOnline() {
  try {
    return (await Network.getStatus()).connected;
  } catch {
    return true;
  }
}

// ---------------------------------------------------------------- banner

function bannerTargets() {
  let l = { headerBottom: 0, safeTop: 0 };
  try {
    l = getLayout() || l;
  } catch {
    // keep defaults
  }
  const desiredTop = l.headerBottom + ADS_CONFIG.bannerGapTop;
  // The plugin adds the top system-bar inset itself for TOP_CENTER, so subtract the same inset.
  const margin = Math.max(0, Math.round(desiredTop - l.safeTop + bannerAdjust));
  bstats.headerBottom = Math.round(l.headerBottom);
  bstats.safeTop = Math.round(l.safeTop);
  bstats.desiredTop = Math.round(desiredTop);
  return { desiredTop, margin };
}

function bannerFailed(code) {
  clearTimeout(bannerRequestTimer);
  bannerState = 'failed';
  bannerMargin = -1;
  bstats.errorCode = code;
  adsLog('banner failed', 'code=' + code);
  // The slot stays as it is (no jump); a retry loads into the same slot.
  // Offline: the network listener starts it again. Otherwise (no fill, timeout) try again later.
  if (code === 'offline') return;
  clearTimeout(bannerRetryTimer);
  const wait = BANNER_RETRY_MS[Math.min(bannerRetries, BANNER_RETRY_MS.length - 1)];
  bannerRetries++;
  bstats.retries = bannerRetries;
  adsLog('banner retry in', Math.round(wait / 1000) + 's');
  bannerRetryTimer = setTimeout(() => {
    if (bannerState === 'failed') startBanner();
  }, wait);
}

/**
 * Create the one banner (only when consent allows, the SDK is ready and the phone is online).
 * While the slot is closed or opening, the banner loads hidden ('slot' in suppressed).
 */
async function startBanner() {
  if (!ready || !bannerSession || bannerState === 'requested' || bannerState === 'loaded') return;
  if (!(await isOnline())) {
    adsLog('banner skipped: offline');
    bannerFailed('offline');
    return;
  }
  if (bannerState === 'requested' || bannerState === 'loaded') return; // another call got here first
  bannerState = 'requested';
  bannerMargin = bannerTargets().margin;
  adsLog('banner requested', 'margin=' + bannerMargin);
  // Safety net: if the native banner was replaced before it could answer (see rebuildBanner),
  // neither Loaded nor FailedToLoad arrives and the banner would stay gone for the session.
  const id = ++bannerRequestId;
  clearTimeout(bannerRequestTimer);
  bannerRequestTimer = setTimeout(() => {
    if (bannerState === 'requested' && id === bannerRequestId) bannerFailed('no answer');
  }, BANNER_REQUEST_TIMEOUT_MS);
  try {
    await AdMob.showBanner({
      adId: ADS_CONFIG.bannerAdId,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.TOP_CENTER,
      margin: bannerMargin,
      isTesting: ADS_CONFIG.isTesting
    });
    if (suppressed.size) AdMob.hideBanner().catch(() => {});
  } catch {
    bannerFailed('show rejected');
  }
}

async function rebuildBanner(reason, { correction = false } = {}) {
  adsLog('banner rebuild', reason);
  // A rebuild for a moved header gets its own position checks again (the limit is per banner,
  // not per session: before, a banner that moved later could never be fixed).
  if (!correction) bannerCorrections = 0;
  clearTimeout(bannerRequestTimer);
  try {
    await AdMob.removeBanner();
  } catch {
    // ignore
  }
  bannerState = 'off';
  // Cleared only now that the old banner is gone, so a misplaced banner is never shown again.
  setBannerSuppressed('misplaced', false);
  // removeBanner resolves before Android has removed the old view. Showing the new one at once
  // could reach the plugin while the old view still exists: it then only reloads the old view,
  // which is removed a moment later, and no banner comes back. Give the UI thread a moment.
  await new Promise(r => setTimeout(r, 250));
  if (bannerState === 'off') startBanner();
}

/**
 * Measure where the native banner really is (BuildInfoPlugin.getAdLayout) and fix the
 * margin if it is not just under the header. This covers phones where the window insets
 * (edge-to-edge on Android 15/16, notches, older WebViews) do not match the CSS insets.
 */
async function checkBannerPosition() {
  if (bannerState !== 'loaded' || [...suppressed].some(r => r !== 'misplaced')) return;
  const n = await nativeAdLayout();
  bstats.native = n;
  if (!n || !n.found || !n.visible) return;
  bstats.actualTop = Math.round(n.top);
  if (n.height > 0) bstats.height = Math.round(n.height); // recorded only: the slot never changes
  const { desiredTop } = bannerTargets();
  // The banner may only show inside its reserved slot (header bottom .. header bottom + slot).
  // Outside it (over the header or the page, or taller than the slot), hide it at once; the slot
  // stays, so nothing jumps. A correction or the next screen change tries again.
  const slotTop = desiredTop - ADS_CONFIG.bannerGapTop;
  const inside = n.top >= slotTop - 0.5 && n.top + n.height <= slotTop + slotHeight + 0.5;
  if (!inside) {
    adsLog('banner hidden: outside its slot');
    setBannerSuppressed('misplaced', true);
  }
  const diff = desiredTop - n.top;
  if (Math.abs(diff) <= BANNER_TOLERANCE_PX) return;
  if (bannerCorrections >= BANNER_MAX_CORRECTIONS) {
    adsLog('banner position off by', Math.round(diff) + 'px, no more corrections');
    return;
  }
  bannerCorrections++;
  bannerAdjust += diff; // a larger margin moves the banner down
  rebuildBanner('position off by ' + Math.round(diff) + 'px', { correction: true });
}

/**
 * The banner margin is fixed when it is created. If the header bottom moves (rotation,
 * safe-area change after start-up, notch side change), rebuild the banner at the new
 * position. Keyboard open/close does not move the header, so it does not trigger a rebuild.
 */
async function relayoutBanner() {
  if (bannerState !== 'loaded' && bannerState !== 'requested') return;
  const { margin } = bannerTargets();
  if (Math.abs(margin - bannerMargin) < 1) {
    if (bannerState === 'loaded') {
      if (suppressed.has('misplaced')) {
        // Try once more on this screen (a new screen can have a different header).
        bannerCorrections = 0;
        rebuildBanner('retry after misplaced');
      } else checkBannerPosition();
    }
    return;
  }
  rebuildBanner('header moved');
}

/** Ask for a re-measure soon (layout settled, safe-area vars changed, viewport changed). */
export function requestBannerRelayout() {
  clearTimeout(relayoutTimer);
  relayoutTimer = setTimeout(relayoutBanner, 300);
}

function watchLayout() {
  if (layoutWatched) return;
  layoutWatched = true;
  window.addEventListener('resize', requestBannerRelayout);
  window.addEventListener('orientationchange', requestBannerRelayout);
  try {
    if (window.visualViewport) window.visualViewport.addEventListener('resize', requestBannerRelayout);
  } catch {
    // ignore
  }
  document.addEventListener('visibilitychange', () => {
    // The interstitial is a separate screen: our page is hidden while it is open.
    // If "dismissed" was lost, recover when the user is back on our screen.
    if (document.visibilityState === 'visible' && interstitialOpen && Date.now() - interstitialShownAt > 1500) {
      setTimeout(() => {
        if (interstitialOpen && document.visibilityState === 'visible') {
          adsLog('dismissed event missing, recovering');
          interstitialClosed();
        }
      }, 1500);
    }
  });
}

// ---------------------------------------------------------------- network and slot

// Watched from the start (before consent), so ads can start again when the network comes back.
function watchNetwork() {
  if (netWatched) return;
  netWatched = true;
  try {
    Network.addListener('networkStatusChange', st => onNetwork(!!(st && st.connected)));
  } catch {
    // ignore
  }
}

function onNetwork(connected) {
  adsLog('network', connected ? 'online' : 'offline');
  clearTimeout(offlineTimer);
  if (!connected) {
    // Wait a moment: a short drop (switching Wi-Fi to mobile data) must not close the slot.
    offlineTimer = setTimeout(async () => {
      if (!(await isOnline())) wentOffline();
    }, OFFLINE_CONFIRM_MS);
    return;
  }
  online = true;
  if (!ready) {
    // Ads are off because the phone was offline (or UMP / the SDK failed): try again now.
    // A user who refused consent is not asked again before the next launch.
    if (adsOff === 'consent-error' || adsOff === 'init-failed') startAds({ deferForm: true });
    return;
  }
  requestSlot(true);
  if (bannerState === 'failed' || bannerState === 'off') startBanner();
  if (!interstitialReady && !interstitialLoading) preloadInterstitial();
}

function wentOffline() {
  if (!online) return;
  online = false;
  setBannerSuppressed('slot', true); // hidden at once, before the slot starts to close
  requestSlot(false);
}

function requestSlot(open) {
  if (!bannerSession) return;
  slotWant = open;
  if (!open) clearTimeout(revealTimer);
  pumpSlot(false);
}

/**
 * Run a waiting slot change when it is safe:
 * - never while the page is busy (mic recording, Mock answer in progress);
 * - closing (offline): as soon as the page is not busy (the banner is already hidden);
 * - opening: at a screen change, or when the user has not touched or scrolled for 1.5 s and is
 *   not scrolled to the very bottom;
 * - on a screen without a slot (.no-ad forms) at once and without animation (nothing moves).
 */
function pumpSlot(atScreenChange) {
  clearTimeout(slotTimer);
  if (slotWant === null || slotMoving) return;
  const open = slotWant;
  if ((open ? slotFull : 0) === slotHeight) {
    slotWant = null;
    if (open) scheduleReveal();
    return;
  }
  let q = { idleMs: Infinity, atBottom: false, busy: false, hidden: false };
  try {
    q = { ...q, ...page.quiet() };
  } catch {
    // keep defaults
  }
  const safe = !q.busy && (q.hidden || !open || atScreenChange || (q.idleMs >= SLOT_IDLE_MS && !q.atBottom));
  if (!safe) {
    slotTimer = setTimeout(() => pumpSlot(false), SLOT_POLL_MS);
    return;
  }
  moveSlot(open, !q.hidden);
}

async function moveSlot(open, animate) {
  slotWant = null;
  slotMoving = true;
  if (!open) setBannerSuppressed('slot', true);
  slotHeight = open ? slotFull : 0;
  adsLog('slot', open ? 'opens' : 'closes', animate ? '(animated)' : '');
  let done;
  try {
    done = page.applySlot(slotHeight, { animate });
  } catch {
    done = null;
  }
  await Promise.race([Promise.resolve(done).catch(() => {}), new Promise(r => setTimeout(r, SLOT_ANIM_SAFETY_MS))]);
  slotMoving = false;
  if (slotWant !== null) {
    pumpSlot(false); // the network changed again during the animation
    return;
  }
  if (open) scheduleReveal();
}

// Show the banner only once the slot is open and has stopped moving, plus a short pause.
function scheduleReveal() {
  clearTimeout(revealTimer);
  if (!suppressed.has('slot')) return;
  revealTimer = setTimeout(() => {
    if (online && slotHeight === slotFull && !slotMoving && slotWant === null) {
      setBannerSuppressed('slot', false);
      adsLog('banner revealed after the slot opened');
    }
  }, SLOT_REVEAL_DELAY_MS);
}

/**
 * Hide the banner while something is drawn over the app (custom dialog, sheet, consent form,
 * interstitial), so taps can never land on the ad. The reserved slot stays, so nothing jumps.
 */
export function setBannerSuppressed(reason, on) {
  if (!native()) return;
  const before = suppressed.size;
  if (on) suppressed.add(reason);
  else suppressed.delete(reason);
  if (bannerState !== 'loaded' && bannerState !== 'requested') return;
  if (!before && suppressed.size) AdMob.hideBanner().catch(() => {});
  if (before && !suppressed.size) {
    AdMob.resumeBanner().catch(() => {});
    setTimeout(checkBannerPosition, 300);
  }
}

// ---------------------------------------------------------------- interstitial

function interstitialLoaded(source) {
  clearTimeout(loadTimer);
  if (interstitialReady) return;
  interstitialReady = true;
  interstitialLoading = false;
  retryIndex = 0;
  nextRetryAt = 0;
  istats.loaded++;
  adsLog('loaded', '(' + source + ')');
}

function interstitialFailed(code) {
  clearTimeout(loadTimer);
  interstitialReady = false;
  interstitialLoading = false;
  istats.failed++;
  istats.lastErrorCode = code;
  adsLog('failed', 'code=' + code);
  scheduleInterstitialRetry();
}

/** Load the next interstitial in the background (after consent, after each dismiss/failure). */
async function preloadInterstitial() {
  if (!ready || !ADS_CONFIG.enableInterstitial || interstitialReady || interstitialLoading) return;
  clearTimeout(retryTimer);
  nextRetryAt = 0;
  if (!(await isOnline())) {
    adsLog('prepare skipped: offline');
    scheduleInterstitialRetry();
    return;
  }
  interstitialLoading = true;
  istats.prepared++;
  adsLog('prepare');
  clearTimeout(loadTimer);
  loadTimer = setTimeout(() => {
    if (interstitialLoading) interstitialFailed('timeout');
  }, INTERSTITIAL_LOAD_TIMEOUT_MS);
  try {
    // The plugin resolves this only when the ad has loaded, so it also counts as "loaded"
    // (in case the Loaded event is missed).
    await AdMob.prepareInterstitial({ adId: ADS_CONFIG.interstitialAdId, isTesting: ADS_CONFIG.isTesting });
    if (interstitialLoading) interstitialLoaded('prepare resolved');
  } catch {
    // The FailedToLoad event logs the code and schedules a retry. If it never came:
    if (interstitialLoading) interstitialFailed('prepare rejected');
  }
}

/** Retry a failed load after 15 s, 30 s, then every 60 s, at most interstitialMaxRetries times. */
function scheduleInterstitialRetry() {
  if (!ready || !ADS_CONFIG.enableInterstitial || interstitialReady) return;
  if (retryIndex >= ADS_CONFIG.interstitialMaxRetries) {
    // Stop retrying on a timer; the next natural break asks for one new load.
    adsLog('retry limit reached, waiting for the next break');
    return;
  }
  const steps = ADS_CONFIG.interstitialRetryMs;
  const wait = steps[Math.min(retryIndex, steps.length - 1)];
  retryIndex++;
  clearTimeout(retryTimer);
  nextRetryAt = Date.now() + wait;
  adsLog('retry in', Math.round(wait / 1000) + 's');
  retryTimer = setTimeout(preloadInterstitial, wait);
}

function interstitialClosed() {
  clearTimeout(openTimer);
  if (!interstitialOpen && !suppressed.has('interstitial')) return;
  interstitialOpen = false;
  setBannerSuppressed('interstitial', false);
  preloadInterstitial();
}

/** The gap between interstitials starts here: only once the ad is really on screen. */
function markInterstitialShown() {
  if (!interstitialOpen || shownThisOpen) return;
  shownThisOpen = true;
  lastInterstitialAt = Date.now();
}

async function openInterstitial() {
  interstitialReady = false;
  interstitialOpen = true;
  shownThisOpen = false;
  interstitialShownAt = Date.now();
  istats.shown++;
  setBannerSuppressed('interstitial', true);
  clearTimeout(openTimer);
  openTimer = setTimeout(() => {
    if (interstitialOpen) {
      adsLog('dismissed event missing after 180s, recovering');
      interstitialClosed();
    }
  }, INTERSTITIAL_OPEN_TIMEOUT_MS);
  try {
    await AdMob.showInterstitial();
    return true;
  } catch {
    // FailedToLoad/FailedToShow events log the code and reload.
    interstitialOpen = false;
    clearTimeout(openTimer);
    setBannerSuppressed('interstitial', false);
    if (!interstitialLoading) preloadInterstitial();
    return false;
  }
}

/** A break that the page itself rules out (recording, typing): log it and move on. */
export function skipInterstitialBreak(breakName, reason) {
  adsLog('show requested', breakName);
  adsLog('skipped', breakName, 'reason=' + reason);
  istats.lastBreak = breakName;
  istats.lastSkip = reason;
  lastBreakShowedAd = false;
}

/**
 * Called at a natural break ('interview_finished' or 'practice_question_N').
 * Shows the interstitial only if every rule passes; otherwise skips silently and the
 * app continues. Never waits for an ad to load. Returns true if an ad was shown.
 */
export async function showInterstitialAtBreak(breakName) {
  istats.lastBreak = breakName;
  const skip = (reason, countsAsBreak = true) => {
    adsLog('skipped', breakName, 'reason=' + reason);
    istats.lastSkip = reason;
    // A break the user saw without an ad lets the next break show one again.
    if (countsAsBreak) lastBreakShowedAd = false;
    return false;
  };
  adsLog('show requested', breakName);
  if (!native()) return skip('not on a phone');
  if (!ADS_CONFIG.enableInterstitial) return skip('disabled in config');
  if (!ready) return skip('ads not started (no consent yet, offline or init failed)');
  if (interstitialOpen) return skip('already open', false);
  if (isBusy()) return skip('mic is recording', false);
  if (document.visibilityState !== 'visible') return skip('app in background');
  if (suppressed.size) return skip('screen covered: ' + [...suppressed].join(','));
  const sinceLaunch = Date.now() - appStart;
  if (sinceLaunch < ADS_CONFIG.interstitialMinAfterLaunchMs) return skip('too soon after app start');
  if (lastBreakShowedAd) return skip('ad shown at previous break (never twice in a row)');
  const left = cooldownLeftMs();
  if (left > 0) return skip('cooldown ' + Math.ceil(left / 1000) + 's left');
  if (!interstitialReady) {
    if (!interstitialLoading) preloadInterstitial();
    return skip(interstitialLoading ? 'still loading' : 'not loaded');
  }
  istats.lastSkip = null;
  lastBreakShowedAd = true;
  return openInterstitial();
}

/**
 * Debug panel only: show an interstitial now, ignoring the cooldown, launch and
 * "twice in a row" rules, but still respecting consent and load state.
 */
export async function forceInterstitialTest() {
  adsLog('force test requested');
  if (!native()) return 'not on a phone';
  if (!ready) return 'ads not started (consent=' + consent.status + ', canRequestAds=' + consent.canRequestAds + ')';
  if (interstitialOpen) return 'already open';
  if (!interstitialReady) {
    if (!interstitialLoading) preloadInterstitial();
    return interstitialLoading ? 'not loaded yet (loading), try again in a few seconds' : 'not loaded, loading now';
  }
  const ok = await openInterstitial();
  return ok ? 'shown' : 'show failed (see log)';
}

function cooldownLeftMs() {
  if (!lastInterstitialAt) return 0;
  return Math.max(0, ADS_CONFIG.interstitialCooldownMs - (Date.now() - lastInterstitialAt));
}

// ---------------------------------------------------------------- consent options

/** true when the user is in a region where a "Privacy choices" entry point is required (EEA/UK). */
export function needsPrivacyOptions() {
  return privacyOptionsRequired;
}

export async function showPrivacyOptions() {
  // Hide the banner so taps on the consent form never hit the ad.
  setBannerSuppressed('consent', true);
  try {
    await AdMob.showPrivacyOptionsForm();
    return true;
  } catch {
    return false;
  } finally {
    setBannerSuppressed('consent', false);
  }
}

// ---------------------------------------------------------------- debug state

// Only Google's public test IDs are ever shown; a real ID is masked.
const GOOGLE_TEST_PUBLISHER = 'ca-app-pub-3940256099942544';
function safeId(id) {
  return String(id || '').startsWith(GOOGLE_TEST_PUBLISHER + '/') ? id : '(real ID hidden)';
}

/** Snapshot for the debug panel. Contains no secrets; only Google test IDs can appear. */
export function getAdsDebugState() {
  const now = Date.now();
  return {
    native: native(),
    ready,
    consent: { ...consent, privacyOptionsRequired },
    banner: {
      state: bannerState,
      session: bannerSession,
      slot: slotHeight,
      slotFull,
      slotPending: slotWant,
      slotMoving,
      online,
      adsOff,
      errorCode: bstats.errorCode,
      height: bstats.height,
      marginTop: bannerMargin,
      headerBottom: bstats.headerBottom,
      safeTop: bstats.safeTop,
      desiredTop: bstats.desiredTop,
      actualTop: bstats.actualTop,
      adjust: Math.round(bannerAdjust),
      corrections: bannerCorrections,
      hiddenFor: [...suppressed]
    },
    interstitial: {
      ready: interstitialReady,
      loading: interstitialLoading,
      open: interstitialOpen,
      ...istats,
      nextRetryInS: nextRetryAt ? Math.max(0, Math.round((nextRetryAt - now) / 1000)) : null,
      cooldownLeftS: Math.ceil(cooldownLeftMs() / 1000),
      sinceLaunchS: Math.round((now - appStart) / 1000),
      lastBreakShowedAd
    },
    config: {
      isTesting: ADS_CONFIG.isTesting,
      bannerAdId: safeId(ADS_CONFIG.bannerAdId),
      interstitialAdId: safeId(ADS_CONFIG.interstitialAdId),
      cooldownMs: ADS_CONFIG.interstitialCooldownMs,
      minAfterLaunchMs: ADS_CONFIG.interstitialMinAfterLaunchMs,
      practiceEvery: ADS_CONFIG.interstitialPracticeEvery
    }
  };
}
