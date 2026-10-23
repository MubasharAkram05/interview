// Personalised answers (src/services/answer-context.js): the shared resolver, the intro answer, the
// {placeholder} filler and the "Personalize" sheet validation. Run: npm run test:practice
import { CATS, LEVELS, HEAD, TAIL, MID, LVH, LVT, LVX, LK, MYEX, LVEX } from '../../src/data/questions.js';
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
import { catToRole } from '../../src/services/setup.js';

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
const BAD = /[{}[\]]|undefined|null| {2}/;
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
  'Infra family: Cyber Security matches Cloud, IT Support and Networking (and back)',
  ['cloud', 'it', 'network', 'cyber'].every(c => roleMatches({ roleKey: 'Cyber Security' }, c)) && roleMatches({ roleKey: 'IT Support' }, 'cyber')
);
check(
  'Data/AI has no family: only Data and Analytics matches',
  roleMatches({ roleKey: 'Data/AI' }, 'data') &&
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
check('bullet lines keep their line breaks', fillTemplate('• One.\n\n• Two {name}.\n\n• Three.', {}) === '• One.\n\n• Three.');

// ---- Every category, every level, every question, every profile
for (const [pn, prof] of Object.entries(P)) {
  let bad = '';
  let leak = '';
  for (const c of Object.keys(CATS))
    for (const l of Object.keys(LEVELS))
      for (const [q, a] of questions(c, l)) {
        const t = sampleAnswer(q, a, answerContext(prof, c));
        if (!t || BAD.test(t)) bad ||= `${c}/${l}: ${t}`;
        const typedHere = isGeneric(c) || roleMatches(prof, c);
        if (prof === SW && !typedHere && !SOFTWARE_CATS.includes(c) && /Software Engineer|Python/.test(t) && !defaultSkills(c).includes('Python'))
          leak ||= `${c}/${l}: ${t}`;
      }
  check(`profile "${pn}": all ${Object.keys(CATS).length} categories, no braces, brackets, undefined, null or double spaces`, !bad, bad);
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
