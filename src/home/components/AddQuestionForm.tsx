import { useEffect, useRef, useState } from "react";
import firebase from "firebase";

import { useUserContext } from "../../common/contexts/UserContext";

import { Button } from "../../common/styles/Button.style";
import { Form, Input, Label } from "../../common/styles/Form.style";

type Props = {
  db: firebase.firestore.Firestore;
  getQuestions: Function;
  loadingQuestions: Function;
};

const AddQuestionForm = ({ db, getQuestions, loadingQuestions }: Props) => {
  const {
    state: { uid },
  } = useUserContext();
  const [question, setQuestion] = useState("");

  const addQuestion = (e) => {
    e.preventDefault();

    loadingQuestions();

    if (question.length < 5) {
      alert("다섯 글자 이상 입력해 주세요.");
      return;
    }

    db.collection("questions")
      .add({ uid, title: question, createdAt: Date.now(), answers: [] })
      .then(() => {
        getQuestions(db);
      });

    setQuestion("");
  };

  return (
    <Form onSubmit={addQuestion}>
      <Label>
        <Input
          type="text"
          placeholder="궁금한 내용을 등록해보세요!"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Label>
      <Button type="submit">질문 등록</Button>
    </Form>
  );
};

export default AddQuestionForm;
