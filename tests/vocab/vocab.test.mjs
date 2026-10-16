// vocab.js: personal vocabulary correction. Run: node tests/vocab/vocab.test.mjs
import { buildVocab, correctText, parseMyWords, snapToReference, pickBest, isDuplicatePhrase, hintWords, learnFromEdit, similarity, VOCAB_CONFIG } from '../../src/services/vocab.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);
const eq = (name, got, want) => check(name, got === want, `got "${got}" want "${want}"`);

const profile = { name: 'Mubashar Akram', city: 'Pakpattan', skills: 'JavaScript, React, AWS' };
const myWords = parseMyWords('Mubashar\nPakpattan\nDevOps');
const vocab = buildVocab({ myWords, profile, answers: ['I built a REST API with Node.js and deployed it on AWS using Kubernetes.'], questions: ['Introduce yourself in 2 minutes.'] });
const fix = (t, o) => correctText(t, vocab, o).text;

// ---- Must become Mubashar / names
eq('ubashar -> Mubashar', fix('I am ubashar'), 'I am Mubashar');
eq('mubasher -> Mubashar', fix('I am mubasher'), 'I am Mubashar');
eq('mu bashar -> Mubashar', fix('I am mu bashar'), 'I am Mubashar');
eq('moobashar -> Mubashar', fix('I am moobashar'), 'I am Mubashar');
eq('Mubasher (capital) -> Mubashar', fix('Mubasher here'), 'Mubashar here');
eq('mubashar (lower) -> Mubashar (case)', fix('i am mubashar'), 'i am Mubashar');
eq('akram -> Akram (case)', fix('mubashar akram'), 'Mubashar Akram');
eq('pakpatan -> Pakpattan', fix('I am from pakpatan'), 'I am from Pakpattan');
eq('pak pattan -> Pakpattan (merge)', fix('I am from pak pattan'), 'I am from Pakpattan');
eq('punctuation kept: "mubasher," -> "Mubashar,"', fix('hello, mubasher, how are you'), 'hello, Mubashar, how are you');

// ---- Terms
eq('a w s -> AWS', fix('I know a w s well'), 'I know AWS well');
eq('dev ops -> DevOps', fix('I like dev ops'), 'I like DevOps');
eq('aws -> AWS (case)', fix('I used aws'), 'I used AWS');
eq('kubernetis -> Kubernetes', fix('I used kubernetis'), 'I used Kubernetes');
eq('cubernetes -> Kubernetes', fix('deploy on cubernetes'), 'deploy on Kubernetes');
eq('git hub -> GitHub', fix('my code is on git hub'), 'my code is on GitHub');
eq('java script -> JavaScript', fix('I write java script'), 'I write JavaScript');
eq('type script -> TypeScript', fix('and type script'), 'and TypeScript');
eq('mongo db -> MongoDB', fix('I used mongo db'), 'I used MongoDB');
eq('post gre sql stays readable (no bad merge)', fix('post office'), 'post office');

// ---- Name slot
eq('my name is wishing -> my name is Mubashar', fix('my name is wishing'), 'my name is Mubashar');
eq('My name is official Akram -> Mubashar Akram', fix('My name is official Akram'), 'My name is Mubashar Akram');
eq('myself wishing -> myself Mubashar', fix('myself wishing'), 'myself Mubashar');
eq('name slot keeps a common next word ("and")', fix('my name is wishing and I code'), 'my name is Mubashar and I code');
eq('"myself as a developer" unchanged', fix('I see myself as a developer'), 'I see myself as a developer');
eq('"myself working as" unchanged', fix('I see myself working as a lead'), 'I see myself working as a lead');
eq('name slot: already right stays', fix('my name is Mubashar'), 'my name is Mubashar');
eq('name slot off with smart=false', correctText('my name is wishing', vocab, { smart: false }).text, 'my name is wishing');
eq('no name slot after "I am"', fix('I am wishing'), 'I am wishing');

