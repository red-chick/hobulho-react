import styled from "styled-components";
import Loading from "../src/common/components/Loading";
import AddQuestionForm from "../src/home/components/AddQuestionForm";
import Questions from "../src/home/components/Questions";
import useProfile from "../src/profile/hooks/useProfile";

const ProfilePage = () => {
  const { profileState, addQuestion, removeQuestion, addAnswer } = useProfile();
  const { loading, error, isUser, isOneSelf, questions } = profileState;

  return (
    <Main>
      {loading && <Loading />}
      {!loading && !isUser && <p>잘못 된 접근입니다.</p>}
      <h1>내 질문 목록</h1>
      <AddQuestionForm addQuestion={addQuestion} />
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

export default ProfilePage;
