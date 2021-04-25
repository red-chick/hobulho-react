import { Dispatch, useReducer } from "react";

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

const useLoginReducer = (): [LoginStateType, Dispatch<LoginActionType>] => {
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  return [loginState, loginDispatch];
};

export default useLoginReducer;
