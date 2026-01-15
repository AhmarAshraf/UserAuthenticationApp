# React Native Auth App

A clean authentication app built with React Native featuring login, signup, and user profile screens with form validation and secure local storage.

## Prerequisites

- Node.js v20.20.0 (npm v10.8.2)
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

## Installation

First, install the base dependencies:

```bash
npm install
```

Then install required packages:

```bash
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage react-native-vector-icons react-native-toast-message
```

For iOS, install pods:

```bash
cd ios && pod install && cd ..
```

If you encounter errors, perform a clean installation:

```bash
rm -rf node_modules package-lock.json
npm install
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
```

## Vector Icons Setup

**Android:** Add this to `android/app/build.gradle`:

```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

**iOS:** Pods handle this automatically.

## Running the App

```bash
npm run ios
npm run android
```

## Project Structure

```
src/
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── AppHeader.tsx
├── constants/
│   └── colors.ts
├── context/
│   └── AuthContext.tsx
├── navigation/
│   └── AppNavigator.tsx
├── screens/
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   └── HomeScreen.tsx
├── utils/
│   └── ToastService.ts
├── types.ts
└── App.tsx
```

## Features

- User authentication with signup and login
- Form validation with real-time error messages
- Secure local storage using AsyncStorage
- Password visibility toggle
- Toast notifications for user feedback
- Responsive design with SafeAreaView
- Clean, modern UI with custom components
- TypeScript support
- Navigation flow management

## How It Works

The app uses AsyncStorage to persist user credentials locally. On signup, user data is stored. On login, credentials are validated against stored data. Authentication state is managed through React Context for global access.

## Tech Stack

- React Native
- TypeScript
- React Navigation (Native Stack)
- AsyncStorage
- React Native Vector Icons
- React Native Toast Message

## Troubleshooting

Clear Metro cache:
```bash
npm start -- --reset-cache
```

Clean iOS build:
```bash
cd ios && xcodebuild clean && cd ..
```

Clean Android build:
```bash
cd android && ./gradlew clean && cd ..
```

Full clean install:
```bash
rm -rf node_modules package-lock.json
npm install
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
```