import Head from "next/head";
import styled from "styled-components";

const Main = styled.main`
  background: black;
  color: white;
`;

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>Hello World!</Main>
    </div>
  );
}
