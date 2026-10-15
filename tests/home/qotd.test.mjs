// Question of the day: same question all day, new random question each day.
import { questionOfDay, dayKey } from '../../src/services/qotd.js';

const out = [];
const check = (name, ok) => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
const cats = ['dev', 'mkt', 'cs', 'teach'];
const list = (c, lv) => Array.from({ length: 12 }, (_, i) => ({ q: `${c}-${lv}-${i}` }));

const day = d => questionOfDay({ saved: null, cats, lv: 'fresher', list, today: d });
const a = day('2026-10-15');
check('a question is picked', !!a?.pick.q && a.changed);
check('same day gives the same pick (no saved data)', day('2026-10-15').pick.q === a.pick.q);

const kept = questionOfDay({ saved: a.pick, cats, lv: 'senior', list, today: '2026-10-15' });
check('saved pick kept all day, even after level change', kept.pick.q === a.pick.q && !kept.changed);

const next = questionOfDay({ saved: a.pick, cats, lv: 'fresher', list, today: '2026-10-16' });
check('next day gives a new pick', next.changed && next.pick.d === '2026-10-16' && next.pick.q !== a.pick.q);

let prev = null;
const seen = new Set();
let repeats = 0;
for (let i = 0; i < 60; i++) {
  const d = dayKey(new Date(2026, 0, 1 + i));
  const r = questionOfDay({ saved: prev, cats, lv: 'fresher', list, today: d });
  if (prev && r.pick.q === prev.q) repeats++;
  seen.add(r.pick.q);
  prev = r.pick;
}
check('never the same question two days in a row (60 days)', repeats === 0);
check('picks are spread out (>= 30 different in 60 days)', seen.size >= 30);
check('picks use more than one category', new Set([...seen].map(q => q.split('-')[0])).size > 1);

check('day key uses local date', dayKey(new Date(2026, 9, 15, 23, 59)) === '2026-10-15' && dayKey(new Date(2026, 9, 16, 0, 1)) === '2026-10-16');
check('empty bank gives null', questionOfDay({ saved: null, cats, lv: 'fresher', list: () => [] }) === null);

console.log(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
