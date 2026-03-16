// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBBYTLcRO6juyL2-rc4Z6f4n--gXRvaQo",
  authDomain: "tripbuddy-6ce31.firebaseapp.com",
  projectId: "tripbuddy-6ce31",
  storageBucket: "tripbuddy-6ce31.firebasestorage.app",
  messagingSenderId: "722199329222",
  appId: "1:722199329222:web:f0596e31f730d186369ac7",
  measurementId: "G-8DPXSFREJM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)