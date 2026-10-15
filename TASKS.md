# TASKS: Interview Simulator Play Store checklist

[x] = done and verified. [ ] = still to do. "NOT CHECKED" = could not be verified in this environment.

## Done

- [x] Project mapped; all JS, HTML, CSS read; every screen listed (Home, Practice categories, Practice, Mock setup, Mock interview, Results, Profile, Add question, Privacy Policy)
- [x] Web build passes (`npm run build`)
- [x] Browser smoke test of all screens at 375px and landscape: no page errors, no horizontal scroll, no external network requests (Playwright)
- [x] Removed AI Studio leftovers: Compose, Firebase AI, App Check, Retrofit, OkHttp, Room, Moshi, KSP, secrets plugin, Gemini `.env.example`, `metadata.json`, `com.example` code and tests
- [x] Replaced Gradle setup with the official Capacitor 8 template (AGP 8.13.0, Gradle 8.14.3, Java 21)
- [x] applicationId and namespace = `com.sussalproductions.interviewsimulator` (no `com.example` or `.qumnlr` left)
- [x] compileSdk 36, targetSdk 36, minSdk 24, versionCode 1, versionName 1.0
- [x] Manifest permissions only: INTERNET, ACCESS_NETWORK_STATE, RECORD_AUDIO, AD_ID; microphone feature optional
- [x] Release signing from env vars or git-ignored `keystore.properties`; keystores and `keystore.properties` git-ignored
- [x] R8 minify + resource shrinking on release, keep rules for Capacitor and plugins
- [x] `npx cap sync android` works with the root Android layout (`android.path: '.'`)
- [x] Voice: removed Web Speech API (does not exist in Android WebView); added `@capacitor-community/speech-recognition` with en-US, live partial text, listening state
- [x] Voice: offline check before starting (`@capacitor/network`), friendly offline message, typing always works
- [x] Voice: mic hidden with a clear message when the phone has no speech service
- [x] Voice: permission asked only on mic tap, reason shown first, denied and "don't ask again" handled
- [x] Voice and read-aloud stop when the app goes to background or the screen changes
- [x] Read aloud: `@capacitor-community/text-to-speech` with clear message when no voice is installed
- [x] One shared offline helper (`src/services/online.js`) for voice, policy link and ad privacy choices
- [x] AdMob: all IDs in `src/config/ads.js` (Google test IDs); App ID in manifest; UMP consent for EEA/UK; "Ad privacy choices" entry when required
- [x] AdMob: ONE standard 320x50 banner fixed under the header on every screen (created once, kept alive across screens, no reloads). A spacer `#adSlot` reserves 50px before the ad loads and pushes content down, so the banner never covers anything; it collapses to 0 with no consent, offline or no fill, and reloads when back online. Banner hides while a dialog, sheet or consent form is open.
- [x] Back button handled (`@capacitor/app`): dialogs, leave-interview confirm, edit cancel, double back to exit
- [x] Privacy Policy screen inside the app, rendered from `PRIVACY_POLICY.md` (same file), "View online version" button with offline message
- [x] `PRIVACY_POLICY_URL` constant in `src/config/app.js`
- [x] `privacy-policy-site/index.html` generated from the same `PRIVACY_POLICY.md`
- [x] Transcript export fixed for Android (share sheet instead of blob download, which WebView cannot do)
- [x] Fixed pre-existing bugs: header clipped to 8px, blank "Practice it" button, `answers is not defined` error from inline handler
- [x] Mobile layout: tap targets 44px, body text 16px, toast wraps, safe-area padding (env() and Capacitor's --safe-area-inset-* vars)
- [x] Interstitial: Interstitial only at natural breaks: after a mock interview is finished (just before the results screen) and after every 4th Practice question the user moves forward to. Never on app launch, never within 10 s of opening the app, never while recording or typing, never on the back button or exit, never at two breaks in a row, and at least `INTERSTITIAL_COOLDOWN_MS` apart (30 s for testing now, 180 s for release). If no ad is loaded when a break comes, it is skipped silently; the app never waits. The banner hides while the interstitial is open. Preloaded after consent, reloaded after every dismiss or failure, retried with backoff 15 s, 30 s, 60 s. `ADS:` diagnostic logs print only in the debug APK (native `BuildInfo` plugin)
- [x] Interstitial rules unit-tested with mocked AdMob (`npm run test:ads`, 20 checks, also run in CI)
- [ ] Interstitial shown and dismissed on a real phone (GUIDE section 14, Interstitial): **NOT CHECKED**
- [x] Banner layout checked in a 375px browser emulation on all 10 screens, with and without a 32px notch, and with the keyboard height: 0 overlaps with content, nav or mic, 18px clear to header buttons, 8px clear to content
- [ ] Banner position checked on a real phone (notch, rotation, keyboard, dialogs): **NOT CHECKED**
- [x] App icon, adaptive icon, splash (light and dark) generated with `@capacitor/assets` from `assets/`
- [x] Store graphics: `store-assets/icon-512.png`, `store-assets/feature-graphic.png`, 4 draft screenshots
- [x] GitHub Actions workflow `.github/workflows/build-aab.yml` (signed or unsigned AAB + debug APK, verify report)
- [x] Docs: GUIDE, STRUCTURE, TASKS, PLAY_CONSOLE_ANSWERS, STORE_LISTING, PRIVACY_POLICY

## Fix before upload

- [x] Gradle build passes on GitHub Actions (`bundleRelease` + `assembleDebug`, R8 ran). Latest run on `playstore-final`: AAB = `app-release.aab`, 6.3 MB (6,529,797 bytes), debug APK 9.7 MB
- [x] 16 KB page size: PASS (0 native libraries in the AAB; `zipalign -c -P 16` on debug APK passes)
- [x] Merged release manifest: package `com.sussalproductions.interviewsimulator`, versionCode 1, versionName 1.0, minSdk 24, targetSdk 36
- [ ] Release R8 build works on a phone: **NOT CHECKED**. Install the release from the closed test and run the test script (GUIDE section 14)
- [x] Merged manifest permissions checked. Extra ones come from the Google Mobile Ads SDK only: ACCESS_ADSERVICES_AD_ID / ATTRIBUTION / TOPICS (Android Privacy Sandbox ads), WAKE_LOCK and FOREGROUND_SERVICE (WorkManager used by the ads SDK), DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION (AndroidX internal). Kept on purpose: removing them can break ads. None needs a Play Console declaration form
- [ ] Create upload keystore and add the 4 GitHub Secrets (GUIDE sections 1 and 2)
- [ ] Get a run where `verify-report.txt` says `AAB signature: VERIFIED` (first run was UNSIGNED because the secrets are not added yet)
- [x] Contact email set in `PRIVACY_POLICY.md` (sussalproductions@gmail.com); `privacy-policy-site/index.html` regenerated
- [x] Policy text identical in `PRIVACY_POLICY.md`, `privacy-policy-site/index.html` and the in-app screen (790 words each, `node scripts/check-policy-sync.mjs` exits 0)
- [x] `PRIVACY_POLICY_URL` and the "View online version" button both use https://mubasharakram05.github.io/privacy_policy_interview_simulator/ ; no `.git` policy link anywhere
- [x] Personal details removed from the app: demo profile is now fictional "Alex Khan, BS Computer Science, Example University"; the Customer Service "Tell me about yourself" answer now uses profile placeholders instead of a real name, city and university
- [x] Store screenshots retaken with the fictional profile
- [x] New launcher icon: white speech bubble + bold mic on indigo gradient, no text, art inside the adaptive icon safe zone; splash has no text
- [x] Play Store icon 512x512 (32-bit PNG) and feature graphic 1024x500 (24-bit PNG, no alpha) regenerated in `store-assets/`
- [ ] Voice and read-aloud tested on a real phone (online, offline, permission denied): **NOT CHECKED**

## Prepare for Play Console

- [x] `index.html` pushed to the policy repo on branch `playstore-final` with a PR (also fixes the broken contact link, which had no `mailto:`)
- [ ] Merge that PR in MubasharAkram05/privacy_policy_interview_simulator and make sure GitHub Pages is on (Settings > Pages > main > / root)
- [ ] Open https://mubasharakram05.github.io/privacy_policy_interview_simulator/ in incognito and confirm it loads without login: **NOT CHECKED** (github.io is blocked in the build environment)
- [ ] Create the app in Play Console (GUIDE section 6)
- [ ] Fill store listing from `STORE_LISTING.md`
- [ ] Replace draft screenshots with real phone screenshots (mic button only shows on a phone)
- [ ] Fill App content and Data safety from `PLAY_CONSOLE_ANSWERS.md`

## Closed testing

- [ ] Recruit at least 12 testers (aim for 15 to 20)
- [ ] Upload signed `app-release.aab` to a closed testing track
- [ ] Share the opt-in link, confirm 12+ testers installed
- [ ] Keep 12+ testers opted in for 14 days in a row
- [ ] Collect feedback and ship fixes (bump versionCode each upload)

## Production release

- [ ] set INTERSTITIAL_COOLDOWN_MS back to 180000 before release (`src/config/ads.js`, now 30000 for testing)
- [ ] Create AdMob app, real banner and interstitial units, publish GDPR message
- [ ] Swap test IDs in `src/config/ads.js` and the manifest, set `isTesting: false` (GUIDE section 5)
- [ ] Bump versionCode, build, upload
- [ ] Apply for production access (GUIDE section 9)
- [ ] Roll out to production (staged rollout suggested)

## After release

- [ ] Upload `mapping.txt` for each release
- [ ] Watch Android vitals (crashes, ANRs) and reviews weekly
- [ ] Add `app-ads.txt` if you have a website
- [ ] Keep Capacitor, AdMob plugin and Google Mobile Ads SDK updated (Play target API rules change every year)
- [ ] Keep `PRIVACY_POLICY.md`, the in-app policy and the website identical after any change
