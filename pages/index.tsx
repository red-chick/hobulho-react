import dynamic from "next/dynamic";
import Head from "next/head";
import styled from "styled-components";

import AddQuestionForm from "../src/home/components/AddQuestionForm";

import { useUserContext } from "../src/common/contexts/UserContext";

// firebase 모듈이 server-side 에서 로드되면 안 됨
const Questions = dynamic(() => import("../src/home/components/Questions"), {
  ssr: false,
});

export default function Home() {
  const {
    state: { uid },
  } = useUserContext();

  return (
    <>
      <Head>
        <title>호불호</title>
        <meta property="og:title" content="호불호" />
        <meta
          name="description"
          content="호불호 응답하고 사람들의 생각을 알아보세요!"
        />
        <meta
          property="og:description"
          content="호불호 응답하고 사람들의 생각을 알아보세요!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Headline>호불호 응답하고 사람들의 생각을 알아보세요!</Headline>
        {uid ? (
          <AddQuestionForm />
        ) : (
          <Paragraph>
            로그인 후 질문에 응답하면 해당 질문에 대한 사람들의 응답을 확인 하실
            수 있습니다.
          </Paragraph>
        )}
        <Questions />
      </Main>
    </>
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
