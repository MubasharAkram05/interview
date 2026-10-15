import localforage from 'localforage';

// Configure localforage instance for Interview Simulator
localforage.config({
  name: 'InterviewSimulator',
  storeName: 'app_data',
  description: 'Interview Simulator offline persistence store'
});

// In-memory cache for synchronous reads matching original app performance
const memoryStore = new Map();

/**
 * Initialize storage and migrate legacy localStorage keys if present
 */
export async function initStorage() {
  const legacyKeys = [
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
    'is_pclv'
  ];

  for (const key of legacyKeys) {
    try {
      const dbVal = await localforage.getItem(key);
      if (dbVal !== null) {
        memoryStore.set(key, dbVal);
      } else {
        // Fallback to localStorage migration
        const raw = localStorage.getItem(key);
        if (raw !== null) {
          try {
            const parsed = JSON.parse(raw);
            memoryStore.set(key, parsed);
            await localforage.setItem(key, parsed);
          } catch {
            memoryStore.set(key, raw);
            await localforage.setItem(key, raw);
          }
        }
      }
    } catch {
      // Skip a broken key; the app falls back to defaults.
    }
  }
}

/**
 * Synchronous get from fast cache
 */
export function getItem(key, defaultValue = null) {
  if (memoryStore.has(key)) {
    return memoryStore.get(key);
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      memoryStore.set(key, parsed);
      return parsed;
    }
  } catch {}
  return defaultValue;
}

/**
 * Set item in fast cache and persist to localforage + localStorage
 */
export function setItem(key, value) {
  memoryStore.set(key, value);
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
  localforage.setItem(key, value).catch(() => {
    // localStorage copy above still holds the value.
  });
}

/**
 * Remove item
 */
export function removeItem(key) {
  memoryStore.delete(key);
  try {
    localStorage.removeItem(key);
  } catch {}
  localforage.removeItem(key).catch(() => {});
}
