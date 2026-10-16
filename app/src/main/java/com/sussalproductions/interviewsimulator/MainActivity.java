package com.sussalproductions.interviewsimulator;

import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.webkit.WebView;
import androidx.core.splashscreen.SplashScreen;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebViewListener;

// Capacitor registers npm plugins from capacitor.plugins.json automatically.
// Local plugins (inside this app) are registered here, before super.onCreate().
public class MainActivity extends BridgeActivity {

    // Longest time the logo splash may stay if the page never reports that it is visible.
    private static final long SPLASH_MAX_MS = 6000;

    private volatile boolean pageVisible = false;

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
        bridge.addWebViewListener(
            new WebViewListener() {
                @Override
                public void onPageCommitVisible(WebView view, String url) {
                    // The page is about to draw: give it one frame, then let the splash go.
                    view.postVisualStateCallback(
                        0,
                        new WebView.VisualStateCallback() {
                            @Override
                            public void onComplete(long requestId) {
                                pageVisible = true;
                            }
                        }
                    );
                }

                @Override
                public void onPageLoaded(WebView webView) {
                    pageVisible = true;
                }

                @Override
                public void onReceivedError(WebView webView) {
                    pageVisible = true;
                }
            }
        );
    }
}
