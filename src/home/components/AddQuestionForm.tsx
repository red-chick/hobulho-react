import { useState } from "react";
import firebase from "firebase/app";

import { useUserContext } from "../../common/contexts/UserContext";

import { Button } from "../../common/styles/Button.style";
import { Form, Input, Label } from "../../common/styles/Form.style";

type Props = {
  db: firebase.firestore.Firestore;
  addQuestion: Function;
  loadingQuestions: Function;
};

const AddQuestionForm = ({ db, addQuestion, loadingQuestions }: Props) => {
  const {
    state: { uid },
  } = useUserContext();
  const [title, setTitle] = useState("");

  const submit = (e) => {
    e.preventDefault();

    loadingQuestions();

    if (title.length < 5) {
      alert("다섯 글자 이상 입력해 주세요.");
      return;
    }

    const createdAt = Date.now();

    db.collection("questions")
      .add({ uid, title, createdAt, answers: [], hide: false })
      .then(({ id }) => {
        addQuestion({
          id,
          uid,
          title,
          createdAt,
          answers: [],
        });
      });

    setTitle("");
  };

  return (
    <Form onSubmit={submit}>
      <Label>
        <Input
          type="text"
          placeholder="궁금한 내용을 등록해보세요!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Label>
      <Button type="submit">질문 등록</Button>
    </Form>
  );
};

export default AddQuestionForm;
