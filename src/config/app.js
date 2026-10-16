/**
 * App-wide settings kept in one place.
 */

// Public privacy policy page (GitHub Pages). Also used in Play Console > App content > Privacy policy.
export const PRIVACY_POLICY_URL = 'https://mubasharakram05.github.io/privacy_policy_interview_simulator/';

// Voice accent (Profile > Voice). Each accent is a list of speech recognition locales tried in
// order: if the phone's speech service rejects one (error 12/13), the next one is used and the
// voice report shows which locale really ran. Pakistan is the default.
export const VOICE_ACCENTS = {
  pk: { label: 'Pakistan', locales: ['en-PK', 'en-IN', 'en-GB', 'en-US'] },
  in: { label: 'India', locales: ['en-IN', 'en-GB', 'en-US'] },
  us: { label: 'US', locales: ['en-US', 'en-GB'] },
  uk: { label: 'UK', locales: ['en-GB', 'en-US'] }
};
export const DEFAULT_VOICE_ACCENT = 'pk';

// Read-aloud (text to speech) language.
export const TTS_LANGUAGE = 'en-US';
