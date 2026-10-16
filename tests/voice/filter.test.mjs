// voice-filter.js: noise gate, confidence filter, n-best selection, dedupe.
// Run: node tests/voice/filter.test.mjs
import { VOICE_FILTER, noiseGate, confidenceFilter, pickCandidate, dedupeFinal, phraseKey } from '../../src/services/voice-filter.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);

// Noise gate
check('noise gate: silence (max RMS -2) is dropped', !!noiseGate(-2));
check('noise gate: room noise (max RMS 3.5) is dropped', !!noiseGate(3.5));
check('noise gate: speech (max RMS 8) passes', noiseGate(8) === '');
check('noise gate: exactly the threshold passes', noiseGate(VOICE_FILTER.minSpeechRms) === '');
check('noise gate: unknown level does not block', noiseGate(undefined) === '' && noiseGate(NaN) === '');
check('noise gate: reason names the level', /3\.5/.test(noiseGate(3.5)));

// Confidence
let c = confidenceFilter(['I am from Pakpattan', 'I am from Pakistan'], [0.91, 0]);
check('confidence: unknown score (0) is kept', c.cands.length === 2 && c.cands[1].score === null);
c = confidenceFilter(['I am Officer', 'I am official'], [0.21, 0.1]);
check('confidence: all below 0.4 -> nothing left', c.cands.length === 0 && c.dropped.length === 2);
c = confidenceFilter(['a', 'b', 'c'], [0.8, 0.3, 0.5]);
check('confidence: only the low one dropped', c.cands.map(x => x.text).join() === 'a,c' && c.dropped[0].text === 'b');
c = confidenceFilter(['x', '', '  '], null);
check('confidence: no scores -> all non-empty kept', c.cands.length === 1);

// N-best
const targets = new Set(['mubashar', 'akram', 'pakpattan']);
let p = pickCandidate(
  [
    { text: 'I am Mubashir Akram', score: 0.9, index: 0 },
    { text: 'I am Mubashar Akram', score: null, index: 1 }
  ],
  targets
);
check('n-best: most My words / name overlap wins', p.index === 1 && p.overlap === 2, JSON.stringify(p));
p = pickCandidate(
  [
    { text: 'I know AWS', score: 0.6, index: 0 },
    { text: 'I no AWS', score: 0.8, index: 1 }
  ],
  targets
);
check('n-best: no overlap -> highest confidence', p.index === 1 && p.why === 'highest confidence');
p = pickCandidate(
  [
    { text: 'hello there', score: null, index: 0 },
    { text: 'hello their', score: null, index: 1 }
  ],
  targets
);
check('n-best: nothing known -> first guess', p.index === 0 && p.why === 'first guess');
check('n-best: never merges guesses', p.text === 'hello there');
check('n-best: empty list -> null', pickCandidate([], targets) === null);

// Dedupe
const now = 100000;
const recent = [{ text: 'I am from Pakpattan', at: now - 2000 }];
check('dedupe: same text within 5 s dropped', dedupeFinal('i am from pakpattan.', recent, now).text === '');
check('dedupe: same text after 5 s kept', dedupeFinal('I am from Pakpattan', recent, now + 4000).text === 'I am from Pakpattan');
check('dedupe: end of recent text dropped', dedupeFinal('from Pakpattan', recent, now).text === '');
let d = dedupeFinal('I am from Pakpattan I am a student', recent, now);
check('dedupe: repeated start trimmed, new part kept', d.text === 'I am a student', JSON.stringify(d));
d = dedupeFinal('Pakpattan is my hometown', recent, now);
check('dedupe: one-word overlap is not a repeat', d.text === 'Pakpattan is my hometown');
d = dedupeFinal('I am from Pakpattan Okara', [...recent, { text: 'I know AWS', at: now - 1000 }], now);
check('dedupe: starts with an earlier recent phrase -> only the new part', d.text === 'Okara', JSON.stringify(d));
check('dedupe: different text kept', dedupeFinal('I know AWS', recent, now).text === 'I know AWS');
check('dedupe: empty dropped', dedupeFinal('  ', recent, now).text === '');
check('phraseKey normalises case and punctuation', phraseKey("I'm from, Pakpattan.") === 'im from pakpattan');

console.log(out.join('\n'));
console.log(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
