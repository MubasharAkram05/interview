import fs from 'node:fs';
import path from 'node:path';

const gradleFile = path.resolve('node_modules/@capacitor-community/admob/android/build.gradle');

if (fs.existsSync(gradleFile)) {
  let content = fs.readFileSync(gradleFile, 'utf8');
  let changed = false;

  // 1. Comment out `apply plugin: 'kotlin-android'` (AGP 9 has built-in Kotlin support)
  if (content.includes("apply plugin: 'kotlin-android'")) {
    content = content.replace("apply plugin: 'kotlin-android'", "// apply plugin: 'kotlin-android' (AGP 9 built-in)");
    changed = true;
  }

  // 2. Comment out `kotlinOptions` block (handled by compileOptions Java 21)
  if (content.includes("kotlinOptions {")) {
    content = content.replace(/kotlinOptions\s*\{[\s\S]*?\}/g, "// kotlinOptions removed for AGP 9");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(gradleFile, content, 'utf8');
    console.log('[patch-admob] Successfully patched @capacitor-community/admob for AGP 9.');
  }
}
