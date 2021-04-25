import { useEffect, useState } from "react";

import { db } from "../../common/utils/firebase";
import Question from "./questions/Question";
import { QuestionsContainer } from "./Questions.style";
import SkeletonQuestion from "./questions/SkeletonQuestion";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionsRef = db.collection("questions");

    questionsRef.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("data", data);

      setQuestions(data);
    });
  }, []);

  return (
    <QuestionsContainer>
      {questions.length > 0
        ? questions.map((question) => (
            <Question key={question.id} question={question} db={db} />
          ))
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <SkeletonQuestion key={i} />
          ))}
    </QuestionsContainer>
  );
};

export default Questions;
