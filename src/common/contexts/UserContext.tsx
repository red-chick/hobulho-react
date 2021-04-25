import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

export type StateType = {
  loading: boolean;
  uid?: string;
  error?: string;
};

const initialState: StateType = {
  loading: true,
  uid: undefined,
  error: undefined,
};

const loadingState: StateType = {
  loading: true,
  uid: undefined,
  error: undefined,
};

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const GET_USER_NO_AUTH = "GET_USER_NO_AUTH";

type ActionType =
  | { type: typeof GET_USER }
  | { type: typeof GET_USER_SUCCESS; data: string }
  | { type: typeof GET_USER_ERROR; error: string }
  | { type: typeof GET_USER_NO_AUTH };

const success = (data: string) => ({
  uid: data,
  loading: false,
  error: undefined,
});

const fail = (error: string) => ({
  user: undefined,
  loading: false,
  error,
});

const noAuth = () => ({
  user: undefined,
  loading: false,
  error: undefined,
});

const userReducer: Reducer<StateType, ActionType> = (
  _state: StateType,
  action: ActionType
) => {
  switch (action.type) {
    case GET_USER:
      return loadingState;
    case GET_USER_SUCCESS:
      return success(action.data);
    case GET_USER_ERROR:
      return fail(action.error);
    case GET_USER_NO_AUTH:
      return noAuth();
    default:
      throw new Error("UserReducer: Unhanded action type");
  }
};

export const dispatchGetUser = (dispatch: Dispatch<ActionType>): void => {
  dispatch({ type: GET_USER_NO_AUTH });
};

export const dispatchGetUserSuccess = (
  dispatch: Dispatch<ActionType>,
  uid: string
): void => {
  dispatch({ type: GET_USER_SUCCESS, data: uid });
};

export const dispatchGetUserError = (
  dispatch: Dispatch<ActionType>,
  error: string
): void => {
  dispatch({ type: GET_USER_ERROR, error });
};

export const dispatchGetUserNoAuth = (dispatch: Dispatch<ActionType>): void => {
  dispatch({ type: GET_USER_NO_AUTH });
};

type UserContextValue = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
  logout: Function;
};

const UserContext = createContext<UserContextValue>({} as UserContextValue);

type Props = {
  children: ReactNode;
};

export const UserContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const firebaseAppRef = useRef<any>(); //FIXME: 동적 import 때문에 firebase type 을 import 할 수가 없음
  const router = useRouter();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        let { firebaseApp } = await import("../utils/firebase");
        firebaseAppRef.current = firebaseApp;
        firebaseApp.auth().onAuthStateChanged((user) => {
          dispatchGetUser(dispatch);
          if (user) {
            dispatchGetUserSuccess(dispatch, user.uid);
            if (router.pathname === "/login") router.push("/");
          } else {
            dispatchGetUserNoAuth(dispatch);
          }
        });
      } catch (error) {
        dispatchGetUserError(dispatch, error);
      }
    };

    fetchAuth();
  }, []);

  const logout = () => {
    if (firebaseAppRef.current) {
      firebaseAppRef.current.auth().signOut();
    }
  };

  return (
    <UserContext.Provider value={{ state, dispatch, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextValue => {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error("Cannot find UserContext");
  }
  return value;
};

export default UserContextProvider;
