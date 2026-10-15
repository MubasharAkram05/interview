import { Capacitor, registerPlugin } from '@capacitor/core';

/**
 * Diagnostic logging that only prints in a debug build (debug APK).
 * The release build from the Play Store never prints these lines.
 * Never pass secrets, IDs or user data to these functions.
 */

const BuildInfo = registerPlugin('BuildInfo');

let enabled = false;
let known = false; // true once we know if this is a debug build
const queue = []; // logs made before that (startup only)

export const debugReady = (async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      enabled = !!(await BuildInfo.isDebug()).debug;
    } else {
      enabled = !!import.meta.env.DEV;
    }
  } catch {
    enabled = false;
  }
  known = true;
  if (enabled) queue.forEach(args => console.log(...args));
  queue.length = 0;
  return enabled;
})();

/** adsLog('loaded') -> "ADS: loaded" (debug build only). */
export function adsLog(...parts) {
  const args = ['ADS:', ...parts];
  if (enabled) console.log(...args);
  else if (!known && queue.length < 50) queue.push(args);
}
