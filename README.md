# React Native Auth App

A authentication app built with React Native featuring login, signup, and user profile screens.

## Getting Started

First things first, make sure you have your React Native environment set up. If not, check out the official docs.
Note: please use node version v20.20.0 (npm v10.8.2)

### Installation

First, install the base dependencies:

```bash
npm install
```

Then add the required packages:

```bash
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage react-native-vector-icons
```

For iOS, install pods (make sure you're in the project root):

```bash
cd ios && pod install && cd ..
```

If you get any errors, try cleaning and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
```

### Setting up Vector Icons

For Android, add this to `android/app/build.gradle`:

```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

For iOS, the pods should handle it automatically.

### Running the App

For iOS:

```bash
npm run ios
```

For Android:

```bash
npm run android
```

## Project Structure

```
src/
├── components/
│   └── Button.tsx
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
├── types.ts
└── App.tsx
```

## Features

- Clean, modern UI with smooth animations
- Secure authentication flow
- Form validation
- Local storage for user data
- Password visibility toggle
- Error handling with user-friendly messages
- Responsive design

## How It Works

The app uses AsyncStorage to store user credentials locally. When you sign up, your info gets saved. When you log in, it checks your credentials against what's stored. Super simple, but remember this is just for demo purposes - you'd want a real backend for production.

## Tech Stack

- React Native
- TypeScript
- React Navigation
- AsyncStorage
- React Native Vector Icons


## Troubleshooting

If you run into issues:

1. Clear Metro bundler cache: `npm start -- --reset-cache`
2. Clean build folders for iOS: `cd ios && xcodebuild clean && cd ..`
3. Clean build for Android: `cd android && ./gradlew clean && cd ..`
4. Reinstall pods: `cd ios && rm -rf Pods Podfile.lock && pod install && cd ..`
5. Full clean: `rm -rf node_modules package-lock.json && npm install`

