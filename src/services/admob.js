import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
  InterstitialAdPluginEvents
} from '@capacitor-community/admob';
import { ADS_CONFIG } from '../config/ads.js';

let isInitialized = false;
let isBannerActive = false;
let isPreparingInterstitial = false;
let lastInterstitialTimestamp = Date.now(); // Prevents ad on launch by starting cooldown now

/**
 * Initialize AdMob SDK and handle Google UMP (User Messaging Platform) consent
 */
export async function initializeAdMob() {
  if (!Capacitor.isNativePlatform()) {
    console.log('[AdMob] Running in web/non-native environment - AdMob disabled');
    return false;
  }

  if (isInitialized) return true;

  try {
    // 1. Google UMP Consent flow for GDPR/Privacy regulations
    try {
      console.log('[AdMob] Requesting consent info...');
      const consentInfo = await AdMob.requestConsentInfo();
      console.log('[AdMob] Consent status:', consentInfo?.status);

      // If form is available, present the Google consent dialog
      if (consentInfo?.isConsentFormAvailable) {
        await AdMob.showConsentForm();
        console.log('[AdMob] Consent form completed');
      }
    } catch (consentError) {
      // Consent error should never crash the app
      console.warn('[AdMob] Consent request skipped or offline:', consentError);
    }

    // 2. Initialize MobileAds SDK
    await AdMob.initialize({
      initializeForTesting: ADS_CONFIG.isTesting,
      testingDevices: []
    });

    isInitialized = true;
    console.log('[AdMob] Initialized successfully');

    // Setup listener logging for diagnostic purposes
    setupAdListeners();

    // If banner enabled, show banner
    if (ADS_CONFIG.enableBanner) {
      await showBottomBanner();
    }

    return true;
  } catch (err) {
    console.warn('[AdMob] Initialization failed (offline or service unavailable):', err);
    return false;
  }
}

/**
 * Set up event listeners for banner and interstitial ads
 */
function setupAdListeners() {
  try {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      console.log('[AdMob] Banner loaded');
      isBannerActive = true;
    });

    AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (err) => {
      console.warn('[AdMob] Banner failed to load (offline or no fill):', err);
      isBannerActive = false;
    });

    AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
      console.log('[AdMob] Interstitial prepared');
      isPreparingInterstitial = false;
    });

    AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (err) => {
      console.warn('[AdMob] Interstitial failed to load:', err);
      isPreparingInterstitial = false;
    });

    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      console.log('[AdMob] Interstitial dismissed');
      lastInterstitialTimestamp = Date.now();
    });
  } catch (e) {
    console.warn('[AdMob] Error registering listeners:', e);
  }
}

/**
 * Show a banner ad at the bottom of the screen (above the navigation bar)
 */
export async function showBottomBanner() {
  if (!Capacitor.isNativePlatform() || !ADS_CONFIG.enableBanner) return;

  try {
    await AdMob.showBanner({
      adId: ADS_CONFIG.bannerAdId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 56, // Leave room for bottom navigation tabs
      isTesting: ADS_CONFIG.isTesting
    });
    isBannerActive = true;
  } catch (e) {
    // Fails safely if offline
    console.warn('[AdMob] Banner show error (offline):', e);
  }
}

/**
 * Hide banner ad
 */
export async function hideBanner() {
  if (!Capacitor.isNativePlatform() || !isBannerActive) return;
  try {
    await AdMob.hideBanner();
  } catch (e) {
    console.warn('[AdMob] Hide banner error:', e);
  }
}

/**
 * Resume banner ad
 */
export async function resumeBanner() {
  if (!Capacitor.isNativePlatform() || !ADS_CONFIG.enableBanner) return;
  try {
    await AdMob.resumeBanner();
  } catch (e) {
    console.warn('[AdMob] Resume banner error:', e);
  }
}

/**
 * Show interstitial ad if cooldown has passed (e.g. after finishing an interview)
 * Ads must never freeze or crash the app if offline.
 */
export async function showInterstitialIfReady() {
  if (!Capacitor.isNativePlatform() || !ADS_CONFIG.enableInterstitial) {
    return false;
  }

  const now = Date.now();
  const timeSinceLast = now - lastInterstitialTimestamp;

  if (timeSinceLast < ADS_CONFIG.interstitialCooldownMs) {
    console.log(`[AdMob] Interstitial skipped: cooldown active (${Math.round((ADS_CONFIG.interstitialCooldownMs - timeSinceLast)/1000)}s remaining)`);
    return false;
  }

  if (isPreparingInterstitial) return false;

  try {
    isPreparingInterstitial = true;
    console.log('[AdMob] Preparing interstitial ad...');
    await AdMob.prepareInterstitial({
      adId: ADS_CONFIG.interstitialAdId,
      isTesting: ADS_CONFIG.isTesting
    });

    console.log('[AdMob] Showing interstitial ad...');
    await AdMob.showInterstitial();
    lastInterstitialTimestamp = Date.now();
    return true;
  } catch (err) {
    // Offline or failed to load - ignore safely, app continues normally
    console.warn('[AdMob] Interstitial could not be displayed (offline or no inventory):', err);
    return false;
  } finally {
    isPreparingInterstitial = false;
  }
}
