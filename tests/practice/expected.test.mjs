// Practice expected-text matching (src/services/expected.js). Run: node tests/practice/expected.test.mjs
import { alignToExpected, introTemplate, isIntroQuestion, wordStatus } from '../../src/services/expected.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);
const types = r => r.ops.map(o => o.type[0]).join('');

const EXP = 'My name is Mubashar Akram. I am a BS IT student from Pakpattan.';

let r = alignToExpected('my name is Mubashar Akram I am a BS IT student from Pakpattan', EXP);
check('exact: every word matched, saved text written', r.score === 100 && r.text === EXP && r.extra === 0 && r.missed === 0, r.text);

r = alignToExpected('my name is Mubashir Akram', 'My name is Mubashar Akram.');
check('Mubashir -> Mubashar (written as saved)', r.text === 'My name is Mubashar Akram.' && r.ops[3].type === 'fix', JSON.stringify(r.ops[3]));

r = alignToExpected('I am from Pakpattan', 'I am from Pakpattan.');
check('Pakpattan stays Pakpattan', r.text === 'I am from Pakpattan.' && r.score === 100);

r = alignToExpected('I am from Pakistan', 'I am from Pakpattan.');
check('substitution: a close but different word is a fix (Pakistan -> Pakpattan)', r.text === 'I am from Pakpattan.' || types(r) === 'mmmxe', `${r.text} ${types(r)}`);

r = alignToExpected('my name is Akram', 'My name is Mubashar Akram.');
check('missing word: marked missed, not written', r.missed === 1 && r.ops.find(o => o.type === 'missed').expected === 'Mubashar' && r.text === 'My name is Akram.', `${r.text} ${types(r)}`);

r = alignToExpected('my name is really Mubashar Akram', 'My name is Mubashar Akram.');
check('extra word: kept as heard, marked extra', r.extra === 1 && r.text === 'My name is really Mubashar Akram.' && r.ops[3].type === 'extra', r.text);

r = alignToExpected('hello', 'My name is Mubashar Akram. I am from Pakpattan.');
check('no hallucinated fill: unheard expected words are never written', r.text === 'hello' && r.matched === 0 && r.score === 0, r.text);

r = alignToExpected('my name is', 'My name is Mubashar Akram.', { partial: true });
check('while reading: words not reached yet are pending, not missed', r.missed === 0 && r.ops.filter(o => o.type === 'pending').length === 2);
r = alignToExpected('my name is', 'My name is Mubashar Akram.');
check('attempt finished: the rest is missed', r.missed === 2);

r = alignToExpected('my name is Mubashar I am a student from Pakpattan', EXP);
check(`score = matched / expected words (${r.score}%)`, r.score === Math.round((r.matched / r.total) * 100) && r.matched === 10 && r.total === 13, `${r.matched}/${r.total}`);

const t = introTemplate({ name: 'Mubashar Akram', edu: 'BS IT student', city: 'Pakpattan', skills: ['AWS', 'DevOps', 'Linux'], role: 'Cloud Engineer' });
check(
  'template answer from setup details',
  t === 'My name is Mubashar Akram. I am a BS IT student from Pakpattan. My skills include AWS, DevOps and Linux. I am looking for a Cloud Engineer position.',
  t
);
check('template leaves out missing details', introTemplate({ name: 'Sara', role: 'IT Support' }) === 'My name is Sara. I am looking for an IT Support position.', introTemplate({ name: 'Sara', role: 'IT Support' }));
check('intro questions detected', isIntroQuestion('Introduce yourself in 2 minutes.') && isIntroQuestion('Tell me about yourself') && !isIntroQuestion('Why this job?'));

// Speed: a 120-word answer against a 150-word attempt.
const long = Array.from({ length: 120 }, (_, i) => `word${i % 37}`).join(' ');
const t0 = performance.now();
for (let k = 0; k < 20; k++) alignToExpected(long + ' extra words here and there', long);
const ms = (performance.now() - t0) / 20;
check(`speed: ${ms.toFixed(1)} ms for 125 x 120 words`, ms < 60);

// wordStatus: the whole answer, coloured like a language app
const ws = h => wordStatus(alignToExpected(h, EXP, { partial: true })).join(' ');
const W = EXP.split(/\s+/).length;
check('wordStatus: one entry per answer word', wordStatus(alignToExpected('', EXP)).length === W);
check('wordStatus: nothing said = all dull', ws('') === Array(W).fill('dim').join(' '));
check('wordStatus: said words ok, rest dull', ws('my name is Mubashir Akram') === ['ok', 'ok', 'ok', 'ok', 'ok', ...Array(W - 5).fill('dim')].join(' '), ws('my name is Mubashir Akram'));
check('wordStatus: a wrong word in its place is red ("Lahore" for "Pakpattan")', ws('I am a BS IT student from Lahore').split(' ').slice(-1)[0] === 'bad', ws('I am a BS IT student from Lahore'));
check('wordStatus: skipped words stay dull, not red', ws('my name is Akram').split(' ')[3] === 'dim', ws('my name is Akram'));
check('wordStatus: one extra word marks one word', (ws('my name is Ali Akram').match(/bad/g) || []).length === 1, ws('my name is Ali Akram'));

console.log(out.join('\n'));
console.log(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
