import confetti from 'canvas-confetti';

/**
 * Trigger celebratory confetti burst
 */
export function fireConfetti() {
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#4f46e5', '#7c3aed', '#059669', '#f59e0b', '#db2777']
    });
  } catch (e) {
    console.warn('[celebration] Confetti error:', e);
  }
}

/**
 * Trigger larger celebration for high score or completed interview
 */
export function fireGrandCelebration() {
  try {
    const end = Date.now() + 1000;
    const colors = ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {}
}
