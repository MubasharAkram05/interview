import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

function gitShortSha() {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : 'unknown';
  }
}

// `vite build` (release, used for the Play Store .aab): debug tools are compiled out.
// `vite build --mode debug` (used for the debug APK): adds the hidden ads status panel.
export default defineConfig(({ mode }) => ({
  root: '.',
  base: './',
  define: {
    __DEBUG_TOOLS__: JSON.stringify(mode === 'debug' || mode === 'development'),
    __GIT_SHA__: JSON.stringify(gitShortSha()),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString().replace(/\.\d+Z$/, 'Z'))
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    target: 'es2022'
  }
}));
