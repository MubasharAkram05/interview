// Creates Play Store graphics from assets/icon-only.png (run scripts/make-icon.mjs first):
//   store-assets/icon-512.png        512x512, 32-bit PNG (RGBA), as Play Console asks
//   store-assets/feature-graphic.png 1024x500, 24-bit PNG (no alpha), as Play Console asks
// Run: npm run store:assets
import sharp from 'sharp';
import fs from 'node:fs';

fs.mkdirSync('store-assets', { recursive: true });
await sharp('assets/icon-only.png').resize(512, 512).ensureAlpha().png().toFile('store-assets/icon-512.png');

const mark = await sharp('assets/icon-foreground.png').resize(380, 380).png().toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs>
  <rect width="1024" height="500" fill="url(#g)"/>
  <text x="440" y="215" font-family="DejaVu Sans, Arial, sans-serif" font-size="60" font-weight="700" fill="#ffffff">Interview</text>
  <text x="440" y="288" font-family="DejaVu Sans, Arial, sans-serif" font-size="60" font-weight="700" fill="#ffffff">Simulator</text>
  <text x="442" y="342" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" fill="#e0e7ff">Practice questions. Mock interviews.</text>
</svg>`;
await sharp(Buffer.from(svg))
  .composite([{ input: mark, left: 40, top: 60 }])
  .flatten({ background: '#4f46e5' })
  .removeAlpha()
  .png()
  .toFile('store-assets/feature-graphic.png');
console.log('Wrote store-assets/icon-512.png and store-assets/feature-graphic.png');
