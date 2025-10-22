// Firebase configuration for React Native
// Note: React Native Firebase uses native modules and is configured via native files
// For Android: android/app/google-services.json
// For iOS: ios/GoogleService-Info.plist

// This file exports Firebase instances for use in the app
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export { auth, firestore };
