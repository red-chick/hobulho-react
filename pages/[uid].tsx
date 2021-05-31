import styled from "styled-components";
import Loading from "../src/common/components/Loading";
import AddQuestionForm from "../src/profile/components/AddQuestionForm";
import Questions from "../src/common/components/Questions";
import useProfile from "../src/profile/hooks/useProfile";
import { useUserContext } from "../src/common/contexts/UserContext";

const ProfilePage = () => {
  const {
    state: { uid },
  } = useUserContext();
  const { profileState, addQuestion, removeQuestion, addAnswer } = useProfile();
  const { loading, error, isUser, isOneSelf, questions } = profileState;

  if (error) return <Paragraph>에러가 발생했습니다.</Paragraph>;
  if (!loading && !isUser) return <Paragraph>잘못 된 접근입니다.</Paragraph>;

  return (
    <Main>
      {loading && <Loading />}
      <h1>내 질문 목록</h1>
      {uid && isOneSelf && <AddQuestionForm addQuestion={addQuestion} />}
      {!loading && questions.length <= 0 && (
        <Paragraph>등록 된 질문이 없습니다.</Paragraph>
      )}
      <Questions
        questions={questions}
        removeQuestion={removeQuestion}
        addAnswer={addAnswer}
      />
    </Main>
  );
};

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Paragraph = styled.p`
  margin: 40px 0 0;
  text-align: center;
`;

export default ProfilePage;
