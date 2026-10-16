/**
 * App-wide settings kept in one place.
 */

// Public privacy policy page (GitHub Pages). Also used in Play Console > App content > Privacy policy.
export const PRIVACY_POLICY_URL = 'https://mubasharakram05.github.io/privacy_policy_interview_simulator/';

// Speech recognition languages, tried in order. Indian English (en-IN) understands Indian and
// Pakistani accents much better than US English. If the phone's speech service cannot use
// en-IN, the app falls back to en-US for the rest of the session.
export const VOICE_LANGUAGES = ['en-IN', 'en-US'];

// Read-aloud (text to speech) language.
export const TTS_LANGUAGE = 'en-US';
