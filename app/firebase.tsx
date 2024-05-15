import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDG8fYbqiFSvUchbcsTuKwVdju8lPGMroI",
  authDomain: "orbital-59b97.firebaseapp.com",
  projectId: "orbital-59b97",
  storageBucket: "orbital-59b97.appspot.com",
  messagingSenderId: "726678658112",
  appId: "1:726678658112:web:42cd77b9250fba9a3ed3a5",
  measurementId: "G-YC0KC6BC5N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);