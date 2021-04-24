import { ThemeProvider } from "styled-components";
import Header from "../src/common/components/Header";
import UserContextProvider from "../src/common/contexts/UserContext";
import GlobalStyle from "../src/common/styles/global-styles";
import theme from "../src/common/styles/theme";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
