import { Capacitor } from '@capacitor/core';
import { nativeIsDebug } from './native-info.js';

/**
 * Diagnostic logging. Lines start with "ADS:" and print to the console only in a debug
 * build (debug APK). The last 40 lines are also kept in memory for the debug panel.
 * Never pass secrets, real ad unit IDs or user data to these functions.
 */

let enabled = false;
let known = false; // true once we know if this is a debug build
const queue = []; // console lines made before that (startup only)
const recent = []; // ring buffer for the debug panel

export const debugReady = (async () => {
  let dbg = null;
  if (Capacitor.isNativePlatform()) dbg = await nativeIsDebug();
  else {
    // In a browser, only the debug web build (vite --mode debug) counts as debug.
    dbg = typeof __DEBUG_TOOLS__ !== 'undefined' && !!__DEBUG_TOOLS__;
  }
  enabled = !!dbg;
  known = true;
  if (enabled) queue.forEach(args => console.log(...args));
  queue.length = 0;
  return enabled;
})();

export function isDebugBuild() {
  return enabled;
}

/** adsLog('loaded') -> "ADS: loaded" (console in debug builds only). */
export function adsLog(...parts) {
  const args = ['ADS:', ...parts];
  const t = new Date();
  const stamp = `${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}:${String(t.getSeconds()).padStart(2, '0')}`;
  recent.push(`${stamp} ${args.join(' ')}`);
  if (recent.length > 40) recent.shift();
  if (enabled) console.log(...args);
  else if (!known && queue.length < 50) queue.push(args);
}

export function recentAdsLog(n = 20) {
  return recent.slice(-n);
}
