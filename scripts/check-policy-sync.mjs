// Proves the privacy policy text is identical in all three places:
//   1. PRIVACY_POLICY.md (source)
//   2. privacy-policy-site/index.html (GitHub Pages)
//   3. the in-app Privacy Policy screen (built web bundle)
// Usage: npm run build && npx vite preview --port 4173 &  then  node scripts/check-policy-sync.mjs
import fs from 'node:fs';
import { marked } from 'marked';
const { chromium } = await import('playwright').catch(() => import('/opt/node-tools/node_modules/playwright/index.mjs'));

const norm = t => t.replace(/\s+/g, ' ').trim();
const md = fs.readFileSync('PRIVACY_POLICY.md', 'utf8');

const browser = await chromium.launch();
const page = await browser.newPage();

// Expected text: the markdown rendered the same way both pages render it.
await page.setContent(`<main>${marked.parse(md)}</main>`);
const fromMd = norm(await page.innerText('main'));

await page.goto('file://' + process.cwd() + '/privacy-policy-site/index.html');
const fromSite = norm(await page.innerText('main'));

await page.goto('http://localhost:4173/');
await page.waitForTimeout(800);
await page.evaluate(() => window.openPrivacyPolicy());
await page.waitForTimeout(400);
const fromApp = norm(await page.innerText('#policyText'));
await browser.close();

const words = s => s.split(' ').length;
console.log(`PRIVACY_POLICY.md : ${words(fromMd)} words`);
console.log(`index.html        : ${words(fromSite)} words`);
console.log(`in-app screen     : ${words(fromApp)} words`);
console.log(`md == index.html  : ${fromMd === fromSite}`);
console.log(`md == in-app      : ${fromMd === fromApp}`);
console.log(`contact email     : ${fromMd.match(/Email: (\S+)/)?.[1]}`);
console.log(`last updated      : ${fromMd.match(/Last updated: ([^.]+?\d{4})/)?.[1]}`);
process.exit(fromMd === fromSite && fromMd === fromApp ? 0 : 1);
