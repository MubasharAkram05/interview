// Checks the app icons: Play icon 512x512 32-bit under 1 MB, and every launcher icon size
// (legacy 48 dp and adaptive 108 dp layers incl. monochrome) for ldpi..xxxhdpi.
// Run: npm run icon:check
import sharp from 'sharp';
import fs from 'node:fs';

const RES = 'app/src/main/res';
const DENS = { ldpi: 0.75, mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const want = [['assets/play/icon-512.png', 512, 512]];
for (const [d, k] of Object.entries(DENS)) {
  const A = Math.round(108 * k);
  const L = Math.round(48 * k);
  for (const n of ['ic_launcher_background', 'ic_launcher_foreground', 'ic_launcher_monochrome']) want.push([`${RES}/mipmap-${d}/${n}.png`, A, A]);
  for (const n of ['ic_launcher', 'ic_launcher_round']) want.push([`${RES}/mipmap-${d}/${n}.png`, L, L]);
}
let bad = 0;
for (const [f, w, h] of want) {
  const m = fs.existsSync(f) ? await sharp(f).metadata() : null;
  const ok = m && m.width === w && m.height === h;
  if (!ok) bad++;
  if (!ok) console.log(`FAIL ${f}: want ${w}x${h}, got ${m ? `${m.width}x${m.height}` : 'missing'}`);
}
const play = await sharp('assets/play/icon-512.png').metadata();
const playSize = fs.statSync('assets/play/icon-512.png').size;
if (play.channels !== 4 || playSize >= 1024 * 1024) {
  bad++;
  console.log(`FAIL Play icon must be 32-bit (RGBA) and under 1 MB: channels ${play.channels}, ${playSize} bytes`);
}
console.log(`${want.length} icon files checked, Play icon ${play.width}x${play.height} ${play.channels * 8}-bit ${(playSize / 1024).toFixed(0)} KB`);
console.log(bad ? `${bad} problem(s)` : 'All icon sizes OK');
process.exit(bad ? 1 : 0);
for (const f of ['mipmap-anydpi-v26/ic_launcher.xml', 'mipmap-anydpi-v26/ic_launcher_round.xml']) {
  const x = fs.existsSync(`${RES}/${f}`) ? fs.readFileSync(`${RES}/${f}`, 'utf8') : '';
  if (!x.includes('<monochrome')) {
    console.log(`FAIL ${f}: no monochrome layer (Android 13 themed icon)`);
    process.exit(1);
  }
}
