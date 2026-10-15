// Question of the day: one random question per calendar day (phone's local date).
// The pick is saved, so the same question stays all day even if the level tab or the
// screen changes. A new day gives a new random pick, never the same text as yesterday.

export function dayKey(d = new Date()) {
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// FNV-1a hash of the day key -> seed, then mulberry32 -> numbers in [0, 1).
function rng(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * saved: last stored pick { d, c, lv, q } or null
 * cats:  category keys
 * lv:    level to use for a new pick
 * list:  (c, lv) => [{ q }]
 * Returns { pick: { d, c, lv, q }, changed } or null when there are no questions.
 */
export function questionOfDay({ saved, cats, lv, list, today = dayKey() }) {
  if (saved && saved.d === today && saved.q && cats.includes(saved.c)) {
    return { pick: saved, changed: false };
  }
  const r = rng(today);
  const order = [...cats];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  for (const c of order) {
    const qs = list(c, lv).map(x => x.q).filter(q => q && q !== saved?.q);
    if (qs.length) {
      return { pick: { d: today, c, lv, q: qs[Math.floor(r() * qs.length)] }, changed: true };
    }
  }
  return null;
}
