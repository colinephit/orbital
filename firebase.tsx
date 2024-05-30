// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG8fYbqiFSvUchbcsTuKwVdju8lPGMroI",
  authDomain: "orbital-59b97.firebaseapp.com",
  projectId: "orbital-59b97",
  storageBucket: "orbital-59b97.appspot.com",
  messagingSenderId: "726678658112",
  appId: "1:726678658112:web:42cd77b9250fba9a3ed3a5",
  measurementId: "G-YC0KC6BC5N"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db } 