// ---- Must stay unchanged
eq('"I am from Pakistan" unchanged', fix('I am from Pakistan'), 'I am from Pakistan');
eq('"I am hard working" unchanged', fix('I am hard working'), 'I am hard working');
eq('"I am official" unchanged', fix('I am official'), 'I am official');
eq('"a student" unchanged', fix('I am a student'), 'I am a student');
eq('numbers unchanged', fix('I have 2 years and 3.5 CGPA'), 'I have 2 years and 3.5 CGPA');
eq('short common words unchanged', fix('it is on to me'), 'it is on to me');
eq('common word "wishing" outside name slot unchanged', fix('I am wishing you luck'), 'I am wishing you luck');
eq('place "India" unchanged', fix('I worked in India'), 'I worked in India');
eq('unknown name far from vocab unchanged ("Abhishek")', fix('I am Abhishek'), 'I am Abhishek');
eq('"IMO" unchanged', fix('IMO it is fine'), 'IMO it is fine');
eq('empty text', fix(''), '');

// ---- Aliases (user-added)
const v2 = buildVocab({ myWords: parseMyWords('Pakpattan: Pakistan'), profile });
eq('explicit alias overrides place protection', correctText('I am from Pakistan', v2).text, 'I am from Pakpattan');
eq('alias works with smart off', correctText('I am from Pakistan', v2, { smart: false }).text, 'I am from Pakpattan');

// ---- Correction memory
const mem = [{ prev: 'am', heard: 'official', fix: 'Mubashar' }];
eq('memory applies after same previous word', correctText('I am official', vocab, { memory: mem }).text, 'I am Mubashar');
eq('memory does not apply after another word', correctText('very official', vocab, { memory: mem }).text, 'very official');
const learned = learnFromEdit('I am official from Pakistan', 'I am Mubashar from Pakistan');
check('learnFromEdit finds the one changed word', learned && learned.prev === 'am' && learned.heard === 'official' && learned.fix === 'Mubashar');
check('learnFromEdit ignores bigger edits', learnFromEdit('a b c', 'x y c') === null && learnFromEdit('a b', 'a b c') === null);

// ---- Changes are reported
const ch = correctText('I am mubasher', vocab).changes;
check('changes report from/to/rule', ch.length === 1 && ch[0].from === 'mubasher' && ch[0].to === 'Mubashar');

// ---- Practice snap
const ref = 'My name is Mubashar Akram and I build web apps with React.';
eq('practice snap: partly similar words snap to the saved answer', snapToReference('my name is mubasha akrum and I bild web apps', ref).text, 'my name is Mubashar Akram and I build web apps');
eq('practice snap never adds words', snapToReference('my name', ref).text, 'my name');
eq('practice snap leaves unrelated words', snapToReference('banana', ref).text, 'banana');

// ---- Alternatives
const best = pickBest(['I know a WS and dev box', 'I know AWS and DevOps'], vocab);
check('pickBest prefers the alternative that fits the vocabulary', best.text === 'I know AWS and DevOps', best.text);
const keep = pickBest(['I am from Pakistan', 'I am from Pakistan and I am a student at the university'], vocab);
check('pickBest never picks a longer alternative that adds words', keep.index === 0);
check('pickBest of empty list', pickBest([], vocab).text === '');

// ---- Duplicates
check('duplicate: same phrase', isDuplicatePhrase('I am from Pakistan', 'I am from Pakistan.'));
check('duplicate: contained in the end of the box', isDuplicatePhrase('I am from Pakistan', '', 'Hello. I am Mubashar. I am from Pakistan'));
check('duplicate: 90% similar', isDuplicatePhrase('I am Abhishek IMO akram', 'I am Abhishek IMO akrm'));
check('not duplicate: new phrase', !isDuplicatePhrase('I am hard working', 'I am from Pakistan', 'I am from Pakistan'));

// ---- Hints
const hints = hintWords(vocab);
check('hints start with my words and profile, max 100, no sentences', hints[0] === 'Mubashar' && hints.includes('Pakpattan') && hints.length <= VOCAB_CONFIG.maxHints && hints.every(h => h.split(' ').length <= 2));
check('similarity tolerates a dropped first letter', similarity('ubashar', 'mubashar') >= 0.87);

console.log(out.join('\n'));
console.log(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
