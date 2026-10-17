// Setup screen helpers (src/services/setup.js). Run: node tests/practice/setup.test.mjs
import { nameError, cleanTags, buildProfile, setupDone, joinList, autoWords, catToRole, ROLE_SKILLS, ROLES } from '../../src/services/setup.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);

check('name: valid', nameError('Mubashar Akram') === '');
check('name: required', nameError('  ') !== '');
check('name: too short', nameError('A') !== '');
check('name: too long', nameError('A'.repeat(41)) !== '');
check('name: letters and spaces only', nameError('Mubashar_1') !== '' && nameError('Ali123') !== '');
check('name: non-English letters are fine', nameError('مبشر اکرم') === '');
check('tags: trimmed, no duplicates, limited', cleanTags([' AWS', 'aws', 'Docker', '', 'Linux'], 2).join() === 'AWS,Docker');
const p = buildProfile({
  name: ' Mubashar  Akram ',
  role: 'Cloud/DevOps',
  edu: 'BS IT student',
  city: 'Pakpattan',
  exp: 'mid',
  skills: ['AWS', 'DevOps', 'Linux'],
  words: ['Mubashar', 'Akram']
});
check('profile: name tidy, skills joined for answers', p.name === 'Mubashar Akram' && p.skills === 'AWS, DevOps and Linux' && p.setup === 1, JSON.stringify(p));
check('profile: Other role uses the typed role', buildProfile({ name: 'Sara', role: 'Other', roleOther: 'Nurse' }).role === 'Nurse');
check('setup done only after saving a valid name', setupDone(p) && !setupDone({ name: 'Sara' }) && !setupDone(null));
check(
  'My words built automatically: name, city, skills, role, education',
  p.words.join() === 'Mubashar,Akram,Pakpattan,AWS,DevOps,Linux,Cloud,BS,IT,student',
  p.words.join()
);
check(
  'autoWords drops 1-letter and filler words, no duplicates',
  autoWords({ name: 'A Ali', city: 'Lahore', edu: 'BS of IT', role: 'Data/AI', skillTags: ['ai'] }).join() === 'Ali,Lahore,ai,Data,BS,IT'
);
check(
  'category picks the role',
  catToRole('cloud') === 'Cloud/DevOps' && catToRole('software') === 'Software Engineer' && catToRole('fresh') === 'Fresher/General' && catToRole('nope') === ''
);
check(
  'every role has skill suggestions',
  ROLES.filter(r => r !== 'Other').every(r => (ROLE_SKILLS[r] || []).length >= 6)
);
check('Cloud/DevOps skills are cloud skills', ROLE_SKILLS['Cloud/DevOps'].includes('AWS') && ROLE_SKILLS['Cloud/DevOps'].includes('Kubernetes'));
check('joinList', joinList(['A']) === 'A' && joinList(['A', 'B', 'C']) === 'A, B and C');

console.log(out.join('\n'));
console.log(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
