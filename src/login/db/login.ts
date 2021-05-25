import firebase from "firebase";

import { db, firebaseApp } from "../../common/utils/firebase";

export const signInWithPhoneNumber = async (
  phone: string,
  recaptchaVerifier: firebase.auth.RecaptchaVerifier
) => {
  return firebaseApp
    .auth()
    .signInWithPhoneNumber(`+82${phone}`, recaptchaVerifier);
};

export const confirmAuth = async (
  auth: string,
  result: firebase.auth.ConfirmationResult
) => {
  return result.confirm(auth);
};

export const getUser = async (uid: string) => {
  return db.collection("users").where("uid", "==", uid).get();
};

export const addUser = async (uid: string, phone: string) => {
  return db
    .collection("users")
    .add({ uid, phone, birthYear: null, gender: null });
};
