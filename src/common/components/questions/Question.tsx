import { useRouter } from "next/router";
import { useMemo, memo } from "react";

import { useUserContext } from "../../contexts/UserContext";
import { QuestionType } from "../../../home/hooks/useQuestions";

import {
  Item,
  ThumbsUpIcon,
  ThumbsDownIcon,
  IconWrapper,
  Like,
  Dislike,
  SmallThumbsUpIcon,
  SmallThumbsDownIcon,
  TrashIcon,
  TitleWrapper,
  Title,
  ResultContainer,
} from "./Question.style";

type Props = {
  index: number;
  question: QuestionType;
  removeQuestion: Function;
  addAnswer: Function;
};

const Question: React.FC<Props> = ({
  index,
  question,
  removeQuestion,
  addAnswer,
}) => {
  const router = useRouter();
  const {
    state: { uid },
  } = useUserContext();

  const { id, answers } = question;

  const [totalCount, likeCount, dislikeCount] = useMemo(() => {
    const count = answers.filter((answer) => answer.like === true).length;
    return [answers.length, count, answers.length - count];
  }, [answers]);

  const myAnswer = useMemo(() => {
    if (!uid) return null;
    return answers.find((answer) => answer.uid === uid);
  }, [answers, uid]);

  const select = async (like: boolean) => {
    if (!uid) {
      router.push("/login");
      return;
    }

    addAnswer(id, like);
  };

  const remove = async () => {
    if (confirm(`${question.title} 질문을 정말로 삭제하시겠습니까?`)) {
      removeQuestion(index, id);
    }
  };

  return (
    <Item>
      <TitleWrapper>
        <Title>{question.title}</Title>
        {question.uid === uid && <TrashIcon onClick={remove} />}
      </TitleWrapper>
      <IconWrapper>
        {myAnswer ? (
          <ResultContainer totalCount={totalCount} likeCount={likeCount}>
            <Like>
              <SmallThumbsUpIcon selected={myAnswer.like} />
              {likeCount}
            </Like>
            <Dislike>
              {dislikeCount}
              <SmallThumbsDownIcon selected={!myAnswer.like} />
            </Dislike>
          </ResultContainer>
        ) : (
          <>
            <ThumbsUpIcon title="좋아요" onClick={() => select(true)} />
            <ThumbsDownIcon title="싫어요" onClick={() => select(false)} />
          </>
        )}
      </IconWrapper>
    </Item>
  );
};

export default memo(Question);
