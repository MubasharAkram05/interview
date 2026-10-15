# Play Console Answers: Interview Simulator

Answers for Play Console > Policy and programs > **App content**. Every answer is based on the real code in this project (checked October 15, 2026). If you change the app (new SDK, new feature), check these again.

## What the code actually does (facts used below)

| Fact | Where it is in the code |
|---|---|
| No account, no login, no own server, no `fetch`/XHR/WebSocket calls in app code | searched `src/` and `index.html` |
| Profile, answers, history, favorites saved only on the phone (localStorage + IndexedDB) | `src/services/storage.js` |
| Ads: Google Mobile Ads SDK via `@capacitor-community/admob`, with UMP consent | `src/services/admob.js` |
| Voice input: Android `SpeechRecognizer` via `@capacitor-community/speech-recognition`. The app does not record or save audio; it receives only text | `src/services/voice.js`, plugin `SpeechRecognition.java` |
| Read aloud: Android text-to-speech via `@capacitor-community/text-to-speech` | `src/services/tts.js` |
| Transcript sharing only through the Android share menu when the user taps it | `exportT()` in `src/main.js` |
| Permissions: INTERNET, ACCESS_NETWORK_STATE, RECORD_AUDIO, AD_ID | `app/src/main/AndroidManifest.xml` |

## 1. Privacy policy

- Privacy policy URL: `https://mubasharakram05.github.io/privacy_policy_interview_simulator/`
- This is the same URL as `PRIVACY_POLICY_URL` in `src/config/app.js`. It must open without login before you submit.

## 2. App access

- Select: **All functionality in my app is available without any access restrictions**

## 3. Ads

- Does your app contain ads? **Yes, my app contains ads**

## 4. Advertising ID

- Does your app use advertising ID? **Yes**
- Purposes (tick these):
  - **Advertising or marketing**
  - **Analytics**
  - **Fraud prevention, security, and compliance**
- The manifest includes `com.google.android.gms.permission.AD_ID` (also merged in by the Google Mobile Ads SDK), so this answer must be Yes. If you answer No, Play blocks the release.

## 5. Content rating (IARC questionnaire)

- Email: your contact email
- Category: **All other app types** (it is not a game, not social, not a news app)
- Answers:
  - Violence: **No**
  - Sexuality / nudity: **No**
  - Language (profanity, crude humor): **No**
  - Controlled substances (drugs, alcohol, tobacco): **No**
  - Gambling or simulated gambling: **No**
  - Does the app let users interact or exchange content with other users? **No** (sharing a transcript uses the Android share menu; there is no chat or user content inside the app)
  - Does the app share the user's current physical location with other users? **No**
  - Does the app allow users to purchase digital goods? **No**
  - Is the app a web browser or search engine? **No**
  - Unrestricted internet access? **No**
- Expected rating: Everyone / PEGI 3 (final rating is decided by IARC).

## 6. Target audience and content

- Target age groups: tick **18 and over** (you may also tick **16 to 17**)
- Do **NOT** tick any age group under 13. This keeps the app out of the Families program, which has stricter ad rules.
- Could your store listing unintentionally appeal to children? **No** (job interview practice, no cartoon style or child themes)
- The app is for a general audience of students and job seekers. It is not directed to children.

## 7. Data safety

### Overview questions

| Question | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | **Yes** (because of AdMob and voice input) |
| Is all of the user data collected by your app encrypted in transit? | **Yes** (Google Mobile Ads SDK and Google speech service use HTTPS) |
| Do you provide a way for users to request that their data is deleted? | **Yes**. Explain: "All app data is stored on the device. Users can delete profiles and history in the app, or clear app data / uninstall. Ad data is controlled by Google; users can reset their advertising ID in Android settings." |

### Data types to declare

| Data type (Play category) | Collected | Shared | Processed ephemerally | Required or optional | Purposes | Why |
|---|---|---|---|---|---|---|
| **Location > Approximate location** | Yes | Yes | No | Required | Advertising or marketing, Analytics, Fraud prevention | Google Mobile Ads SDK uses IP address to estimate location |
| **App activity > App interactions** | Yes | Yes | No | Required | Advertising or marketing, Analytics | Ad views and taps measured by AdMob |
| **App info and performance > Crash logs** | Yes | Yes | No | Required | Analytics, Fraud prevention | AdMob SDK diagnostics |
| **App info and performance > Diagnostics** | Yes | Yes | No | Required | Analytics, Fraud prevention | AdMob SDK diagnostics |
| **Device or other IDs** | Yes | Yes | No | Required | Advertising or marketing, Analytics, Fraud prevention | Advertising ID used by AdMob |
| **Audio > Voice or sound recordings** | Yes | No | **Yes** | **Optional** | **App functionality** | See below |

Do **not** declare: Personal info (name, etc.), Messages, Photos, Files, Contacts, Calendar, Health, Financial info, Web browsing, Search history. The profile details the user types never leave the phone, and Play's definition of "collected" only covers data sent off the device.

### Audio: the exact answer and why

- **Data type:** Audio > Voice or sound recordings
- **Collected:** Yes
- **Shared:** No
- **Processed ephemerally:** Yes
- **Required or optional:** Optional (users can type instead, and the mic is only used when they tap it)
- **Purpose:** App functionality

Why this conservative answer: the app itself never records or uploads audio. It asks Android's speech recognition service (on most phones the Google app) to turn speech into text, and that service may send the audio to Google's servers. Play's Data safety rules say you must declare data that leaves the device because of your app, including through third-party code or services your app uses. It is not 100% clear whether a system speech service started by your app counts, so the safe choice is to **declare audio as collected**. Declaring it costs nothing; leaving it out when Google thinks it should be there can get the app rejected or removed.

"Shared: No" is correct because Google processes the audio only to provide the speech-to-text service to your app (a service provider transfer), which Play does not count as sharing.

## 8. Government apps

- Is your app developed by or on behalf of a government? **No**

## 9. Financial features

- Select: **My app doesn't provide any financial features**

## 10. Health

- Select: **My app does not have any health features**

## 11. News app

- Is your app a news app? **No**

## 12. Other permission declarations

- RECORD_AUDIO is a normal runtime permission. No special declaration form is needed.
- No location, SMS, call log, storage, accessibility, foreground service or exact alarm permissions are used, so no other forms apply.

## 13. Store settings

- App category: **Education**
- Contact details: support email (required), website optional
- External marketing: your choice
