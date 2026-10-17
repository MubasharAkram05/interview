import { Capacitor } from '@capacitor/core';
import { nativeIsDebug } from './native-info.js';

/**
 * Diagnostic logging. Lines start with "ADS:" and print to the console only in a debug
 * build (debug APK). The last 40 lines are also kept in memory for the debug panel.
 * Never pass secrets, real ad unit IDs or user data to these functions.
 */

// Console output exists only outside the release bundle: Vite replaces __DEBUG_TOOLS__ with false
// in `vite build`, so the minifier drops every console line below. (Unit tests run without Vite.)
const CONSOLE_ALLOWED = typeof __DEBUG_TOOLS__ === 'undefined' || __DEBUG_TOOLS__ === true;
function out(...args) {
  // eslint-disable-next-line no-console -- debug builds only (see CONSOLE_ALLOWED)
  if (CONSOLE_ALLOWED) console.log(...args);
}

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
  if (enabled) queue.forEach(args => out(...args));
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
  if (enabled) out(...args);
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
  out(line);
}

export function recentVoiceLog(n = 50) {
  return voiceRecent.slice(-n);
}

/** For tests: turn voice logging on without a native debug flag. */
export function _enableVoiceLogForTests() {
  enabled = true;
  known = true;
}

/** Errors the app caught (start-up, unhandled promise rejections): kept for the debug panel only. */
export function errorLog(where, err) {
  const msg = err && err.message ? err.message : String(err);
  recent.push(`ERR ${where}: ${msg}`.slice(0, 300));
  if (recent.length > 40) recent.shift();
  if (enabled) out('APP ERROR', where, msg);
}

// Global handlers: an unexpected error or rejected promise is logged (debug builds) and never
// shown to the user as a crash.
try {
  window.addEventListener('error', e => errorLog('error', e.error || e.message));
  window.addEventListener('unhandledrejection', e => {
    errorLog('promise', e.reason);
    e.preventDefault();
  });
} catch {}
