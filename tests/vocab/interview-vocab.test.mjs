// Interview vocabulary list: every word is protected (never replaced by the name matcher), the
// list built at start-up is duplicate-free (case-insensitive), and the file stays under 10 KB.
// Run: node tests/vocab/interview-vocab.test.mjs
import fs from 'node:fs';
import { INTERVIEW_VOCAB } from '../../src/data/interview-vocab.js';
import { IV_LIST, buildVocab, correctText, parseMyWords, isInterviewWord } from '../../src/services/vocab.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);

const size = fs.statSync('src/data/interview-vocab.js').size;
check(`file under 10 KB (${size} bytes)`, size < 10240);
const lower = IV_LIST.map(t => t.toLowerCase());
check(`start-up list is duplicate-free, case-insensitive (${IV_LIST.length} of ${INTERVIEW_VOCAB.flat().length} entries)`, new Set(lower).size === lower.length);
check('first spelling kept for display ("CGPA", "Node.js")', IV_LIST.includes('CGPA') && IV_LIST.includes('Node.js'));

// A user whose words sound like many list words: nothing from the list may be replaced.
const vocab = buildVocab({
  myWords: parseMyWords('Mubashar\nPakpattan\nKubernetes\nPython3\nTeamwerk'),
  name: 'Mubashar Akram',
  city: 'Pakpattan',
  skills: ['AWS', 'DevOps']
});
const changed = [];
for (const entry of IV_LIST) {
  for (const t of [entry, entry.toLowerCase(), `I am ${entry}`, `my name is ${entry}`]) {
    const r = correctText(t, vocab);
    // Only capitals may change (e.g. "aws" -> "AWS"), never the word itself.
    if (r.text.toLowerCase() !== t.toLowerCase()) changed.push(`${t} -> ${r.text}`);
  }
}
check(`every list word stays (${IV_LIST.length * 4} texts)`, changed.length === 0, changed.slice(0, 5).join(' | '));
check('"Python" never becomes "Pakistan" or a My word', correctText('I know Python', vocab).text === 'I know Python');
check('isInterviewWord: list words yes, other words no', isInterviewWord('Kubernetes') && isInterviewWord('teamwork') && !isInterviewWord('Pakpattanx'));

console.log(out.join('\n'));
console.log(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
