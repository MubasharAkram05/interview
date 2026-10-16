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
2. Click **Run workflow**, pick the branch, click the green **Run workflow** button. (It also runs by itself on every push to `main`, so every merged PR gets a new build.)
   - Do **not** use **Re-run jobs** on an old run to get new changes. A re-run builds the same old commit again. Always start a new run, or take the newest run whose commit matches the latest merge.
   - In the debug APK, open Profile and check the footer: `Build <commit>` must match the newest commit on `main`.
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

First set `INTERSTITIAL_COOLDOWN_MS` in `src/config/ads.js` back to `180000` (it is `30000` for testing).

1. In https://admob.google.com create the app (Android, not yet listed or link it after Play publishing) and two ad units: **Banner** (standard 320x50 banner, not adaptive) and **Interstitial**.
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
2. Put `privacy-policy-site/index.html` from this project in the repo **root** as `index.html` on `main`. (For version 1.0 this is already done as a pull request from branch `playstore-final`: just merge it.) Later updates: **Add file > Upload files**, upload the new file, commit to `main`.
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
4. Open the app. Check: splash shows, then Home. No interstitial at launch. A 50px space opens under the header and the test banner appears there once loaded (no full-screen ad).

### Online voice works
1. Wi-Fi on. Mock tab > Start mock interview > tap the big mic.
2. A short message explains why the mic is needed > Continue > Android asks > **Allow**.
3. Speak a sentence. Check: mic turns red, "Speak now" shows, words appear live under the answer box and move into the box when each phrase is final.
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
1. Airplane mode on, open app, go Home and Results. Check: no banner, the space under the header closes (no empty gap), no freeze.
2. Finish a mock interview offline. Check: results show, no ad, no error.
3. Turn airplane mode off. Within a few seconds the banner space opens again and the test banner loads.
4. Online: ONE banner sits right under the header on every screen (Home, Practice, Mock, Interview, Results, Profile, Add question, Privacy Policy). It never covers the header buttons, content, mic, text boxes or the bottom tab bar, and it does not reload or flicker when you change screens. It does not reload when you change screens.
5. Open any dialog (for example delete a question, or tap an interview type on Home): the banner disappears while the dialog is open and comes back after.
6. EEA/UK test (optional): the consent form shows once, with no banner on top of it. Profile > Privacy Policy shows "Ad privacy choices"; the banner hides while that form is open.

### Interstitial (full-screen ad)
Rules: Interstitial only at natural breaks: after a mock interview is finished (just before the results screen) and after every 4th Practice question the user moves forward to. Never on app launch, never within 10 s of opening the app, never while recording or typing, never on the back button or exit, never at two breaks in a row, and at least `INTERSTITIAL_COOLDOWN_MS` apart (30 s for testing now, 180 s for release). If no ad is loaded when a break comes, it is skipped silently; the app never waits. The banner hides while the interstitial is open.

Use the **debug APK** for this test (it prints `ADS:` lines; the release build never does). With the phone connected by USB and USB debugging on, run on your PC:

```
adb logcat | findstr "ADS:"
```
(Mac/Linux: `adb logcat | grep "ADS:"`)

1. Open the app online and wait 15 seconds. Log shows `ADS: prepare` then `ADS: loaded`.
2. Start a mock interview right away and finish it within 10 s of opening the app (or just tap through). Log: `skipped ... reason=too soon after app start`. Results show normally.
3. Wait until at least 10 s after opening the app, then finish a mock interview. A full-screen "Test Ad" opens; the results screen is underneath. The top banner is hidden while the ad is open.
4. Close the ad. Log: `ADS: dismissed`, then `ADS: prepare` and `ADS: loaded` (next ad loads). The banner comes back.
5. Go to Practice and swipe forward 4 questions. Log: `skipped ... reason=ad shown at previous break` (never twice in a row) or `cooldown Ns left`.
6. Wait 30 s, swipe forward 4 more questions: a test ad opens.
7. Start the mic in Practice, then swipe forward so you land on a 4th question while recording: log shows `reason=recording`, no ad.
8. Airplane mode on, restart the app, finish a mock interview: no ad, no freeze. Log shows `prepare skipped: offline` and `retry in 15s`, `30s`, `60s`. Turn airplane mode off: within a minute `ADS: loaded`.
9. Press back or exit on Home: never an ad.

### Low-end phone check
1. Use an old or cheap phone (2 to 3 GB RAM, Android 8 or newer).
2. Check: app opens in under about 4 seconds, scrolling is smooth, typing has no lag, no crash after 10 minutes of use.
3. Turn on Settings > Accessibility > Remove animations: app still works.

## 15. Checking ads on the phone

The **debug APK** has a hidden **Ads status** panel. You do not need a PC or adb. The Play Store build (.aab) does not contain this panel at all.

