import { useEffect } from "react";
import { db } from "../../common/utils/firebase";
import Question from "./questions/Question";
import { QuestionsContainer } from "./Questions.style";
import SkeletonQuestion from "./questions/SkeletonQuestion";

const Questions = ({ questions, getQuestions, removeQuestion }) => {
  useEffect(() => {
    getQuestions(db);
  }, []);

  return (
    <QuestionsContainer>
      {questions.length > 0
        ? questions.map((question, index) => (
            <Question
              key={question.id}
              index={index}
              question={question}
              removeQuestion={removeQuestion}
            />
          ))
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <SkeletonQuestion key={i} />
          ))}
    </QuestionsContainer>
  );
};

export default Questions;
