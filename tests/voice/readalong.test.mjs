// Read-along matching: accents, misheard words, skipped words, fillers, numbers.
import { alignReading, bestAlignment, readingScore, similarity, soundKey, tokens } from '../../src/services/readalong.js';

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
check('fillers (um, uh, hmm) are ignored', r.state.slice(0, 7).every(x => x === 'ok'));

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

const para = 'My strengths are communication, teamwork and problem solving. In my last project I managed a team of four developers and we delivered the app on time.';
r = run(para, 'my strength are communications team work and problem solving in my last project I manage a team of for developer and we deliver the app on time');
check('realistic misheard paragraph still reaches the end (score ' + readingScore(r.state).toFixed(2) + ')', r.pos === T(para).length && readingScore(r.state) >= 0.85);
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

console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
