/**
 * App-wide settings kept in one place.
 */

// Public privacy policy page (GitHub Pages). Also used in Play Console > App content > Privacy policy.
export const PRIVACY_POLICY_URL = 'https://mubasharakram05.github.io/privacy_policy_interview_simulator/';

// Voice accent (Profile > Voice). Each accent is a list of English speech recognition locales
// tried in order: if the phone's speech service rejects one (error 12/13), the next one is used and
// the voice report shows which locale really ran. Never a mixed or Urdu locale.
// India (en-IN) is the default: it handles Pakistani English best on Google's service.
export const VOICE_ACCENTS = {
  in: { label: 'English (India) - best for Pakistan', locales: ['en-IN', 'en-US'] },
  pk: { label: 'English (Pakistan)', locales: ['en-PK', 'en-IN', 'en-US'] },
  us: { label: 'English (US)', locales: ['en-US'] },
  uk: { label: 'English (UK)', locales: ['en-GB', 'en-US'] }
};
export const DEFAULT_VOICE_ACCENT = 'in';

// Read-aloud (text to speech) language.
export const TTS_LANGUAGE = 'en-US';
