import { useRouter } from "next/router";
import { useEffect, useReducer, useRef } from "react";
import { useUserContext } from "../../common/contexts/UserContext";
import {
  addOneAnswer,
  addOneQuestion,
  getUserQuestions,
  hideOneQuestion,
} from "../../common/db/questions";
import { QuestionType } from "../../home/hooks/useQuestions";
import { getUser } from "../db/profile";

type ProfileStateType = {
  loading: boolean;
  error?: any;
  isUser: boolean;
  isOneSelf: boolean;
  questions: QuestionType[];
};

const initialProfileState = {
  loading: true,
  error: null,
  isUser: false,
  isOneSelf: false,
  questions: [],
};

type ProfileActionType =
  | { type: "LOADING" }
  | { type: "ERROR"; error: any }
  | { type: "SET_USER"; isUser: boolean; isOneSelf: boolean }
  | { type: "ADD_QUESTION"; question: QuestionType }
  | { type: "ADD_QUESTIONS"; questions: QuestionType[] }
  | { type: "REMOVE_QUESTION"; index: number }
  | {
      type: "ADD_ANSWER";
      id: string;
      uid: string;
      like: boolean;
      createdAt: number;
    };

function profileReducer(state: ProfileStateType, action: ProfileActionType) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "SET_USER":
      return {
        ...state,
        isUser: action.isUser,
        isOneSelf: action.isOneSelf,
        loading: false,
        error: null,
      };
    case "ADD_QUESTION":
      return {
        ...state,
        loading: false,
        error: null,
        questions: [action.question, ...state.questions],
      };
    case "ADD_QUESTIONS":
      return {
        ...state,
        loading: false,
        error: null,
        questions: [...state.questions, ...action.questions],
      };
    case "REMOVE_QUESTION":
      const questions = [...state.questions];
      questions.splice(action.index, 1);
      return {
        ...state,
        loading: false,
        error: null,
        questions,
      };
    case "ADD_ANSWER":
      return {
        ...state,
        loading: false,
        error: null,
        questions: state.questions.map((question: QuestionType) => {
          if (question.id === action.id) {
            const answers = [
              ...question.answers,
              {
                uid: action.uid,
                like: action.like,
                createdAt: action.createdAt,
              },
            ];
            return {
              ...question,
              answers,
            };
          }
          return question;
        }),
      };
    default:
      return state;
  }
}

const useProfile = () => {
  const { query } = useRouter();
  const { state: userState } = useUserContext();
  const alreadyGetQuestions = useRef(false);

  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    initialProfileState
  );

  useEffect(() => {
    if (query.uid && !userState.loading && !alreadyGetQuestions.current) {
      (async () => {
        alreadyGetQuestions.current = true;

        const { docs } = await getUser(query.uid as string);
        const userDoc = docs[0];

        let isUser = false;
        let isOneSelf = false;

        if (userDoc) {
          const user = userDoc.data();
          isUser = true;
          isOneSelf = user.uid === userState.uid;
          getQuestions(user.uid);
        }

        profileDispatch({
          type: "SET_USER",
          isUser,
          isOneSelf,
        });
      })();
    }
  }, [query, userState]);

  const getQuestions = async (uid: string) => {
    profileDispatch({ type: "LOADING" });

    try {
      const { docs } = await getUserQuestions(uid, 30, null);

      // if (docs.length < LIMIT) isEndQuestions.current = true;

      // lastVisibleRef.current = docs[docs.length - 1];

      const questions = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      profileDispatch({
        type: "ADD_QUESTIONS",
        questions: questions as QuestionType[],
      });
    } catch (error) {
      console.error(error);
      profileDispatch({ type: "ERROR", error });
    }
  };

  const addQuestion = async (title: string) => {
    profileDispatch({ type: "LOADING" });

    try {
      const createdAt = Date.now();
      const { uid } = userState;
      const { id } = await addOneQuestion(uid, createdAt, title);

      profileDispatch({
        type: "ADD_QUESTION",
        question: {
          id,
          uid,
          title,
          createdAt,
          answers: [],
        },
      });
    } catch (error) {
      profileDispatch({ type: "ERROR", error });
    }
  };

  const removeQuestion = async (index: number, id: string) => {
    profileDispatch({ type: "LOADING" });

    try {
      await hideOneQuestion(id);
      profileDispatch({ type: "REMOVE_QUESTION", index });
    } catch (error) {
      profileDispatch({ type: "ERROR", error });
    }
  };

  const addAnswer = async (id: string, like: boolean) => {
    const createdAt = Date.now();
    const { uid } = userState;

    profileDispatch({ type: "ADD_ANSWER", id, uid, like, createdAt });

    addOneAnswer(id, uid, like, createdAt);
  };

  return { profileState, addQuestion, removeQuestion, addAnswer };
};

export default useProfile;
