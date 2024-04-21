// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecomnest-fbb98.firebaseapp.com",
  projectId: "ecomnest-fbb98",
  storageBucket: "ecomnest-fbb98.appspot.com",
  messagingSenderId: "661351725338",
  appId: "1:661351725338:web:32ef138afcf8bbf09e14a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);