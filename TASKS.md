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

## Voice accuracy

- [x] One shared voice session manager (idle, starting, ready, listening, restarting, stopping, error); "Speak now" only after the recognizer is ready
- [x] Live words shown under the answer box; only final phrases are added; typed text is never replaced
- [x] Duplicate phrases dropped; restart after silence with backoff; stops with a message after 3 failed restarts; error 8 waits and retries
- [x] Silence only: "I did not catch that. Try again or type." and the box stays empty
- [x] Voice accent setting (Pakistan default, India, US, UK) with a locale fallback chain
- [x] Personal vocabulary (`vocab.js`): My words, profile name and hometown, saved answers, tech terms; Smart name matching switch; learned corrections with Undo; chips under the answer box
- [x] Hint words sent to the speech service are single words only (max 100), never sample-answer sentences
- [x] Debug panel: Voice section and **Copy voice report**
- [x] Tests: vocab 59 cases, false-positive sweep (654 texts, 0 changes), voice manager 29 cases incl. replay of the reported phone session
- [ ] Voice accuracy on a real phone (GUIDE section 16 test script): **NOT CHECKED**
- [ ] Whether `EXTRA_BIASING_STRINGS` improves names on Android 13+: **NOT CHECKED** (needs the voice report from a phone)
- [ ] Whether en-PK is accepted by the phone's speech service: **NOT CHECKED** (voice report shows the locale used)

## Checking ads on the phone

- [x] Debug APK has a hidden **Ads status** panel (hold the app title 1 s): build/commit, consent, banner wanted vs real position, interstitial state, last 20 `ADS:` lines, **Copy report**, **Force interstitial test** (GUIDE section 15)
- [x] Release .aab contains no panel code (checked in CI: `apk-contents.txt`)
- [x] Profile shows `Build <commit> · <time> · debug` in debug builds only
- [ ] Install the newest debug APK, confirm the commit in Profile matches the GitHub run: **NOT CHECKED**
- [ ] Banner: panel shows `wantedTop` = `realTop` (±2) and nothing is covered: **NOT CHECKED**
- [ ] Interstitial: finish a mock interview 10 s after start, ad shows; or use **Force interstitial test**: **NOT CHECKED**
- [ ] Send the copied report to the developer if anything fails

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

## Voice fix (Mock interview)

- [x] Own `VoicePlugin` for everything (permission, settings, sessions); `@capacitor-community/speech-recognition` removed
- [x] Recognizer: en-IN default (en-PK, en-US, en-GB in settings), prefer offline off, 5 guesses, partial results, silence 4000/3000 ms, minimum 15000 ms, language detection off, hints on Android 13+
- [x] No restart loop: next session only after real speech; one empty session stops with "Tap the mic to continue"
- [x] Partials only in the grey live bar; one final per session; noise gate (max RMS), confidence 0.4, 5 s dedupe with overlap trim
- [x] N-best by profile name overlap, else confidence; never merged
- [x] Vocabulary system removed (My words, name matching, learned corrections, chips): the app writes exactly what the phone heard
- [x] Demo profile name ("Alex Khan") no longer used for chips, hints or matching
- [x] Text inserted at the cursor; Open settings button when the mic is blocked
- [x] Debug voice report per session (language, n-best + confidence, max RMS, drops, replacements, committed text)
- [x] CI fails if the AAB is 40 MB or more
- [ ] Voice fix tested on a real phone (GUIDE section 16 test script): **NOT CHECKED**
- [ ] Recognizer honours the silence extras on the test phone: **NOT CHECKED** (session length in the voice report)
- [ ] Noise gate level (5 dB) right for the test phone: **NOT CHECKED** (max RMS in the voice report)

## Setup, Practice matching, Home, Mock banner, new logo

- [x] Demo profile ("Alex Khan") removed from the code and deleted from phones at start-up (with its edits); chips only from the user's own data
- [x] Setup screen before the first Mock or Practice session (3 steps): full name (inline check), target role, education, city, experience, skills (tags, suggestions), My words (prefilled), voice accent; "Edit my details" on Mock, Practice and Profile
- [x] Practice: expected-text matching (word DP alignment, O(n x m)), saved words written, colours (said, corrected, extra, missed), score, best score per question, Read it / From memory with Hint, intro answer from a template
- [x] Mock: free dictation with the user's vocabulary, chips (name, My words, question keywords), learned corrections with Undo, interview vocabulary hints
- [x] Home: compact horizontal hero (<= 140 px), feature cards in a scroll-snap row with dots, skeletons, empty states
- [x] Mock session page: banner at the bottom (BOTTOM_CENTER, measured), top banner on every other page
- [x] New logo: `assets/logo/glyph.svg` (IoU 0.94 with the reference), brand gradient tokens, adaptive + monochrome + legacy launcher icons, splash, Play icon, favicon, manifest; CI checks the icon sizes
- [x] From memory moved from Practice to Mock (Free answer / From memory, Hint, saved words written, score toast); Practice is Read it only
- [x] Key skill suggestions follow the target role (`ROLE_SKILLS`)
- [x] Categories first: the setup form opens after a category is picked; the role comes from it and that category opens after saving
- [x] Setup is 2 steps; My words removed from the UI and made automatically (name, city, skills, role, education); Profile > Voice shows only the accent and learned corrections
- [x] Home hero like the reference, horizontal (text, 3 features, Get Started left; picture right); only the Question of the day card below
- [ ] New launcher icon, themed icon and splash seen on a real phone: **NOT CHECKED**
- [ ] Bottom banner position on a real phone (gesture bar, 3-button bar): **NOT CHECKED**
- [ ] Practice matching with real speech (voice report: expected, heard, alignment, score): **NOT CHECKED**

