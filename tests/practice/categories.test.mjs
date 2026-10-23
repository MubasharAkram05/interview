// Every interview type (the first six and src/data/more-questions.js) has a full question bank.
// Run: npm run test:practice
import { CATS, LEVELS, HEAD, TAIL, MID, LVH, LVT, LVX, LK, PCI, ROLE, ORDER, MYEX, LVEX } from '../../src/data/questions.js';
import { MORE } from '../../src/data/more-questions.js';
import { catToRole, ROLE_SKILLS, ROLES } from '../../src/services/setup.js';
import { FAMILIES, isGeneric } from '../../src/services/answer-context.js';

const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);

// Same list as bank() in src/main.js before the user's own edits: Fresher keeps 4 opening
// questions, the first 3 of the field and 3 closing ones; Junior and Senior keep all.
const list = (c, level) => {
  const fr = level === 'fresher';
  const L = fr ? [...HEAD, ...MID[c], ...TAIL] : [...LVH[level], ...MID[c], ...(LVX[level]?.[c] || []), ...LVT[level]];
  const keep = new Set([0, 1, 2, 3, 4, 5, 6, L.length - 4, L.length - 2, L.length - 1]);
  const extra = (fr ? MYEX[c] : LVEX[level]?.[c]) || []; // added at the end of the list
  return L.map(([q, a], i) => (LK[c]?.[q] && fr ? LK[c][q] : [q, a]))
    .filter((x, i) => !fr || keep.has(i))
    .concat(extra);
};

check(`37 interview types (${Object.keys(CATS).length})`, Object.keys(CATS).length === 37 && !CATS.hrq);
check('tiles follow ORDER (each type next to related ones)', Object.keys(CATS).join() === ORDER.join());

// The four split types keep their ids; each new half gets its own id.
const SPEC = {
  software: ['Software Developer', 'Software Engineer', 'Software Developer'],
  it: ['IT Support', 'IT Support', 'IT Support Specialist'],
  cloud: ['Cloud Engineer', 'Cloud/DevOps', 'Cloud and DevOps Engineer'],
  cyber: ['Cyber Security', 'Cyber Security', 'Cyber Security Analyst'],
  marketing: ['Marketing', 'Marketing/Sales', 'Marketing Executive'],
  fresh: ['Fresh Graduate', 'Fresher/General', undefined],
  web: ['Web Developer', 'Web Developer', 'Web Developer'],
  data: ['Data and Analytics', 'Data/AI', 'Data and AI Engineer'],
  sql: ['SQL Developer', 'Database Developer', 'Database Developer'],
  hr: ['HR Generalist', 'HR', 'HR Officer'],
  graphic: ['Graphic Design', 'Graphic Designer', 'Graphic Designer']
};
for (const [c, [label, setupRole, role]] of Object.entries(SPEC))
  check(
    `${c}: "${label}", setup role ${setupRole}, role in answers ${role || "the user's own"}`,
    CATS[c] === label && catToRole(c) === setupRole && ROLE[c] === role
  );
