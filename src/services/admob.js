import { Capacitor } from '@capacitor/core';
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
 * Every call is wrapped so a failed or offline ad never blocks or crashes the app.
 */

let ready = false; // SDK initialized and consent allows ads
let privacyOptionsRequired = false;
let bannerShown = false;
let bannerWanted = false;
let launchHold = true; // no ad of any kind until the user starts using the app
let interstitialReady = false;
let interstitialLoading = false;
let lastInterstitial = Date.now() - ADS_CONFIG.interstitialCooldownMs + ADS_CONFIG.firstInterstitialDelayMs;
let onBannerHeight = () => {};
let bottomMargin = () => 0;

const native = () => Capacitor.isNativePlatform();

/**
 * Ask for consent (only shows a form where the law needs it), then start the SDK.
 * No ad is shown here. Call showBannerFor(screen) after navigation instead.
 */
export async function initializeAdMob({ onBannerResize, getBottomMargin } = {}) {
  if (!native()) return false;
  if (onBannerResize) onBannerHeight = onBannerResize;
  if (getBottomMargin) bottomMargin = getBottomMargin;

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
  if (!canRequestAds) return false;

  try {
    await AdMob.initialize({ initializeForTesting: ADS_CONFIG.isTesting });
  } catch {
    return false;
  }
  ready = true;
  addListeners();
  preloadInterstitial();
  if (bannerWanted) showBanner();
  return true;
}

function addListeners() {
  try {
    AdMob.addListener(BannerAdPluginEvents.SizeChanged, size => {
      onBannerHeight(bannerShown && size ? size.height || 0 : 0);
    });
    AdMob.addListener(BannerAdPluginEvents.FailedToLoad, () => {
      bannerShown = false;
      onBannerHeight(0);
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

async function showBanner() {
  if (!ready || !ADS_CONFIG.enableBanner || bannerShown) return;
  bannerShown = true;
  try {
    await AdMob.showBanner({
      adId: ADS_CONFIG.bannerAdId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      // Sits above the bottom tab bar; the page adds matching padding so nothing is covered.
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: Math.round(bottomMargin()),
      isTesting: ADS_CONFIG.isTesting
    });
  } catch {
    bannerShown = false;
    onBannerHeight(0);
  }
}

async function removeBanner() {
  if (!bannerShown) return;
  bannerShown = false;
  onBannerHeight(0);
  try {
    await AdMob.removeBanner();
  } catch {
    // ignore
  }
}

/** Show the banner only on calm screens, hide it everywhere else. */
export function showBannerFor(screen) {
  if (!native()) return;
  bannerWanted = !launchHold && ADS_CONFIG.bannerScreens.includes(screen);
  if (bannerWanted) showBanner();
  else removeBanner();
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

/** Called after the user's first navigation. Before this, the app shows no ads. */
export function releaseLaunchHold() {
  launchHold = false;
}

/** true when the user is in a region where a "Privacy choices" entry point is required (EEA/UK). */
export function needsPrivacyOptions() {
  return privacyOptionsRequired;
}

export async function showPrivacyOptions() {
  try {
    await AdMob.showPrivacyOptionsForm();
    return true;
  } catch {
    return false;
  }
}
