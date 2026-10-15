package com.sussalproductions.interviewsimulator;

import android.content.pm.ApplicationInfo;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Tells the web app whether this is a debug build, so diagnostic logs (ADS: ...)
 * are printed only in the debug APK and never in the Play Store release.
 */
@CapacitorPlugin(name = "BuildInfo")
public class BuildInfoPlugin extends Plugin {

    @PluginMethod
    public void isDebug(PluginCall call) {
        boolean debuggable = (getContext().getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        JSObject ret = new JSObject();
        ret.put("debug", debuggable);
        call.resolve(ret);
    }
}
