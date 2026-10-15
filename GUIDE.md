# GUIDE: Build, sign and publish Interview Simulator

Simple steps, in order. No secrets are stored in this repo. Keep your keystore and passwords safe and private.

- Package name: `com.sussalproductions.interviewsimulator`
- Current version: versionCode `1`, versionName `1.0` (in `app/build.gradle`)
- The app works offline, **except voice input and ads**, which need internet.

---

## 1. Create your upload keystore (one time, on Windows)

The keystore is your "upload key". Play uses it to check that updates really come from you. If you lose it, you must ask Google support to reset it. **Back it up** (USB drive and a private cloud folder).

1. Install Java 21 (free): https://adoptium.net (Temurin 21, Windows x64 .msi). Tick "Add to PATH" and "Set JAVA_HOME".
2. Open **PowerShell** and make a folder outside the project:
   ```powershell
   mkdir C:\keys
   cd C:\keys
   ```
3. Create the keystore:
   ```powershell
   keytool -genkeypair -v -keystore C:\keys\interview-upload.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000
   ```
   - It asks for a password. Choose a strong one and write it down in a password manager.
   - Answer the name / organization questions (for example: Sussal Productions, your city, country code PK). Type `yes` to confirm.
   - Modern keytool uses the same password for the key and the keystore. Use that same password for both secrets below.
4. Never put `interview-upload.jks` inside the project folder, and never commit it. `.gitignore` already blocks `*.jks`, `*.keystore` and `keystore.properties`, but keeping it outside is safer.

## 2. Add the 4 GitHub Secrets

1. Convert the keystore to base64 and copy it to the clipboard (PowerShell):
   ```powershell
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\keys\interview-upload.jks")) | Set-Clipboard
   ```
2. Open https://github.com/MubasharAkram05/interview > **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
3. Add these 4 secrets (names must match exactly):

| Name | Value |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | Paste the clipboard (the long base64 text) |
| `ANDROID_KEYSTORE_PASSWORD` | Your keystore password |
| `ANDROID_KEY_ALIAS` | `upload` |
| `ANDROID_KEY_PASSWORD` | Your key password (same as keystore password) |

If any secret is missing, the workflow still runs, but the .aab is **unsigned** and Play Console will reject it.

## 3. Build the .aab with GitHub Actions

Workflow file: `.github/workflows/build-aab.yml`

1. Go to the repo > **Actions** tab > **Build Android AAB** (left side).
2. Click **Run workflow**, pick the branch, click the green **Run workflow** button. (It also runs on every push to the working branch.)
3. Wait about 5 to 10 minutes for a green tick.
4. Open the finished run. Scroll to **Artifacts** and download:
   - `interview-simulator-release-aab` > contains `app-release.aab` (upload this to Play Console)
   - `interview-simulator-debug-apk` > contains `app-debug.apk` (install on your phone for testing)
   - `build-reports` > `verify-report.txt` (package name, targetSdk, versionCode, permissions, 16 KB check, signing) and `mapping.txt` (upload to Play Console for readable crash reports)
5. Artifacts download as .zip files. Unzip them first.
6. The run summary page shows the same verify report. Check that it says `AAB signature: VERIFIED` and `16 KB page size: PASS`.

### Build on your own PC instead (optional)

Needs Node 22, Java 21 and Android Studio (for the Android SDK 36).

```powershell
npm ci
npm run build
npx cap sync android
.\gradlew.bat bundleRelease
```

For signing on your PC, create `keystore.properties` in the project root (it is git-ignored):

```
storeFile=C:/keys/interview-upload.jks
storePassword=YOUR_PASSWORD
keyAlias=upload
keyPassword=YOUR_PASSWORD
```

Output: `app\build\outputs\bundle\release\app-release.aab`

## 4. Bump versionCode for every update

Play rejects an upload with a versionCode it has already seen.

1. Open `app/build.gradle`.
2. Change:
   ```
   versionCode 1
   versionName "1.0"
   ```
   to, for example:
   ```
   versionCode 2
   versionName "1.0.1"
   ```
3. versionCode must always go up by at least 1. versionName is what users see.
4. Commit, push, run the workflow, upload the new .aab.

## 5. Swap test ad IDs for real ones

Do this only when you are ready for production. Never tap your own real ads.

1. In https://admob.google.com create the app (Android, not yet listed or link it after Play publishing) and two ad units: **Banner** and **Interstitial**.
2. Open `src/config/ads.js` and change:
   - `appId` to your AdMob App ID (`ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY`)
   - `bannerAdId` to your banner unit ID
   - `interstitialAdId` to your interstitial unit ID
   - `isTesting: false`
3. Open `app/src/main/AndroidManifest.xml` and change the `com.google.android.gms.ads.APPLICATION_ID` value to the same App ID.
4. In AdMob > Privacy & messaging, create a **GDPR (European regulations) message** for the app and publish it. The in-app consent form comes from this.
5. Add your test phone as a test device in AdMob (Settings > Test devices) so you can safely check real ads.
6. Bump versionCode, build, upload.
7. After the app is live, add `app-ads.txt` to your developer website if you have one (AdMob shows the exact line).

