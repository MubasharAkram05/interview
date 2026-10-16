package com.sussalproductions.interviewsimulator;

import android.graphics.Color;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

// Capacitor registers npm plugins from capacitor.plugins.json automatically.
// Local plugins (inside this app) are registered here, before super.onCreate().
public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(BuildInfoPlugin.class);
        registerPlugin(VoicePlugin.class);
        super.onCreate(savedInstanceState);
        // Start-up: the window shows the logo on the brand gradient (res/drawable/launch_screen.xml)
        // and the WebView stays transparent until the page paints its own background. Set here in
        // code, after the splash theme has switched to the app theme, so it never falls back to a
        // blank black or blue window while the WebView starts (slow on the first start after install).
        try {
            getWindow().setBackgroundDrawableResource(R.drawable.launch_screen);
        } catch (Exception ignored) {
            // keep the theme background
        }
        try {
            if (bridge != null && bridge.getWebView() != null) bridge.getWebView().setBackgroundColor(Color.TRANSPARENT);
        } catch (Exception ignored) {
            // the page paints its own background anyway
        }
    }
}
