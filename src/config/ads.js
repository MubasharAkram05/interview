/**
 * Centralized AdMob Ads Configuration
 * Keep all Ad Unit IDs and settings in this single file.
 * To use your live Google AdMob ads in production, replace the test IDs below with your real IDs.
 */

export const ADS_CONFIG = {
  // Set to true to initialize SDK in test mode (safe for testing/Play Store review testing)
  isTesting: true,

  // AdMob Application ID (also declared in AndroidManifest.xml)
  appId: 'ca-app-pub-3940256099942544~3347511713',

  // Banner Ad Unit ID (Google Test Banner)
  bannerAdId: 'ca-app-pub-3940256099942544/6300978111',

  // Interstitial Ad Unit ID (Google Test Interstitial)
  interstitialAdId: 'ca-app-pub-3940256099942544/1033173712',

  // Sensible interval (in milliseconds) between interstitial ads to avoid annoyance
  // Defaults to 60 seconds (1 minute) minimum cooldown
  interstitialCooldownMs: 60000,

  // Feature flags
  enableBanner: true,
  enableInterstitial: true
};
