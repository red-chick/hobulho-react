import dynamic from "next/dynamic";
import styled from "styled-components";

import AddQuestionForm from "../src/home/components/AddQuestionForm";

import { useUserContext } from "../src/common/contexts/UserContext";
import { useState } from "react";

// firebase 모듈이 server-side 에서 로드되면 안 됨
const Questions = dynamic(() => import("../src/home/components/Questions"), {
  ssr: false,
});

export default function Home() {
  const {
    state: { uid },
  } = useUserContext();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const getQuestions = (db) => {
    const questionsRef = db.collection("questions");
    questionsRef
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error)
    return (
      <Main>
        <Headline>호불호 응답하고 사람들의 생각을 알아보세요!</Headline>
        <Paragraph>
          여러분의 성원에 힘입어 서버가 터져버렸습니다.. <br />
          며칠 뒤 이용해 주세요.. 감사합니다..
        </Paragraph>
      </Main>
    );

  return (
    <Main>
      <Headline>호불호 응답하고 사람들의 생각을 알아보세요!</Headline>
      {uid ? (
        <AddQuestionForm getQuestions={getQuestions} />
      ) : (
        <Paragraph>
          로그인 후 질문에 응답하면 해당 질문에 대한 사람들의 응답을 확인 하실
          수 있습니다.
        </Paragraph>
      )}
      <Questions
        questions={questions}
        getQuestions={getQuestions}
        removeQuestion={removeQuestion}
      />
    </Main>
  );
}

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Headline = styled.h1`
  margin: 18px 0 0;
`;

export const Paragraph = styled.p`
  margin: 40px 0 0;
`;
