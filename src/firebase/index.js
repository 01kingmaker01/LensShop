/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyP37Won1Qfz8QhA-19VingEMlTcW_PK4",
  authDomain: "lensshop-a021d.firebaseapp.com",
  databaseURL: "https://lensshop-a021d-default-rtdb.firebaseio.com",
  projectId: "lensshop-a021d",
  storageBucket: "lensshop-a021d.appspot.com",
  messagingSenderId: "434487393822",
  appId: "1:434487393822:web:6947f5c39bff4fd94b380f",
  measurementId: "G-4MWYWEPZKR",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
