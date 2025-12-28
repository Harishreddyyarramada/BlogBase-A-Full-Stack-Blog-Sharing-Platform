import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCP0LyXOyEzTeZNTer2wgm1B82rOHQEPLI",
  authDomain: "blogbase-9baa9.firebaseapp.com",
  projectId: "blogbase-9baa9",
  storageBucket: "blogbase-9baa9.firebasestorage.app",
  messagingSenderId: "274521930332",
  appId: "1:274521930332:web:6fe3b105590a03eb638499",
  measurementId: "G-389H4HN683"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
