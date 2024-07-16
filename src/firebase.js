// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRJbmGLQTyq7Jk2cgop3nQagqDGvMr4e8",
  authDomain: "company-63ac5.firebaseapp.com",
  projectId: "company-63ac5",
  storageBucket: "company-63ac5.appspot.com",
  messagingSenderId: "237084874356",
  appId: "1:237084874356:web:7907a4e58eb434c3af6321",
  measurementId: "G-P11N4XSWS0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export  { auth, db }

