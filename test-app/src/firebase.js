// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjWkS0LRv4ZOOrpFUg-UsGe2_NIw4rQAE",
  authDomain: "coversphere-db26e.firebaseapp.com",
  projectId: "coversphere-db26e",
  storageBucket: "coversphere-db26e.firebasestorage.app",
  messagingSenderId: "368978355529",
  appId: "1:368978355529:web:cf6839fe2dfe5cb4302698",
  measurementId: "G-QXK83MWVJF",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
