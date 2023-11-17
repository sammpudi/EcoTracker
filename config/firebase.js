// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1QBNQOTFVBwEQLsCl51PHOEUyyFbmELA",
  authDomain: "ecotracker-v2.firebaseapp.com",
  projectId: "ecotracker-v2",
  storageBucket: "ecotracker-v2.appspot.com",
  messagingSenderId: "594498137118",
  appId: "1:594498137118:web:7682d3b8efd7052928120f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth(app);
export default {app}