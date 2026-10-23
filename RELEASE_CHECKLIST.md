# Release checklist: Interview Simulator

Do every step, in order, before each production upload. Each line says where the switch is.

## 1. Ads (real IDs)

- [ ] AdMob: app and two ad units created (Banner 320x50, Interstitial). GDPR message published (Privacy & messaging).
- [ ] `src/config/ads.js` > `PRODUCTION_IDS`: real `appId`, `bannerAdId`, `interstitialAdId` pasted (the only place for IDs).
- [ ] GitHub > Settings > Secrets and variables > Actions > Variables: `RELEASE_ADS` = `true`.
- [ ] CI run green. The build fails by itself if a production ID is still a placeholder or a Google test ID.
- [ ] `verify-report.txt` (build-reports artifact): `AdMob App ID in manifest` is YOUR ID, not `ca-app-pub-3940256099942544`.
- [ ] Interstitial cooldown: 600 s (10 minutes) in every build (`INTERSTITIAL_COOLDOWN_MS` in src/config/ads.js). Nothing to edit.

## 2. Version

- [ ] `versionCode`: the CI run number (automatic, always grows). Local builds use 1, never upload those.
- [ ] `versionName`: the `"version"` in `package.json` (one place). Bump it for each store release (1.0.0 -> 1.0.1 for fixes, 1.1.0 for features) with `npm version patch --no-git-tag-version`.

## 3. Build and signing

- [ ] The 4 signing secrets exist (ANDROID_KEYSTORE_BASE64, ANDROID_KEYSTORE_PASSWORD, ANDROID_KEY_ALIAS, ANDROID_KEY_PASSWORD).
- [ ] `verify-report.txt`: `AAB signature: VERIFIED`, `package="com.sussalproductions.interviewsimulator"`, targetSdk 36, `16 KB page size: PASS`, `debuggable: no`, `usesCleartextTraffic: false`.
- [ ] `apk-contents.txt`: the release AAB has no debug panel text (debug panel and voice report are compiled out of the release web build).
- [ ] AAB size in the job summary is under 40 MB.
- [ ] Upload key and keystore are NOT in git (`git log --all -- '*.jks' '*.keystore' keystore.properties` shows nothing).

## 4. Checks (all run in CI; run locally with npm if you changed code)

- [ ] `npm run lint`, `npm run format:check`
- [ ] `npm test` (unit), `npm run test:coverage`
- [ ] `npm run test:smoke` (with `RELEASE_ADS=true` it also proves no test ad ID is left)
- [ ] `npm run test:ui` (needs `npm run build` and `npx vite preview --port 4173`)
- [ ] `npm run policy:check` (policy identical in PRIVACY_POLICY.md, the app and privacy-policy-site/index.html)
- [ ] Privacy policy URL opens without login: https://mubasharakram05.github.io/privacy_policy_interview_simulator/ (copy `privacy-policy-site/index.html` to that repo after any policy change)

## 5. Phone test (debug APK and the release build from Play internal testing)

- [ ] The 15-step manual test in the PR / audit report on at least 2 phones (one small screen with 3-button navigation, one Android 15+ with gesture navigation).

## 6. Play Console

- [ ] Store listing from `STORE_LISTING.md` (short description <= 80, full <= 4000 characters), screenshots and 1024x500 feature graphic.
- [ ] App content from `PLAY_CONSOLE_ANSWERS.md` (Ads: Yes, Advertising ID: Yes, target audience 18+, Data safety, content rating, app access: no login).
- [ ] New personal developer account: closed test with **12 or more testers for 14 days in a row** before you can apply for production.
- [ ] Production release: upload the signed AAB, release notes, roll out.
