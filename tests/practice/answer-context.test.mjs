// Personalised answers (src/services/answer-context.js): the shared resolver, the intro answer, the
// {placeholder} filler and the "Personalize" sheet validation. Run: npm run test:practice
import { CATS, LEVELS, HEAD, TAIL, MID, LVH, LVT, LVX, LK, MYEX, LVEX, ROLE } from '../../src/data/questions.js';
import {
  answerContext,
  introAnswer,
  fillTemplate,
  sampleAnswer,
  roleMatches,
  isGeneric,
  defaultSkills,
  parseSessionInput,
  FAMILIES
} from '../../src/services/answer-context.js';
import { catToRole, ROLES } from '../../src/services/setup.js';
import { article, roleText, expandDegree } from '../../src/services/expected.js';

const out = [];
const check = (name, ok, got) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || got === undefined ? '' : `\n      got: ${got}`}`);

const SW = {
  name: 'Sara Ahmed',
  city: 'Lahore',
  edu: 'BSCS student',
  role: 'Software Engineer',
  roleKey: 'Software Engineer',
  skillTags: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Docker'],
  project: 'a school management website',
  setup: 1
};
const P = {
  software: SW,
  empty: {},
  longName: { ...SW, name: 'Muhammad Abdullah Rehman Siddiqui Khan Ali'.slice(0, 40) },
  noSkills: { ...SW, skillTags: [], skills: '' },
  other: { ...SW, role: 'Other', roleKey: 'Other' },
  custom: { ...SW, role: 'Graphic Designer', roleKey: 'Other' },
  noProjectNoCity: { ...SW, project: '', city: '' },
  general: { ...SW, role: 'Fresher/General', roleKey: 'Fresher/General', skillTags: ['Communication', 'Teamwork'] }
};

// Every question of a category and level (same list as bank() in src/main.js).
const questions = (c, level) => {
  const fr = level === 'fresher';
  const L = fr ? [...HEAD, ...MID[c], ...TAIL] : [...LVH[level], ...MID[c], ...(LVX[level]?.[c] || []), ...LVT[level]];
  const extra = (fr ? MYEX[c] : LVEX[level]?.[c]) || [];
  return [...L.map(([q, a]) => (fr && LK[c]?.[q] ? LK[c][q] : [q, a])), ...extra];
};
// Leftovers of the filler: unfilled placeholders, braces, brackets, double spaces. The words "null"
// and "undefined" are allowed in authored text (SQL NULL, null hypothesis, JavaScript); the filler
// itself must never add them (checked below by count, and by filling with missing values).
const LEFT = /[{}[\]]| {2}/;
const MISSING_WORD = /\b(?:undefined|null)\b/gi;
const words = t => (String(t).match(MISSING_WORD) || []).length;
const SOFTWARE_CATS = Object.keys(CATS).filter(c => FAMILIES.Software.includes(catToRole(c)));

// ---- The bug: a Software Engineer profile opening Customer Service
{
  const ctx = answerContext(SW, 'customer');
  const a = introAnswer(ctx, true);
  check('Customer Service intro: no JavaScript, React or Software Engineer', !/JavaScript|React|Software Engineer|Python/.test(a), a);
  check(
    'Customer Service intro: its own role and default skills',
    /Customer Service Representative role/.test(a) && a.includes(defaultSkills('customer')[0]),
    a
  );
  check('Customer Service: no project sentence from the profile', !/school management/.test(a), a);
}

// ---- Matching rule and families
check('same role matches', roleMatches(SW, 'software') === false || roleMatches({ roleKey: 'Software Engineer' }, 'software'));
check(
  'Software family: Software Engineer matches Java, C/C++, SQL',
  ['java', 'cpp', 'sql', 'software'].every(c => roleMatches(SW, c))
);
check(
  'Infra family: IT Support matches Networking and Cloud',
  ['network', 'cloud'].every(c => roleMatches({ roleKey: 'IT Support' }, c))
);
check('Software family: Software Engineer matches Web Development', roleMatches(SW, 'web') && roleMatches({ roleKey: 'Web Developer' }, 'software'));
check(
  'Security family: Cyber Security matches the 5 security roles and Cloud Security, not IT Support or Networking',
  ['cyber', 'soc', 'pentest', 'appsec', 'grc', 'ir', 'cloudsec'].every(c => roleMatches({ roleKey: 'Cyber Security' }, c)) &&
    !['it', 'network', 'cloud'].some(c => roleMatches({ roleKey: 'Cyber Security' }, c)) &&
    !roleMatches({ roleKey: 'IT Support' }, 'cyber')
);
check(
  'Cloud and DevOps family: Cloud/DevOps matches Cloud Administrator, Architect, DevOps and Platform, not SOC Analyst',
  ['cloud', 'cloudadmin', 'cloudarch', 'devops', 'platform'].every(c => roleMatches({ roleKey: 'Cloud/DevOps' }, c)) &&
    !roleMatches({ roleKey: 'Cloud/DevOps' }, 'soc') &&
    roleMatches({ roleKey: 'DevOps' }, 'cloud') &&
    roleMatches({ roleKey: 'Cloud/DevOps' }, 'it')
);
check(
  'Cloud Data/AI is in Data and Analytics only: matches the data roles, not Cloud or AI',
  ['clouddata', 'data', 'analyst', 'dataeng'].every(c => roleMatches({ roleKey: 'Cloud Data/AI' }, c)) &&
    !['cloud', 'cloudadmin', 'mleng', 'genai'].some(c => roleMatches({ roleKey: 'Cloud Data/AI' }, c))
);
check(
  'Data and Analytics family: Data Analyst matches Data Scientist and BI, not Machine Learning Engineer',
  ['datasci', 'bidev', 'data', 'dataeng', 'clouddata'].every(c => roleMatches({ roleKey: 'Data Analyst' }, c)) &&
    !['mleng', 'genai', 'sql', 'dbgen'].some(c => roleMatches({ roleKey: 'Data Analyst' }, c))
);
check(
  'AI and ML family: Data Scientist (two families) matches Machine Learning Engineer and Data Analyst',
  ['mleng', 'genai', 'cv', 'nlp', 'aiml', 'analyst'].every(c => roleMatches({ roleKey: 'Data Scientist' }, c)) &&
    roleMatches({ roleKey: 'NLP' }, 'genai') &&
    !roleMatches({ roleKey: 'Generative AI' }, 'analyst')
);
check(
  'Database family: Database Developer matches Database, DBA, ETL and NoSQL, and stays in Software',
  ['dbgen', 'dba', 'etl', 'nosql', 'sql'].every(c => roleMatches({ roleKey: 'Database Developer' }, c)) &&
    roleMatches({ roleKey: 'Database Developer' }, 'java') &&
    !roleMatches({ roleKey: 'Database Administrator' }, 'java') &&
    !roleMatches({ roleKey: 'ETL Developer' }, 'analyst')
);
check(
  'Data/AI (Data and Analytics, AI and ML): matches data and AI roles, not Software or Cloud',
  ['data', 'analyst', 'datasci', 'mleng', 'genai'].every(c => roleMatches({ roleKey: 'Data/AI' }, c)) &&
    !['software', 'web', 'sql', 'cloud'].some(c => roleMatches({ roleKey: 'Data/AI' }, c)) &&
    !roleMatches(SW, 'data')
);
check(
  'Graphic Designer has no family: only Graphic Design matches',
  roleMatches({ roleKey: 'Graphic Designer' }, 'graphic') && !roleMatches({ roleKey: 'Graphic Designer' }, 'marketing') && !roleMatches(SW, 'graphic')
);
check('Software Engineer does not match IT Support or Cyber Security', !roleMatches(SW, 'it') && !roleMatches(SW, 'cyber'));
check('Fresh Graduate is general: always matches', isGeneric('fresh') && roleMatches({}, 'fresh'));
{
  const g = introAnswer(answerContext(SW, 'graphic'), true);
  check(
    'Graphic Design intro: its own role and skills, no software',
    /a Graphic Designer role/.test(g) && /Photoshop/.test(g) && !/JavaScript|Software/.test(g),
    g
  );
  const d = introAnswer(answerContext({ roleKey: 'Data/AI', role: 'Data/AI', skillTags: ['Python', 'SQL'] }, 'data'), true);
  check('Data and Analytics intro: profile skills when the role matches', /Data and AI Engineer role/.test(d) && /Python and SQL/.test(d), d);
  check('IT Support intro uses "an"', /an IT Support Specialist role/.test(introAnswer(answerContext(SW, 'it'))));
}
check('different family does not match', !roleMatches(SW, 'network') && !roleMatches(SW, 'customer') && !roleMatches(SW, 'accounting'));
check('case-insensitive', roleMatches({ roleKey: 'customer service' }, 'customer'));
check(
  'generic categories always match',
  ['situational', 'behavioral', 'fresh'].every(c => isGeneric(c) && roleMatches({}, c) && roleMatches(SW, c))
);
check('empty profile role does not match a role category', !roleMatches({}, 'customer'));

// ---- Session values (typed in the sheet) for a mismatched category only
{
  const s = { skills: ['Patience', 'Listening'], project: 'a summer job at a call centre' };
  const a = introAnswer(answerContext(SW, 'customer', s), false);
  check('session skills and project are used', /Patience and Listening/.test(a) && /call centre/.test(a), a);
  const m = introAnswer(answerContext(SW, 'software', s), false);
  check('matching category ignores session values', /JavaScript/.test(m) && !/Patience/.test(m), m);
}

// ---- Exact text
{
  const short = introAnswer(answerContext(SW, 'software'), false);
  check(
    'short intro, Software Developer',
    short ===
      'Good morning, and thank you for this opportunity. My name is Sara Ahmed, and I am from Lahore. I am currently pursuing a BS in Computer Science. My key skills include JavaScript, React, Node.js, Python and SQL. I recently worked on a school management website. I am now looking for a Software Developer role where I can use these skills, grow and add value to the team. Thank you.',
    short
  );
  const long = introAnswer(answerContext(SW, 'software'), true);
  check(
    'long intro, Software Developer',
    long ===
      'Good morning, and thank you for this opportunity. My name is Sara Ahmed, and I am from Lahore. I am currently pursuing a BS in Computer Science, and I am applying for the Software Developer role. My key skills include JavaScript, React, Node.js, Python and SQL. I built a school management website, which taught me how to solve real problems and learn from feedback. I enjoy learning new tools quickly and working well with others. I am now looking for a Software Developer role where I can use these skills, grow and add value to the team. Thank you.',
    long
  );
  const hr = introAnswer(answerContext(SW, 'situational'), false);
  check('Situational (generic) keeps the profile role and skills', /Software Engineer role/.test(hr) && /JavaScript/.test(hr), hr);
  const gen = introAnswer(answerContext(P.general, 'situational'), true);
  check('generic with role "Fresher/General": no role sentence', !/role/.test(gen) && /Communication and Teamwork/.test(gen), gen);
  const oth = introAnswer(answerContext(P.other, 'behavioral'), false);
  check('generic with role "Other": no role sentence', !/role/.test(oth), oth);
  const cus = introAnswer(answerContext(P.custom, 'situational'), false);
  check('generic with a custom role uses it', /a Graphic Designer role/.test(cus), cus);
  check('short and long chosen by the question', sampleAnswer('Introduce yourself in 2 minutes.', '', answerContext(SW, 'software')) === long);
  check('"Tell me about yourself." gets the short answer', sampleAnswer('Tell me about yourself.', '', answerContext(SW, 'software')) === short);
  check('a / an', /an Accountant role/.test(introAnswer(answerContext(SW, 'accounting'))) && /an HR Officer role/.test(introAnswer(answerContext(SW, 'hr'))));
  check(
    'degree already done: "I hold"',
    /I hold a Master of Business Administration \(MBA\)/.test(introAnswer(answerContext({ ...SW, edu: 'MBA' }, 'software')))
  );
}

// ---- Template filler: no "[skills]", missing parts left out
check(
  'unknown placeholder: sentence left out, never "[x]"',
  fillTemplate('Hello. I am {name}. I like {colour}. Bye.', { name: 'Ali' }) === 'Hello. I am Ali. Bye.'
);
check('empty name: its sentence left out', fillTemplate('Good morning. I am {name}. I work hard.', {}) === 'Good morning. I work hard.');
check('a / an follows the filled role', fillTemplate('I want to be a {role}.', { role: 'Accountant' }) === 'I want to be an Accountant.');
check(
  'no role in a general category: neutral words',
  fillTemplate('I am a skilled {role}. It fits the {role} position.', {}) === 'I am a skilled professional. It fits this position.'
);
check('no skills: neutral words', fillTemplate('I will deepen {skills}.', {}) === 'I will deepen relevant skills.');
check('neutral defaults still used', fillTemplate('My strength is {strength}.', {}) === 'My strength is solving problems and learning new tools quickly.');
check('skills joined as words', fillTemplate('I use {skills}.', { skills: ['A', 'B', 'C'] }) === 'I use A, B and C.');
check('no university: "at {uni}" removed', fillTemplate('I study {degree} at {uni}.', { degree: 'BS' }) === 'I study BS.');
// Missing values (empty, null, undefined) never print as "null" or "undefined".
{
  const ALL =
    'I am {name} from {city}. I study {degree} at {uni}. I want a {role} job. I use {skills}. I built {project}. I hold {certs}. My strength is {strength}. My weakness is {weakness}. I am proud of {achievement}. Thank you.';
  const KEYS = ['name', 'city', 'degree', 'uni', 'role', 'skills', 'project', 'certs', 'strength', 'weakness', 'achievement', 'studying'];
  let bad = '';
  for (const v of ['', null, undefined]) {
    const ctx = Object.fromEntries(KEYS.map(k => [k, v]));
    const prof = { name: v, city: v, edu: v, role: v, roleKey: v, skillTags: v, skills: v, project: v, setup: 1 };
    const outs = [
      fillTemplate(ALL, ctx),
      fillTemplate(ALL, {}),
      fillTemplate(ALL, undefined),
      fillTemplate(ALL, null),
      introAnswer(ctx, true),
      introAnswer(ctx, false),
      introAnswer(undefined, true),
      ...['software', 'situational', 'nosql', 'datasci'].flatMap(c => {
        const x = answerContext(prof, c);
        return [introAnswer(x, true), fillTemplate(ALL, x), ...Object.values(x).filter(y => typeof y === 'string')];
      })
    ];
    outs.forEach(t => {
      if (MISSING_WORD.test(t) || LEFT.test(t)) bad ||= `${String(v)}: ${t}`;
      MISSING_WORD.lastIndex = 0;
    });
  }
  check('missing values (empty, null, undefined): no "undefined", "null", braces, brackets or double spaces', !bad, bad);
}
check(
  'authored "null" and "undefined" stay as written',
  fillTemplate('A NULL value means unknown; in JavaScript, null and undefined differ. I am {name}.', {}) ===
    'A NULL value means unknown; in JavaScript, null and undefined differ.'
);
// ---- a / an by sound for every role label and every profile role in the app (written by hand,
// so a new label must be added here).
{
  const AN = [
    'Electronics Engineer',
    'Accountant',
    'HR Officer',
    'Operations Manager',
    'IT Support Specialist',
    'Application Security Engineer',
    'Incident Response Analyst',
    'AI Engineer',
    'NLP Engineer',
    'ETL Developer',
    'IT Support',
    'Electronics and Embedded',
    'HR',
    'Application Security',
    'Incident Response',
    'AI and ML',
    'NLP',
    'Other'
  ];
  const A = [
    'Software Developer',
    'Marketing Executive',
    'Customer Service Representative',
    'Teacher',
    'Cloud and DevOps Engineer',
    'Sales Associate',
    'Waiter',
    'Database Developer',
    'C/C++ Developer',
    'Java Developer',
    'Network Engineer',
    'Civil Engineer',
    'Mechanical Engineer',
    'Finance Officer',
    'Cyber Security Analyst',
    'Web Developer',
    'Data and AI Engineer',
    'Graphic Designer',
    'Cloud Administrator',
    'Cloud Solutions Architect',
    'Cloud Security Engineer',
    'Cloud Data Engineer',
    'DevOps Engineer',
    'Platform Engineer',
    'SOC Analyst',
    'Penetration Tester',
    'GRC Analyst',
    'Data Analyst',
    'BI Developer',
    'Data Scientist',
    'Data Engineer',
    'Machine Learning Engineer',
    'Generative AI Engineer',
    'Computer Vision Engineer',
    'Database Engineer',
    'Database Administrator',
    'NoSQL Developer',
    'Software Engineer',
    'Cloud and DevOps',
    'Cyber Security',
    'Data and AI',
    'Marketing and Sales',
    'Customer Service',
    'Teaching',
    'Fresher and General',
    'Waiter and Restaurant Staff',
    'C and C++ Developer',
    'Finance',
    'Cloud Architect',
    'Cloud Security',
    'Cloud Data and AI',
    'DevOps',
    'Generative AI',
    'Computer Vision'
  ];
  const inApp = [...new Set([...Object.values(ROLE).filter(Boolean), ...ROLES.map(roleText)])];
  const known = new Set([...AN, ...A]);
  check(
    'a / an: every role label and profile role has a written expectation',
    inApp.every(r => known.has(r)),
    inApp.filter(r => !known.has(r)).join(', ')
  );
  const wrong = [...AN.filter(r => article(r) !== 'an'), ...A.filter(r => article(r) !== 'a')];
  check(`a / an by sound for all ${known.size} role labels and profile roles`, !wrong.length, wrong.map(r => `${article(r)} ${r}`).join(', '));
  const MORE = {
    an: [
      'ML Engineer',
      'HR Generalist',
      'iOS Developer',
      'Android Developer',
      'MBA',
      'MSc',
      'MPhil',
      'SEO Specialist',
      'R Developer',
      'HTML Developer',
      'hour'
    ],
    a: [
      'UI/UX Designer',
      'Python Developer',
      'C# and .NET Developer',
      'WordPress Developer',
      'QA Engineer',
      'BS in Computer Science',
      'BSc',
      'PhD',
      'Unity Developer',
      'user',
      'one-year diploma',
      'MERN Stack Developer',
      'LAWYER'
    ]
  };
  const off = Object.entries(MORE).flatMap(([art, l]) => l.filter(r => article(r) !== art).map(r => `${article(r)} ${r}`));
  check('a / an: acronyms read letter by letter, "you" sound, silent h', !off.length, off.join(', '));
  check(
    'the intro uses it: "an NLP Engineer role", "a SOC Analyst role"',
    /an NLP Engineer role/.test(introAnswer(answerContext({}, 'nlp'))) && /a SOC Analyst role/.test(introAnswer(answerContext({}, 'soc')))
  );
}
// ---- a / an for every degree form the degree helper can give (typed -> written out, article),
// written by hand. Intermediate forms (ICS, FSc, FA, I.Com) are kept as typed, in any case.
{
  const DEG = [
    ['BS IT', 'a BS in Information Technology'],
    ['BSIT', 'a BS in Information Technology'],
    ['BSCS', 'a BS in Computer Science'],
    ['BS SE', 'a BS in Software Engineering'],
    ['BSAI', 'a BS in Artificial Intelligence'],
    ['BS DS', 'a BS in Data Science'],
    ['BBA', 'a Bachelor of Business Administration (BBA)'],
    ['MBA', 'a Master of Business Administration (MBA)'],
    ['B.Com', 'a Bachelor of Commerce'],
    ['M.Com', 'a Master of Commerce'],
    ['MCS', 'a Master of Computer Science (MCS)'],
    ['MIT', 'a Master of Information Technology (MIT)'],
    ['B.Ed', 'a Bachelor of Education (B.Ed)'],
    ['M.Ed', 'a Master of Education (M.Ed)'],
    ['ICS', 'an ICS'],
    ['ics', 'an ics'],
    ['FSc', 'an FSc'],
    ['Fsc', 'an Fsc'],
    ['fsc', 'an fsc'],
    ['F.Sc', 'an F.Sc'],
    ['FA', 'an FA'],
    ['fa', 'an fa'],
    ['I.Com', 'an I.Com'],
    ['i.com', 'an i.com'],
    ['MS', 'an MS'],
    ['MSc', 'an MSc'],
    ['MA', 'an MA'],
    ['M.Phil', 'an M.Phil'],
    ['m.phil', 'an m.phil'],
    ['MPhil', 'an MPhil'],
    ['PhD', 'a PhD'],
    ['Matric', 'a Matric'],
    ['Fine Arts', 'a Fine Arts']
  ];
  const bad = DEG.filter(([typed, want]) => {
    const d = expandDegree(typed).degree;
    return `${article(d)} ${d}` !== want;
  }).map(([typed, want]) => `${typed}: want "${want}", got "${article(expandDegree(typed).degree)} ${expandDegree(typed).degree}"`);
  check(`a / an for ${DEG.length} degree forms`, !bad.length, bad.join('; '));
  const SHORT = {
    an: ['FSc', 'FA', 'ICS', 'I.Com', 'MBA', 'M.Com', 'MCS', 'MIT', 'MS', 'MSc', 'MA', 'M.Phil'],
    a: ['BS in Computer Science', 'BBA', 'B.Com', 'PhD']
  };
  const off = Object.entries(SHORT).flatMap(([art, l]) => l.filter(x => article(x) !== art).map(x => `${article(x)} ${x}`));
  check('a / an for degree short forms as written', !off.length, off.join(', '));
  check(
    'the intro uses it: "I hold an FSc", "pursuing an FA"',
    /I hold an FSc/.test(introAnswer(answerContext({ edu: 'FSc' }, 'fresh'))) &&
      /pursuing an FA/.test(introAnswer(answerContext({ edu: 'FA student' }, 'fresh')))
  );
}
check('bullet lines keep their line breaks', fillTemplate('• One.\n\n• Two {name}.\n\n• Three.', {}) === '• One.\n\n• Three.');

// ---- Every category, every level, every question, every profile
for (const [pn, prof] of Object.entries(P)) {
  let bad = '';
  let leak = '';
  for (const c of Object.keys(CATS))
    for (const l of Object.keys(LEVELS))
      for (const [q, a] of questions(c, l)) {
        const t = sampleAnswer(q, a, answerContext(prof, c));
        if (!t || LEFT.test(t) || words(t) > words(a)) bad ||= `${c}/${l}: ${t}`;
        const typedHere = isGeneric(c) || roleMatches(prof, c);
        if (prof === SW && !typedHere && !SOFTWARE_CATS.includes(c) && /Software Engineer|Python/.test(t) && !defaultSkills(c).includes('Python'))
          leak ||= `${c}/${l}: ${t}`;
      }
  check(
    `profile "${pn}": all ${Object.keys(CATS).length} categories, no leftover braces, brackets or double spaces, no "undefined" or "null" added by the filler`,
    !bad,
    bad
  );
  if (prof === SW) check('Software profile: no "Software Engineer" or "Python" in non-software role categories', !leak, leak);
}
check(
  'empty profile: intro still reads well',
  introAnswer(answerContext({}, 'customer'), true) ===
    'Good morning, and thank you for this opportunity. I am applying for the Customer Service Representative role. My key skills include ' +
      `${defaultSkills('customer').slice(0, -1).join(', ')} and ${defaultSkills('customer').at(-1)}. I enjoy learning new tools quickly and working well with others. I am now looking for a Customer Service Representative role where I can use these skills, grow and add value to the team. Thank you.`,
  introAnswer(answerContext({}, 'customer'), true)
);
check('40 character name is kept whole', introAnswer(answerContext(P.longName, 'software')).includes(P.longName.name));
check('no skills: "where I can learn"', /where I can learn, grow/.test(introAnswer(answerContext(P.noSkills, 'software'))));
check('no city, no project: those parts left out', !/I am from|recently worked/.test(introAnswer(answerContext(P.noProjectNoCity, 'software'))));

// ---- Sheet validation
{
  const r = parseSessionInput(' Sales , <b>Excel</b>, , Team{work}, Negotiation, Cash handling, Extra one, Seventh ', '  <script>x</script>A shop job!!  ');
  check('trim, empty items removed, max 5 skills', r.skills.length === 5 && r.skills[0] === 'Sales', r.skills.join('|'));
  check(
    'HTML and special characters removed',
    r.skills[1] === 'Excel' && r.skills[2] === 'Team work' && !/[<>{}!]/.test(r.project),
    `${r.skills.join('|')} / ${r.project}`
  );
  check('30 characters per skill', parseSessionInput('x'.repeat(50)).skills[0].length === 30);
  check('80 characters for the project', parseSessionInput('A', 'y'.repeat(120)).project.length === 80);
  check('no skills: error message', parseSessionInput('  ,  ', 'a project').error === 'Add at least one skill or tap Skip');
  check('C++ and C# survive', parseSessionInput('C++, C#').skills.join() === 'C++,C#');
  check('duplicates removed', parseSessionInput('Excel, excel, Excel').skills.length === 1);
}

console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`${out.length - fails}/${out.length} passed`);
if (fails) process.exit(1);
