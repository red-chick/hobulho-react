import firebase from "firebase";

import { firebaseApp } from "../../common/utils/firebase";

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

export const loginConfirm = async () => {};
