// Skill suggestions list (src/data/interview-vocab.js). Run: node tests/vocab/interview-vocab.test.mjs
import fs from 'node:fs';
import { SKILL_SUGGESTIONS, TECH, SOFT_SKILLS } from '../../src/data/interview-vocab.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);

const size = fs.statSync('src/data/interview-vocab.js').size;
check(`file under 10 KB (${size} bytes)`, size < 10240);
const lower = SKILL_SUGGESTIONS.map(t => t.toLowerCase());
const dup = lower.filter((t, i) => lower.indexOf(t) !== i);
check(`skill suggestions are duplicate-free (${SKILL_SUGGESTIONS.length})`, dup.length === 0, dup.join(', '));
check('tech skills first, then soft skills', SKILL_SUGGESTIONS[0] === TECH[0] && SKILL_SUGGESTIONS.at(-1) === SOFT_SKILLS.at(-1));
check('cloud skills present (AWS, Docker)', SKILL_SUGGESTIONS.includes('AWS') && SKILL_SUGGESTIONS.includes('Docker'));

console.info(out.join('\n'));
console.info(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
