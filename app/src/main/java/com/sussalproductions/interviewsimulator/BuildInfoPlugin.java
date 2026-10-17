package com.sussalproductions.interviewsimulator;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Small native helper used by the web app:
 *  - isDebug / getInfo: build type and versions (debug panel, ADS: logs only in debug builds)
 *  - getAdLayout: where the AdMob banner really is on screen, relative to the WebView,
 *    so the app can check and correct the banner position on every phone.
 * Returns no ad unit IDs and nothing secret.
 */
@CapacitorPlugin(name = "BuildInfo")
public class BuildInfoPlugin extends Plugin {

    private static final String AD_VIEW_CLASS = "com.google.android.gms.ads.AdView";

    private boolean isDebuggable() {
        return (getContext().getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
    }

    @PluginMethod
    public void isDebug(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("debug", isDebuggable());
        call.resolve(ret);
    }

    /** The page has painted its welcome screen: MainActivity can remove the start-up splash. */
    @PluginMethod
    public void appReady(PluginCall call) {
        call.resolve();
        if (!(getActivity() instanceof MainActivity)) return;
        final MainActivity activity = (MainActivity) getActivity();
        activity.runOnUiThread(() -> {
            try {
                // Wait until the current page (with the welcome screen) is ready for the next draw.
                getBridge()
                    .getWebView()
                    .postVisualStateCallback(
                        0,
                        new WebView.VisualStateCallback() {
                            @Override
                            public void onComplete(long requestId) {
                                activity.onWebReady();
                            }
                        }
                    );
            } catch (Exception ex) {
                activity.onWebReady();
            }
        });
    }

    @PluginMethod
    public void getInfo(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("debug", isDebuggable());
        ret.put("sdkInt", Build.VERSION.SDK_INT);
        ret.put("device", Build.MANUFACTURER + " " + Build.MODEL);
        ret.put("density", getContext().getResources().getDisplayMetrics().density);
        try {
            PackageInfo pi = getContext().getPackageManager().getPackageInfo(getContext().getPackageName(), 0);
            ret.put("versionName", pi.versionName);
            ret.put("versionCode", Build.VERSION.SDK_INT >= Build.VERSION_CODES.P ? pi.getLongVersionCode() : pi.versionCode);
        } catch (Exception ignored) {
            // leave empty
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            try {
                PackageInfo wv = WebView.getCurrentWebViewPackage();
                if (wv != null) ret.put("webView", wv.packageName + " " + wv.versionName);
            } catch (Exception ignored) {
                // leave empty
            }
        }
        call.resolve(ret);
    }

    /**
     * Banner frame in CSS px (dp) relative to the top-left of the WebView.
     * found=false when no banner view is attached.
     */
    @PluginMethod
    public void getAdLayout(PluginCall call) {
        getActivity()
            .runOnUiThread(() -> {
                JSObject ret = new JSObject();
                try {
                    float d = getContext().getResources().getDisplayMetrics().density;
                    View webView = getBridge().getWebView();
                    int[] w = new int[2];
                    webView.getLocationInWindow(w);
                    ret.put("density", d);
                    ret.put("webViewTop", w[1] / d);
                    ret.put("webViewHeight", webView.getHeight() / d);

                    View root = getActivity().getWindow().getDecorView();
                    ret.put("windowHeight", root.getHeight() / d);
                    WindowInsetsCompat insets = ViewCompat.getRootWindowInsets(root);
                    if (insets != null) {
                        Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
                        ret.put("insetTop", bars.top / d);
                        ret.put("insetBottom", bars.bottom / d);
                    }

                    View ad = findAdView(root);
                    ret.put("found", ad != null);
                    if (ad != null) {
                        int[] a = new int[2];
                        ad.getLocationInWindow(a);
                        ret.put("visible", ad.isShown());
                        ret.put("top", (a[1] - w[1]) / d);
                        ret.put("left", (a[0] - w[0]) / d);
                        ret.put("width", ad.getWidth() / d);
                        ret.put("height", ad.getHeight() / d);
                    }
                    call.resolve(ret);
                } catch (Exception ex) {
                    call.reject("layout unavailable");
                }
            });
    }

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
}
