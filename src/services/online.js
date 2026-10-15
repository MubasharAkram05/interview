import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';

/**
 * One helper for every feature that needs internet (voice input, online policy page).
 * The rest of the app works without internet.
 */

export const OFFLINE_MESSAGES = {
  voice: 'You are offline. Voice input needs internet. You can type your answer instead.',
  policy: 'You are offline. The full policy is shown above, so you can still read it here.',
  generic: 'You are offline. This feature needs internet.'
};

export async function isOnline() {
  try {
    if (Capacitor.isNativePlatform()) {
      const s = await Network.getStatus();
      return !!s.connected;
    }
  } catch {
    // If the check itself fails, fall back to the browser flag.
  }
  return typeof navigator === 'undefined' ? true : navigator.onLine !== false;
}

/**
 * Returns true when online. When offline it calls notify() with a friendly message and returns false.
 */
export async function requireOnline(feature, notify) {
  if (await isOnline()) return true;
  if (notify) notify(OFFLINE_MESSAGES[feature] || OFFLINE_MESSAGES.generic);
  return false;
}
