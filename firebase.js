// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgrkVfZWnLtMiHoH6q0fuLRTZc7wvzU0I",
  authDomain: "flashcards-9c77d.firebaseapp.com",
  projectId: "flashcards-9c77d",
  storageBucket: "flashcards-9c77d.appspot.com",
  messagingSenderId: "102100000008",
  appId: "1:102100000008:web:a34b44f73a108fffd360bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db; 
