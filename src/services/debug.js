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

// ---- Voice diagnostics: "VOICE:" lines (debug builds only; nothing is kept in release builds) ----
const voiceRecent = [];
const voiceEarly = []; // lines from before we know the build type

/** voiceLog('start', {...}) -> "VOICE: start {...}". Text heard is logged only in debug builds. */
export function voiceLog(...parts) {
  const t = new Date();
  const stamp = `${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}:${String(t.getSeconds()).padStart(2, '0')}.${String(t.getMilliseconds()).padStart(3, '0')}`;
  const line = `${stamp} VOICE: ${parts.map(p => (typeof p === 'string' ? p : JSON.stringify(p))).join(' ')}`;
  if (!known) {
    if (voiceEarly.length < 50) voiceEarly.push(line);
    return;
  }
  if (!enabled) return;
  if (voiceEarly.length) voiceRecent.push(...voiceEarly.splice(0));
  voiceRecent.push(line);
  while (voiceRecent.length > 50) voiceRecent.shift();
  console.log(line);
}

export function recentVoiceLog(n = 50) {
  return voiceRecent.slice(-n);
}

/** For tests: turn voice logging on without a native debug flag. */
export function _enableVoiceLogForTests() {
  enabled = true;
  known = true;
}
