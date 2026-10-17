package com.sussalproductions.interviewsimulator;

import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.core.splashscreen.SplashScreen;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebViewListener;

// Capacitor registers npm plugins from capacitor.plugins.json automatically.
// Local plugins (inside this app) are registered here, before super.onCreate().
public class MainActivity extends BridgeActivity {

    // Longest time the logo splash may stay if the page never reports that it is visible.
    private static final long SPLASH_MAX_MS = 6000;

    // Largest text zoom (percent) taken from the phone's font size setting.
    private static final int MAX_TEXT_ZOOM = 115;

    // After the page load event, wait this long for the page's own "painted" signal.
    private static final long PAGE_LOADED_GRACE_MS = 1500;

    private volatile boolean pageVisible = false;

    /** Called when the welcome screen is on screen: let Android's splash go. */
    public void onWebReady() {
        pageVisible = true;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Start-up: keep Android's splash (logo on brand blue) on screen until the web page has
        // painted its welcome screen. Without this the splash went away as soon as the empty window
        // drew, which showed a blank blue and then a black screen while the WebView started (slow
        // on the first start after install). The Capacitor SplashScreen plugin never installed the
        // splash because launchShowDuration is 0, so it is done here, before super.onCreate().
        SplashScreen splash = SplashScreen.installSplashScreen(this);
        splash.setKeepOnScreenCondition(() -> !pageVisible);
        new Handler(Looper.getMainLooper()).postDelayed(() -> pageVisible = true, SPLASH_MAX_MS);

        registerPlugin(BuildInfoPlugin.class);
        registerPlugin(VoicePlugin.class);
        super.onCreate(savedInstanceState);

        try {
            getWindow().setBackgroundDrawableResource(R.drawable.launch_screen);
        } catch (Exception ignored) {
            // keep the theme background
        }
        if (bridge == null) {
            pageVisible = true;
            return;
        }
        try {
            if (bridge.getWebView() != null) bridge.getWebView().setBackgroundColor(Color.TRANSPARENT);
        } catch (Exception ignored) {
            // the page paints its own background anyway
        }
        // Large system font: the WebView scales all text by the phone's font size. Above 115% the
        // question, answer box and buttons no longer fit on one screen, so cap the text zoom there
        // (text still grows with the setting up to that point).
        try {
            WebSettings ws = bridge.getWebView().getSettings();
            if (ws.getTextZoom() > MAX_TEXT_ZOOM) ws.setTextZoom(MAX_TEXT_ZOOM);
        } catch (Exception ignored) {
            // keep the default zoom
        }
        // The splash goes when the page says its welcome screen is in place (index.html calls
        // BuildInfo.appReady right after it). Releasing it as soon as the WebView committed the
        // page showed a short blank white screen: the page background was drawn before the
        // welcome screen existed. Fallbacks: shortly after the page load event, or on a load error.
        final Handler main = new Handler(Looper.getMainLooper());
        bridge.addWebViewListener(
            new WebViewListener() {
                @Override
                public void onPageLoaded(WebView webView) {
                    main.postDelayed(MainActivity.this::onWebReady, PAGE_LOADED_GRACE_MS);
                }

                @Override
                public void onReceivedError(WebView webView) {
                    onWebReady();
                }
            }
        );
    }
}
