import { FormEvent, useState } from "react";

import { Button } from "../../common/styles/Button.style";
import { Form, Input, Label } from "../../common/styles/Form.style";

type Props = {
  addQuestion: Function;
};

const AddQuestionForm: React.FC<Props> = ({ addQuestion }) => {
  const [title, setTitle] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 5) {
      alert("다섯 글자 이상 입력해 주세요.");
      return;
    }

    await addQuestion(title);

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
