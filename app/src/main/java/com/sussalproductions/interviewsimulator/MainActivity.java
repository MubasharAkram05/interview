package com.sussalproductions.interviewsimulator;

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
    }
}
