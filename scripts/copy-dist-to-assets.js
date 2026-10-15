import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const targetPublicDir = path.resolve('app/src/main/assets/public');
const assetsDir = path.resolve('app/src/main/assets');

// Ensure target directories exist
fs.mkdirSync(targetPublicDir, { recursive: true });

// Copy all files from dist to app/src/main/assets/public
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(distDir, targetPublicDir);
console.log(`[copy-assets] Copied web bundle from ${distDir} to ${targetPublicDir}`);

// Ensure capacitor.config.json is in assets
const capConfigJson = {
  appId: 'com.sussalproductions.interviewsimulator',
  appName: 'Interview Simulator',
  webDir: 'public'
};
fs.writeFileSync(path.join(assetsDir, 'capacitor.config.json'), JSON.stringify(capConfigJson, null, 2), 'utf8');

// Ensure capacitor.plugins.json is in assets
const capPluginsJson = [
  {
    pkg: '@capacitor-community/admob',
    classpath: 'com.getcapacitor.community.admob.AdMob'
  },
  {
    pkg: '@capacitor/app',
    classpath: 'com.capacitorjs.plugins.app.AppPlugin'
  },
  {
    pkg: '@capacitor/status-bar',
    classpath: 'com.capacitorjs.plugins.statusbar.StatusBarPlugin'
  },
  {
    pkg: '@capacitor/splash-screen',
    classpath: 'com.capacitorjs.plugins.splashscreen.SplashScreenPlugin'
  }
];
fs.writeFileSync(path.join(assetsDir, 'capacitor.plugins.json'), JSON.stringify(capPluginsJson, null, 2), 'utf8');

console.log('[copy-assets] Generated capacitor.config.json and capacitor.plugins.json in assets.');
