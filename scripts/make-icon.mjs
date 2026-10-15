// Builds the app icon and splash source images in assets/ from simple SVG shapes (no text).
//   assets/icon-background.png  1024x1024 gradient (adaptive icon back layer)
//   assets/icon-foreground.png  1024x1024 transparent mark (adaptive icon front layer)
//   assets/icon-only.png        1024x1024 full icon (legacy icons, Play Store icon)
//   assets/splash.png / splash-dark.png 2732x2732
// Then run: npm run assets
// Run: node scripts/make-icon.mjs
import sharp from 'sharp';

const INDIGO = '#4f46e5';
const VIOLET = '#7c3aed';

// Speech bubble with a microphone, centered on a 1024 canvas.
// Scaled so it stays inside the adaptive icon safe zone (66dp circle of 108dp).
const mark = (scale = 1) => `
<g transform="translate(512 512) scale(${scale}) translate(-512 -512)">
  <path fill="#ffffff" d="M342 232h340a130 130 0 0 1 130 130v210a130 130 0 0 1-130 130H470l-150 118 22-118a130 130 0 0 1-130-130V362a130 130 0 0 1 130-130z"/>
  <rect x="456" y="290" width="112" height="210" rx="56" fill="${INDIGO}"/>
  <path d="M402 440a110 110 0 0 0 220 0" fill="none" stroke="${INDIGO}" stroke-width="36" stroke-linecap="round"/>
  <path d="M512 552v62M462 622h100" fill="none" stroke="${INDIGO}" stroke-width="36" stroke-linecap="round"/>
</g>`;

const bg = (w, h, a = INDIGO, b = VIOLET) => `
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
</linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>`;

const svg = (w, h, body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`);

await sharp(svg(1024, 1024, bg(1024, 1024))).png().toFile('assets/icon-background.png');
await sharp(svg(1024, 1024, mark(1.05))).png().toFile('assets/icon-foreground.png');
await sharp(svg(1024, 1024, bg(1024, 1024) + mark(0.95))).png().toFile('assets/icon-only.png');

const splash = (a, b) => svg(2732, 2732, bg(2732, 2732, a, b) + `<g transform="translate(1366 1366) scale(0.6) translate(-512 -512)">${mark(1)}</g>`);
await sharp(splash(INDIGO, VIOLET)).png().toFile('assets/splash.png');
await sharp(splash('#0b1020', '#1c2545')).png().toFile('assets/splash-dark.png');
console.log('Wrote assets/icon-background.png, icon-foreground.png, icon-only.png, splash.png, splash-dark.png');
