import { useEffect, useReducer, useState } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";

import {
  addUser,
  getUser,
  confirmAuth,
  signInWithPhoneNumber,
} from "../db/login";

type LoginStateType = {
  loading: boolean;
  error?: any;
};

const initialLoginState = {
  loading: false,
  error: null,
};

type LoginActionType = { type: "LOADING" } | { type: "ERROR"; error: any };

function loginReducer(state: LoginStateType, action: LoginActionType) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

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

const useLogin = (): [
  ConfirmationStateType,
  LoginStateType,
  (phone: string) => void,
  (auth: string, phone: string) => void
] => {
  const router = useRouter();

  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    initialLoginState
  );
  const [confirmationState, confirmationDispatch] = useReducer(
    confirmationReducer,
    initialConfirmationState
  );
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<firebase.auth.RecaptchaVerifier>(null);

  useEffect(() => {
    setRecaptchaVerifier(
      new firebase.auth.RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
      })
    );
  }, []);

  const requestAuth = async (phone: string) => {
    confirmationDispatch({ type: "LOADING" });

    try {
      const result = await signInWithPhoneNumber(phone, recaptchaVerifier);
      confirmationDispatch({ type: "SET_RESULT", result });
    } catch (error) {
      confirmationDispatch({ type: "ERROR", error });
    }
  };

  const login = async (auth: string, phone: string) => {
    if (!confirmationState.result) return;

    loginDispatch({ type: "LOADING" });

    try {
      const {
        user: { uid },
      } = await confirmAuth(auth, confirmationState.result);
      const { docs } = await getUser(uid);
      if (docs.length <= 0) {
        await addUser(uid, phone);
        router.push("/information");
      } else {
        const { gender, birthYear } = docs[0].data();
        if (!gender || !birthYear) router.push("/information");
        router.push("/");
      }
    } catch (error) {
      loginDispatch({ type: "ERROR", error });
    }
  };

  return [confirmationState, loginState, requestAuth, login];
};

export default useLogin;
