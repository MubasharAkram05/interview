// False-positive sweep: every question and sample answer in the app must come out of the corrector
// unchanged (candidates: a real profile name and My words).
import * as Q from '../../src/data/questions.js';
import { buildVocab, correctText, parseMyWords } from '../../src/services/vocab.js';

const texts = new Set();
const walk = v => {
  if (typeof v === 'string') {
    if (v.trim().split(/\s+/).length >= 2) texts.add(v);
  } else if (Array.isArray(v)) v.forEach(walk);
  else if (v && typeof v === 'object') Object.values(v).forEach(walk);
};
Object.values(Q).forEach(walk);
// Fill placeholders the way the app does, with a real-looking profile.
const profile = { name: 'Mubashar Akram', city: 'Pakpattan', degree: 'BS Computer Science', uni: 'University of Okara', skills: 'JavaScript, React, AWS', certs: 'AWS Cloud Practitioner', project: 'an attendance app', role: 'Software Engineer' };
const filled = [...texts].map(t => t.replace(/\{(\w+)\}/g, (_, k) => profile[k] || Q.DEF?.[k] || k));
const all = [...texts, ...filled];
const vocab = buildVocab({ myWords: parseMyWords('Mubashar\nPakpattan\nDevOps\nKubernetes'), name: profile.name });

const changed = [];
all.forEach(t => {
  const r = correctText(t, vocab);
  if (r.text !== t) changed.push({ t, out: r.text, changes: r.changes });
});
console.log(`texts checked: ${all.length}, candidates: ${vocab.targets.size}`);
changed.slice(0, 20).forEach(c => console.log('CHANGED:', JSON.stringify(c.changes), '\n  in:', c.t.slice(0, 140)));
console.log(changed.length ? `FAIL  ${changed.length} text(s) changed` : 'PASS  no question or answer was changed');
if (changed.length) process.exit(1);
