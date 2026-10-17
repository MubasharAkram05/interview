// Creates the Play Store feature graphic from the logo (run `npm run icon` first, it also makes
// the 512 icon at assets/play/icon-512.png):
//   store-assets/feature-graphic.png 1024x500, 24-bit PNG (no alpha), as Play Console asks
// Run: npm run store:assets
import sharp from 'sharp';
import fs from 'node:fs';

const B = { a: '#2d7dca', b: '#2a45b5', c: '#9b7fd8' }; // same as --brand-1/2/3 in src/style.css
const glyph = fs
  .readFileSync('assets/logo/glyph.svg', 'utf8')
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '');
fs.mkdirSync('store-assets', { recursive: true });
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${B.a}"/><stop offset=".5" stop-color="${B.b}"/><stop offset="1" stop-color="${B.c}"/></linearGradient></defs>
  <rect width="1024" height="500" fill="url(#g)"/>
  <g transform="translate(50 60) scale(${380 / 512})">${glyph}</g>
  <text x="460" y="215" font-family="DejaVu Sans, Arial, sans-serif" font-size="60" font-weight="700" fill="#ffffff">Interview</text>
  <text x="460" y="288" font-family="DejaVu Sans, Arial, sans-serif" font-size="60" font-weight="700" fill="#ffffff">Simulator</text>
  <text x="462" y="342" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" fill="#e0e7ff">Practice questions. Mock interviews.</text>
</svg>`;
await sharp(Buffer.from(svg)).flatten({ background: B.b }).removeAlpha().png().toFile('store-assets/feature-graphic.png');
console.log('Wrote store-assets/feature-graphic.png');
