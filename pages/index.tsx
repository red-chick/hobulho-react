import { useCallback, useEffect } from "react";
import styled from "styled-components";

import { useUserContext } from "../src/common/contexts/UserContext";
import useQuestions from "../src/home/hooks/useQuestions";
import Loading from "../src/common/components/Loading";
import useInfinityScroll from "../src/common/hooks/useInfinityScroll";
import Questions from "../src/common/components/Questions";

export default function Home() {
  const {
    state: { uid },
  } = useUserContext();

  const {
    questionsState: { questions, loading, error },
    getQuestions,
    removeQuestion,
    addAnswer,
  } = useQuestions();

  useEffect(() => {
    getQuestions();
  }, []);

  useInfinityScroll(
    useCallback(() => {
      getQuestions();
    }, [])
  );

  if (error)
    return (
      <Main>
        <Headline>호불호 응답하고 사람들의 생각을 알아보세요!</Headline>
        <Paragraph>
          에러가 발생했습니다. <br />
          잠시 후 이용해주세요 ㅠㅠ
        </Paragraph>
      </Main>
    );

  return (
    <Main>
      <Headline>호불호 응답하고 사람들의 생각을 알아보세요!</Headline>
      {!uid && (
        <Paragraph>
          로그인 후 질문에 응답하면 해당 질문에 대한 사람들의 응답을 확인 하실
          수 있습니다.
        </Paragraph>
      )}
      {questions.length > 0 && (
        <Questions
          questions={questions}
          removeQuestion={removeQuestion}
          addAnswer={addAnswer}
        />
      )}
      {loading && <Loading />}
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
