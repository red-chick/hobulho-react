import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../../../common/contexts/UserContext";
import {
  Item,
  ThumbsUpIcon,
  ThumbsDownIcon,
  IconWrapper,
  Liked,
  UnLiked,
  SmallThumbsUpIcon,
  SmallThumbsDownIcon,
  LeftCount,
  RightCount,
  TrashIcon,
  TitleWrapper,
  Title,
} from "./Question.style";

const Question = ({ question, db }) => {
  const {
    state: { uid },
  } = useUserContext();
  const router = useRouter();

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const answersRef = db.collection("answers");

    answersRef.where("questionId", "==", question.id).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAnswers(data);
    });
  }, []);

  const isAnswered = useMemo(() => {
    if (!uid) return false;
    return answers.some((answer) => answer.uid === uid);
  }, [answers, uid]);
  const answersSize = useMemo(() => answers.length, [answers]);
  const likedSize = useMemo(
    () => answers.filter((answer) => answer.like === true).length,
    [answers]
  );
  const unLikedSize = useMemo(() => answersSize - likedSize, [answers]);

  const select = (like: boolean) => {
    if (!uid) {
      router.push("/login");
      return;
    }
    db.collection("answers").add({
      uid,
      like,
      questionId: question.id,
      createdAt: Date.now(),
    });
  };

  const remove = () => {
    db.collection("questions").doc(question.id).delete();
  };

  return (
    <Item>
      <TitleWrapper>
        <Title>{question.title}</Title>
        {question.uid === uid && <TrashIcon onClick={remove} />}
      </TitleWrapper>
      <IconWrapper>
        {isAnswered ? (
          <>
            <Liked size={likedSize} fullSize={answersSize}>
              <SmallThumbsUpIcon />
              <LeftCount>{likedSize}</LeftCount>
            </Liked>
            <UnLiked size={unLikedSize} fullSize={answersSize}>
              <RightCount>{unLikedSize}</RightCount>
              <SmallThumbsDownIcon />
            </UnLiked>
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

export default Question;
