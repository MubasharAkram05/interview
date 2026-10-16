import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sussalproductions.interviewsimulator',
  appName: 'Interview Simulator',
  webDir: 'dist',
  // The Android Gradle project lives in the repo root (app/, settings.gradle.kts),
  // not in the usual android/ folder.
  android: {
    path: '.',
    // Transparent WebView until the page paints, so the window background (logo on the brand
    // gradient, res/drawable/launch_screen.xml) shows instead of a blank colour.
    backgroundColor: '#00000000'
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
      // Android's splash goes as soon as the app draws; the window background then shows the logo
      // until the page paints (index.html also hides the splash early). Keeping the splash longer
      // only showed a plain blue screen when the app was opened from the installer.
      launchShowDuration: 0,
      launchAutoHide: true,
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
