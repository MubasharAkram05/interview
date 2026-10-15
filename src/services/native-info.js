import { Capacitor, registerPlugin } from '@capacitor/core';

/**
 * Bridge to the app's own small native plugin (BuildInfoPlugin.java).
 * Every call fails safe: on the web or on any error it returns null.
 */
const BuildInfo = registerPlugin('BuildInfo');

export async function nativeIsDebug() {
  if (!Capacitor.isNativePlatform()) return null;
  try {
    return !!(await BuildInfo.isDebug()).debug;
  } catch {
    return null;
  }
}

/** { debug, versionName, versionCode, sdkInt, device, density, webView } */
export async function nativeAppInfo() {
  if (!Capacitor.isNativePlatform()) return null;
  try {
    return await BuildInfo.getInfo();
  } catch {
    return null;
  }
}

/** Real banner frame in CSS px relative to the WebView: { found, top, height, width, insetTop, ... } */
export async function nativeAdLayout() {
  if (!Capacitor.isNativePlatform()) return null;
  try {
    return await BuildInfo.getAdLayout();
  } catch {
    return null;
  }
}
