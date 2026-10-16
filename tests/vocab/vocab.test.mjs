// vocab.js: safe name matching. Run: node tests/vocab/vocab.test.mjs
import { buildVocab, correctText, parseMyWords, snapToReference, hintWords, rareWords, learnFromEdit, similarity, VOCAB_CONFIG } from '../../src/services/vocab.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);

const v = buildVocab({ myWords: parseMyWords('Mubashar\nPakpattan\nKubernetes\nDevOps: dev ops'), name: 'Mubashar Akram' });
const fix = t => correctText(t, v).text;
const same = (name, t) => check(name, fix(t) === t, `"${t}" -> "${fix(t)}"`);
const becomes = (name, t, want) => check(name, fix(t) === want, `"${t}" -> "${fix(t)}" (want "${want}")`);

// No common-word replacement, places never swapped
same('Pakpattan stays Pakpattan', 'I am from Pakpattan');
same('Pakistan stays Pakistan (even with Pakpattan in My words)', 'I am from Pakistan');
const v2 = buildVocab({ myWords: parseMyWords('Pakistan'), name: '' });
check('Pakpattan never becomes Pakistan (Pakistan in My words)', correctText('I am from Pakpattan', v2).text === 'I am from Pakpattan');
same('common word "official" outside a name slot stays', 'the official website');
same('common word "wishing" stays', 'I am wishing you luck');
same('"I am from" is not a name slot', 'I am from Lahore');
same('"I am working" is not a name slot (lowercase)', 'I am working hard');
same('"Python" stays (not close to any My word)', 'I know Python');
same('numbers never change', 'I have 3 years of experience');
same('short words never change', 'I am at it');
same('a normal sentence is untouched', 'I handled the deadline with my team');

// Close spellings and sounds
becomes('rare misspelling of the name is fixed', 'I am Mubashir Akram', 'I am Mubashar Akram');
becomes('misspelled hometown (not a place word) is fixed', 'I live in Pakpatan', 'I live in Pakpattan');
becomes('lowercase name gets capitals', 'my name is mubashar', 'my name is Mubashar');
becomes('split name is joined', 'my name is mu bashar', 'my name is Mubashar');
becomes('My words alias (exact)', 'I use dev ops daily', 'I use DevOps daily');
becomes('Kubernetes misspelled', 'I deploy on kubernates', 'I deploy on Kubernetes');

// Name slot rule
becomes('"my name is" + misspelled name', 'my name is Mubasher', 'my name is Mubashar');
becomes('"I am" + capitalized misspelling is a name slot', 'I am Mobashar', 'I am Mubashar');
same('"my name is" + unrelated word stays (no forced replacement)', 'my name is official');
same('"my name is" + a different real name stays', 'my name is Ahmed');
const vb = buildVocab({ name: 'Rose Akram' });
check('name slot lets a common word match the name ("my name is Rows")', correctText('my name is Rows', vb).text === 'my name is Rose', correctText('my name is Rows', vb).text);
check('same common word outside a name slot stays', correctText('rows of data', vb).text === 'rows of data');

// Never a more common word, cap per sentence
const vc = buildVocab({ myWords: parseMyWords('Hello') });
check('never replaced by a more common word', correctText('I said Helo', vc).text === 'I said Helo');
const many = buildVocab({ myWords: parseMyWords('Zaheer\nQadeer\nNadeer\nSabeer') });
const r = correctText('Zaheerr Qadeerr Nadeerr Sabeerr met', many);
check(`at most ${VOCAB_CONFIG.maxChangesPerSentence} changes per sentence`, r.changes.length === 3, JSON.stringify(r.changes));
const r2 = correctText('Zaheerr Qadeerr. Nadeerr Sabeerr.', many);
check('the cap is per sentence', r2.changes.length === 4, JSON.stringify(r2));

// Smart off, learned corrections
check('smart off: no fuzzy change', correctText('I am Mubashir Akram', v, { smart: false }).text === 'I am Mubashir Akram');
check('smart off: alias still applies', correctText('dev ops', v, { smart: false }).text === 'DevOps');
const vm = buildVocab({ name: 'Mubashar Akram', memory: [{ prev: 'am', heard: 'officer', fix: 'Mubashar' }, { prev: 'from', heard: 'pakistan', fix: 'Pakpattan' }] });
check('learned correction applies', correctText('I am officer', vm).text === 'I am Mubashar');
check('learned correction for a place needs the same previous word', correctText('I am from Pakistan', vm).text === 'I am from Pakpattan' && correctText('Pakistan is big', vm).text === 'Pakistan is big');
check('changes say why', correctText('I am Mubashir', v).changes[0].why.includes('My word') || correctText('I am Mubashir', v).changes[0].why.includes('profile name'));

// Hints, learning, Practice
const h = hintWords(v);
check('hints: My words first, then name, then tech list', h[0] === 'Mubashar' && h.includes('Akram') && h.includes('AWS') && h.indexOf('Akram') < h.indexOf('AWS'));
check('hints: no duplicates, no sentences', new Set(h.map(x => x.toLowerCase())).size === h.length && h.every(x => x.split(' ').length <= 2));
check('rareWords keeps rare words only', rareWords('I deployed Kubernetes on Pakistan servers').join() === 'deployed,Kubernetes', rareWords('I deployed Kubernetes on Pakistan servers').join());
check('learnFromEdit finds one changed word', JSON.stringify(learnFromEdit('I am officer', 'I am Mubashar')) === JSON.stringify({ prev: 'am', heard: 'officer', fix: 'Mubashar' }));
check('learnFromEdit ignores bigger edits', learnFromEdit('I am officer', 'Hello I am Mubashar') === null);
check('Practice snap never adds words', snapToReference('I deploy on kubernates', 'I deploy on Kubernetes').text === 'I deploy on Kubernetes');
check('similarity 0..1', similarity('abc', 'abc') === 1 && similarity('abc', 'xyz') === 0);

// Speed: phonetic and length buckets keep a long sentence fast
const big = buildVocab({ myWords: parseMyWords(Array.from({ length: 300 }, (_, i) => `Word${String.fromCharCode(97 + (i % 26))}${i}`).join('\n')), name: 'Mubashar Akram' });
const t0 = performance.now();
for (let i = 0; i < 200; i++) correctText('I am Mubashir Akram and I am from Pakpattan and I know AWS and DevOps very well', big);
const ms = (performance.now() - t0) / 200;
check(`speed: ${ms.toFixed(2)} ms per sentence with 300 My words`, ms < 5);

console.log(out.join('\n'));
console.log(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
