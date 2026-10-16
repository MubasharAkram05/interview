// Voice session manager (src/services/voice.js) with a mocked native Voice plugin.
// Run: node --import ./tests/voice/reg.mjs tests/voice/voice.test.mjs
import { state, reset, emit } from './mocks.mjs';
import {
  startListening,
  stopListening,
  cancelListening,
  voiceLanguage,
  setVoiceAccent,
  isListening,
  voiceState,
  micPermission,
  openAppSettings,
  recentVoiceSessions,
  _recordVoiceForTests,
  VOICE_TIMING,
  NOT_CAUGHT,
  TAP_TO_CONTINUE
} from '../../src/services/voice.js';
import { pickCandidate } from '../../src/services/voice-filter.js';
import { joinSpoken } from '../../src/services/readalong.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);
const wait = ms => new Promise(r => setTimeout(r, ms));
Object.assign(VOICE_TIMING, { nextSessionMs: 5, busyRetryMs: 5, stopWaitMs: 40 });
_recordVoiceForTests();

// A tiny "answer box" like Mock: finals are inserted, partials only shown in the live bar.
function box(initial = '') {
  const b = { value: initial, live: '', states: [], ends: [] };
  b.opts = (extra = {}) => ({
    onState: st => b.states.push(st),
    onPartial: t => (b.live = t),
    onFinal: t => {
      b.value = joinSpoken(b.value, t, ['Mubashar', 'Akram', 'Pakpattan']); // the app keeps the case of My words
      b.live = '';
    },
    onEnd: e => b.ends.push(e),
    ...extra
  });
  return b;
}
const SPEECH = 8; // max RMS of a session where the user spoke
const fin = (matches, extra = {}) => emit('final', { matches: [].concat(matches), maxRms: SPEECH, ...extra });
const part = t => emit('partial', { matches: [t] });
const end = (reason = 'done', code = 0, maxRms = SPEECH) => emit('end', { reason, code, ms: 3000, maxRms });

// 1. Start options and ready
reset();
setVoiceAccent('in');
let b = box();
await startListening(b.opts({ bias: ['Mubashar', 'Akram', 'Mubashar'] }));
const o = state.starts[0];
check('default language is en-IN', o.language === 'en-IN');
check('5 guesses, silence 4000 / 3000 / minimum 15000 ms', o.maxResults === 5 && o.completeMs === 4000 && o.possiblyMs === 3000 && o.minimumMs === 15000);
check('hints sent once each', JSON.stringify(o.bias) === '["Mubashar","Akram"]');
check('"starting" until the recognizer is ready', voiceState() === 'starting');
emit('ready');
check('"ready" only after the recognizer reports it', voiceState() === 'ready');

// 2. Partials are never committed
part('I am');
part('I am from');
check('partial shows in the live bar only, box empty', b.live === 'I am from' && b.value === '');
end('nomatch', 7, SPEECH);
await wait(20);
check('session ends without a final: partial is NOT written', b.value === '', b.value);
check('no final and no speech result -> mic stops (no restart loop)', state.starts.length === 1 && !isListening());
check('message: I did not catch that', b.ends[0] && b.ends[0].message === NOT_CAUGHT, JSON.stringify(b.ends));

// 3. Final committed once, next session only after real speech
reset();
b = box();
await startListening(b.opts());
emit('ready');
fin(['I am from Pakpattan', 'I am from Pakistan'], { scores: [0.92, 0] });
fin(['I am from Pakpattan']);
check('final committed once', b.value === 'I am from Pakpattan', b.value);
end('done');
await wait(20);
check('real speech -> next session starts', state.starts.length === 2 && isListening());
fin(['I am from Pakpattan']);
check('same text again within 5 s is dropped', b.value === 'I am from Pakpattan', b.value);
end('done');
await wait(20);
fin(['I am from Pakpattan I am a student']);
check('repeated start trimmed, only the new part added', b.value === 'I am from Pakpattan I am a student', b.value);
end('done');
await wait(20);
// An empty session (silence) after real speech: stop and ask for a tap.
end('nomatch', 6, 1.2);
await wait(20);
check('1 empty session -> stop, no new session', !isListening() && state.starts.length === 4, `starts ${state.starts.length}`);
check('message: Tap the mic to continue', b.ends[0] && b.ends[0].message === TAP_TO_CONTINUE, JSON.stringify(b.ends));

// 4. Noise gate
reset();
b = box();
await startListening(b.opts());
fin(['amritsar ka'], { maxRms: 3.1 });
end('done', 0, 3.1);
await wait(20);
check('noise gate: text from a quiet session is dropped', b.value === '', b.value);
check('noise gate: session with no real speech stops the mic', !isListening() && state.starts.length === 1);
const rec = recentVoiceSessions().slice(-1)[0];
check('report: max RMS and drop reason recorded', rec.maxRms === 3.1 && /noise/.test(rec.dropped[0].why), JSON.stringify(rec));

// 5. Low confidence
reset();
b = box();
await startListening(b.opts());
fin(['I am Officer', 'I am official'], { scores: [0.22, 0.1] });
check('confidence below 0.4 is dropped', b.value === '');
end('done');
await wait(20);
check('loud but unclear speech still counts as speech: listening continues', state.starts.length === 2);
cancelListening();

