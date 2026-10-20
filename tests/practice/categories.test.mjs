// Every interview type (the first six and src/data/more-questions.js) has a full question bank.
// Run: npm run test:practice
import { CATS, LEVELS, HEAD, TAIL, MID, LVH, LVT, LVX, LK, PCI, ROLE } from '../../src/data/questions.js';
import { MORE } from '../../src/data/more-questions.js';
import { catToRole, ROLE_SKILLS, ROLES } from '../../src/services/setup.js';

const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);

// Same list as bank() in src/main.js before the user's own edits: Fresher keeps 4 opening
// questions, the first 3 of the field and 3 closing ones; Junior and Senior keep all.
const list = (c, level) => {
  const fr = level === 'fresher';
  const L = fr ? [...HEAD, ...MID[c], ...TAIL] : [...LVH[level], ...MID[c], ...(LVX[level]?.[c] || []), ...LVT[level]];
  const keep = new Set([0, 1, 2, 3, 4, 5, 6, L.length - 4, L.length - 2, L.length - 1]);
  return L.map(([q, a], i) => (LK[c]?.[q] && fr ? LK[c][q] : [q, a])).filter((x, i) => !fr || keep.has(i));
};

check(`22 interview types (${Object.keys(CATS).length})`, Object.keys(CATS).length === 22);
check('the first six come first', Object.keys(CATS).slice(0, 6).join() === 'software,marketing,customer,teaching,fresh,cloud');
for (const c of Object.keys(MORE)) {
  const m = MORE[c];
  const sizes = Object.keys(LEVELS).map(l => list(c, l));
  check(
    `${c}: at least 10 questions in every level (${sizes.map(s => s.length).join('/')})`,
    sizes.every(s => s.length >= 10)
  );
  check(
    `${c}: every question has an answer`,
    sizes.flat().every(([q, a]) => q && a && a.length > 40)
  );
  check(
    `${c}: no question twice in a level`,
    sizes.every(s => new Set(s.map(x => x[0])).size === s.length)
  );
  check(
    `${c}: 7 field questions, 3 Fresher answers, 2 Junior and 2 Senior extras`,
    m.mid.length === 7 && m.fresher.length === 3 && m.junior.length === 2 && m.senior.length === 2
  );
  check(`${c}: Fresher uses the simpler answers`, list(c, 'fresher')[4][1] === m.fresher[0]);
  check(`${c}: tile colour and icon`, /^#[0-9a-f]{6}$/i.test(PCI[c][0]) && /^M[\d\s.,MLHVAZCSQTmlhvazcsqt-]+$/.test(PCI[c][1]));
  check(`${c}: role in answers ${m.role ? `"${ROLE[c]}"` : "is the user's own"}`, m.role ? ROLE[c] === m.role : !ROLE[c]);
  check(`${c}: setup picks role "${catToRole(c)}" with skill suggestions`, ROLES.includes(catToRole(c)) && (ROLE_SKILLS[catToRole(c)] || []).length >= 6);
}
const allQ = Object.values(MORE).flatMap(m => [...m.mid, ...m.junior, ...m.senior].map(x => x[0]));
check(
  'no {field} typo in the new answers',
  Object.values(MORE).every(m =>
    [...m.mid, ...m.junior, ...m.senior]
      .flat()
      .concat(m.fresher)
      .every(t => !/\{(?!name\}|degree\}|uni\}|skills\}|project\}|role\}|certs\}|strength\}|weakness\}|achievement\}|city\})/.test(t))
  )
);
check(`${allQ.length} new questions`, allQ.length === 16 * 11);

console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`${out.length - fails}/${out.length} passed`);
if (fails) process.exit(1);
