// Smoke test of the release web build. Run: npm run test:smoke
// Builds the app (vite build, release mode) and checks the output. With RELEASE_ADS=true it also
// proves that no Google test ad ID is left (the build itself fails while production IDs are
// placeholders).
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const out = [];
const check = (name, ok, info = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${info ? ` (${info})` : ''}`);

execSync('npx vite build', { stdio: ['ignore', 'ignore', 'inherit'] });

const files = [];
const walk = d => readdirSync(d).forEach(f => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : files.push(join(d, f))));
walk('dist');
const js = files.filter(f => f.endsWith('.js'));
const all = f => readFileSync(f, 'utf8');
const html = existsSync('dist/index.html') ? all('dist/index.html') : '';

check('index.html built', html.length > 0);
check('index.html has the welcome screen and the app shell', html.includes('id="intro"') && html.includes('id="main"'));
check('index.html has a Content-Security-Policy', /http-equiv="Content-Security-Policy"/.test(html) && !/unsafe-eval/.test(html));
const refs = [...html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)].map(m => m[1]);
const missing = refs.filter(r => !existsSync(join('dist', r)));
check('every file index.html links to exists', missing.length === 0, missing.join(', '));
['favicon.svg', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest'].forEach(f => check(`asset ${f}`, existsSync(join('dist', f))));
check('no source maps in the release build', !files.some(f => f.endsWith('.map')) && !js.some(f => all(f).includes('sourceMappingURL')));
const logs = js.reduce((n, f) => n + (all(f).match(/console\.log/g) || []).length, 0);
check('no console.log in the release bundle', logs === 0, `${logs} found`);
check('no eval / new Function in the bundle', !js.some(f => /\beval\(|new Function\(/.test(all(f))));
check('debug panel compiled out of the release bundle', !js.some(f => /Copy report|Force interstitial test|dbgPanel/.test(all(f))));
check(
  'policy text bundled (works offline)',
  js.some(f => all(f).includes('Privacy Policy for Interview Simulator'))
);
const testIds = js.reduce((n, f) => n + (all(f).match(/ca-app-pub-3940256099942544/g) || []).length, 0);
if (process.env.RELEASE_ADS === 'true') check('RELEASE_ADS=true: no Google test ad IDs in the bundle', testIds === 0, `${testIds} found`);
else check('default build uses Google test ad IDs (expected until RELEASE_ADS=true)', testIds > 0);
const size = files.reduce((n, f) => n + statSync(f).size, 0);
check('web bundle under 3 MB', size < 3 * 1024 * 1024, `${(size / 1024).toFixed(0)} KB`);

console.info(out.join('\n'));
if (out.some(l => l.startsWith('FAIL'))) process.exit(1);
