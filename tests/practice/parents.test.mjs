// Parent groups (src/data/parents.js), display labels, level availability and the "no new network
// calls, no new storage keys" rule. Run: npm run test:practice
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { PARENTS, FAMILIES, childrenOf, visibleParents, parentOf, displayLabel, searchCats } from '../../src/data/parents.js';
import { CATS, ROLE, LEVELS, CAT_LEVELS, levelsOf, fitLevel, usedLevels, catId, CAT_ALIAS } from '../../src/data/questions.js';
import { FAMILIES as RESOLVER_FAMILIES, roleMatches } from '../../src/services/answer-context.js';
import { ROLES, catToRole } from '../../src/services/setup.js';
import { KEYS } from '../../src/services/storage.js';
import { questionOfDay } from '../../src/services/qotd.js';

const out = [];
const check = (name, ok, got) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || got === undefined ? '' : `\n      got: ${got}`}`);
const ids = list => list.map(p => p.id);

// ---- Config integrity
const ORDER = [
  'General Interview',
  'Software Development',
  'Web Development',
  'Mobile App Development',
  'Game Development',
  'Database',
  'Data and Analytics',
  'AI and Machine Learning',
  'Cloud',
  'DevOps',
  'Cyber Security',
  'IT Support and Networking',
  'Testing and QA',
  'Business and Product',
  'Graphic Design',
  'UI/UX Design',
  'Video and Animation',
  'Content and Writing',
  'Human Resources',
  'Management and Operations',
  'Finance and Banking',
  'Marketing',
  'Sales and Retail',
  'Customer Service',
  'Electronics and Embedded',
  'Civil and Construction',
  'Mechanical and Industrial',
  'Electrical and Power',
  'Hospitality',
  'Education',
  'Healthcare',
  'Government and Public Service',
  'Freelancing and Business'
];
const sorted = [...PARENTS].sort((a, b) => a.order - b.order);
check('33 parents in the agreed order', PARENTS.length === 33 && sorted.map(p => p.label).join('|') === ORDER.join('|'));
check('parent ids unique', new Set(ids(PARENTS)).size === PARENTS.length);
check('order values unique', new Set(PARENTS.map(p => p.order)).size === PARENTS.length);
const kids = PARENTS.flatMap(p => p.children.map(k => (typeof k === 'string' ? k : k.id)));
check(
  'no unknown child ids',
  kids.every(c => CATS[c]),
  kids.filter(c => !CATS[c]).join()
);
check('no child listed twice', new Set(kids).size === kids.length);
check(
  `every type in exactly one parent (${Object.keys(CATS).length} types)`,
  Object.keys(CATS).every(c => kids.filter(k => k === c).length === 1)
);
check('26 types, HR Questions removed', Object.keys(CATS).length === 26 && !CATS.hrq);
const vis = visibleParents();
check('parents with no children are hidden', vis.every(p => childrenOf(p).length) && PARENTS.filter(p => !childrenOf(p).length).every(p => !vis.includes(p)));
check('General Interview is first', vis[0].id === 'general');
check(
  'mapping as agreed',
  JSON.stringify(Object.fromEntries(vis.map(p => [p.label, childrenOf(p).map(k => k.id)]))) ===
    JSON.stringify({
      'General Interview': ['situational', 'behavioral', 'fresh'],
      'Software Development': ['software', 'java', 'cpp'],
      'Web Development': ['web'],
      Database: ['sql'],
      'Data and Analytics': ['data'],
      Cloud: ['cloud'],
      'Cyber Security': ['cyber'],
      'IT Support and Networking': ['it', 'network'],
      'Graphic Design': ['graphic'],
      'Human Resources': ['hr'],
      'Management and Operations': ['ops'],
      'Finance and Banking': ['accounting', 'finance'],
      Marketing: ['marketing'],
      'Sales and Retail': ['sales'],
      'Customer Service': ['customer'],
      'Electronics and Embedded': ['micro'],
      'Civil and Construction': ['civil'],
      'Mechanical and Industrial': ['mech'],
      Hospitality: ['waiter'],
      Education: ['teaching']
    })
);
// White icon on every parent colour: at least 3:1; colours distinct.
const lum = h => {
  const v = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
check(
  'every parent: own colour, white icon contrast at least 3:1, stroke icon',
  new Set(PARENTS.map(p => p.color.toLowerCase())).size === PARENTS.length &&
    PARENTS.every(p => /^#[0-9a-f]{6}$/i.test(p.color) && 1.05 / (lum(p.color) + 0.05) >= 3 && /^M[\d\s.,MLHVAZCSQTmlhvazcsqt-]+$/.test(p.icon))
);

// ---- Display label vs role label
check(
  'display labels renamed, ids kept',
  CATS.sql === 'SQL Developer' &&
    CATS.data === 'Data and Analytics' &&
    CATS.cloud === 'Cloud Engineer' &&
    CATS.hr === 'HR Generalist' &&
    CATS.web === 'Web Developer'
);
check(
  'role labels in answers unchanged',
  ROLE.sql === 'Database Developer' &&
    ROLE.data === 'Data and AI Engineer' &&
    ROLE.cloud === 'Cloud and DevOps Engineer' &&
    ROLE.hr === 'HR Officer' &&
    ROLE.web === 'Web Developer'
);
{
  // A child may have its own label inside its parent (later: a first child named like the parent).
  const p = PARENTS.find(x => x.id === 'data');
  const keep = p.children;
  p.children = [{ id: 'data', label: 'Data and Analytics (test)' }];
  check('per-child display label', childrenOf(p)[0].label === 'Data and Analytics (test)' && displayLabel('data') === 'Data and Analytics (test)');
  p.children = keep;
  check('default display label is the type label', displayLabel('data') === 'Data and Analytics');
}
check(
  'single-child parent shows its child',
  childrenOf(PARENTS.find(p => p.id === 'cloud'))
    .map(k => k.label)
    .join() === 'Cloud Engineer'
);
check('parent of a type', parentOf('java').id === 'software' && parentOf('fresh').id === 'general');

// ---- Search
const found = q => searchCats(q).flatMap(g => g.children.map(k => k.id));
check('search by display label (SQL Developer)', found('sql developer').join() === 'sql');
check('search by role label (Data and AI Engineer)', found('ai engineer').includes('data'));
check('search by parent label (Finance and Banking)', found('banking').join() === 'accounting,finance');
check('search by keyword (call centre)', found('call centre').join() === 'customer');
check('search by skill keyword (AWS)', found('aws').includes('cloud'));
check('search result keeps its parent (for the subtitle)', searchCats('java')[0].parent.id === 'software');
check('no match: empty list', searchCats('zzzz qqqq').length === 0);
check('empty text: no search', searchCats('  ').length === 0);

// ---- Families (config) and roles
check('family map is the config object (no new families)', RESOLVER_FAMILIES === FAMILIES && Object.keys(FAMILIES).join() === 'Software,Infra');
check('Software Engineer still matches Java (family)', roleMatches({ roleKey: 'Software Engineer' }, 'java'));
check(
  'every setup role still in the role list',
  Object.keys(CATS).every(c => ROLES.includes(catToRole(c)))
);

// ---- Levels
check('all types have all levels today', Object.keys(CATS).every(c => levelsOf(c).length === 3) && usedLevels().join() === 'fresher,junior,senior');
CAT_LEVELS.teaching = ['fresher'];
check('a Fresher-only type lists only Fresher', levelsOf('teaching').join() === 'fresher');
check('asking a missing level gives the first level', fitLevel('teaching', 'senior') === 'fresher' && fitLevel('software', 'senior') === 'senior');
{
  // Question of the day skips a type with no questions at that level.
  const res = questionOfDay({
    saved: null,
    cats: ['teaching'],
    lv: 'senior',
    list: (c, l) => (levelsOf(c).includes(l) ? [{ q: 'x' }] : []),
    today: '2026-10-23'
  });
  check('Question of the day: no pick from a missing level', res === null);
}
delete CAT_LEVELS.teaching;
check('levels known', Object.keys(LEVELS).join() === 'fresher,junior,senior');

// ---- Alias
check('old id hrq opens Fresh Graduate', CAT_ALIAS.hrq === 'fresh' && catId('hrq') === 'fresh' && catId('cloud') === 'cloud');

// ---- No new network calls, no new storage keys
check(
  'storage keys unchanged (marker is_dv reused)',
  KEYS.join() ===
    'is_profiles,is_active,is_hist,is_fav,is_edits,is_qedits,is_custom,is_hidden,is_theme,is_scr,is_pf,is_pclv,is_voice_accent,is_voice_mem,is_pbest,is_qotd,is_qstreak,is_dv'
);
const files = d => readdirSync(d).flatMap(f => (statSync(join(d, f)).isDirectory() ? files(join(d, f)) : [join(d, f)]));
const src = files('src').filter(f => f.endsWith('.js') && !f.includes('/data/'));
const net = src.filter(f => /\bfetch\(|XMLHttpRequest|sendBeacon|new WebSocket|EventSource/.test(readFileSync(f, 'utf8')));
check('no network calls in the app code', !net.length, net.join());
const keys = new Set(src.flatMap(f => [...readFileSync(f, 'utf8').matchAll(/['"`](is_[a-z_]+)['"`]/g)].map(m => m[1])));
const known = new Set([...KEYS, 'is_voice_smart', 'is_voice_words', 'is_shuf']);
check(
  'no storage key outside the known list',
  [...keys].every(k => known.has(k)),
  [...keys].filter(k => !known.has(k)).join()
);

console.log(out.join('\n'));
const fails = out.filter(l => l.startsWith('FAIL')).length;
console.log(`${out.length - fails}/${out.length} passed`);
if (fails) process.exit(1);
