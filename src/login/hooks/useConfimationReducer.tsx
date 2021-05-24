import firebase from "firebase";
import { Dispatch, useEffect, useReducer, useState } from "react";
import { firebaseApp } from "../../common/utils/firebase";

type ConfirmationStateType = {
  loading: boolean;
  result?: firebase.auth.ConfirmationResult;
  error?: any;
};
const initialConfirmationState = {
  loading: false,
  result: null,
  error: null,
};
type ConfirmationActionType =
  | { type: "LOADING" }
  | { type: "SET_RESULT"; result: firebase.auth.ConfirmationResult }
  | { type: "ERROR"; error: any };

function confirmationReducer(
  state: ConfirmationStateType,
  action: ConfirmationActionType
) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SET_RESULT":
      return {
        loading: false,
        result: action.result,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
}

const useConfirmationReducer = (): [
  ConfirmationStateType,
  (phone: string) => void
] => {
  const [confirmationState, confirmationDispatch] = useReducer(
    confirmationReducer,
    initialConfirmationState
  );
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    setRecaptchaVerifier(
      new firebase.auth.RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
      })
    );
  }, []);

  const requestAuth = (phone: string) => {
    confirmationDispatch({ type: "LOADING" });
    firebaseApp
      .auth()
      .signInWithPhoneNumber(`+82${phone}`, recaptchaVerifier)
      .then((result) => confirmationDispatch({ type: "SET_RESULT", result }))
      .catch((error) => confirmationDispatch({ type: "ERROR", error }));
  };

  return [confirmationState, requestAuth];
};

export default useConfirmationReducer;
