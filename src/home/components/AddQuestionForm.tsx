import { useEffect, useRef, useState } from "react";
import firebase from "firebase";

import { useUserContext } from "../../common/contexts/UserContext";

import { Button } from "../../common/styles/Button.style";
import { Form, Input, Label } from "../../common/styles/Form.style";

const AddQuestionForm = ({ getQuestions }) => {
  const {
    state: { uid },
  } = useUserContext();
  const [question, setQuestion] = useState("");
  const dbRef = useRef<firebase.firestore.Firestore>(null);

  useEffect(() => {
    const loadDB = async () => {
      let { db } = await import("../../common/utils/firebase");
      dbRef.current = db;
    };

    loadDB();
  });

  const addQuestion = (e) => {
    e.preventDefault();

    if (question.length < 5) {
      alert("다섯 글자 이상 입력해 주세요.");
      return;
    }

    dbRef.current
      .collection("questions")
      .add({ uid, title: question, createdAt: Date.now(), answers: [] })
      .then(() => {
        getQuestions(dbRef.current);
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
