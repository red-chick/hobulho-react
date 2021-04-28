import firebase from "firebase/app";
import { Dispatch, useReducer } from "react";

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
  Dispatch<ConfirmationActionType>
] => {
  const [confirmationState, confirmationDispatch] = useReducer(
    confirmationReducer,
    initialConfirmationState
  );

  return [confirmationState, confirmationDispatch];
};

export default useConfirmationReducer;
