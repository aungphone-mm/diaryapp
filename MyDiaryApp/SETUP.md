# MyDiaryApp - React Native Mobile Setup

This is the React Native mobile version of the Diary App with Firebase integration.

## Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Firebase project with iOS and Android apps configured

## Installation

1. Install dependencies:
```bash
cd MyDiaryApp
npm install
```

2. Install iOS pods (macOS only):
```bash
cd ios
pod install
cd ..
```

## Firebase Configuration

### Android Setup

1. Go to Firebase Console (https://console.firebase.google.com/)
2. Select your project: `apdiary-f00e3`
3. Add an Android app or select existing Android app
4. Download `google-services.json`
5. Place it in `android/app/google-services.json`

The `android/app/build.gradle` should already have:
```gradle
apply plugin: 'com.google.gms.google-services'
```

And `android/build.gradle` should have:
```gradle
dependencies {
    classpath 'com.google.gms:google-services:4.3.15'
}
```

### iOS Setup

1. Go to Firebase Console
2. Select your project: `apdiary-f00e3`
3. Add an iOS app or select existing iOS app
4. Download `GoogleService-Info.plist`
5. Open `ios/MyDiaryApp.xcworkspace` in Xcode
6. Drag `GoogleService-Info.plist` into the project (make sure "Copy items if needed" is checked)

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Features

- User Authentication (Email/Password)
  - Login
  - Sign Up
  - Password Reset

- Diary Management
  - Create new entries
  - View all entries
  - Real-time sync with Firestore

- Navigation
  - Stack navigation between screens
  - Conditional rendering based on auth state

## Project Structure

```
MyDiaryApp/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Firebase configuration
│   └── components/
│       ├── Login.tsx             # Login screen
│       ├── SignUp.tsx            # Sign up screen
│       ├── PasswordReset.tsx     # Password reset screen
│       ├── NewEntry.tsx          # Create diary entry
│       └── EntryList.tsx         # View all entries
├── App.tsx                       # Main app component with navigation
├── android/                      # Android native code
├── ios/                          # iOS native code
└── package.json
```

## Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### iOS Build Issues
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android Build Issues
```bash
cd android
./gradlew clean
cd ..
```

## Important Notes

1. **Firebase Configuration**: You MUST add the `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) files for the app to work properly.

2. **Native Dependencies**: After installing dependencies, you need to rebuild the native projects:
   - iOS: `cd ios && pod install && cd ..`
   - Android: Build automatically handles this

3. **First Run**: The first build may take several minutes as it compiles native dependencies.

4. **Firebase Project**: This app uses the same Firebase project as the web version (`apdiary-f00e3`).

## Development

To develop this app:

1. Make sure the Firebase configuration files are in place
2. Start Metro bundler: `npm start`
3. Run on iOS: `npm run ios` or Android: `npm run android`
4. Make changes to source files and reload the app (cmd+R on iOS, R+R on Android)

## Database Structure

The app uses the same Firestore structure as the web version:

```
users/
  {uid}/
    entries/
      {entryId}
        - title: string
        - content: string
        - createdAt: timestamp
```
