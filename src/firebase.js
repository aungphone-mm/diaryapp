import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBn2njtdk6LSYuFRCjD43fqx--81xbrEKE",
  authDomain: "apdiary-f00e3.firebaseapp.com",
  projectId: "apdiary-f00e3",
  storageBucket: "apdiary-f00e3.appspot.com",
  messagingSenderId: "3066711719",
  appId: "1:3066711719:web:042eef04e3b29572cc9582",
  measurementId: "G-BKVR2TFYW9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;