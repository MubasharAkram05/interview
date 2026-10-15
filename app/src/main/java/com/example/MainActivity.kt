package com.example

import android.os.Bundle
import com.getcapacitor.BridgeActivity
import com.getcapacitor.community.admob.AdMob
import com.capacitorjs.plugins.app.AppPlugin
import com.capacitorjs.plugins.statusbar.StatusBarPlugin
import com.capacitorjs.plugins.splashscreen.SplashScreenPlugin

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(AdMob::class.java)
        registerPlugin(AppPlugin::class.java)
        registerPlugin(StatusBarPlugin::class.java)
        registerPlugin(SplashScreenPlugin::class.java)
        super.onCreate(savedInstanceState)
    }
}
