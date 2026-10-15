/**
 * All AdMob IDs and ad settings live in this one file.
 *
 * These are Google's official TEST IDs. Before the production release, replace:
 *   appId, bannerAdId, interstitialAdId  (and the APPLICATION_ID in app/src/main/AndroidManifest.xml)
 * and set isTesting to false. See GUIDE.md > "Swap test ad IDs for real ones".
 */

// Minimum time between two interstitials.
// TESTING VALUE: 30 s. Set back to 180000 (3 minutes) before release (see TASKS.md).
export const INTERSTITIAL_COOLDOWN_MS = 30000;

// Never show an interstitial in the first 10 seconds after the app opens.
export const INTERSTITIAL_MIN_AFTER_LAUNCH_MS = 10000;

// In Practice, a break comes after every 4th question the user moves forward to.
export const INTERSTITIAL_PRACTICE_EVERY = 4;

// If an interstitial fails to load, try again after 15 s, then 30 s, then every 60 s.
export const INTERSTITIAL_RETRY_MS = [15000, 30000, 60000];

export const ADS_CONFIG = {
  // true = test mode. Keep true until you switch to your real IDs.
  isTesting: true,

  // AdMob App ID (must match com.google.android.gms.ads.APPLICATION_ID in AndroidManifest.xml)
  appId: 'ca-app-pub-3940256099942544~3347511713',

  // Google test banner (fixed 320x50 BANNER size)
  bannerAdId: 'ca-app-pub-3940256099942544/6300978111',

  // Google test interstitial
  interstitialAdId: 'ca-app-pub-3940256099942544/1033173712',

  // Interstitial timing (see the constants above this object).
  interstitialCooldownMs: INTERSTITIAL_COOLDOWN_MS,
  interstitialMinAfterLaunchMs: INTERSTITIAL_MIN_AFTER_LAUNCH_MS,
  interstitialPracticeEvery: INTERSTITIAL_PRACTICE_EVERY,
  interstitialRetryMs: INTERSTITIAL_RETRY_MS,

  // One banner, fixed under the header on every screen.
  // Standard 320x50 size: its height is known in advance, so the app reserves exactly
  // this much space before the ad arrives and the content does not jump.
  bannerReserveHeight: 50,
  // Clear space (CSS px) between the header bottom and the banner, and below the banner.
  // The header has 12px inner padding, so buttons get 12 + 6 = 18px clearance.
  bannerGapTop: 6,
  bannerGapBottom: 8,

  enableBanner: true,
  enableInterstitial: true
};
