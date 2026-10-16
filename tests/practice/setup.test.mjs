// Setup screen helpers (src/services/setup.js). Run: node tests/practice/setup.test.mjs
import { nameError, cleanTags, defaultWords, updateWords, buildProfile, setupDone, roleToCat, expToLevel, joinList } from '../../src/services/setup.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);

check('name: valid', nameError('Mubashar Akram') === '');
check('name: required', nameError('  ') !== '');
check('name: too short', nameError('A') !== '');
check('name: too long', nameError('A'.repeat(41)) !== '');
check('name: letters and spaces only', nameError('Mubashar_1') !== '' && nameError('Ali123') !== '');
check('name: non-English letters are fine', nameError('مبشر اکرم') === '');
check('tags: trimmed, no duplicates, limited', cleanTags([' AWS', 'aws', 'Docker', '', 'Linux'], 2).join() === 'AWS,Docker');
check('My words prefilled with name parts and city', defaultWords('Mubashar Akram', 'Pakpattan').join() === 'Mubashar,Akram,Pakpattan');
check(
  'name change swaps the old name words',
  updateWords(['Mubashar', 'Akram', 'Pakpattan', 'Kubernetes'], { name: 'Mubashar Akram', city: 'Pakpattan' }, { name: 'Sara Ali', city: 'Lahore' }).join() === 'Sara,Ali,Lahore,Kubernetes'
);
const p = buildProfile({ name: ' Mubashar  Akram ', role: 'Cloud/DevOps', edu: 'BS IT student', city: 'Pakpattan', exp: 'mid', skills: ['AWS', 'DevOps', 'Linux'], words: ['Mubashar', 'Akram'] });
check('profile: name tidy, skills joined for answers', p.name === 'Mubashar Akram' && p.skills === 'AWS, DevOps and Linux' && p.setup === 1, JSON.stringify(p));
check('profile: Other role uses the typed role', buildProfile({ name: 'Sara', role: 'Other', roleOther: 'Nurse' }).role === 'Nurse');
check('setup done only after saving a valid name', setupDone(p) && !setupDone({ name: 'Sara' }) && !setupDone(null));
check('role and experience pick the default interview', roleToCat('Cloud/DevOps') === 'cloud' && expToLevel('senior') === 'senior' && roleToCat('???') === 'fresh');
check('joinList', joinList(['A']) === 'A' && joinList(['A', 'B', 'C']) === 'A, B and C');

console.log(out.join('\n'));
console.log(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
