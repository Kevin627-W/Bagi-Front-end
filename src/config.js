// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVzg2sLQk2MIgoscTIYLvLUZ7jlyFWEGY",
  authDomain: "proyek-final.firebaseapp.com",
  projectId: "proyek-final",
  storageBucket: "proyek-final.firebasestorage.app",
  messagingSenderId: "682061932898",
  appId: "1:682061932898:web:64a4b5f17aad67a373a43b",
  measurementId: "G-WQ2VD934J2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export { db, auth };
