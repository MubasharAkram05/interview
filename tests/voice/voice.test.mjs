// Voice session manager (src/services/voice.js) with a mocked native Voice plugin.
// Run: node --import ./tests/voice/reg.mjs tests/voice/voice.test.mjs
import { state, reset, emit } from './mocks.mjs';
import { startListening, stopListening, cancelListening, voiceLanguage, setVoiceAccent, isListening, voiceState, VOICE_TIMING, NOT_CAUGHT } from '../../src/services/voice.js';
import { buildVocab, parseMyWords, pickBest } from '../../src/services/vocab.js';
import { joinSpoken } from '../../src/services/readalong.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);
const wait = ms => new Promise(r => setTimeout(r, ms));
Object.assign(VOICE_TIMING, { restartMs: 5, busyMs: 5, stopWaitMs: 40 });

// A tiny "answer box" like Mock: finals are appended, partials are only previewed.
function box(initial = '') {
  const b = { value: initial, preview: '', states: [], ends: [] };
  b.opts = (extra = {}) => ({
    getTail: () => b.value,
    onState: st => b.states.push(st),
    onPartial: t => (b.preview = t),
    onFinal: t => {
      b.value = joinSpoken(b.value, t);
      b.preview = '';
    },
    onEnd: e => b.ends.push(e),
    ...extra
  });
  return b;
}
const fin = (...matches) => emit('final', { matches });
const part = (...matches) => emit('partial', { matches });
const end = (reason = 'done', code = 0) => emit('end', { reason, code, ms: 1000 });

// 1. Options, ready state and "Speak now" timing
reset();
let b = box();
await startListening(b.opts({ bias: ['Mubashar', 'Pakpattan', 'Mubashar'], silenceMs: 4000 }));
const o = state.starts[0];
check('start: 5 alternatives, partial results, silence hint, segmented', o.maxResults === 5 && o.partialResults === true && o.silenceMs === 4000 && o.segmented === true);
check('start: hints sent once each', JSON.stringify(o.bias) === '["Mubashar","Pakpattan"]');
check('state is "starting" until the recognizer is ready', voiceState() === 'starting');
emit('ready');
check('"ready" only after the recognizer reports it', voiceState() === 'ready');

// 2. Partial then final
part('I am');
check('partial shown live, box untouched', b.preview === 'I am' && b.value === '');
part('I am from');
check('a partial replaces the previous partial', b.preview === 'I am from');
fin('I am from Pakistan', 'I am from Pakpattan');
check('final appended, preview cleared', b.value === 'I am from Pakistan' && b.preview === '');
fin('I am from Pakistan');
check('same final again is dropped (no duplicate)', b.value === 'I am from Pakistan');

// 3. Silence then restart, error 7 then restart
end('nomatch', 6);
await wait(20);
check('silence (6) -> listening again', state.starts.length === 2 && isListening());
end('nomatch', 7);
await wait(20);
check('no match (7) -> listening again', state.starts.length === 3);

// 4. Error 8 then retry, three failures then message
end('error', 8);
await wait(20);
check('busy (8) -> waits and retries', state.starts.length === 4);
end('error', 4);
await wait(20);
end('error', 11);
await wait(30);
end('error', 4);
await wait(40);
check('after 3 failed restarts in a row: stops with a clear message', !isListening() && b.ends.length === 1 && b.ends[0].reason === 'error' && /3 tries/.test(b.ends[0].message), JSON.stringify(b.ends));

// 5. Typing during a session keeps the typed text
reset();
b = box();
await startListening(b.opts());
emit('ready');
b.value = 'Hello, I typed this.';
fin('I am Mubashar');
check('typing during a session is kept; voice text goes after it', b.value === 'Hello, I typed this. I am Mubashar', b.value);

// 6. Stop during restart
end('nomatch', 7);
check('state is "restarting" between runs', voiceState() === 'restarting');
stopListening();
await wait(20);
check('stop during restart ends at once, no new run', !isListening() && state.starts.length === 1 && b.ends[0].reason === 'stopped');

