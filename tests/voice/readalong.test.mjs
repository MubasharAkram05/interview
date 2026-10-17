// Read-along matching: accents, misheard words, skipped words, fillers, numbers.
import {
  alignReading,
  bestAlignment,
  readingScore,
  similarity,
  soundKey,
  tokens,
  pickAlternative,
  vocabulary,
  joinSpoken
} from '../../src/services/readalong.js';

const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
const T = s => s.split(/\s+/).map(w => tokens(w)[0] || '');
const run = (text, ...spoken) => alignReading(T(text), spoken);

const ans = 'I have worked with JavaScript and Python for three years on web projects.';
const N = T(ans).length;

let r = run(ans, 'I have worked with JavaScript and Python for three years on web projects');
check('exact reading reaches the end, all ok', r.pos === N && r.state.every(x => x === 'ok'));

r = run(ans, 'I have vorked vith JavaScript and Python for tree years on veb projects');
check('Indian/Pakistani accent (v/w, th->t) still reaches the end', r.pos === N && readingScore(r.state) > 0.9);

r = run(ans, 'I have worked with java script and python for 3 years on web project');
check('"java script" joined, "3" = three, plural ending accepted', r.pos === N && readingScore(r.state) === 1);

r = run(ans, 'I have worked with JavaScript and Python on web projects');
check('skipped words are passed over, marked missed', r.pos === N && r.state.filter(x => x === 'miss').length === 3);

r = run(ans, 'um I have uh worked with JavaScript hmm and Python');
check(
  'fillers (um, uh, hmm) are ignored',
  r.state.slice(0, 7).every(x => x === 'ok')
);

r = run(ans, 'I have worked with', 'JavaScript and Python for three years');
check('continues across two listening sessions', r.pos === 10 && r.state.slice(0, 10).every(x => x === 'ok'));

r = run(ans, 'I have worked with the the the');
check('stray small words do not jump ahead', r.pos === 4);

r = run(ans, 'banana elephant guitar');
check('unrelated words do not move the highlight', r.pos === 0);

r = run('I am a team player and I enjoy helping others.', "I'm a team player and I enjoy helping others");
check('"I\'m" heard for "I am" does not block', r.pos >= 8);

r = run("I'm a quick learner.", 'I am a quick learner');
check('"I am" heard for "I\'m" is joined', r.pos === T("I'm a quick learner.").length && r.state[0] === 'ok');

const para =
  'My strengths are communication, teamwork and problem solving. In my last project I managed a team of four developers and we delivered the app on time.';
r = run(
  para,
  'my strength are communications team work and problem solving in my last project I manage a team of for developer and we deliver the app on time'
);
check(
  'realistic misheard paragraph still reaches the end (score ' + readingScore(r.state).toFixed(2) + ')',
  r.pos === T(para).length && readingScore(r.state) >= 0.85
);
r = run('Their feedback helped me improve.', 'there feedback help me improve');
check('their/there, help/helped accepted', r.pos === T('Their feedback helped me improve.').length && readingScore(r.state) === 1);
r = run(para, 'my strengths are communication teamwork', 'and problem solving in my last project I managed a team');
check('mid-way stop then continue keeps progress', r.pos > 14 && r.pos < T(para).length);

const best = bestAlignment(T(ans), [], ['I have walked with', 'I have worked with JavaScript']);
check('best of several alternatives is used', best.pos === 5);

check('sound key: v/w and th/t match', soundKey('very') === soundKey('wery') && soundKey('three') === soundKey('tree'));
check('similarity rejects very different words', similarity('python', 'banana') === 0);
check('similarity: short words need exact', similarity('the', 'tea') < 0.6 || similarity('a', 'the') === 0);

const long = Array.from({ length: 300 }, (_, i) => 'word' + (i % 50)).join(' ');
const t0 = Date.now();
for (let i = 0; i < 50; i++) alignReading(T(long), [long]);
check(`fast enough for live updates (50 x 300 words in ${Date.now() - t0} ms)`, Date.now() - t0 < 1500);

// Mock interview: choose the transcript that fits the topic.
const vocab = vocabulary('I built a REST API with Node.js and MongoDB for an online store.', 'Tell me about your project', 'JavaScript, React');
check(
  'mock: first guess kept when others are not clearly better',
  pickAlternative(['I built a rest API with node', 'I build a rest API with note'], vocab) === 'I built a rest API with node'
);
check(
  'mock: a guess with clearly more topic words wins',
  pickAlternative(['I built a rest happy with no JS and mongo baby', 'I built a REST API with Node.js and MongoDB'], vocab) ===
    'I built a REST API with Node.js and MongoDB'
);
check('mock: empty list gives empty text', pickAlternative([], vocab) === '');
const alts = Array.from({ length: 5 }, (_, i) => 'I worked on a project using React and Node and MongoDB with my team ' + i);
const t1 = Date.now();
for (let i = 0; i < 300; i++) pickAlternative(alts, vocab);
check(`mock: fast enough for live text (300 picks in ${Date.now() - t1} ms)`, Date.now() - t1 < 300);

check('mock: phrase after a pause continues the sentence', joinSpoken('I built an app', 'And used React') === 'I built an app and used React');
check(
  'mock: keeps I, acronyms and known terms',
  joinSpoken('First', 'I used AWS') === 'First I used AWS' &&
    joinSpoken('We used', 'AWS and React') === 'We used AWS and React' &&
    joinSpoken('Then', 'JavaScript was used', ['JavaScript']) === 'Then JavaScript was used'
);
check('mock: after a full stop the next phrase starts with a capital', joinSpoken('It worked.', 'then we shipped') === 'It worked. Then we shipped');
check('mock: first phrase starts with a capital', joinSpoken('', 'my name is Ali') === 'My name is Ali');

console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
