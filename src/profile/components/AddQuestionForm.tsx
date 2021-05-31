import { FormEvent, useState } from "react";
import { Button } from "../../common/styled-components/Button.style";

import {
  Form,
  Input,
  Control,
} from "../../common/styled-components/Form.style";

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
      <Control>
        <Input
          type="text"
          placeholder="궁금한 내용을 등록해보세요!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" className="is-primary">
          질문 등록
        </Button>
      </Control>
    </Form>
  );
};

export default AddQuestionForm;
