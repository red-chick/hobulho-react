import { useReducer } from "react";
import { useUserContext } from "../../common/contexts/UserContext";
import { getAll, addOne, hideOne } from "../db/questions";

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
  | { type: "SET_QUESTIONS"; questions: QuestionType[] }
  | { type: "ADD_QUESTION"; question: QuestionType }
  | { type: "REMOVE_QUESTION"; index: number };

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
    case "ADD_QUESTION":
      return {
        loading: false,
        error: null,
        questions: [action.question, ...state.questions],
      };
    case "REMOVE_QUESTION":
      const questions = [...state.questions];
      questions.splice(action.index, 1);

      return {
        loading: false,
        error: null,
        questions,
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
  const {
    state: { uid },
  } = useUserContext();

  const getQuestions = async () => {
    questionsDispatch({ type: "LOADING" });

    try {
      const { docs } = await getAll();

      const questions = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      questionsDispatch({
        type: "SET_QUESTIONS",
        questions: questions as QuestionType[],
      });
    } catch (error) {
      questionsDispatch({ type: "ERROR", error });
    }
  };

  const removeQuestion = async (index: number, id: string) => {
    questionsDispatch({ type: "LOADING" });

    try {
      await hideOne(id);
      questionsDispatch({ type: "REMOVE_QUESTION", index });
    } catch (error) {
      questionsDispatch({ type: "ERROR", error });
    }
  };

  const addQuestion = async (title: string) => {
    questionsDispatch({ type: "LOADING" });

    try {
      const createdAt = Date.now();
      const { id } = await addOne(uid, createdAt, title);

      questionsDispatch({
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
      questionsDispatch({ type: "ERROR", error });
    }
  };

  return {
    questionsState,
    getQuestions,
    addQuestion,
    removeQuestion,
  };
};

export default useQuestions;
