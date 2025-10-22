import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBn2njtdk6LSYuFRCjD43fqx--81xbrEKE",
  authDomain: "apdiary-f00e3.firebaseapp.com",
  projectId: "apdiary-f00e3",
  storageBucket: "apdiary-f00e3.appspot.com",
  messagingSenderId: "3066711719",
  appId: "1:3066711719:web:042eef04e3b29572cc9582",
  measurementId: "G-BKVR2TFYW9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);