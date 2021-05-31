import { useReducer, useRef } from "react";
import { useUserContext } from "../../common/contexts/UserContext";

import firebase from "firebase";
import {
  addOneAnswer,
  getAllQuestions,
  hideOneQuestion,
} from "../../common/db/questions";

export type AnswerType = {
  like: boolean;
  uid: string;
  createdAt: number;
};

export type QuestionType = {
  id: string;
  title: string;
  uid: string;
  createdAt: number;
  answers: AnswerType[];
};

type QuestionsStateType = {
  loading: boolean;
  error?: any;
  questions: QuestionType[] | [];
};

const initialQuestionsState = {
  loading: true,
  error: null,
  questions: [],
};

type QuestionsActionType =
  | { type: "LOADING" }
  | { type: "END_LOADING" }
  | { type: "ERROR"; error: any }
  | { type: "ADD_QUESTIONS"; questions: QuestionType[] }
  | { type: "REMOVE_QUESTION"; index: number }
  | {
      type: "ADD_ANSWER";
      id: string;
      uid: string;
      like: boolean;
      createdAt: number;
    };

function QuestionsReducer(
  state: QuestionsStateType,
  action: QuestionsActionType
) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "END_LOADING":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        error: action.error,
        questions: [],
      };
    case "ADD_QUESTIONS":
      return {
        loading: false,
        error: null,
        questions: [...state.questions, ...action.questions],
      };
    case "REMOVE_QUESTION":
      const questions = [...state.questions];
      questions.splice(action.index, 1);
      return {
        loading: false,
        error: null,
        questions,
      };
    case "ADD_ANSWER":
      return {
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

const LIMIT = 30;

const useQuestions = () => {
  const [questionsState, questionsDispatch] = useReducer(
    QuestionsReducer,
    initialQuestionsState
  );
  const {
    state: { uid },
  } = useUserContext();

  const lastVisibleRef =
    useRef<
      firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    >(null);
  const isEndQuestions = useRef(false);

  const getQuestions = async () => {
    if (isEndQuestions.current) return;

    questionsDispatch({ type: "LOADING" });

    try {
      const { docs } = await getAllQuestions(LIMIT, lastVisibleRef.current);

      if (docs.length < LIMIT) isEndQuestions.current = true;

      lastVisibleRef.current = docs[docs.length - 1];

      const questions = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      questionsDispatch({
        type: "ADD_QUESTIONS",
        questions: questions as QuestionType[],
      });
    } catch (error) {
      questionsDispatch({ type: "ERROR", error });
    }
  };

  const removeQuestion = async (index: number, id: string) => {
    questionsDispatch({ type: "LOADING" });

    try {
      await hideOneQuestion(id);
      questionsDispatch({ type: "REMOVE_QUESTION", index });
    } catch (error) {
      questionsDispatch({ type: "ERROR", error });
    }
  };

  const addAnswer = async (id: string, like: boolean) => {
    const createdAt = Date.now();

    questionsDispatch({ type: "ADD_ANSWER", id, uid, like, createdAt });

    addOneAnswer(id, uid, like, createdAt);
  };

  return {
    questionsState,
    getQuestions,
    removeQuestion,
    addAnswer,
  };
};

export default useQuestions;
