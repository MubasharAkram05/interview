package com.sussalproductions.interviewsimulator;

import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.core.splashscreen.SplashScreen;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebViewListener;
import java.util.WeakHashMap;

// Capacitor registers npm plugins from capacitor.plugins.json automatically.
// Local plugins (inside this app) are registered here, before super.onCreate().
public class MainActivity extends BridgeActivity {

    // Longest time the logo splash may stay if the page never reports that it is visible.
    private static final long SPLASH_MAX_MS = 6000;

    // Largest text zoom (percent) taken from the phone's font size setting.
    private static final int MAX_TEXT_ZOOM = 115;

    // After the page load event, wait this long for the page's own "painted" signal.
    private static final long PAGE_LOADED_GRACE_MS = 1500;

    // Splash fade-out and WebView fade-in when the welcome screen is ready (no sudden jump).
    private static final long FADE_MS = 280;

    private volatile boolean pageVisible = false;
    private boolean revealed = false;

    /**
     * The welcome screen is ready to draw (BuildInfo.appReady waits for postVisualStateCallback,
     * which is the documented way to show a WebView without a blank first frame): make the
     * WebView visible, fading in, and let Android's splash fade out on top of it.
     */
    public void onWebReady() {
        runOnUiThread(() -> {
            if (revealed) return;
            revealed = true;
            try {
                WebView wv = bridge != null ? bridge.getWebView() : null;
                if (wv != null) {
                    wv.setAlpha(0f);
                    wv.setVisibility(View.VISIBLE);
                    wv.animate().alpha(1f).setDuration(FADE_MS).start();
                }
            } catch (Exception ignored) {
                // still let the splash go
            }
            pageVisible = true;
        });
    }

    // Ads: the banner fades in when it appears or shows a new ad, instead of popping up.
    private static final String AD_VIEW_CLASS = "com.google.android.gms.ads.AdView";
    private static final long AD_FADE_MS = 300;
    private final WeakHashMap<View, Boolean> fadedAds = new WeakHashMap<>();
    private boolean adShown = false;

    private View findAdView(View v) {
        if (v == null) return null;
        if (AD_VIEW_CLASS.equals(v.getClass().getName())) return v;
        if (v instanceof ViewGroup) {
            ViewGroup g = (ViewGroup) v;
            for (int i = 0; i < g.getChildCount(); i++) {
                View found = findAdView(g.getChildAt(i));
                if (found != null) return found;
            }
        }
        return null;
    }

    private void fadeIn(View v) {
        v.animate().cancel();
        v.setAlpha(0f);
        v.animate().alpha(1f).setDuration(AD_FADE_MS).start();
    }

    /** Runs before each layout pass is drawn, so a new banner never shows at full opacity first. */
    private void fadeInAds() {
        try {
            View ad = findAdView(getWindow().getDecorView());
            if (ad == null) {
                adShown = false;
                return;
            }
            boolean shown = ad.isShown() && ad.getHeight() > 0;
            if (shown && !adShown) fadeIn(ad); // banner created or shown again after a dialog
            adShown = shown;
            if (shown && ad instanceof ViewGroup && ((ViewGroup) ad).getChildCount() > 0) {
                View creative = ((ViewGroup) ad).getChildAt(0);
                if (creative.getHeight() > 0 && !fadedAds.containsKey(creative)) {
                    fadedAds.put(creative, Boolean.TRUE);
                    fadeIn(creative); // a newly loaded ad
                }
            }
        } catch (Exception ignored) {
            // never break the layout pass for an animation
        }
    }

    private void applyLaunchBackground() {
        try {
            getWindow().setBackgroundDrawableResource(R.drawable.launch_screen);
        } catch (Exception ignored) {
            // keep the theme background
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        // SystemBars resets the window background on configuration changes too.
        new Handler(Looper.getMainLooper()).post(this::applyLaunchBackground);
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
        splash.setOnExitAnimationListener(provider -> {
            try {
                provider.getView().animate().alpha(0f).setDuration(FADE_MS).withEndAction(provider::remove).start();
            } catch (Exception e) {
                provider.remove();
            }
        });
        new Handler(Looper.getMainLooper()).postDelayed(this::onWebReady, SPLASH_MAX_MS);

        registerPlugin(BuildInfoPlugin.class);
        registerPlugin(VoicePlugin.class);
        super.onCreate(savedInstanceState);

        // Logo on the brand gradient behind the (transparent) WebView until the page paints.
        // Capacitor's SystemBars plugin replaces the WINDOW background right after start-up with
        // the theme's windowBackground read as a plain colour; for this drawable that gives a
        // meaningless colour, which showed as a blank white (or black) screen before the welcome
        // screen. So the logo also goes on the content view, which SystemBars never touches, and
        // the window background is set again after SystemBars has run.
        applyLaunchBackground();
        try {
            View content = findViewById(android.R.id.content);
            if (content != null) content.setBackgroundResource(R.drawable.launch_screen);
        } catch (Exception ignored) {
            // the window background still shows
        }
        new Handler(Looper.getMainLooper()).post(this::applyLaunchBackground);
        try {
            getWindow().getDecorView().getViewTreeObserver().addOnGlobalLayoutListener(this::fadeInAds);
        } catch (Exception ignored) {
            // ads just appear without the fade
        }
        if (bridge == null) {
            onWebReady();
            return;
        }
        try {
            WebView wv = bridge.getWebView();
            if (wv != null) {
                wv.setBackgroundColor(Color.TRANSPARENT);
                // Hidden until the welcome screen is ready: on some phones a new WebView draws a
                // white first frame on the first start, whatever its background colour.
                if (!revealed) wv.setVisibility(View.INVISIBLE);
            }
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
