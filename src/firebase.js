import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDLni3uN8ktggoE6TobJPgTSLEA8rQtafs",
  authDomain: "talkyapp-72b69.firebaseapp.com",
  projectId: "talkyapp-72b69",
  storageBucket: "talkyapp-72b69.appspot.com",
  messagingSenderId: "335774986387",
  appId: "1:335774986387:web:4d69054bd16d35e85edd66",
};

const app = initializeApp(firebaseConfig);
export {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  getDatabase,
  ref,
  set,
  signInWithEmailAndPassword,
  signOut,
  push,
  onValue,
};
