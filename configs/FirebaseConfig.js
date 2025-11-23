// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXloZHcdBAQw-LrujsJc5f9WZlfT35FfI",
  authDomain: "ai-travel-app-b4934.firebaseapp.com",
  projectId: "ai-travel-app-b4934",
  storageBucket: "ai-travel-app-b4934.firebasestorage.app",
  messagingSenderId: "574399589862",
  appId: "1:574399589862:web:2b8a3a4db0241461973a27",
  measurementId: "G-5H2F7GQLRN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
