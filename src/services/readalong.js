// Read-along matching (Practice: "read the answer aloud").
// Works like Duolingo: words light up as you say them, small mistakes in recognition are
// accepted, and words you skip are passed over and marked as missed instead of blocking you.
// Tuned for Indian and Pakistani English (v/w, th/t/d, z/j, short vowels, dropped articles).
// Pure functions only, so they can be unit tested in Node.

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

// Small words the recognizer often drops or mishears. They may be skipped freely, but they
// are never used to jump far ahead (a stray "the" must not skip half a sentence).
const SMALL = new Set(['a', 'an', 'the', 'to', 'of', 'in', 'on', 'at', 'and', 'or', 'is', 'am', 'are',
  'was', 'i', 'my', 'it', 'for', 'as', 'be', 'by', 'so', 'we', 'me', 'do', 'if', 'up', 'with', 'that', 'this']);

// Sounds people say instead of words. Ignored.
const FILLER = new Set(['um', 'umm', 'uh', 'uhh', 'hmm', 'hm', 'er', 'erm', 'ah', 'aa', 'mm', 'haan', 'ji', 'acha', 'achha']);

// Contractions written one way and heard the other ("I'm" vs "I am"), joined without spaces.
const CONTRACT = {
  im: 'iam', ive: 'ihave', ill: 'iwill', id: 'iwould', youre: 'youare', youve: 'youhave', weve: 'wehave',
  theyre: 'theyare', dont: 'donot', doesnt: 'doesnot', didnt: 'didnot', cant: 'cannot', wont: 'willnot',
  isnt: 'isnot', wasnt: 'wasnot', arent: 'arenot', havent: 'havenot', its: 'itis', thats: 'thatis',
  whats: 'whatis', lets: 'letus', theres: 'thereis', couldnt: 'couldnot', wouldnt: 'wouldnot', shouldnt: 'shouldnot'
};

/** "I'm" -> "im", "Node.js," -> "nodejs", "2" stays "2". */
export function normWord(w) {
  return String(w).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]/g, '');
}

function numberWords(n) {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ONES[n % 10] : '');
  return null;
}

/**
 * Split text into normalized tokens. Digits become words ("2" -> "two") so they match either way.
 * Each token keeps the original index of the word it came from.
 */
export function tokens(text) {
  const out = [];
  String(text || '')
    .split(/\s+/)
    .forEach(raw => {
      const w = normWord(raw);
      if (!w) return;
      if (/^\d+$/.test(w)) {
        const n = parseInt(w, 10);
        const nw = numberWords(n);
        out.push(nw || w);
        return;
      }
      out.push(w);
    });
  return out;
}

/**
 * Rough sound key for South Asian English. Same key = sounds alike.
 * v/w, th/t/d, z/j/s, ph/f, ck/k/c/q, doubled letters, silent h, vowels collapsed.
 */
export function soundKey(w) {
  let s = normWord(w);
  if (!s) return '';
  s = s
    .replace(/ph/g, 'f')
    .replace(/th/g, 't')
    .replace(/dh/g, 'd')
    .replace(/sh/g, 's')
    .replace(/ch/g, 'c')
    .replace(/ck|q|k/g, 'c')
    .replace(/w/g, 'v')
    .replace(/[zj]/g, 's')
    .replace(/x/g, 'cs')
    .replace(/d$/, 't') // worked/workt
    .replace(/(.)h/g, '$1') // silent h after a consonant (bh, gh, kh)
    .replace(/(.)\1+/g, '$1'); // double letters
  const first = s[0];
  const rest = s.slice(1).replace(/[aeiouy]+/g, '');
  return first + rest;
}

function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      cur.push(v);
      if (v < best) best = v;
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

