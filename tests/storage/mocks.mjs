// In-memory localforage (IndexedDB) for storage tests.
export const db = new Map();
export const state = { failWrites: false };
export default {
  config() {},
  async getItem(k) {
    return db.has(k) ? structuredClone(db.get(k)) : null;
  },
  async setItem(k, v) {
    if (state.failWrites) throw new Error('quota');
    db.set(k, structuredClone(v));
    return v;
  },
  async removeItem(k) {
    db.delete(k);
  }
};
