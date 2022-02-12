import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHXDgmIoBEZ5VSFI_Y4Su5KBzK3ogXWpY",
  authDomain: "socialmedia-16632.firebaseapp.com",
  projectId: "socialmedia-16632",
  storageBucket: "socialmedia-16632.appspot.com",
  messagingSenderId: "461830245062",
  appId: "1:461830245062:web:8467e1d49afdc097b865c7"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);