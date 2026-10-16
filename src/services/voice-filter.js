// Filters for the phone's speech results, before anything is written into the answer box.
// Pure functions (no Capacitor, no DOM), unit tested in tests/voice/filter.test.mjs.
//
//   1. Noise gate: the speech service invents words from silence and background noise. If the
//      loudest moment of a session (max RMS from Android's onRmsChanged) never reached a speaking
//      level, its final result is dropped.
//   2. Confidence: guesses with a known confidence below 0.4 are dropped.
//   3. N-best: of the remaining guesses, the one with the most My words / profile name words wins;
//      otherwise the most confident one. Guesses are never merged.
//   4. Dedupe: a final that repeats text committed in the last 5 seconds is dropped; if it starts
//      with that text ("I am from" ... "I am from Pakpattan") only the new part is kept.

export const VOICE_FILTER = {
  minSpeechRms: 5, // dB. Silence is about -2..2, a quiet room 2..4, speech near the phone 6..10.
  minConfidence: 0.4,
  dedupeMs: 5000,
  minOverlapWords: 2 // suffix/prefix overlap shorter than this is not treated as a repeat
};

const keyOf = w => String(w || '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]/g, '');

/** "I'm from, Pakpattan." -> "im from pakpattan" */
export function phraseKey(t) {
  return String(t || '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Noise gate. Returns '' when the session had real speech, else the reason to drop. */
export function noiseGate(maxRms, cfg = VOICE_FILTER) {
  if (typeof maxRms !== 'number' || !isFinite(maxRms)) return ''; // level unknown: do not block
  return maxRms < cfg.minSpeechRms ? `noise (max RMS ${maxRms.toFixed(1)} < ${cfg.minSpeechRms})` : '';
}

/**
 * Guesses with their confidence. A score of 0 or less means "not given" (Google often scores only
 * the first guess). Drops guesses with a known score below minConfidence.
 * Returns { cands: [{ text, score, index }], dropped: [{ text, score, why }] }.
 */
export function confidenceFilter(matches, scores, cfg = VOICE_FILTER) {
  const cands = [];
  const dropped = [];
  (matches || []).forEach((text, index) => {
    if (!text || !String(text).trim()) return;
    const sc = scores && typeof scores[index] === 'number' && scores[index] > 0 ? scores[index] : null;
    if (sc !== null && sc < cfg.minConfidence) dropped.push({ text, score: sc, why: `confidence ${sc.toFixed(2)} < ${cfg.minConfidence}` });
    else cands.push({ text: String(text).trim(), score: sc, index });
  });
  return { cands, dropped };
}

/**
 * N-best: most words that are My words or the profile name (exact, any case); ties and zero
 * overlap go to the highest known confidence, then to the phone's own order.
 * targets: Set of lowercase keys. O(candidates x words).
 */
export function pickCandidate(cands, targets) {
  if (!cands || !cands.length) return null;
  const scored = cands.map(c => ({
    ...c,
    overlap: String(c.text)
      .split(/\s+/)
      .map(keyOf)
      .filter(k => k && targets && targets.has(k)).length
  }));
  scored.sort((a, b) => b.overlap - a.overlap || (b.score ?? -1) - (a.score ?? -1) || a.index - b.index);
  const best = scored[0];
  return { ...best, why: best.overlap ? `${best.overlap} My words / name match` : best.score !== null ? 'highest confidence' : 'first guess' };
}

/**
 * Dedupe a final against what was committed recently.
 * recent: [{ text, at }] committed finals (newest last). Returns { text, why }:
 * text '' = drop; a shorter text = only the new part is kept.
 */
export function dedupeFinal(text, recent, now = Date.now(), cfg = VOICE_FILTER) {
  const k = phraseKey(text);
  if (!k) return { text: '', why: 'empty' };
  const win = (recent || []).filter(r => now - r.at <= cfg.dedupeMs);
  if (!win.length) return { text, why: '' };
  if (win.some(r => phraseKey(r.text) === k)) return { text: '', why: 'duplicate (same text within 5 s)' };
  const joined = phraseKey(win.map(r => r.text).join(' '));
  const kw = k.split(' ');
  const jw = joined.split(' ');
  // Already at the end of what was committed ("Pakpattan" after "I am from Pakpattan").
  if (kw.length <= jw.length && jw.slice(-kw.length).join(' ') === k) return { text: '', why: 'duplicate (end of recent text)' };
  // Starts with a phrase committed in the last 5 s ("I am from Pakistan" ... "I am from Pakistan
  // Pakpattan"): the service sent it again with more words; keep only the new words.
  for (const r of win) {
    const rk = phraseKey(r.text);
    if (rk.split(' ').length > cfg.minOverlapWords && k.startsWith(rk + ' ')) {
      const n = rk.split(' ').length;
      return { text: String(text).trim().split(/\s+/).slice(n).join(' '), why: `repeat: dropped ${n} words already written` };
    }
  }
  // Starts with the end of what was committed: keep only the new words.
  for (let n = Math.min(kw.length - 1, jw.length); n >= cfg.minOverlapWords; n--) {
    if (jw.slice(-n).join(' ') === kw.slice(0, n).join(' ')) {
      const words = String(text).trim().split(/\s+/);
      return { text: words.slice(n).join(' '), why: `overlap: dropped ${n} repeated words` };
    }
  }
  return { text, why: '' };
}