/** How well a spoken token matches a target token: 0 (no) to 1 (exact). */
export function similarity(target, spoken) {
  if (!target || !spoken) return 0;
  if (target === spoken) return 1;
  if (CONTRACT[target] === spoken || CONTRACT[spoken] === target) return 1;
  const short = Math.min(target.length, spoken.length);
  if (short <= 2) return 0; // "a" vs "the": too short to guess
  const ka = soundKey(target);
  const kb = soundKey(spoken);
  if (ka.length >= 2 && ka === kb) return 0.9;
  const allowed = short <= 4 ? 1 : short <= 7 ? 2 : 3;
  const d = editDistance(target, spoken, allowed);
  if (d <= allowed) return 1 - d / Math.max(target.length, spoken.length);
  // Plural / tense endings: "project" vs "projects", "manage" vs "managed".
  if (short >= 4 && (target.startsWith(spoken) || spoken.startsWith(target))) return 0.7;
  return 0;
}

const OK = 0.6; // similarity needed to count as the same word

/**
 * Align what was heard with the text to read.
 * target: array of target tokens (one per word on screen, '' for words with no letters).
 * spoken: array of strings (all sessions so far plus the live partial text).
 * Returns { pos, state } where pos = index after the last word reached, and state[i] is
 * 'ok' (said), 'miss' (skipped) or '' (not reached yet).
 */
export function alignReading(target, spoken) {
  const state = target.map(() => '');
  let pos = 0;
  const said = [];
  spoken.forEach(t => said.push(...tokens(t)));

  for (let si = 0; si < said.length && pos < target.length; si++) {
    const w = said[si];
    if (FILLER.has(w)) continue;
    // Skip words on screen that have no letters (dashes, bullets).
    while (pos < target.length && !target[pos]) pos++;
    if (pos >= target.length) break;

    // Small words only match nearby; real words may jump over up to 7 skipped words.
    const window = SMALL.has(w) ? 2 : 8;
    let found = -1;
    let foundScore = 0;
    let foundJoined = false;
    for (let k = pos, seen = 0; k < target.length && seen < window; k++) {
      if (!target[k]) continue;
      seen++;
      let s = similarity(target[k], w);
      let joined = false;
      // "I am" said for "I'm", "web site" for "website": join with the next heard word.
      if (s < OK && si + 1 < said.length) {
        const j = similarity(target[k], w + said[si + 1]);
        if (j >= OK) {
          s = j;
          joined = true;
        }
      }
      if (s < OK) continue;
      // Take the nearest good match; a later one only if it is clearly better.
      if (found < 0 || s > foundScore + 0.25) {
        found = k;
        foundScore = s;
        foundJoined = joined;
      }
      if (foundScore >= 0.9) break;
    }
    // A small word after skipped words: accept it further ahead only when the next heard
    // word also matches the word right after it ("... on web" after skipping "for three years").
    if (found < 0 && SMALL.has(w)) {
      const next = said.slice(si + 1).find(x => !FILLER.has(x));
      for (let k = pos, seen = 0; next && k < target.length - 1 && seen < 8; k++) {
        if (!target[k]) continue;
        seen++;
        if (target[k] === w && similarity(target[k + 1], next) >= 0.85) {
          found = k;
          foundScore = 1;
          break;
        }
      }
    }
    if (found < 0) continue; // extra or unclear word: ignore it, do not block
    // A far jump over real words needs a confident match, not a guess.
    if (found - pos > 2 && foundScore < 0.85) continue;
    for (let k = pos; k < found; k++) if (target[k]) state[k] = 'miss';
    state[found] = 'ok';
    if (foundJoined) si++; // the next heard word was used in the joined match
    pos = found + 1;
  }
  while (pos < target.length && !target[pos]) pos++;
  return { pos, state };
}

/** Pick the alternative transcript that gets furthest and matches most words. */
export function bestAlignment(target, done, alternatives) {
  let best = null;
  for (const alt of alternatives.length ? alternatives : ['']) {
    const r = alignReading(target, [...done, alt]);
    const ok = r.state.filter(x => x === 'ok').length;
    if (!best || r.pos > best.pos || (r.pos === best.pos && ok > best.ok)) best = { ...r, ok, text: alt };
  }
  return best;
}

/** Final score: share of words said (0..1). */
export function readingScore(state) {
  const counted = state.filter(Boolean).length || 1;
  return state.filter(x => x === 'ok').length / counted;
}
