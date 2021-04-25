import { useEffect, useState } from "react";

import { db } from "../../common/utils/firebase";
import Question from "./questions/Question";
import { QuestionsContainer } from "./Questions.style";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionsRef = db.collection("questions");

    questionsRef.orderBy("createdAt").onSnapshot((snapshot) => {
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
      {questions.map((question) => (
        <Question key={question.id} question={question} db={db} />
      ))}
    </QuestionsContainer>
  );
};

export default Questions;
