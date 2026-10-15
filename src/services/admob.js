import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import {
  AdMob,
  AdmobConsentStatus,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
  InterstitialAdPluginEvents
} from '@capacitor-community/admob';
import { ADS_CONFIG } from '../config/ads.js';

/**
 * AdMob with Google UMP consent (EEA/UK).
 *
 * Banner: ONE standard 320x50 banner, created once and kept for the whole session,
 * placed by the native SDK at TOP_CENTER just under the app header. The web page keeps a
 * matching spacer (#adSlot) under the header, so the banner never covers any content.
 *
 * Every call is wrapped so a failed or offline ad never blocks or crashes the app.
 */

let ready = false; // SDK initialized and consent allows ads
let privacyOptionsRequired = false;
let interstitialReady = false;
let interstitialLoading = false;
let lastInterstitial = Date.now() - ADS_CONFIG.interstitialCooldownMs + ADS_CONFIG.firstInterstitialDelayMs;

// Banner state: 'off' (no banner), 'requested' (loading), 'loaded', 'failed'
let bannerState = 'off';
let bannerMargin = -1; // top margin (dp = CSS px) the current banner was created with
let relayoutTimer = null;
const suppressed = new Set(); // reasons the banner is hidden right now (dialog, consent form)

// Callbacks from the page
let getTopMargin = () => 0; // where the banner should start, measured from the WebView top
let onBannerSpace = () => {}; // (heightPx) => reserve that much banner height (0 = collapse)

const native = () => Capacitor.isNativePlatform();

/**
 * Ask for consent (only shows a form where the law needs it), then start the SDK and
 * the banner. No ad request is made before consent is resolved.
 */
export async function initializeAdMob({ topMargin, onSpace } = {}) {
  if (!native()) return false;
  if (topMargin) getTopMargin = topMargin;
  if (onSpace) onBannerSpace = onSpace;

  let canRequestAds = true;
  try {
    let info = await AdMob.requestConsentInfo();
    if (info.isConsentFormAvailable && info.status === AdmobConsentStatus.REQUIRED) {
      info = await AdMob.showConsentForm();
    }
    canRequestAds = info.canRequestAds !== false;
    privacyOptionsRequired = info.privacyOptionsRequirementStatus === 'REQUIRED';
  } catch {
    // Offline or UMP error: the SDK can still start; Google decides what can be served.
  }
  if (!canRequestAds) {
    onBannerSpace(0);
    return false;
  }

  try {
    await AdMob.initialize({ initializeForTesting: ADS_CONFIG.isTesting });
  } catch {
    onBannerSpace(0);
    return false;
  }
  ready = true;
  addListeners();
  watchLayoutAndNetwork();
  preloadInterstitial();
  startBanner();
  return true;
}

function addListeners() {
  try {
    AdMob.addListener(BannerAdPluginEvents.SizeChanged, size => {
      // hideBanner() reports height 0; ignore it so the slot does not jump behind a dialog.
      if (suppressed.size || bannerState === 'off' || bannerState === 'failed') return;
      const h = size && size.height ? size.height : 0;
      if (h > 0) onBannerSpace(h);
    });
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      bannerState = 'loaded';
      if (suppressed.size) AdMob.hideBanner().catch(() => {});
    });
    AdMob.addListener(BannerAdPluginEvents.FailedToLoad, () => {
      // The plugin destroys a banner that failed. Collapse the slot; retry when back online.
      bannerState = 'failed';
      bannerMargin = -1;
      onBannerSpace(0);
    });
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
      interstitialReady = true;
      interstitialLoading = false;
    });
    AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, () => {
      interstitialReady = false;
      interstitialLoading = false;
    });
    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      lastInterstitial = Date.now();
      preloadInterstitial();
    });
    AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, () => {
      interstitialReady = false;
      preloadInterstitial();
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

/** Create the one banner (only when consent allows, the SDK is ready and the phone is online). */
async function startBanner() {
  if (!ready || !ADS_CONFIG.enableBanner || bannerState === 'requested' || bannerState === 'loaded') return;
  if (!(await isOnline())) {
    bannerState = 'failed';
    onBannerSpace(0);
    return;
  }
  bannerState = 'requested';
  bannerMargin = Math.max(0, Math.round(getTopMargin()));
  onBannerSpace(ADS_CONFIG.bannerReserveHeight);
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
    bannerState = 'failed';
    bannerMargin = -1;
    onBannerSpace(0);
  }
}

/**
 * The banner margin is fixed when it is created. If the header bottom moves (rotation,
 * notch side change), rebuild the banner at the new position. Keyboard open/close does not
 * move the header, so it does not trigger a rebuild.
 */
async function relayoutBanner() {
  if (bannerState !== 'loaded' && bannerState !== 'requested') return;
  const m = Math.max(0, Math.round(getTopMargin()));
  if (Math.abs(m - bannerMargin) < 1) return;
  try {
    await AdMob.removeBanner();
  } catch {
    // ignore
  }
  bannerState = 'off';
  startBanner();
}

function watchLayoutAndNetwork() {
  const schedule = () => {
    clearTimeout(relayoutTimer);
    relayoutTimer = setTimeout(relayoutBanner, 300);
  };
  window.addEventListener('resize', schedule);
  window.addEventListener('orientationchange', schedule);
  try {
    Network.addListener('networkStatusChange', st => {
      if (st.connected && bannerState === 'failed') startBanner();
    });
  } catch {
    // ignore
  }
}

/**
 * Hide the banner while something is drawn over the app (custom dialog, sheet, consent form),
 * so taps can never land on the ad. The reserved slot stays, so nothing jumps.
 */
export function setBannerSuppressed(reason, on) {
  if (!native()) return;
  const before = suppressed.size;
  if (on) suppressed.add(reason);
  else suppressed.delete(reason);
  if (bannerState !== 'loaded' && bannerState !== 'requested') return;
  if (!before && suppressed.size) AdMob.hideBanner().catch(() => {});
  if (before && !suppressed.size) AdMob.resumeBanner().catch(() => {});
}

async function preloadInterstitial() {
  if (!ready || !ADS_CONFIG.enableInterstitial || interstitialReady || interstitialLoading) return;
  interstitialLoading = true;
  try {
    await AdMob.prepareInterstitial({ adId: ADS_CONFIG.interstitialAdId, isTesting: ADS_CONFIG.isTesting });
  } catch {
    interstitialLoading = false;
  }
}

/**
 * Show an interstitial at a natural break (after a finished mock interview),
 * only if one is already loaded and the cooldown has passed. Never waits for loading.
 */
export async function showInterstitialIfReady() {
  if (!ready || !ADS_CONFIG.enableInterstitial) return false;
  if (Date.now() - lastInterstitial < ADS_CONFIG.interstitialCooldownMs) return false;
  if (!interstitialReady) {
    preloadInterstitial();
    return false;
  }
  interstitialReady = false;
  try {
    await AdMob.showInterstitial();
    lastInterstitial = Date.now();
    return true;
  } catch {
    preloadInterstitial();
    return false;
  }
}

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