// 6. Stop: the last final is still used
reset();
b = box();
await startListening(b.opts());
emit('ready');
part('I know AWS and');
stopListening();
check('stop calls the recognizer stop', state.stops === 1 && voiceState() === 'stopping');
fin(['I know AWS and DevOps']);
end('stopped');
await wait(20);
check('stop: last final committed, partial never', b.value === 'I know AWS and DevOps', b.value);
check('stop: no new session', state.starts.length === 1 && !isListening());
check('stop with text: no message', b.ends[0] && b.ends[0].message === '');

// 7. Stop between sessions finishes at once
reset();
b = box();
VOICE_TIMING.nextSessionMs = 200;
await startListening(b.opts());
fin(['Hello']);
end('done');
stopListening();
await wait(250);
check('stop between sessions: finished, no new session', !isListening() && state.starts.length === 1 && b.ends[0].reason === 'stopped');
VOICE_TIMING.nextSessionMs = 5;

// 8. Errors
reset();
b = box();
await startListening(b.opts());
end('error', 2, -2);
await wait(10);
check('offline (2): clear message, no retry', state.starts.length === 1 && /offline/i.test(b.ends[0].message));
reset();
b = box();
await startListening(b.opts());
end('error', 12, -2);
await wait(20);
check('accent rejected (12): en-IN -> en-US', state.starts[1] && state.starts[1].language === 'en-US' && voiceLanguage() === 'en-US');
cancelListening();
setVoiceAccent('pk');
check('Pakistan setting starts with en-PK', voiceLanguage() === 'en-PK');
setVoiceAccent('in');
reset();
b = box();
await startListening(b.opts());
end('error', 8, -2);
await wait(20);
check('busy (8): retried once', state.starts.length === 2);
end('error', 8, -2);
await wait(20);
check('busy again: stops with a message, no loop', state.starts.length === 2 && !isListening() && /busy/i.test(b.ends[0].message));

// 9. Cancel drops late text
reset();
b = box();
await startListening(b.opts());
cancelListening();
fin(['late words']);
check('cancel ends at once and ignores late events', state.cancels === 1 && b.value === '' && !isListening());

// 10. Permission and settings
state.permission = 'denied';
check('permission state comes from the app plugin', (await micPermission()) === 'denied');
await openAppSettings();
check('open settings calls the plugin', state.settingsOpened === 1);
state.permission = undefined;

// 11. N-best through choose(): the profile name decides, guesses are never changed or merged
const keys = new Set(['mubashar', 'akram']);
const choose = cands => {
  const c = pickCandidate(cands, keys);
  return { text: c.text, index: c.index, changes: [], why: c.why };
};
reset();
b = box();
await startListening(b.opts({ choose }));
fin(['I am Mubashir Akram', 'I am Mubashar Akram', 'I am official'], { scores: [0.8, 0, 0] });
check('n-best: guess with the profile name wins', b.value === 'I am Mubashar Akram', b.value);
cancelListening();

// 12. Replay of the reported phone session. The user said "I am Mubashar Akram, I am from
// Pakpattan" once; the old code restarted after every session and wrote partials, noise and
// repeats. Each step is one recognizer session: [guesses, scores, max RMS].
reset();
b = box();
await startListening(b.opts({ choose }));
const sessions = [
  [['I am from Pakistan'], [0.62], SPEECH], // real speech (Pakpattan misheard by the phone)
  [['I am aapka tha pak Python'], [0.31], 6.5], // mumble: low confidence
  [['I am Mubashir Akram', 'I am Mubashar Akram'], [0.81, 0], SPEECH], // real speech
  [['I am from Pakistan pakpattan'], [0.55], SPEECH], // repeat with the start again
  [['I am from Python'], [0.2], 4.0], // noise
  [['I am amritsar ka'], null, 2.5] // noise
];
for (const [m, scores, rms] of sessions) {
  if (!isListening()) break;
  part(m[0].split(' ').slice(0, 2).join(' '));
  fin(m, { scores, maxRms: rms });
  end('done', 0, rms);
  await wait(15);
}
console.log('replay box:', JSON.stringify(b.value));
check('replay: invented words never written (Python, amritsar ka, aapka)', !/Python|amritsar|aapka/i.test(b.value), b.value);
check('replay: the name comes out right', b.value.includes('I am Mubashar Akram'), b.value);
check('replay: no phrase written twice', (b.value.match(/I am from Pakistan/g) || []).length === 1, b.value);
check('replay: mic stopped after the noise session (no loop)', !isListening() && b.ends.length === 1);

// keepLive: the screen trusts live words that match the saved answer
reset();
if (isListening()) cancelListening();
b = box();
await startListening(b.opts({ keepLive: t => /my name is/i.test(t) }));
emit('ready');
part('my name is Mubashir');
stopListening();
await wait(60);
check('keepLive: stopped without a final, trusted live words are written', b.value.toLowerCase() === 'my name is mubashir', b.value);
b = box();
await startListening(b.opts({ keepLive: t => /my name is/i.test(t) }));
emit('ready');
part('my name is Akram');
fin(['my name is Akram'], { scores: [0.1] });
end('done');
await wait(20);
check('keepLive: low confidence final is kept when the live words were trusted', b.value.toLowerCase() === 'my name is akram', b.value);
stopListening();
await wait(60);
b = box();
await startListening(b.opts({ keepLive: t => /my name is/i.test(t) }));
emit('ready');
part('Python amritsar');
stopListening();
await wait(60);
check('keepLive: untrusted live words are still never written', b.value === '', b.value);

console.log(out.join('\n'));
console.log(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
process.exit(0);
