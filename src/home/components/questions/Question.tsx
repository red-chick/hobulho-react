import { useRouter } from "next/router";
import { useMemo, useState, memo } from "react";
import firebase from "firebase";

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
  LeftCount,
  RightCount,
  TrashIcon,
  TitleWrapper,
  Title,
} from "./Question.style";

type Props = {
  index: number;
  question: QuestionType;
  removeQuestion: Function;
  db: firebase.firestore.Firestore;
};

const getAnswerSizes = (
  answers: AnswerType[],
  likeLength: number,
  selectedLike?: boolean
) => {
  const totalSize = answers.length;

  if (selectedLike === true)
    return [totalSize + 1, likeLength + 1, totalSize - likeLength];

  if (selectedLike === false)
    return [totalSize + 1, likeLength, totalSize - likeLength + 1];

  return [totalSize, likeLength, totalSize - likeLength];
};

const Question = ({ index, question, removeQuestion, db }: Props) => {
  const router = useRouter();
  const {
    state: { uid },
  } = useUserContext();
  const [selectedLike, setSelectedLike] = useState(null);

  const { answers } = question;

  const isAnswered = useMemo(() => {
    if (!uid) return false;
    return answers.some((answer) => answer.uid === uid);
  }, [answers, uid]);

  const likeLength = useMemo(
    () => answers.filter((answer) => answer.like === true).length,
    [answers]
  );

  const [totalSize, likeSize, dislikeSize] = useMemo(
    () => getAnswerSizes(answers, likeLength, selectedLike),
    [answers, selectedLike]
  );

  const select = (like: boolean) => {
    if (!uid) {
      router.push("/login");
      return;
    }

    if (selectedLike !== null) return;

    setSelectedLike(like);

    db.collection("questions")
      .doc(question.id)
      .update({
        answers: firebase.firestore.FieldValue.arrayUnion({
          uid,
          like,
          createdAt: Date.now(),
        }),
      });
  };

  const remove = () => {
    if (confirm(`${question.title} 질문을 정말로 삭제하시겠습니까?`)) {
      db.collection("questions").doc(question.id).delete();
      removeQuestion(index);
    }
  };

  return (
    <Item>
      <TitleWrapper>
        <Title>{question.title}</Title>
        {question.uid === uid && <TrashIcon onClick={remove} />}
      </TitleWrapper>
      <IconWrapper>
        {isAnswered || selectedLike !== null ? (
          <>
            <Like size={likeSize} totalSize={totalSize}>
              <SmallThumbsUpIcon />
              <LeftCount>{likeSize}</LeftCount>
            </Like>
            <Dislike size={dislikeSize} totalSize={totalSize}>
              <RightCount>{dislikeSize}</RightCount>
              <SmallThumbsDownIcon />
            </Dislike>
          </>
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