// 7. Stop keeps the last live text when no final arrives
reset();
b = box();
await startListening(b.opts());
emit('ready');
part('I know AWS');
stopListening();
end('stopped');
check('stop: last live text is kept (final never came)', b.value === 'I know AWS', b.value);

// 8. Silence leaves the box empty
reset();
b = box();
await startListening(b.opts({ maxSilentMs: 25 }));
emit('ready');
for (let i = 0; i < 5 && isListening(); i++) {
  await wait(10);
  end('nomatch', 7);
}
await wait(20);
check('silence only: box stays empty', b.value === '' && b.preview === '');
check('silence only: "I did not catch that" message', b.ends[0] && b.ends[0].reason === 'silence' && b.ends[0].message === NOT_CAUGHT && b.ends[0].heard === false, JSON.stringify(b.ends));

// 9. Cancel (screen change) drops late text
reset();
b = box();
await startListening(b.opts());
cancelListening();
fin('late words');
check('cancel ends at once and ignores late events', state.cancels === 1 && b.value === '' && !isListening());

// 10. Locale chain: en-PK first, falls back on error 12
reset();
setVoiceAccent('pk');
b = box();
await startListening(b.opts());
check('Pakistan accent starts with en-PK', state.starts[0].language === 'en-PK');
end('error', 12);
await wait(20);
check('en-PK rejected (12) -> en-IN, still listening', state.starts[1] && state.starts[1].language === 'en-IN' && isListening());
check('fallback locale kept', voiceLanguage() === 'en-IN');
cancelListening();
setVoiceAccent('us');
check('US accent uses en-US', voiceLanguage() === 'en-US');
setVoiceAccent('pk');

// 11. Offline: clear message, no retry loop
reset();
b = box();
await startListening(b.opts());
end('error', 2);
await wait(20);
check('no internet (2) -> offline message, no retry', state.starts.length === 1 && /offline/i.test(b.ends[0].message));

// 12. Replay of the phone test: the user repeated "I am Mubashar, I am from Pakpattan".
// Each phrase is delivered twice (segment result, then the same text as the run's final result)
// with cumulative partials in between. With the user's profile and My words the box must hold
// every phrase once, no phrase twice in a row.
reset();
const vocab = buildVocab({ myWords: parseMyWords('Mubashar\nPakpattan'), profile: { name: 'Mubashar Akram', city: 'Pakpattan' } });
b = box();
await startListening(b.opts({ choose: alts => pickBest(alts, vocab) }));
emit('ready');
const heard = [
  ['I am official', 'I am Mubasher'],
  ['I am wishing Akram and I am a student and I am from Pakistan'],
  ['I am Abhishek IMO Bichar'],
  ['I am Abhishek IMO akram'],
  ['I am from Pakistan'],
  ['I am hard working']
];
for (const alts of heard) {
  part(alts[0].split(' ').slice(0, 2).join(' '));
  part(alts[0]);
  fin(...alts); // segment result
  fin(alts[0]); // the same phrase again as the run's final result
  end('done');
  await wait(15);
}
stopListening();
end('stopped');
const phrases = b.value.split(/(?=\bI am\b)/).map(x => x.trim());
const repeats = phrases.filter((p, i) => i > 0 && p.toLowerCase() === phrases[i - 1].toLowerCase());
check('replay: no phrase appended twice in a row', repeats.length === 0, b.value);
check('replay: one utterance delivered twice with different alternatives is written once', !b.value.includes('I am official'), b.value);
check('replay: each real phrase appears as often as it was said', (b.value.match(/I am from Pakistan/g) || []).length === 2 && (b.value.match(/Abhishek IMO/g) || []).length === 2, b.value);
check('replay: an alternative with the name wins ("I am Mubasher" -> "I am Mubashar")', b.value.startsWith('I am Mubashar'), b.value);
check('replay: real words stay as heard (no invented corrections)', b.value.includes('I am from Pakistan') && b.value.includes('I am hard working') && b.value.includes('Abhishek'), b.value);
console.log('replay box:', b.value);

console.log(out.join('\n'));
console.log(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
process.exit(0);
