import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: "hobulho-eda2c.firebaseapp.com",
  projectId: "hobulho-eda2c",
  storageBucket: "hobulho-eda2c.appspot.com",
  messagingSenderId: "564285115666",
  appId: "1:564285115666:web:10a254b5640d4b0d81f7cb",
  measurementId: "G-K7TQ9D8WFM",
});

firebaseApp.auth().languageCode = "ko";

export const db = firebaseApp.firestore();

export default { db, firebaseApp };
