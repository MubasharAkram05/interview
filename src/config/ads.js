/**
 * All AdMob IDs and ad settings live in this one file. Nothing else holds an ad ID:
 *  - the web app reads ADS_CONFIG below;
 *  - Gradle reads the appId of the same set (app/build.gradle) and puts it in the manifest
 *    (com.google.android.gms.ads.APPLICATION_ID), so the two can never differ.
 *
 * Which set is used is a BUILD FLAG, never a code edit:
 *  - default, debug builds, tests: TEST_IDS (Google's public sample IDs, test ads)
 *  - release build with RELEASE_ADS=true: PRODUCTION_IDS (real ads)
 *    The release build FAILS (Vite and Gradle) while any production ID is still a placeholder.
 *
 * Owner: paste the real IDs from AdMob into PRODUCTION_IDS before the production release
 * (see RELEASE_CHECKLIST.md). Never put real IDs anywhere else.
 */

// Google's official sample IDs: always safe, always test ads.
export const TEST_IDS = {
  appId: 'ca-app-pub-3940256099942544~3347511713',
  bannerAdId: 'ca-app-pub-3940256099942544/6300978111',
  interstitialAdId: 'ca-app-pub-3940256099942544/1033173712'
};

// Real IDs from the AdMob console. Placeholders until the owner fills them in.
export const PRODUCTION_IDS = {
  appId: 'APP_ID',
  bannerAdId: 'BANNER_ID',
  interstitialAdId: 'INTERSTITIAL_ID'
};

const GOOGLE_SAMPLE_PUBLISHER = 'ca-app-pub-3940256099942544';

/** Problems that block a production-ads build ([] = ready). Used by vite.config.js and tests. */
export function productionIdProblems(ids = PRODUCTION_IDS) {
  const problems = [];
  const check = (key, re) => {
    const v = String(ids[key] || '');
    if (!re.test(v)) problems.push(`${key} is not a real AdMob ID ("${v}")`);
    else if (v.startsWith(GOOGLE_SAMPLE_PUBLISHER)) problems.push(`${key} is a Google TEST ID`);
  };
  check('appId', /^ca-app-pub-\d{16}~\d{10}$/);
  check('bannerAdId', /^ca-app-pub-\d{16}\/\d{10}$/);
  check('interstitialAdId', /^ca-app-pub-\d{16}\/\d{10}$/);
  return problems;
}

// Set by vite.config.js. Outside a Vite build (unit tests) it is false: test IDs.
export const USE_PRODUCTION_ADS = typeof __RELEASE_ADS__ !== 'undefined' && __RELEASE_ADS__ === true;

const IDS = USE_PRODUCTION_ADS ? PRODUCTION_IDS : TEST_IDS;

// Minimum time between two interstitials: 3 minutes in every build (release and debug APK).
// The debug panel's "Force interstitial test" button can still show one at once for testing.
export const INTERSTITIAL_COOLDOWN_MS = 180000;

// Never show an interstitial in the first 60 seconds after the app opens.
export const INTERSTITIAL_MIN_AFTER_LAUNCH_MS = 60000;

// In Practice, a break comes after every 4th question the user moves forward to.
export const INTERSTITIAL_PRACTICE_EVERY = 4;

// If an interstitial fails to load, try again after 15 s, then 30 s, then 60 s; then stop until
// the next natural break asks for one (no endless retry loop).
export const INTERSTITIAL_RETRY_MS = [15000, 30000, 60000];
export const INTERSTITIAL_MAX_RETRIES = 6;

export const ADS_CONFIG = {
  // Test mode follows the ID set: test IDs always request test ads.
  isTesting: !USE_PRODUCTION_ADS,

  appId: IDS.appId,
  bannerAdId: IDS.bannerAdId,
  interstitialAdId: IDS.interstitialAdId,

  // The app is for adults (18+): never child-directed, never under the age of consent.
  tagForChildDirectedTreatment: false,
  tagForUnderAgeOfConsent: false,

  // Interstitial timing (see the constants above this object).
  interstitialCooldownMs: INTERSTITIAL_COOLDOWN_MS,
  interstitialMinAfterLaunchMs: INTERSTITIAL_MIN_AFTER_LAUNCH_MS,
  interstitialPracticeEvery: INTERSTITIAL_PRACTICE_EVERY,
  interstitialRetryMs: INTERSTITIAL_RETRY_MS,
  interstitialMaxRetries: INTERSTITIAL_MAX_RETRIES,

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
