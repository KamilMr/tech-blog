---
date: 2025-09-21
language: English
title: Setting Up Firebase App Distribution with EAS Build
subtitle: Automating APK distribution to testers after successful builds
tags:
  - Firebase
  - Expo
---
I was working on automating the distribution of my React Native app builds to testers using Firebase App Distribution. The goal was to automatically distribute APKs to a test group whenever EAS Build completes successfully.

After setting up EAS Build for my Expo React Native app, I needed a way to automatically distribute the generated APKs to testers without manual intervention. I wanted the distribution to happen seamlessly as part of the build process.

I initially thought I needed the React Native Firebase packages for app distribution:
- `@react-native-firebase/app`
- `@react-native-firebase/app-distribution`

However, I quickly realized these packages are for **notifying users about new app versions** from within the app, not for uploading APKs to Firebase from the build process.

Before proceeding, you need to set up a project in the [Firebase Console](https://console.firebase.google.com). Follow Firebase's official [App Distribution setup guide](https://firebase.google.com/docs/app-distribution/android/distribute-console) to create your project, register your Android app, and set up tester groups. 

The solution was to use Firebase CLI tools during the build process:

```bash
npm install --save-dev firebase-tools
```

### EAS Build Hook Configuration

I added a post-build hook in `package.json`:

```json
{
  "scripts": {
    "eas-build-on-success": "firebase appdistribution:distribute $EAS_BUILD_PATH --app $FIREBASE_APP_ID --groups testers --release-notes 'EAS Build'"
  }
}
```

### Environment Variables

I added the required environment variables through the Expo website (expo.dev) in the project settings - no need to update `eas.json` manually:

- `EAS_BUILD_PATH`: `android/app/build/outputs/apk/release/app-release.apk`
- `FIREBASE_APP_ID`: Your Firebase app identifier from Firebase console
- `GOOGLE_APPLICATION_CREDENTIALS`: Service account key for authentication

The post-build hook `eas-build-on-success` runs automatically after successful builds and distributes to the "testers" group (predefined in Firebase App Distribution console).

Now when EAS Build completes successfully, the APK is automatically uploaded to Firebase App Distribution and distributed to the "testers" group with release notes. This eliminates the manual step of uploading builds and ensures testers get notified immediately.
# Links
- [React Native Firebase Documentation](https://rnfirebase.io) 