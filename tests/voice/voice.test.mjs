// voice.js with a mocked native Voice plugin: language, bias, alternatives, stop/cancel, fallback.
import { state, reset, emit } from './mocks.mjs';
import { startListening, stopListening, cancelListening, voiceLanguage, isListening, voiceErrorText } from '../../src/services/voice.js';

const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
const wait = ms => new Promise(r => setTimeout(r, ms));

// 1. Start options, live text, phrases, natural end.
reset();
const ev = { partial: [], segment: [], level: [], end: null };
await startListening({
  bias: ['JavaScript', 'teamwork', 'JavaScript'],
  onPartial: a => ev.partial.push(a),
  onSegment: a => ev.segment.push(a),
  onLevel: d => ev.level.push(d),
  onEnd: e => (ev.end = e)
});
const o = state.starts[0];
check('starts with Indian English (en-IN), 5 alternatives, continuous', o.language === 'en-IN' && o.maxResults === 5 && o.continuous === true);
check('bias words sent once each (for Android 13+ biasing)', JSON.stringify(o.bias) === '["JavaScript","teamwork"]');
emit('partial', { matches: ['I have vorked', 'I have worked'] });
emit('segment', { matches: ['I have worked with Java Script', 'I have worked with JavaScript'] });
emit('segment', { matches: ['I have worked with Java Script'] });
emit('level', { db: 6 });
check('live guesses and finished phrases reach the app (all alternatives)', ev.partial[0].length === 2 && ev.segment[0].length === 2);
check('the same phrase sent twice is passed on once', ev.segment.length === 1);
check('mic level passed on', ev.level[0] === 6);
emit('end', { reason: 'ended', code: 0 });
check('natural end reported once with heard=true', ev.end && ev.end.reason === 'ended' && ev.end.heard === true && !isListening());

// 2. User stop keeps the last phrase: onEnd only after native end.
reset();
let end2 = null;
const seg2 = [];
await startListening({ onSegment: a => seg2.push(a[0]), onEnd: e => (end2 = e) });
stopListening();
check('stop asks native to stop (not cancel) and waits', state.stops === 1 && end2 === null && !isListening());
emit('segment', { matches: ['last words'] });
emit('end', { reason: 'stopped', code: 0 });
check('last phrase after stop is kept, then end = stopped', seg2[0] === 'last words' && end2 && end2.reason === 'stopped');

// 3. Cancel (screen change) ends at once and ignores late events.
reset();
let end3 = null;
const seg3 = [];
await startListening({ onSegment: a => seg3.push(a[0]), onEnd: e => (end3 = e) });
cancelListening();
emit('segment', { matches: ['late'] });
check('cancel ends at once and drops late text', state.cancels === 1 && end3 && end3.reason === 'stopped' && seg3.length === 0);

// 4. Errors give a clear message.
reset();
let end4 = null;
await startListening({ onEnd: e => (end4 = e) });
emit('end', { reason: 'error', code: 2 });
check('network error reported with a message', end4 && end4.reason === 'error' && /internet/i.test(voiceErrorText(end4.code)));

// 5. Phone rejects en-IN: falls back to en-US and keeps listening.
reset();
state.failLang = 'en-IN';
let end5 = null;
await startListening({ onEnd: e => (end5 = e) });
await wait(80);
check('falls back to en-US when en-IN is not supported (error 12)', state.starts.length === 2 && state.starts[1].language === 'en-US' && !end5 && isListening());
check('fallback language kept for later sessions', voiceLanguage() === 'en-US');
cancelListening();

console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
process.exit(0);
