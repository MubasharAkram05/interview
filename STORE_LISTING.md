# Store Listing: Interview Simulator

Copy these into Play Console > Grow users > Store presence > Main store listing.
All text is honest. No job guarantees, no "real company interview" claims, no keyword stuffing.

## App name (max 30 characters)

```
Interview Simulator
```
(19 characters)

## Short description (max 80 characters)

```
Practice common interview questions and run mock interviews by typing or voice.
```
(79 characters)

## Full description (max 4000 characters)

```
Interview Simulator helps you practice for job interviews on your phone.

Pick an interview type and your experience level, read sample answers, and then run a mock interview where you answer each question in your own words.

WHAT YOU CAN DO
• Practice mode: go through common interview questions with sample answers you can edit and make your own
• Mock interview: answer questions one by one by typing or by voice, then get a simple score and tips
• Six interview types: Software Developer / IT, Marketing / Sales, Customer Service, Teaching, Fresh Graduate / HR Round, and Cloud / DevOps / Security
• Three levels: Fresher, Junior and Senior
• Profile: add your degree, skills and target role, and sample answers fill in your details
• Add your own questions, edit questions and answers, and mark favorites
• Read aloud: listen to questions and answers with your phone's text-to-speech voice
• Question of the day, practice streak and interview history
• Share your interview transcript to notes, email or chat
• Light and dark theme

HOW THE SCORE WORKS
The score compares your spoken or typed answer with your own practice answer for that question. It is a practice aid to help you remember your answers. It is not a judgment of your real interview performance.

OFFLINE USE
Practice, mock interviews, your profile and history work offline. Voice input and ads need an internet connection. If you are offline, you can always type your answers.

PRIVACY
No account and no sign-up. Your profile, answers and history are saved only on your phone. Voice input uses your phone's speech recognition service (usually Google) to turn your speech into text. The app itself does not save audio. The app shows ads from Google AdMob.

Please note: this app is a practice tool. It does not guarantee a job offer, and its questions are general practice questions, not questions from any specific company.
```

## Category and tags

- App or game: **App**
- Category: **Education**
- Tags (pick up to 5 in Play Console > Store settings > Tags): Education, Productivity, Business, Career (if listed), Learning (if listed)
- Contact email: **sussalproductions@gmail.com** (required, shown publicly; same as the privacy policy)
- Website: optional (leave empty)
- Privacy policy URL: https://mubasharakram05.github.io/privacy_policy_interview_simulator/

## Graphics

| Asset | Required size | File in this project | Status |
|---|---|---|---|
| App icon | 512 x 512, 32-bit PNG (with alpha), max 1 MB | `assets/play/icon-512.png` (512x512 RGBA, 21 KB, full square, Play rounds the corners) | Ready |
| Feature graphic | 1024 x 500, JPG or 24-bit PNG (no alpha), max 15 MB | `store-assets/feature-graphic.png` (1024x500 RGB, 44 KB) | Ready |
| Phone screenshots | at least 2 (max 8), PNG or JPG, 16:9 or 9:16, each side 320 to 3840 px | `store-assets/screenshots/1-home.png` to `4-mock-interview.png` (1080x1920) | Drafts from the web build with the fictional profile "Alex Khan". Replace with real phone screenshots (the mic button only shows on a real phone) |

### Screenshot list (take these on a real phone)

1. Home screen with Question of the day and interview type grid
2. Practice screen with a question and sample answer
3. Mock interview setup (interview type and level)
4. Mock interview screen with the mic button and an answer in progress
5. Results screen with score and tips
6. Profile screen (keep the fictional "Alex Khan" profile, not your real personal data)

To change the icon: edit `assets/logo/glyph.svg` (or the gradient in `scripts/make-icon.mjs` and `--brand-1/2/3` in `src/style.css`), then run `npm run icon` (all icons, splash, Play and web icons, with a size check) and `npm run store:assets` (feature graphic).
