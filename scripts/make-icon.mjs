// Builds every app icon and splash image from assets/logo/glyph.svg (white glyph, no text) and the
// brand gradient (sampled from assets/logo-reference/icon-reference.jpg). Run: npm run icon
//
//   Android adaptive icon (mipmap-*/ic_launcher_foreground|background|monochrome.png, 108 dp)
//   Android legacy icons  (mipmap-*/ic_launcher.png and ic_launcher_round.png, 48 dp)
//   Android 12+ splash icon (drawable-nodpi/splash_icon.png) and Capacitor splash (drawable*/splash.png)
//   Play Store icon        (assets/play/icon-512.png: 512x512, 32-bit PNG, full square)
//   Web: public/favicon.svg, public/icon-192.png, public/icon-512.png (+ privacy-policy-site copies)
// Ends with scripts/check-icons.mjs (exit code 1 if a size is wrong).
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// Brand gradient (same values as --brand-1/2/3 in src/style.css).
export const BRAND = { a: '#2d7dca', b: '#2a45b5', c: '#9b7fd8' };
const RES = 'app/src/main/res';
const glyphSvg = fs.readFileSync('assets/logo/glyph.svg', 'utf8');
const inner = glyphSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const svg = (w, h, body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`);
const gradient = (w, h) => `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${BRAND.a}"/><stop offset=".5" stop-color="${BRAND.b}"/><stop offset="1" stop-color="${BRAND.c}"/>
</linearGradient></defs><rect width="${w}" height="${h}" fill="url(#bg)"/>`;
// The glyph (512 viewBox) scaled to `size` px and centred at (cx, cy).
const glyph = (cx, cy, size, color = '#fff') =>
  `<g transform="translate(${cx - size / 2} ${cy - size / 2}) scale(${size / 512})">${color === '#fff' ? inner : inner.replaceAll('#fff', color)}</g>`;

// How far the glyph reaches from the centre (fraction of its 512 box), so it can be scaled into
// the adaptive icon safe zone (a 66 dp circle on the 108 dp canvas).
async function glyphRadius() {
  const N = 512;
  const raw = await sharp(svg(N, N, glyph(N / 2, N / 2, N))).ensureAlpha().raw().toBuffer();
  let r = 0;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (raw[(y * N + x) * 4 + 3] > 128) r = Math.max(r, Math.hypot(x + 0.5 - N / 2, y + 0.5 - N / 2));
  return r / N;
}

const write = async (file, buf, w, h) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(buf).resize(w, h).png({ compressionLevel: 9 }).toFile(file);
};

const reach = await glyphRadius();
// Glyph box size so its farthest pixel sits on a 31 dp circle (inside the 33 dp safe radius).
const safeScale = 31 / 108 / reach;

const DENS = { ldpi: 0.75, mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
for (const [d, k] of Object.entries(DENS)) {
  const A = Math.round(108 * k); // adaptive layer
  const L = Math.round(48 * k); // legacy icon
  const dir = `${RES}/mipmap-${d}`;
  await write(`${dir}/ic_launcher_background.png`, svg(A, A, gradient(A, A)), A, A);
  await write(`${dir}/ic_launcher_foreground.png`, svg(A, A, glyph(A / 2, A / 2, A * safeScale)), A, A);
  await write(`${dir}/ic_launcher_monochrome.png`, svg(A, A, glyph(A / 2, A / 2, A * safeScale)), A, A);
  // Legacy: rounded square and circle, like the launcher would mask them.
  const S = L * 4;
  const legacy = (shape) =>
    svg(S, S, `<defs><clipPath id="c">${shape}</clipPath></defs><g clip-path="url(#c)">${gradient(S, S)}${glyph(S / 2, S / 2, S * 0.62)}</g>`);
  await write(`${dir}/ic_launcher.png`, legacy(`<rect x="${S * 0.04}" y="${S * 0.04}" width="${S * 0.92}" height="${S * 0.92}" rx="${S * 0.2}"/>`), L, L);
  await write(`${dir}/ic_launcher_round.png`, legacy(`<circle cx="${S / 2}" cy="${S / 2}" r="${S * 0.46}"/>`), L, L);
}
const adaptive = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
    <monochrome android:drawable="@mipmap/ic_launcher_monochrome" />
</adaptive-icon>
`;
fs.writeFileSync(`${RES}/mipmap-anydpi-v26/ic_launcher.xml`, adaptive);
fs.writeFileSync(`${RES}/mipmap-anydpi-v26/ic_launcher_round.xml`, adaptive);

// Android 12+ splash: the system draws the icon in a 160 dp circle on windowSplashScreenBackground.
// 288 dp canvas at xxxhdpi-like 4x = 1152 px is more than enough; nodpi keeps one file.
await write(`${RES}/drawable-nodpi/splash_icon.png`, svg(1152, 1152, glyph(576, 576, 1152 * (75 / 288) / reach)), 432, 432);

// Capacitor splash (shown on Android below 12 and while the web view loads): gradient + glyph.
for (const dir of fs.readdirSync(RES).filter(d => d.startsWith('drawable'))) {
  const f = `${RES}/${dir}/splash.png`;
  if (!fs.existsSync(f)) continue;
  const { width: w, height: h } = await sharp(f).metadata();
  const g = Math.min(w, h) * 0.46;
  await write(f, svg(w, h, gradient(w, h) + glyph(w / 2, h / 2, g)), w, h);
}

// Play Store icon: full square (Play rounds the corners itself), 32-bit PNG.
await write('assets/play/icon-512.png', svg(512, 512, gradient(512, 512) + glyph(256, 256, 512 * 0.64)), 512, 512);
await sharp('assets/play/icon-512.png').ensureAlpha().png({ compressionLevel: 9 }).toBuffer().then(b => fs.writeFileSync('assets/play/icon-512.png', b));

// Web icons (favicon, manifest), app build (public/) and the privacy policy site.
const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BRAND.a}"/><stop offset=".5" stop-color="${BRAND.b}"/><stop offset="1" stop-color="${BRAND.c}"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(#bg)"/>${glyph(256, 256, 512 * 0.66)}</svg>\n`;
for (const dir of ['public', 'privacy-policy-site']) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/favicon.svg`, fav);
  for (const s of [192, 512]) await write(`${dir}/icon-${s}.png`, Buffer.from(fav), s, s);
}

console.log(`glyph reach ${reach.toFixed(3)} of its box; adaptive glyph box ${(safeScale * 100).toFixed(1)}% of 108 dp`);
// Check every size (same check runs in CI: npm run icon:check).
await import('./check-icons.mjs');
