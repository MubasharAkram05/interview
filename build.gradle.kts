// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
  alias(libs.plugins.android.application) apply false
  alias(libs.plugins.kotlin.compose) apply false
  alias(libs.plugins.google.devtools.ksp) apply false
  alias(libs.plugins.secrets) apply false
  alias(libs.plugins.google.services) apply false
}

val ext = project.extensions.extraProperties
ext.set("compileSdkVersion", 36)
ext.set("minSdkVersion", 24)
ext.set("targetSdkVersion", 36)
ext.set("androidxAppCompatVersion", "1.7.1")
ext.set("androidxCoordinatorLayoutVersion", "1.3.0")
ext.set("androidxCoreKTXVersion", "1.15.0")
ext.set("playServicesAdsVersion", "23.6.0")
ext.set("userMessagingPlatformVersion", "3.1.0")
ext.set("kotlin_version", "2.2.10")
