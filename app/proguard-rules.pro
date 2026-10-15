# Capacitor core and Webview JavascriptInterface
-keepattributes *Annotation*
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }

# Capacitor Plugins
-keep class com.getcapacitor.community.admob.** { *; }
-keep class com.capacitorjs.plugins.app.** { *; }
-keep class com.capacitorjs.plugins.statusbar.** { *; }
-keep class com.capacitorjs.plugins.splashscreen.** { *; }

# Google Play Services Ads & UMP
-keep public class com.google.android.gms.ads.** {
   public *;
}
-keep public class com.google.ads.** {
   public *;
}
-keep class com.google.android.ump.** { *; }

# Preserve line numbers and source file for release crash reporting
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
