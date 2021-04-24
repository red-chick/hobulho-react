import styled from "styled-components";
import { useUserContext } from "../contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  height: ${(props) => props.theme.headerHeight};
  background: white;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const Button = styled.button`
  margin-left: auto;
`;

const Header = () => {
  const {
    state: { uid, loading },
    logout,
  } = useUserContext();
  const router = useRouter();
  return (
    <StyledHeader>
      <Link href="/">
        <h2>호불호</h2>
      </Link>
      {router.pathname !== "/login" &&
        !loading &&
        (uid ? (
          <Button onClick={() => logout()}>로그아웃</Button>
        ) : (
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        ))}
    </StyledHeader>
  );
};

export default Header;
