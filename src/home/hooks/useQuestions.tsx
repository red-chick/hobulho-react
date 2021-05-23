import { useReducer } from "react";
import { useUserContext } from "../../common/contexts/UserContext";
import { getAll, addOne, hideOne, updateNewAnswer } from "../db/questions";

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

  const addAnswer = async (id: string, like: boolean) => {
    const createdAt = Date.now();

    questionsDispatch({ type: "ADD_ANSWER", id, uid, like, createdAt });

    updateNewAnswer(id, uid, like, createdAt);
  };

  return {
    questionsState,
    getQuestions,
    addQuestion,
    removeQuestion,
    addAnswer,
  };
};

export default useQuestions;
