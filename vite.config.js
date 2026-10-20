import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

function gitShortSha() {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : 'unknown';
  }
}

import { productionIdProblems } from './src/config/ads.js';

// `vite build` (release, used for the Play Store .aab): debug tools are compiled out.
// `vite build --mode debug` (used for the debug APK): adds the hidden ads status panel.
// RELEASE_ADS=true: real ads from PRODUCTION_IDS in src/config/ads.js, in the release AND the
// debug build (the owner's phone is a registered AdMob test device, so it gets test-labelled ads
// from the real ad units). The build stops with a clear message while any production ID is still a
// placeholder. Without RELEASE_ADS (local builds, unit and UI tests): Google's test IDs.
export default defineConfig(({ mode }) => {
  const debugTools = mode === 'debug' || mode === 'development';
  const releaseAds = process.env.RELEASE_ADS === 'true';
  if (releaseAds) {
    const problems = productionIdProblems();
    if (problems.length) {
      throw new Error(
        'RELEASE_ADS=true but src/config/ads.js PRODUCTION_IDS is not ready:\n  - ' +
          problems.join('\n  - ') +
          '\nPaste the real AdMob IDs (see RELEASE_CHECKLIST.md) or build without RELEASE_ADS.'
      );
    }
  }
  return config(mode, debugTools, releaseAds);
});

function config(mode, debugTools, releaseAds) {
  return {
    root: '.',
    base: './',
    define: {
      __DEBUG_TOOLS__: JSON.stringify(debugTools),
      __RELEASE_ADS__: JSON.stringify(releaseAds),
      __GIT_SHA__: JSON.stringify(gitShortSha()),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString().replace(/\.\d+Z$/, 'Z'))
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'assets',
      target: 'es2022',
      sourcemap: false,
      // Release bundle: no console output at all (also drops the console lines inside the
      // plugins' unused web fallbacks). Debug builds keep the console for the logs.
      rolldownOptions: debugTools ? {} : { output: { minify: { compress: { dropConsole: true }, mangle: true } } }
    }
  };
}
