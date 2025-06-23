// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgfdu6Gb0-j1zL9XegSTM3HTxv1eTRfR4",
  authDomain: "g-gym-platform.firebaseapp.com",
  projectId: "g-gym-platform",
  storageBucket: "g-gym-platform.firebasestorage.app",
  messagingSenderId: "389822778956",
  appId: "1:389822778956:web:2a17198d92e28e3c7aeee9",
  measurementId: "G-RJT67FCL7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app); 