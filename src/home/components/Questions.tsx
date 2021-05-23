import Question from "./questions/Question";

import { QuestionType } from "../hooks/useQuestions";

import { QuestionsContainer } from "./Questions.style";

type Props = {
  questions: QuestionType[];
  removeQuestion: Function;
  addAnswer: Function;
};

const Questions = ({ questions, removeQuestion, addAnswer }: Props) => {
  return (
    <QuestionsContainer>
      {questions.length > 0 &&
        questions.map((question, index) => (
          <Question
            key={question.id}
            index={index}
            question={question}
            removeQuestion={removeQuestion}
            addAnswer={addAnswer}
          />
        ))}
    </QuestionsContainer>
  );
};

export default Questions;