### Install the right build
1. GitHub > Actions > **Build Android AAB** > open the newest green run for the branch you want (for example `main`).
2. Download **interview-simulator-debug-apk**, unzip it, install `app-debug.apk` on the phone (uninstall the old one first if Android says "App not installed").
3. Open the app > **Profile** tab > scroll to the bottom. You see `Build abc1234 · <date> · debug · v1.0 (1)`. The 7 letters (`abc1234`) must match the commit shown on the GitHub run. If there is no build line, you installed a release or an old build.

### Open the panel
- Press and **hold the app title** ("Interview Simulator") in the top bar for 1 second.
- The panel updates every second. Tap ✕ to close it. The banner is hidden while the panel is open (so taps never hit the ad).

### Read the panel

| Line | What it means |
|---|---|
| `Build: debug \| version 1.0 (1) \| git abc1234` | Which build is installed. `NOT debuggable` means it is not the debug APK. |
| `Device / Android SDK / WebView` | Phone model, Android version (35 = Android 15, 36 = Android 16) and WebView version. |
| `Network: online/offline` | Ads need internet. |
| `Consent: status=… canRequestAds=…` | `NOT_REQUIRED` or `OBTAINED` with `canRequestAds=true` is fine. `REQUIRED` or `canRequestAds=false` means no ads may be requested (EEA/UK consent not given). |
| `Ads SDK started: true` | AdMob is running. `false` = consent missing, offline at start, or init failed. |
| `Banner: state=` | `requested` = loading, `loaded` = showing, `failed` = no ad (see `error`), `off` = not created. |
| `headerBottom / wantedTop / realTop` | Where the banner should start (just under the header) and where it really is on screen (measured natively). They should be equal (±2). `corrections` counts automatic fixes (max 2). |
| `hiddenFor=` | Why the banner is hidden right now (`dialog`, `sheet`, `consent`, `interstitial`, `debugpanel`). |
| `native: found=true visible=true top=… h=…` | The real banner view on screen. `found=false` = no banner view exists. |
| `Interstitial: ready=true` | A full-screen ad is loaded and can show at the next break. |
| `prepared / loaded / failed / shown / lastError` | Counters. Error codes: `0` internal, `1` invalid request, `2` network, `3` no fill, `timeout` = no answer in 45 s. |
| `nextRetryIn` | When the next load attempt happens after a failure (15 s, 30 s, then 60 s). |
| `cooldownLeft / sinceLaunch` | Time rules: no ad in the first 10 s, and 30 s between ads (testing value). |
| `lastBreak / lastSkip` | The last natural break (`interview_finished` or `practice_question_N`) and why no ad was shown (`too soon after app start`, `cooldown`, `never twice in a row`, `still loading`, `recording`, `typing`, `screen covered: …`). |
| `last 20 ADS: lines` | The step-by-step log. |

### Buttons
- **Copy report**: copies everything above as text. If copy is blocked, long-press the text > Select all > Copy.
- **Force interstitial test**: tries to show a full-screen test ad right now, ignoring the cooldown, the 10 s rule and "never twice in a row". It still needs consent and a loaded ad. The message under the buttons says what happened (`shown`, `not loaded yet (loading)`, `ads not started (consent=…)`).

### What to send to the developer
1. Reproduce the problem (for example: open the app, wait 15 s, finish a mock interview).
2. Open the panel, tap **Copy report**, paste it into your message.
3. Add one screenshot of the screen where the banner looks wrong (if it is a banner problem), and say what you did step by step.

## 16. How voice recognition works

The phone (not the app) turns speech into text with Android's speech service (usually Google, needs internet). The app decides what to send and what to keep. Audio is never saved by the app.

### One mic tap

1. **Start.** Tap the mic. Read-aloud stops first. One recognizer session starts in your **Voice accent** (Profile > Voice). Default is English (India), en-IN, which handles Pakistani English best. Options: en-PK, en-US, en-GB. Never a mixed or Urdu locale. If the phone rejects a locale (error 12/13), the next English one is used.
2. **Ready.** "Speak now" shows only after the service says it is ready.
3. **Live words.** While you speak, the grey bar under the answer box shows what the phone hears. These partial results are **never** written into the box.
4. **Final result.** When the session ends, the phone gives up to 5 guesses with confidence scores. Before anything is written:
   - **Noise gate:** if the loudest moment of the session (max RMS) never reached a speaking level (5 dB), the text is dropped. This stops invented words from silence or noise.
   - **Confidence:** guesses with a known confidence below 0.4 are dropped.
   - **Pick one guess:** the one with your profile name in it, else the most confident. Guesses are never merged or changed.
   - **Duplicates:** text already written in the last 5 seconds is dropped; if it starts with that text, only the new words are kept.
   - The text is inserted **at the cursor** with correct spaces. The rest of the box is never replaced.
5. **Next session.** Another session starts only if this one had real speech. If a session has no real speech, the mic stops and shows "Tap the mic to continue". There is no restart loop.
6. **Stop.** Tap the mic again: it stops now, and the last final result is still used.

Pauses: the app asks for 4 s complete silence, 3 s possibly complete and 15 s minimum length, so a 3 to 4 second pause should not end the session. Google's service may ignore these on some phones; the voice report shows how long each session ran.

