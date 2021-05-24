import { Dispatch, useReducer } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";

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

const useLoginReducer = (): [
  LoginStateType,
  (confirmationResult: firebase.auth.ConfirmationResult, auth: string) => void
] => {
  const router = useRouter();
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  const login = (
    confirmationResult: firebase.auth.ConfirmationResult,
    auth: string
  ) => {
    if (!confirmationResult) return;

    loginDispatch({ type: "LOADING" });

    confirmationResult
      .confirm(auth)
      .then(({ user: { uid } }) => {
        // console.log("uid", uid);
        router.push("/");
      })
      .catch((error) => loginDispatch({ type: "ERROR", error }));
  };

  return [loginState, login];
};

export default useLoginReducer;
