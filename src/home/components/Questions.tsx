import firebase from "firebase/app";

import Question from "./questions/Question";

import { QuestionType } from "../hooks/useQuestions";

import { QuestionsContainer } from "./Questions.style";

type Props = {
  questions: QuestionType[];
  removeQuestion: Function;
  db: firebase.firestore.Firestore;
};

const Questions = ({ questions, removeQuestion, db }: Props) => {
  return (
    <QuestionsContainer>
      {questions.length > 0 &&
        questions.map((question, index) => (
          <Question
            key={question.id}
            index={index}
            question={question}
            removeQuestion={removeQuestion}
            db={db}
          />
        ))}
    </QuestionsContainer>
  );
};

export default Questions;
