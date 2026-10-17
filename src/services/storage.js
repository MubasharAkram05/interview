import localforage from 'localforage';

// On-device storage. Every key is kept in two places:
//  - localStorage: written synchronously, so it is always the NEWEST copy;
//  - localforage (IndexedDB): written in the background, survives localStorage being cleared.
// Reads come from an in-memory cache filled at start-up. Nothing here ever throws to the app.

localforage.config({
  name: 'InterviewSimulator',
  storeName: 'app_data',
  description: 'Interview Simulator offline persistence store'
});

const memoryStore = new Map();

// Every key the app stores (start-up loads exactly these).
export const KEYS = [
  'is_profiles',
  'is_active',
  'is_hist',
  'is_fav',
  'is_edits',
  'is_qedits',
  'is_custom',
  'is_hidden',
  'is_theme',
  'is_scr',
  'is_pf',
  'is_pclv',
  'is_voice_accent',
  'is_voice_mem',
  'is_pbest',
  'is_qotd',
  'is_qstreak'
];

// localStorage marker for "deleted" (so an older IndexedDB copy can never bring a value back).
const REMOVED = 'null';

function parse(raw) {
  try {
    return { ok: true, v: JSON.parse(raw) };
  } catch {
    return { ok: false };
  }
}

/**
 * Load every key into memory. localStorage wins (it is written first, synchronously); IndexedDB is
 * only used when localStorage has no usable copy, and is then brought up to date. Corrupt JSON is
 * dropped (the app uses its defaults) instead of being kept as a raw string.
 */
export async function initStorage() {
  for (const key of KEYS) {
    try {
      let raw = null;
      try {
        raw = localStorage.getItem(key);
      } catch {}
      const local = raw === null ? { ok: false } : parse(raw);
      if (local.ok) {
        if (local.v === null) {
          memoryStore.delete(key);
          await localforage.removeItem(key).catch(() => {});
        } else {
          memoryStore.set(key, local.v);
          await localforage.setItem(key, local.v).catch(() => {});
        }
        continue;
      }
      const dbVal = await localforage.getItem(key).catch(() => null);
      if (dbVal !== null && dbVal !== undefined) {
        memoryStore.set(key, dbVal);
        try {
          localStorage.setItem(key, JSON.stringify(dbVal));
        } catch {}
      } else if (raw !== null) {
        // Corrupt localStorage copy and nothing in IndexedDB: forget it.
        try {
          localStorage.removeItem(key);
        } catch {}
      }
    } catch {
      // Skip a broken key; the app falls back to defaults.
    }
  }
}

/** Does the stored value have the same kind as the default (array, plain object, string...)? */
function sameShape(v, d) {
  if (d === null || d === undefined) return true;
  if (Array.isArray(d)) return Array.isArray(v);
  if (typeof d === 'object') return !!v && typeof v === 'object' && !Array.isArray(v);
  return typeof v === typeof d;
}

/**
 * Synchronous read. Returns defaultValue when the key is missing, unreadable, or holds a value of
 * a different kind than the default (for example a string where a list is expected), so one bad
 * value can never crash a screen.
 */
export function getItem(key, defaultValue = null) {
  let v;
  if (memoryStore.has(key)) v = memoryStore.get(key);
  else {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        const p = parse(raw);
        if (p.ok && p.v !== null) {
          v = p.v;
          memoryStore.set(key, v);
        }
      }
    } catch {}
  }
  if (v === undefined || v === null) return defaultValue;
  return sameShape(v, defaultValue) ? v : defaultValue;
}

/** Write to memory, localStorage (now) and IndexedDB (background). */
export function setItem(key, value) {
  memoryStore.set(key, value);
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota full: drop the old localStorage copy so the newer IndexedDB copy wins next start.
    try {
      localStorage.removeItem(key);
    } catch {}
  }
  localforage.setItem(key, value).catch(() => {});
}

/** Delete a key everywhere (localStorage keeps a "deleted" marker until the next start). */
export function removeItem(key) {
  memoryStore.delete(key);
  try {
    localStorage.setItem(key, REMOVED);
  } catch {}
  localforage.removeItem(key).catch(() => {});
}
