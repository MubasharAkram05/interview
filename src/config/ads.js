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

  // Google test banner (fixed 320x50 BANNER size)
  bannerAdId: 'ca-app-pub-3940256099942544/6300978111',

  // Google test interstitial
  interstitialAdId: 'ca-app-pub-3940256099942544/1033173712',

  // Minimum gap between two interstitials (3 minutes).
  interstitialCooldownMs: 180000,

  // No interstitial in the first 2 minutes after the app opens.
  firstInterstitialDelayMs: 120000,

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
