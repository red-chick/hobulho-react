import { useRouter } from "next/router";
import { useMemo, useState, memo } from "react";
import firebase from "firebase/app";

import { useUserContext } from "../../../common/contexts/UserContext";
import { AnswerType, QuestionType } from "../../hooks/useQuestions";

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
import { addAnswer } from "../../db/questions";

type Props = {
  index: number;
  question: QuestionType;
  removeQuestion: Function;
};

const getAnswerSizes = (
  answers: AnswerType[],
  myAnswer: AnswerType,
  likeLength: number,
  selectedLike?: boolean
) => {
  const totalSize = answers.length;

  if (myAnswer) return [totalSize, likeLength, totalSize - likeLength];

  if (selectedLike === true)
    return [totalSize + 1, likeLength + 1, totalSize - likeLength];

  if (selectedLike === false)
    return [totalSize + 1, likeLength, totalSize - likeLength + 1];

  return [totalSize, likeLength, totalSize - likeLength];
};

const Question: React.FC<Props> = ({ index, question, removeQuestion }) => {
  const router = useRouter();
  const {
    state: { uid },
  } = useUserContext();
  const [selectedLike, setSelectedLike] = useState(null);

  const { answers } = question;

  const myAnswer = useMemo(() => {
    if (!uid) return null;
    return answers.filter((answer) => answer.uid === uid)[0];
  }, [answers, uid]);

  const likeLength = useMemo(
    () => answers.filter((answer) => answer.like === true).length,
    [answers]
  );

  const [totalSize, likeSize, dislikeSize] = useMemo(
    () => getAnswerSizes(answers, myAnswer, likeLength, selectedLike),
    [answers, selectedLike, myAnswer]
  );

  const select = async (like: boolean) => {
    if (!uid) {
      router.push("/login");
      return;
    }

    if (selectedLike !== null) return;

    setSelectedLike(like);

    const createdAt = Date.now();

    addAnswer(question.id, uid, like, createdAt);
  };

  const remove = async () => {
    if (confirm(`${question.title} 질문을 정말로 삭제하시겠습니까?`)) {
      const { id } = question;
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
        {myAnswer || selectedLike !== null ? (
          <ResultContainer totalSize={totalSize} likeSize={likeSize}>
            <Like>
              <SmallThumbsUpIcon
                selected={myAnswer ? myAnswer.like : selectedLike}
              />
              {likeSize}
            </Like>
            <Dislike>
              {dislikeSize}
              <SmallThumbsDownIcon
                selected={myAnswer ? !myAnswer.like : !selectedLike}
              />
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
