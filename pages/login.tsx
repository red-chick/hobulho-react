import Head from "next/head";
import dynamic from "next/dynamic";
import styled from "styled-components";

// firebase 모듈이 server-side 에서 로드되면 안 됨
const Login = dynamic(() => import("../src/login/components/Login"), {
  ssr: false,
});

const LoginPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>로그인 - 호불호</title>
        <meta property="og:title" content="로그인 - 호불호" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>전화번호로 로그인</Title>
      <Paragraph>
        중복 응답 방지를 위해 전화번호를 이용해 로그인을 진행합니다.
        <br />
        인증용 SMS 메시지가 발송되며 이동통신사 문자 메시지 요금이 부과될 수
        있습니다.
      </Paragraph>
      <Login />
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

export default LoginPage;
