// Creates Play Store graphics from assets/icon.png:
//   store-assets/icon-512.png       (512x512, 32-bit PNG)
//   store-assets/feature-graphic.png (1024x500 placeholder, replace with your own design if you like)
// Run: node scripts/make-store-assets.mjs
import sharp from 'sharp';
import fs from 'node:fs';

fs.mkdirSync('store-assets', { recursive: true });
await sharp('assets/icon.png').resize(512, 512).png().toFile('store-assets/icon-512.png');

const icon = await sharp('assets/icon.png').extract({ left: 262, top: 190, width: 500, height: 500 }).resize(330, 330).png().toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs>
  <rect width="1024" height="500" fill="url(#g)"/>
  <text x="420" y="215" font-family="DejaVu Sans, Arial, sans-serif" font-size="58" font-weight="700" fill="#ffffff">Interview</text>
  <text x="420" y="285" font-family="DejaVu Sans, Arial, sans-serif" font-size="58" font-weight="700" fill="#ffffff">Simulator</text>
  <text x="422" y="340" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" fill="#e0e7ff">Practice questions. Mock interviews.</text>
</svg>`;
await sharp(Buffer.from(svg)).composite([{ input: icon, left: 60, top: 85 }]).png().toFile('store-assets/feature-graphic.png');
console.log('Wrote store-assets/icon-512.png and store-assets/feature-graphic.png');