## 6. Create the app in Play Console

1. https://play.google.com/console > **Create app**.
2. App name: `Interview Simulator`. Default language: English (United States). App or game: **App**. Free or paid: **Free**.
3. Accept the declarations and create.
4. Fill **Store listing** using `STORE_LISTING.md`.
5. Fill **App content** using `PLAY_CONSOLE_ANSWERS.md` (privacy policy, ads, app access, content rating, target audience, data safety, advertising ID, government, financial, health).
6. **Setup > App integrity > App signing**: keep "Google-managed key" (Play App Signing). Your keystore is only the upload key.

## 7. Fill App content and Data safety

All exact answers are in `PLAY_CONSOLE_ANSWERS.md`. Short version:

- Privacy policy: `https://mubasharakram05.github.io/privacy_policy_interview_simulator/`
- Ads: Yes
- Advertising ID: Yes (Advertising, Analytics, Fraud prevention)
- Target audience: 18+ (and 16 to 17 if you want). No age under 13.
- Data safety: approximate location, app interactions, crash logs, diagnostics, device IDs (all from AdMob, collected and shared); audio (collected, not shared, processed ephemerally, optional, app functionality).

## 8. Closed testing (personal account: 12 testers for 14 days)

New personal developer accounts must run a closed test with **at least 12 testers who stay opted in for 14 days in a row** before they can apply for production.

1. Play Console > **Test and release > Testing > Closed testing** > **Create track** (or use "Alpha").
2. **Testers**: create an email list with at least 12 (better 15 to 20, in case some drop out) Gmail addresses of real people.
3. **Create new release** > upload `app-release.aab` > release name `1.0 (1)` > release notes > **Save** > **Review release** > **Start rollout to Closed testing**.
4. Wait for review (can take a few hours to a few days).
5. Copy the **opt-in link** (Testers tab) and send it to all testers. Each tester must open it, tap "Become a tester", then install the app from Play.
6. Ask testers to open the app on several days and send feedback. Keep at least 12 opted in for 14 full days. Do not remove testers during this time.
7. If you fix bugs, bump versionCode and upload a new release to the same closed track. This does not reset the 14 days.

## 9. Apply for production access

After 14 days with 12+ opted-in testers:

1. Play Console > **Dashboard** > **Apply for production**.
2. Answer the questions honestly:
   - How you recruited testers (friends, classmates, communities).
   - How easy it was to get testers.
   - Feedback you got and what you changed.
   - Who the app is for (job seekers and students practicing interviews) and what makes it useful.
   - How many installs you expect in year one.
3. Google replies in about 7 days. If refused, read the reason, keep testing, and apply again.

## 10. Ship updates

1. Change code. Test in the debug APK.
2. Bump versionCode (and versionName) in `app/build.gradle`.
3. Push and run the workflow. Download the new .aab.
4. Play Console > the track you want (closed or production) > **Create new release** > upload > release notes > rollout.
5. For production you can use a staged rollout (for example 20% first).
6. Upload `mapping.txt` from the `build-reports` artifact under **App bundle explorer > Downloads > ReTrace mapping file** for readable crash logs.

## 11. Update the privacy policy

1. Edit `PRIVACY_POLICY.md` (change the "Last updated" date).
2. Run `npm run policy:page` to rebuild `privacy-policy-site/index.html`.
3. The app shows the new text automatically after the next build (it imports `PRIVACY_POLICY.md` directly).
4. Copy `privacy-policy-site/index.html` to the policy repo (section 12) so the online version stays identical.

## 12. Publish the policy on GitHub Pages

1. Open https://github.com/MubasharAkram05/privacy_policy_interview_simulator
2. **Add file > Upload files** > upload `privacy-policy-site/index.html` from this project to the repo **root** (file name must be `index.html`). Commit to `main`.
3. Repo **Settings > Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)** > **Save**
4. Wait 1 to 3 minutes. Refresh the Pages settings page until it shows "Your site is live at ...".
5. Open in a private / incognito window (no login): **https://mubasharakram05.github.io/privacy_policy_interview_simulator/**
6. The repo must be **public** (GitHub Pages on a free account only works for public repos).
7. Never use the `.git` address as the policy link. It is not a web page.

## 13. Troubleshooting

