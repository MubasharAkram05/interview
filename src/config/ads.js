/**
 * All AdMob IDs and ad settings live in this one file.
 *
 * These are Google's official TEST IDs. Before the production release, replace:
 *   appId, bannerAdId, interstitialAdId  (and the APPLICATION_ID in app/src/main/AndroidManifest.xml)
 * and set isTesting to false. See GUIDE.md > "Swap test ad IDs for real ones".
 */

export const ADS_CONFIG = {
  // true = test mode. Keep true until you switch to your real IDs.
  isTesting: true,

  // AdMob App ID (must match com.google.android.gms.ads.APPLICATION_ID in AndroidManifest.xml)
  appId: 'ca-app-pub-3940256099942544~3347511713',

  // Google test banner (adaptive)
  bannerAdId: 'ca-app-pub-3940256099942544/9214589741',

  // Google test interstitial
  interstitialAdId: 'ca-app-pub-3940256099942544/1033173712',

  // Minimum gap between two interstitials (3 minutes).
  interstitialCooldownMs: 180000,

  // No interstitial in the first 2 minutes after the app opens.
  firstInterstitialDelayMs: 120000,

  // Show the banner only on these calm screens (no mic, typing or quick tapping there).
  bannerScreens: ['home', 'feedback'],

  enableBanner: true,
  enableInterstitial: true
};
