pluginManagement {
  repositories {
    google {
      content {
        includeGroupByRegex("com\\.android.*")
        includeGroupByRegex("com\\.google.*")
        includeGroupByRegex("androidx.*")
      }
    }
    mavenCentral()
    gradlePluginPortal()
  }
}

plugins { id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0" }

dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.PREFER_PROJECT)
  repositories {
    google()
    mavenCentral()
  }
}

rootProject.name = "Interview Simulator"

include(":app")

include(":capacitor-android")
project(":capacitor-android").projectDir = file("node_modules/@capacitor/android/capacitor")

include(":capacitor-community-admob")
project(":capacitor-community-admob").projectDir = file("node_modules/@capacitor-community/admob/android")

include(":capacitor-app")
project(":capacitor-app").projectDir = file("node_modules/@capacitor/app/android")

include(":capacitor-status-bar")
project(":capacitor-status-bar").projectDir = file("node_modules/@capacitor/status-bar/android")

include(":capacitor-splash-screen")
project(":capacitor-splash-screen").projectDir = file("node_modules/@capacitor/splash-screen/android")