| Problem | Fix |
|---|---|
| Workflow fails at "Build release bundle" with `invalid source release: 21` | Java 17 is being used. The workflow uses Java 21; on your PC install Temurin 21 and set JAVA_HOME. |
| `SDK location not found` on your PC | Install Android Studio, open SDK Manager, install Android 16 (API 36). Create `local.properties` with `sdk.dir=C\:\\Users\\YOU\\AppData\\Local\\Android\\Sdk`. |
| Play says "You uploaded an APK or Android App Bundle that is not signed" | The 4 secrets are missing or wrong. Check names and that `verify-report.txt` says `AAB signature: VERIFIED`. |
| Play says "Version code 1 has already been used" | Bump versionCode (section 4). |
| Play says the upload key is wrong | You signed with a different keystore than the first upload. Use the original, or request an upload key reset in Play Console > App integrity. |
| `npm ci` fails | `package-lock.json` is out of sync. Run `npm install` on your PC, commit the new lock file. |
| Mic button missing on phone | The phone has no speech recognition service. Install or enable the Google app / "Speech Recognition and Synthesis from Google". |
| Voice says "You are offline" | Expected. Voice input needs internet. Type the answer instead. |
| Read aloud says no voice installed | Android Settings > Accessibility (or System > Languages) > Text-to-speech output > install English voice data. |
| No ads show | Normal right after setup, offline, or with new real ad units (can take hours). Test IDs should always show a "Test Ad". |
| Consent form does not appear | It only appears in EEA/UK and only after you publish a GDPR message in AdMob. |
| Play warns about 16 KB page size | Check `verify-report.txt`. Update `@capacitor-community/admob` (and the Google Mobile Ads SDK) to the newest version. |
| Release build crashes but debug works | R8 removed something. Download `mapping.txt`, read the crash, add a `-keep` rule to `app/proguard-rules.pro`. |

## 14. Real phone test script

Use the `app-debug.apk` from the workflow first, then the release build from the Play closed test (Play installs the signed release for you). Tick each line.

### Install
1. Phone: Settings > Security > allow "Install unknown apps" for your file manager or browser.
2. Copy `app-debug.apk` to the phone and tap it to install. (Or with a PC: `adb install -r app-debug.apk`.)
3. For the release build: join the closed test with the opt-in link and install from Play.
4. Open the app. Check: splash shows, then Home. **No ad appears at launch.**

### Online voice works
1. Wi-Fi on. Mock tab > Start mock interview > tap the big mic.
2. A short message explains why the mic is needed > Continue > Android asks > **Allow**.
3. Speak a sentence. Check: mic turns red, "Listening..." shows, words appear live in the answer box.
4. Stop talking or tap the mic. Check: text stays, mic turns back to normal.
5. Practice tab > open a question > tap the mic > read the answer aloud. Words get highlighted as you speak.

### Airplane mode (offline)
1. Turn on airplane mode. Close and reopen the app.
2. Check: Home, Practice, Mock interview (typing), Results, Profile, history all work.
3. Tap the mic. Check: message "You are offline. Voice input needs internet. You can type your answer instead." and the mic does not start. Typing works.
4. Tap the speaker (read aloud). Works if the phone's voice is downloaded; otherwise a clear message shows.
5. Profile > Privacy Policy > View: full policy text shows. Tap "View online version": short offline message, no error page.
6. No ads show, and nothing breaks or freezes.

### Mic permission allow and deny
1. Android Settings > Apps > Interview Simulator > Permissions > Microphone > reset to "Ask every time" / not allowed.
2. Tap the mic > Continue > **Don't allow**. Check: message says permission was not given; typing still works; no crash.
3. Tap the mic again > Continue > **Don't allow** again. Tap the mic a third time. Check: dialog "Microphone is blocked" explains how to allow it in Settings.
4. Allow it in Settings, come back, tap the mic. Voice works.
5. Tap the mic, then "Not now" in the reason dialog. Check: Android permission dialog does NOT appear.

### No speech service
1. If you can, test on a phone or emulator without the Google app (or disable "Google" / "Speech Recognition and Synthesis from Google" in Settings > Apps).
2. Open the app. Check: mic buttons are hidden, and the mock screen says voice input is not available; typing works; no crash.

### Rotation
1. Turn auto-rotate on. Rotate on Home, Practice, Mock interview (with typed text) and Results.
2. Check: layout fits, no sideways scrolling, typed answer is not lost.

### Back button
1. From Practice, Profile, Privacy Policy: back goes to the previous screen.
2. In a mock interview: back asks "Leaving already?" Stay keeps you there; Leave goes back.
3. With a dialog open: back closes the dialog.
4. On Home: first back shows "Press back again to exit", second back closes the app.

### Background and resume
1. Start the mic (listening), then press Home. Reopen the app. Check: mic is stopped (not red), no recording continues.
2. Start read aloud, then press Home. Check: sound stops right away.
3. Reopen: you are on the same screen and typed answers are still there.

### Ad failure case
1. Airplane mode on, open app, go Home and Results. Check: no banner, no empty gap, no freeze.
2. Finish a mock interview offline. Check: results show, no ad, no error.
3. Online: banner shows only on Home and Results (above the tab bar), never during practice or mock interview. Interstitial appears at most once every 3 minutes, only after finishing a mock interview, never in the first 2 minutes.
4. EEA/UK test (optional): the consent form shows once. Profile > Privacy Policy shows "Ad privacy choices".

### Low-end phone check
1. Use an old or cheap phone (2 to 3 GB RAM, Android 8 or newer).
2. Check: app opens in under about 4 seconds, scrolling is smooth, typing has no lag, no crash after 10 minutes of use.
3. Turn on Settings > Accessibility > Remove animations: app still works.
