import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sussalproductions.interviewsimulator',
  appName: 'Interview Simulator',
  webDir: 'dist',
  // The Android Gradle project lives in the repo root (app/, settings.gradle.kts),
  // not in the usual android/ folder.
  android: {
    path: '.'
  },
  server: {
    androidScheme: 'https'
  },
  plugins: {
    // index.html uses viewport-fit=cover. Telling Capacitor up front avoids a layout jump after
    // start-up (it otherwise switches inset handling only after the page is shown).
    SystemBars: {
      initialViewportFitValueHint: 'cover'
    },
    SplashScreen: {
      // Kept until the page has painted (index.html hides it as soon as the welcome screen is
      // there). On the first start after install the WebView needs longer than a fixed time, and
      // an auto-hide showed a plain blue window in between.
      launchShowDuration: 1800,
      launchAutoHide: false,
      launchFadeOutDuration: 200,
      backgroundColor: '#2a45b5',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    },
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK',
      backgroundColor: '#2a45b5'
    }
  }
};

export default config;
