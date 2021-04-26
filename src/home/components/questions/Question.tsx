import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../../common/utils/firebase";
import { useUserContext } from "../../../common/contexts/UserContext";
import {
  Item,
  ThumbsUpIcon,
  ThumbsDownIcon,
  IconWrapper,
  Liked,
  DisLiked,
  SmallThumbsUpIcon,
  SmallThumbsDownIcon,
  LeftCount,
  RightCount,
  TrashIcon,
  TitleWrapper,
  Title,
} from "./Question.style";

const Question = ({ index, question, removeQuestion }) => {
  const {
    state: { uid },
  } = useUserContext();
  const router = useRouter();
  const [answers, setAnswers] = useState([]);
  const [selectedLike, setSelectedLike] = useState(null);

  useEffect(() => {
    const answersRef = db.collection("answers");
    answersRef
      .where("questionId", "==", question.id)
      .get()
      .then((snapshot) => {
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
    [answers, selectedLike]
  );
  const disLikedSize = useMemo(() => answersSize - likedSize, [
    answers,
    selectedLike,
  ]);

  const select = (like: boolean) => {
    if (!uid) {
      router.push("/login");
      return;
    }
    setSelectedLike(like);
    db.collection("answers").add({
      uid,
      like,
      questionId: question.id,
      createdAt: Date.now(),
    });
  };

  const remove = () => {
    db.collection("questions").doc(question.id).delete();
    removeQuestion(index);
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
            <Liked
              size={likedSize + (selectedLike === true ? 1 : 0)}
              fullSize={answersSize + (selectedLike !== null ? 1 : 0)}
            >
              <SmallThumbsUpIcon />
              <LeftCount>
                {likedSize + (selectedLike === true ? 1 : 0)}
              </LeftCount>
            </Liked>
            <DisLiked
              size={disLikedSize + (selectedLike === false ? 1 : 0)}
              fullSize={answersSize + (selectedLike !== null ? 1 : 0)}
            >
              <RightCount>
                {disLikedSize + (selectedLike === false ? 1 : 0)}
              </RightCount>
              <SmallThumbsDownIcon />
            </DisLiked>
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
