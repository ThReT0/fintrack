// src/firebase.jsx
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB2fwhpc-ReCYgfc0flZZGKqTKu6lL7USs",
    authDomain: "fintrack-d1058.firebaseapp.com",
    projectId: "fintrack-d1058",
    storageBucket: "fintrack-d1058.firebasestorage.app",
    messagingSenderId: "523079972946",
    appId: "1:523079972946:web:eeeb23fdb859b2987d078b",
    measurementId: "G-SX1B23WGH3"
  };
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app