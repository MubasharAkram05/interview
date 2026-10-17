// Learned corrections (src/services/voice-prefs.js). Run: npm run test:prefs
const ls = new Map();
globalThis.localStorage = { getItem: k => (ls.has(k) ? ls.get(k) : null), setItem: (k, v) => ls.set(k, String(v)), removeItem: k => ls.delete(k) };
const { corrections, learnCorrection, applyCorrections, removeCorrection } = await import('../../src/services/voice-prefs.js');

const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '   ' + extra}`);

check('empty at first', corrections().length === 0 && applyCorrections('my name is Mubashir') === 'my name is Mubashir');
check(
  'learns a heard word -> answer word',
  learnCorrection('Mubashir', 'Mubashar,', 'is') && corrections()[0].heard === 'mubashir' && corrections()[0].fix === 'Mubashar'
);
check(
  'the phone mistake is written right next time',
  applyCorrections('my name is mubashir akram') === 'my name is Mubashar akram',
  applyCorrections('my name is mubashir akram')
);
check('other words and spacing stay as heard', applyCorrections('I  am  here') === 'I  am  here');
check('never learns a common word', !learnCorrection('the', 'a') && !learnCorrection('teacher', 'Pakpattan'));
check('never learns several heard words or the same word', !learnCorrection('pak pattan', 'Pakpattan') && !learnCorrection('Akram', 'akram'));
learnCorrection('Mubashir', 'Mubashar');
check('no duplicates (same heard word kept once)', corrections().filter(m => m.heard === 'mubashir').length === 1);
removeCorrection(0);
check('Profile delete removes it', corrections().length === 0 && applyCorrections('mubashir') === 'mubashir');

console.info(out.join('\n'));
console.info(`${out.filter(l => l.startsWith('PASS')).length}/${out.length} passed`);
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
