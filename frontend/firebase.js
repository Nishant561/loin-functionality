// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-1eba7.firebaseapp.com",
  projectId: "mern-auth-1eba7",
  storageBucket: "mern-auth-1eba7.appspot.com",
  messagingSenderId: "575781884010",
  appId: "1:575781884010:web:3596d20aab16940d9afa13"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);