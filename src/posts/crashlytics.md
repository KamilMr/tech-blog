---
title: Adding Firebase Crashlytics to Expo React Native
subtitle: Track crashes and errors in your production app
date: 2025-12-21
language: English
tags:
  - crashlytics
  - expo
  - react-native
  - firebase
  - how-to
---
## The Problem

Your app works on your device. You publish it. Users report "the app crashes when I..." but you can't reproduce it. You have no logs, no stack trace, nothing.

I didn't think crash tracking was important at first to me. Only me and one other person were using my home finance app, Wiewiorka. Every time she or I had a problem, I could understand and fix it directly.

But once more people started testing, bugs appeared that I couldn't reproduce. Someone added categories that didn't sync, then added expenses - nothing synced. I had no idea why. 
## What is Crashlytics?

Firebase Crashlytics captures crash reports and errors from your production app. When something breaks on a user's device, you get:

- Stack trace showing exactly where it failed
- Device info (OS version, device model)
- User context you set (user ID, custom attributes)
- Breadcrumb logs leading up to the crash
## Installation

Installation is pretty simple. Two packages:

```bash
pnpm add @react-native-firebase/app @react-native-firebase/crashlytics
```

Then add them to the `plugins` array in `app.config.js`:

```js
plugins: [
  "@react-native-firebase/app",
  "@react-native-firebase/crashlytics"
],
```

Expo handles the native configuration automatically.
## Firebase Configuration File

You will use the Firebase service that needs to know which project to send crashes to. You need a `google-services.json` file. Here is basic guidelines I followed to get the required file.

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project (or use existing)
3. Add an Android app with your package name (e.g., `com.some.name`)
4. Download `google-services.json`
5. Place it in your project root

Then reference it in `app.config.js`:

```js
android: {
  package: "com.yourcompany.yourapp",
  googleServicesFile: "./google-services.json",
},
```

> **Tip for CI/CD**: Don't commit `google-services.json` to git. Use EAS secrets:
> ```js
> googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
> ```

## Using Crashlytics

Now you need code that logs events and captures context. The main methods from `@react-native-firebase/crashlytics`:

- **`log(message)`** - Breadcrumbs showing what happened before a crash
- **`recordError(error)`** - Log non-fatal errors you catch
- **`setUserId(id)`** - Link crashes to specific users
- **`setAttribute(key, value)`** - Add custom context
- **`crash()`** - Force a crash for testing

### What I learned

Setting up debugging is more important than I thought, especially when testing with real people. Even more so as a solo developer. Debugging untracked issues is not easy - it eats your time hour after hour. That's time you can't afford when you should be delivering features.

So: 
- Early set tracing bugs in your projects (it does not take that much time)
- Wrap everything in try-catch. Crashlytics is a monitoring tool - it should never break your app. If the SDK throws, your app should keep working.