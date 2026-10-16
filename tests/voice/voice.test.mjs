// voice.js with a mocked Android speech plugin: language, alternatives, fallback, session end.
import { state, reset, emitPartial, endSpeech } from './mocks.mjs';
import { startListening, stopListening, voiceLanguage, isListening } from '../../src/services/voice.js';

const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
const wait = ms => new Promise(r => setTimeout(r, ms));

// 1. Normal session: en-IN, 5 alternatives, partial text and alternatives reach the app.
reset();
let got = null;
let ended = null;
await startListening({ onText: (t, alts) => (got = { t, alts }), onEnd: e => (ended = e) });
check('starts with Indian English (en-IN)', state.starts[0].language === 'en-IN');
check('asks for 5 alternatives', state.starts[0].maxResults === 5 && state.starts[0].partialResults === true);
emitPartial(['I have vorked', 'I have worked', 'I have walked']);
check('live text and all alternatives passed on', got && got.t === 'I have vorked' && got.alts.length === 3);
endSpeech();
await wait(1300);
check('session ends by itself after speech stops (reason "ended")', ended && ended.reason === 'ended' && ended.text === 'I have vorked' && ended.alts.length === 3);
check('not listening after end', !isListening());

// 2. User stops.
reset();
ended = null;
await startListening({ onText: () => {}, onEnd: e => (ended = e) });
stopListening();
check('user stop gives reason "stopped"', ended && ended.reason === 'stopped');

// 3. Phone does not support en-IN: falls back to en-US once and keeps working.
reset();
state.rejectLang = 'en-IN';
ended = null;
await startListening({ onText: () => {}, onEnd: e => (ended = e) });
await wait(1200);
check('falls back to en-US when en-IN stops at once', state.starts.length === 2 && state.starts[1].language === 'en-US' && isListening() && !ended);
check('fallback language kept for the next session', voiceLanguage() === 'en-US');
stopListening();

console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
process.exit(0);
