# R8 keep rules for release builds.

# Capacitor bridge calls plugin methods by reflection and uses a JavaScript interface.
-keepattributes *Annotation*
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }
-keep @com.getcapacitor.annotation.CapacitorPlugin public class * { *; }
-keep class * extends com.getcapacitor.Plugin { *; }

# Capacitor plugins used by this app
-keep class com.getcapacitor.community.admob.** { *; }
-keep class com.getcapacitor.community.speechrecognition.** { *; }
-keep class com.getcapacitor.community.tts.** { *; }
-keep class com.capacitorjs.plugins.** { *; }

# Cordova compatibility layer shipped with Capacitor
-keep class org.apache.cordova.** { *; }

# Google Mobile Ads and UMP ship their own consumer rules; these are extra safety.
-keep class com.google.android.gms.ads.** { *; }
-keep class com.google.android.ump.** { *; }

# Keep line numbers for readable crash reports in Play Console
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
