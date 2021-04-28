import { useReducer, useState } from "react";

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
  | { type: "ERROR"; error: any }
  | { type: "SET_QUESTIONS"; questions: QuestionType[] };

function QuestionsReducer(
  state: QuestionsStateType,
  action: QuestionsActionType
) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        error: null,
        ...state,
      };
    case "ERROR":
      return {
        loading: false,
        error: action.error,
        questions: [],
      };
    case "SET_QUESTIONS":
      return {
        loading: false,
        error: null,
        questions: action.questions,
      };
    default:
      return state;
  }
}

const useQuestions = () => {
  const [questionsState, questionsDispatch] = useReducer(
    QuestionsReducer,
    initialQuestionsState
  );

  const removeQuestion = (index) => {
    const questions = [...questionsState.questions];
    questions.splice(index, 1);
    questionsDispatch({ type: "SET_QUESTIONS", questions });
  };

  const getQuestions = (db) => {
    questionsDispatch({ type: "LOADING" });
    const questionsRef = db.collection("questions");
    questionsRef
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        questionsDispatch({ type: "SET_QUESTIONS", questions: data });
      })
      .catch((error) => {
        questionsDispatch({ type: "ERROR", error });
      });
  };

  return { questionsState, getQuestions, removeQuestion };
};

export default useQuestions;