check('only one Sales type', Object.values(CATS).filter(l => /sales/i.test(l)).length === 1);
check('Fresh Graduate is a general type', isGeneric('fresh') && !ROLE.fresh);
check(
  'families: Software, Cloud and DevOps, Security, Infra; Data/AI, Cloud Data/AI and Graphic Designer in none',
  FAMILIES.Software.includes('Web Developer') &&
    FAMILIES['Cloud and DevOps'].join() === 'Cloud/DevOps,Cloud Administrator,Cloud Architect,DevOps,Platform Engineer' &&
    FAMILIES.Security.join() === 'Cyber Security,SOC Analyst,Penetration Tester,Application Security,GRC Analyst,Incident Response,Cloud Security' &&
    FAMILIES.Infra.join() === 'IT Support,Network Engineer,Cloud/DevOps' &&
    !Object.values(FAMILIES)
      .flat()
      .some(r => r === 'Data/AI' || r === 'Cloud Data/AI' || r === 'Graphic Designer')
);
check(
  'Graphic Designer skills',
  ROLES.includes('Graphic Designer') &&
    ROLE_SKILLS['Graphic Designer'].join() ===
      'Photoshop,Illustrator,Canva,Figma,Typography,Branding,Logo design,Layout design,Color theory,Social media design,Portfolio'
);
check(
  'Cyber Security skills',
  ROLES.includes('Cyber Security') &&
    ROLE_SKILLS['Cyber Security'].join() ===
      'Network security,Firewalls,SIEM,Vulnerability assessment,Incident response,Linux,IAM,Wireshark,OWASP,Cloud security'
);
check('no role twice in the setup list', new Set(ROLES).size === ROLES.length);
const NEW = [
  'it',
  'cyber',
  'web',
  'data',
  'graphic',
  'cloudadmin',
  'cloudarch',
  'cloudsec',
  'clouddata',
  'devops',
  'platform',
  'soc',
  'pentest',
  'appsec',
  'grc',
  'ir'
];
const cols = Object.values(PCI).map(x => x[0].toLowerCase());
check(
  'new types: own tile colour (not used by any other type)',
  NEW.every(c => cols.filter(x => x === PCI[c][0].toLowerCase()).length === 1)
);
// White icon on the tile colour: at least 3:1 (non-text contrast), so it reads in light and dark mode.
const lum = h => {
  const v = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
check(
  'new types: white icon contrast at least 3:1',
  NEW.every(c => 1.05 / (lum(PCI[c][0]) + 0.05) >= 3)
);

// Every type, every level: the same structure as the bank in main.js.
for (const c of Object.keys(CATS)) {
  const lv = Object.keys(LEVELS);
  const sizes = lv.map(l => list(c, l));
  // The shared opening question of the level (or its Fresher wording) comes first.
  const first = l => (l === 'fresher' ? (LK[c]?.[HEAD[0][0]] || HEAD[0])[0] : LVH[l][0][0]);
  check(
    `${c}: ${sizes.map(s => s.length).join('/')} questions, shared opening question first, answers filled, nothing twice`,
    sizes.every((s, j) => s.length >= 10 && s[0][0] === first(lv[j])) &&
      sizes.flat().every(([q, a]) => q && a && a.length > 40) &&
      sizes.every(s => new Set(s.map(x => x[0])).size === s.length)
  );
}

// PR B roles: exactly the role structure (Fresher 10, Junior 19, Senior 19).
for (const c of ['cloudadmin', 'cloudarch', 'cloudsec', 'clouddata', 'devops', 'platform', 'soc', 'pentest', 'appsec', 'grc', 'ir'])
  check(
    `${c}: 10 / 19 / 19 questions`,
    Object.keys(LEVELS)
      .map(l => list(c, l).length)
      .join() === '10,19,19'
  );

// Fresh Graduate: the list that shipped before is unchanged; new questions only at the end.
{
  const V1 = [
    'What is the biggest lesson you learned in college?',
    'Do you prefer teamwork or individual work?',
    'How do you handle stress or pressure?',
    'Describe a time you showed leadership.',
    'Are you willing to learn new skills and work flexible hours?',
    'What would you like to ask us about this job?',
    'What motivates you to do your best work?',
    'What have you learned about our company before this interview?',
    'How do you handle conflict with a teammate?',
    'Describe a time you failed and what you learned.',
    'How do you prioritize tasks and manage your time?',
    'Why did you choose your degree, and what have you gained from it?',
    'How would your teachers or friends describe you?'
  ];
  check('Fresh Graduate: shipped order kept (2 reworded in place)', MID.fresh.map(x => x[0]).join('|') === V1.join('|'));
  check(
    'Fresh Graduate: new questions added at the end of each level',
    (MYEX.fresh || []).length === 3 && (LVEX.junior.fresh || []).length === 5 && (LVEX.senior.fresh || []).length === 3
  );
}

// No question text in two types (the shared opening and closing questions aside).
{
  const shared = new Set([...HEAD, ...TAIL, ...LVH.junior, ...LVH.senior, ...LVT.junior, ...LVT.senior].map(x => x[0]));
  const where = {};
  for (const c of Object.keys(CATS)) {
    const own = new Set(
      [
        ...MID[c],
        ...(LVX.junior[c] || []),
        ...(LVX.senior[c] || []),
        ...(MYEX[c] || []),
        ...(LVEX.junior[c] || []),
        ...(LVEX.senior[c] || []),
        ...Object.values(LK[c] || {})
      ].map(x => x[0])
    );
    own.forEach(t => !shared.has(t) && (where[t.toLowerCase()] ||= []).push(c));
  }
  const dup = Object.entries(where).filter(([, cs]) => cs.length > 1);
  check('no question text in two types', !dup.length);
  if (dup.length) dup.forEach(([t, cs]) => out.push(`      ${cs.join(', ')}: ${t}`));
}
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
check(`${allQ.length} questions in more-questions.js`, allQ.length === Object.keys(MORE).length * 11);

console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`${out.length - fails}/${out.length} passed`);
if (fails) process.exit(1);
