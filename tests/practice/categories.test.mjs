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

check(`50 interview types (${Object.keys(CATS).length})`, Object.keys(CATS).length === 50 && !CATS.hrq);
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
  'families: Software, Cloud and DevOps, Security, Infra, Data and Analytics, AI and ML, Database; Graphic Designer in none',
  Object.keys(FAMILIES).join() === 'Software,Cloud and DevOps,Security,Infra,Data and Analytics,AI and ML,Database' &&
    FAMILIES.Software.join() === 'Software Engineer,Web Developer,Java Developer,C/C++ Developer,Database Developer' &&
    FAMILIES['Cloud and DevOps'].join() === 'Cloud/DevOps,Cloud Administrator,Cloud Architect,DevOps,Platform Engineer' &&
    FAMILIES.Security.join() === 'Cyber Security,SOC Analyst,Penetration Tester,Application Security,GRC Analyst,Incident Response,Cloud Security' &&
    FAMILIES.Infra.join() === 'IT Support,Network Engineer,Cloud/DevOps' &&
    FAMILIES['Data and Analytics'].join() === 'Data/AI,Data Analyst,BI Developer,Data Scientist,Data Engineer,Cloud Data/AI' &&
    FAMILIES['AI and ML'].join() === 'Data/AI,AI/ML,Machine Learning Engineer,Generative AI,Computer Vision,NLP,Data Scientist' &&
    FAMILIES.Database.join() === 'Database Developer,Database Engineer,Database Administrator,ETL Developer,NoSQL Developer' &&
    !Object.values(FAMILIES).flat().includes('Graphic Designer')
);
check(
  'every family role is a setup role',
  Object.values(FAMILIES)
    .flat()
    .every(r => ROLES.includes(r))
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
// PR C: Data, AI and Database roles: id, label, setup role, role in answers.
const PRC_SPEC = {
  analyst: ['Data Analyst', 'Data Analyst', 'Data Analyst'],
  bidev: ['BI Developer', 'BI Developer', 'BI Developer'],
  datasci: ['Data Scientist', 'Data Scientist', 'Data Scientist'],
  dataeng: ['Data Engineer', 'Data Engineer', 'Data Engineer'],
  aiml: ['AI and Machine Learning', 'AI/ML', 'AI Engineer'],
  mleng: ['Machine Learning Engineer', 'Machine Learning Engineer', 'Machine Learning Engineer'],
  genai: ['Generative AI Engineer', 'Generative AI', 'Generative AI Engineer'],
  cv: ['Computer Vision Engineer', 'Computer Vision', 'Computer Vision Engineer'],
  nlp: ['NLP Engineer', 'NLP', 'NLP Engineer'],
  dbgen: ['Database', 'Database Engineer', 'Database Engineer'],
  dba: ['Database Administrator', 'Database Administrator', 'Database Administrator'],
  etl: ['Data Warehouse / ETL', 'ETL Developer', 'ETL Developer'],
  nosql: ['NoSQL / MongoDB', 'NoSQL Developer', 'NoSQL Developer']
};
const PRC = Object.keys(PRC_SPEC);
for (const [c, [label, setupRole, role]] of Object.entries(PRC_SPEC))
  check(`${c}: "${label}", setup role ${setupRole}, role in answers ${role}`, CATS[c] === label && catToRole(c) === setupRole && ROLE[c] === role);
const PRC_SKILLS = {
  'Data Analyst': 'Excel,SQL,Power BI,Tableau,Python,Pandas,Data cleaning,Data visualization,Statistics,Reporting',
  'BI Developer': 'Power BI,DAX,SQL,Tableau,Data modeling,ETL,Dashboards,Excel,Data warehouse,Reporting',
  'Data Scientist': 'Python,Statistics,Machine learning,Pandas,NumPy,scikit-learn,SQL,Data visualization,Feature engineering,Model evaluation',
  'Data Engineer': 'Python,SQL,ETL,Airflow,Spark,Data pipelines,Data warehouse,Kafka,Cloud storage,Data modeling',
  'AI/ML': 'Python,Machine learning,Deep learning,TensorFlow,PyTorch,Statistics,Data preprocessing,Model evaluation,Git,Math',
  'Machine Learning Engineer': 'Python,scikit-learn,PyTorch,TensorFlow,Model deployment,MLOps,Feature engineering,Docker,APIs,Model monitoring',
  'Generative AI': 'LLMs,Prompt engineering,RAG,Vector databases,Python,APIs,Fine-tuning,Evaluation,Responsible AI',
  'Computer Vision': 'Python,OpenCV,PyTorch,CNN,Image processing,Object detection,Segmentation,Data augmentation,Annotation',
  NLP: 'Python,spaCy,Transformers,Tokenization,Text classification,Embeddings,Sentiment analysis,Named entity recognition,Evaluation',
  'Database Engineer': 'SQL,Normalization,Indexing,Transactions,Joins,Backup and recovery,Query optimization,Data modeling,ER diagrams,Constraints',
  'Database Administrator': 'Backup and recovery,Performance tuning,Replication,High availability,Security,Monitoring,Indexing,Patching,User management,SQL',
  'ETL Developer': 'ETL,SQL,Data warehouse,Star schema,dbt,Airflow,Data quality,Incremental load,Scheduling',
  'NoSQL Developer': 'MongoDB,Document model,Indexing,Aggregation,Replication,Sharding,Redis,Schema design'
};
check(
  'PR C roles in the profile role picker with their suggested skills',
  Object.entries(PRC_SKILLS).every(([r, s]) => ROLES.includes(r) && ROLE_SKILLS[r].join() === s)
);
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
  'ir',
  ...PRC
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

// PR B and PR C roles: exactly the role structure (Fresher 10, Junior 19, Senior 19).
for (const c of ['cloudadmin', 'cloudarch', 'cloudsec', 'clouddata', 'devops', 'platform', 'soc', 'pentest', 'appsec', 'grc', 'ir', ...PRC])
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
