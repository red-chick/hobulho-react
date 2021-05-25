import Head from "next/head";
import { ThemeProvider } from "styled-components";

import Header from "../src/common/components/Header";
import UserContextProvider from "../src/common/contexts/UserContext";

import GlobalStyles from "../src/common/styles/global-styles";
import theme from "../src/common/styles/theme";

import "../src/common/styles/bulma.min.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=no"
        />
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
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <GlobalStyles />
          <Header />
          <Component {...pageProps} />
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
