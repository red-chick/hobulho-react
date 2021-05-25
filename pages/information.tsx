import Head from "next/head";
import styled from "styled-components";
import InformationForm from "../src/information/components/InformationForm";

const informationPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>회원 정보 등록 - 호불호</title>
        <meta property="og:title" content="회원 정보 등록 - 호불호" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>회원 정보 등록</Title>
      <Paragraph>저희에게 회원님의 정보를 두 가지만 알려주세요!</Paragraph>
      <InformationForm />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: calc(100% - ${(props) => props.theme.headerHeight});
  padding: 100px 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
`;

export default informationPage;
