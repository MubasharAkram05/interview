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
- [x] AdMob: no ad at launch; banner only on Home and Results; interstitial only after a finished mock interview, preloaded, 3 min gap, not in first 2 min; failures and offline are silent
- [x] Back button handled (`@capacitor/app`): dialogs, leave-interview confirm, edit cancel, double back to exit
- [x] Privacy Policy screen inside the app, rendered from `PRIVACY_POLICY.md` (same file), "View online version" button with offline message
- [x] `PRIVACY_POLICY_URL` constant in `src/config/app.js`
- [x] `privacy-policy-site/index.html` generated from the same `PRIVACY_POLICY.md`
- [x] Transcript export fixed for Android (share sheet instead of blob download, which WebView cannot do)
- [x] Fixed pre-existing bugs: header clipped to 8px, blank "Practice it" button, `answers is not defined` error from inline handler
- [x] Mobile layout: tap targets 44px, body text 16px, toast wraps, safe-area padding, banner padding
- [x] App icon, adaptive icon, splash (light and dark) generated with `@capacitor/assets` from `assets/`
- [x] Store graphics: `store-assets/icon-512.png`, `store-assets/feature-graphic.png`, 4 draft screenshots
- [x] GitHub Actions workflow `.github/workflows/build-aab.yml` (signed or unsigned AAB + debug APK, verify report)
- [x] Docs: GUIDE, STRUCTURE, TASKS, PLAY_CONSOLE_ANSWERS, STORE_LISTING, PRIVACY_POLICY

## Fix before upload

- [ ] Gradle build (`bundleRelease`, `assembleDebug`): **NOT CHECKED** here (Android SDK download blocked). Run the workflow and confirm a green run
- [ ] 16 KB page size: **NOT CHECKED** here. Confirm `16 KB page size: PASS` in `verify-report.txt`
- [ ] Release R8 build works on a phone: **NOT CHECKED**. Install the release from the closed test and run the test script (GUIDE section 14)
- [ ] Merged manifest has no extra permissions from libraries: **NOT CHECKED**. Read the permission list in `verify-report.txt`
- [ ] Create upload keystore and add the 4 GitHub Secrets (GUIDE sections 1 and 2)
- [ ] Get a run where `verify-report.txt` says `AAB signature: VERIFIED`
- [ ] Put your real contact email in `PRIVACY_POLICY.md` (replace `[YOUR CONTACT EMAIL]`), run `npm run policy:page`
- [ ] Decide on the demo profile in `src/data/questions.js` (`DEMO`): every new user sees "Mubashar Akram" with your university and internship. Consider a fictional sample name
- [ ] Voice and read-aloud tested on a real phone (online, offline, permission denied): **NOT CHECKED**

## Prepare for Play Console

- [ ] Upload `privacy-policy-site/index.html` to the policy repo root and enable GitHub Pages (GUIDE section 12)
- [ ] Open https://mubasharakram05.github.io/privacy_policy_interview_simulator/ in incognito and confirm it loads without login
- [ ] Create the app in Play Console (GUIDE section 6)
- [ ] Fill store listing from `STORE_LISTING.md`
- [ ] Replace draft screenshots with real phone screenshots (mic button only shows on a phone)
- [ ] Fill App content and Data safety from `PLAY_CONSOLE_ANSWERS.md`
- [ ] Optional: simpler launcher icon without small text

## Closed testing

- [ ] Recruit at least 12 testers (aim for 15 to 20)
- [ ] Upload signed `app-release.aab` to a closed testing track
- [ ] Share the opt-in link, confirm 12+ testers installed
- [ ] Keep 12+ testers opted in for 14 days in a row
- [ ] Collect feedback and ship fixes (bump versionCode each upload)

## Production release

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