### Your details and words

Mock and Practice show the categories first. When you pick a category (or tap Start) the first time, the app asks for your details in 2 steps: full name, education or current role, city; then target role (picked from the category), experience, key skills (suggestions follow the role) and the voice accent. After saving, the category you picked opens. Your **words** (name, city, skills, role, education) are made automatically and never shown. They stay on the phone. Edit them any time: **Edit my details** on the Mock and Practice start screens, or Profile.

- **Hints** (Android 13+, at most 100): your words, name, city and skills; in Practice and Mock From memory the words of the saved answer; then interview words and phrases that appear in the question; then the rest of `src/data/interview-vocab.js`.
- **Picking a guess:** the guess with the most of your words wins, else the most confident one. Guesses are never merged.
- **Name matching (Mock):** a heard word becomes one of your words only if it is spelled close (edit distance <= 0.35) or sounds the same, and it is not a common English word (a name slot like "my name is" is the exception). Countries, cities, numbers, short words and every word of the interview list are never changed. At most 3 changes per sentence.
- **Learned corrections:** fix one wrong word by hand right after dictation and the app remembers it (Undo in the toast; delete in Profile > Voice).

### Practice and Mock From memory: expected-text matching

Google cannot know names in free dictation, so Practice compares what it heard with your **saved answer** and writes the saved words: "Mubashir" becomes Mubashar, Pakpattan stays Pakpattan.

- **Practice** always shows the answer (read it aloud).
- **Mock** is From memory only, like a language app: say the saved answer without seeing it. While the mic is on, the box shows the saved answer only up to the word you reached (the rest stays hidden); when the mic stops, the whole answer shows. Colours: said words dark, a word said wrong (other words said in its place) **red**, words not said yet dull grey. Anything else the phone heard is never written. Tap a red word to see what you said instead. A 2 second pause ends a sentence: it is written and the mic keeps listening for the next one (after 3 silent sessions in a row it stops). The mic stops by itself 2 seconds after the last word of the answer is said. In Practice the answer words light up while you speak. Android's own permission dialog is the only mic prompt. The colours come from `wordStatus` in `src/services/expected.js` (one extra heard word marks one answer word in the same gap). **Hint** shows the next 3 words for 3 seconds; **Type** lets you type (typed words stay; words that match the answer get its spelling); **Clear** starts the answer again. A toast shows how much of the answer was said.
- If the phone sends no final result, or one with low confidence, the live words are still written when at least half of them are words of the saved answer (`keepLive` in `voice.js`). Noise that does not match the answer is never written.
- After each phrase the heard words are aligned to the answer with word-level dynamic programming. A pair costs 1 - similarity and is allowed when the words are at least 60% similar or sound the same; an extra or missed word costs 1. Time O(n x m), space O(n x m) (n heard, m answer words); a 120-word answer takes a few ms.
- Colours: said = green, corrected = green with a dot, extra = amber (kept as heard), missed = red underline (never written). Score = matched answer words / all answer words. The best score per question is kept.
- "Introduce yourself" without a saved answer uses a template: "My name is {name}. I am a {education} from {city}. My skills include {skills}. I am looking for a {role} position." Edit and save it like any answer.

### Cost

- Name matching: sound-code and length buckets, under 1 ms per sentence. Practice alignment: O(n x m). Dedupe and picking a guess: O(guesses x words).

### If voice is still wrong

Use the debug APK. Hold the app title 1 s > **Copy voice report**. For each session it lists: language, hints sent, max RMS, every guess with its confidence, which guess was picked and why, what was dropped and why, and the text written. Send it with what you really said.

### Phone test

a) Fresh install: tap Practice. The categories show; tap one and the setup form appears (2 steps, no My words); no Alex or Khan anywhere. Enter name Mubashar Akram, city Pakpattan.
b) Home: the hero has the title, tagline, 3 features and Get Started on the left and the picture on the right; only the Question of the day card under it.
c) Launcher icon and splash show the new logo (on Android 13+ also the themed icon: long-press the home screen > Wallpaper & style > Themed icons).
d) Practice, "Introduce yourself": the generated answer shows. Read it aloud. Names come out as saved. Check the score and colours.
e) Practice: say some words wrong on purpose. Wrong words show as extra (amber), skipped words as missed (red underline).
f) Mock: the banner is at the bottom and never covers the mic or the Prev/Next buttons. Other pages still have the top banner.
g) Mock: Edit my details, change the name, Save: the chips show the new name.
g2) Mock: pick the level, tap a type: the interview starts (no Start button). Say "Introduce yourself" from memory: words appear while you speak; say one word wrong on purpose (e.g. another city): it turns red; skipped words stay grey.
g3) Practice the Question of the day: back on Home the card says Done today.
g4) Profile has no Switch profile or New profile; only one profile is kept.
h) Copy the voice report from the debug panel (Practice lines show expected text, heard text, alignment and score).
