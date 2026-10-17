// vocab.js: word helpers used by Mock matching and voice hints. Run: node tests/vocab/vocab.test.mjs
import { norm, similarity, soundsAlike, rareWords, isCommon } from '../../src/services/vocab.js';

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);

check('norm: lowercase, no punctuation, apostrophes dropped', norm('Node.js,') === 'nodejs' && norm("I'm") === 'im' && norm('') === '');
check('similarity 0..1', similarity('abc', 'abc') === 1 && similarity('abc', 'xyz') === 0 && similarity('', 'a') === 0);
check('similarity: close spellings score high', similarity('mubashir', 'mubashar') > 0.8);
check('soundsAlike: same sound code', soundsAlike('mubashir', 'mubashar') && !soundsAlike('python', 'pakistan'));
check('soundsAlike: short words never match', !soundsAlike('it', 'at'));
check(
  'rareWords keeps rare words only (no common words, no places, no numbers)',
  rareWords('I deployed Kubernetes on Pakistan servers in 2024').join() === 'deployed,Kubernetes',
  rareWords('I deployed Kubernetes on Pakistan servers in 2024').join()
);
check('rareWords: at most max, no duplicates', rareWords('Kubernetes Kubernetes Terraform Ansible', 2).join() === 'Kubernetes,Terraform');
check('isCommon: everyday words yes, rare words no', isCommon('the') && isCommon('teacher') && !isCommon('Kubernetes'));

console.info(out.join('\n'));
console.info(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
