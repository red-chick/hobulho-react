import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUserContext } from "../contexts/UserContext";
import { Button } from "../styled-components/Button.style";

const Header = () => {
  const {
    state: { uid, loading },
    logout,
  } = useUserContext();
  const router = useRouter();
  return (
    <StyledHeader>
      <Link href="/">
        <Title>호불호</Title>
      </Link>
      <ButtonWrapper>
        {!["/login", "/information"].includes(router.pathname) &&
          !loading &&
          (uid ? (
            <>
              {!router.query.uid && (
                <Link href={`/${uid}`}>
                  <Button>내 질문</Button>
                </Link>
              )}

              <Button onClick={() => logout()}>로그아웃</Button>
            </>
          ) : (
            <Link href="/login">
              <Button>로그인</Button>
            </Link>
          ))}
      </ButtonWrapper>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: ${(props) => props.theme.headerHeight};
  background: white;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  cursor: pointer;
`;

const ButtonWrapper = styled.section`
  display: inline-block;
  margin-left: auto;

  & > button {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Header;
