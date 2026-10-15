// Builds privacy-policy-site/index.html from PRIVACY_POLICY.md so the online policy
// (GitHub Pages) and the in-app policy always use the exact same text.
// Run: npm run policy:page
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const md = fs.readFileSync(path.join(root, 'PRIVACY_POLICY.md'), 'utf8');
const body = marked.parse(md);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacy Policy - Interview Simulator</title>
<meta name="description" content="Privacy Policy for the Interview Simulator Android app by Sussal Productions.">
<style>
:root{--bg:#f4f6fb;--card:#fff;--ink:#0f172a;--mute:#64748b;--line:#e2e8f0;--acc:#4f46e5}
@media (prefers-color-scheme:dark){:root{--bg:#0b1020;--card:#131a2e;--ink:#e6eaf5;--mute:#93a0ba;--line:#24304d;--acc:#8b8cff}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:16px}
main{max-width:760px;margin:0 auto;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px 20px 28px;box-shadow:0 10px 30px rgba(15,23,42,.08)}
h1{font-size:1.6rem;line-height:1.25;margin:0 0 8px;color:var(--acc)}
h2{font-size:1.15rem;margin:28px 0 8px;padding-top:16px;border-top:1px solid var(--line)}
ul{padding-left:1.25rem}
li{margin:4px 0}
a{color:var(--acc);word-break:break-word}
p,li{overflow-wrap:anywhere}
</style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>
`;

fs.mkdirSync(path.join(root, 'privacy-policy-site'), { recursive: true });
fs.writeFileSync(path.join(root, 'privacy-policy-site', 'index.html'), html, 'utf8');
console.log('Wrote privacy-policy-site/index.html');
