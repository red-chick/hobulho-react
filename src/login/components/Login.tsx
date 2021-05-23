import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { firebaseApp, newRecaptchaVerifier } from "../../common/utils/firebase";

import useConfirmationReducer from "../hooks/useConfimationReducer";
import useLoginReducer from "../hooks/useLoginReducer";

import { Paragraph } from "./Login.style";
import { Button } from "../../common/styles/Button.style";
import { Form, Input, Label } from "../../common/styles/Form.style";
import Loading from "../../common/components/Loading";

const Login = () => {
  const router = useRouter();
  const [confirmationState, confirmationDispatch] = useConfirmationReducer();
  const [loginState, loginDispatch] = useLoginReducer();

  const [phone, setPhone] = useState("");
  const [auth, setAuth] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    setRecaptchaVerifier(newRecaptchaVerifier());
  }, []);

  const onPhoneNumberAuth = (e) => {
    e.preventDefault();
    confirmationDispatch({ type: "LOADING" });
    firebaseApp
      .auth()
      .signInWithPhoneNumber(`+82${phone}`, recaptchaVerifier)
      .then((result) => confirmationDispatch({ type: "SET_RESULT", result }))
      .catch((error) => confirmationDispatch({ type: "ERROR", error }));
  };

  const onAuthCode = (e) => {
    e.preventDefault();
    if (!confirmationState.result) return;
    loginDispatch({ type: "LOADING" });
    confirmationState.result
      .confirm(auth)
      .then(() => router.push("/"))
      .catch((error) => loginDispatch({ type: "ERROR", error }));
  };

  return (
    <>
      <Form onSubmit={onPhoneNumberAuth}>
        <Label>
          <Input
            type="text"
            placeholder="'-' 없이 입력해주세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Label>
        {confirmationState.result ? (
          <Button
            type="submit"
            disabled={confirmationState.loading}
            backgroundColor="lightblue"
          >
            재요청
          </Button>
        ) : (
          <Button type="submit" disabled={confirmationState.loading}>
            인증 요청
          </Button>
        )}
      </Form>
      {confirmationState.loading && <Paragraph>인증 요청중입니다..</Paragraph>}
      {confirmationState.error && (
        <Paragraph>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</Paragraph>
      )}
      {confirmationState.result && (
        <>
          <Form onSubmit={onAuthCode}>
            <Label>
              <Input
                type="text"
                placeholder="인증번호 6자리를 입력해주세요"
                value={auth}
                onChange={(e) => setAuth(e.target.value)}
              />
            </Label>
            <Button type="submit">로그인</Button>
          </Form>
          <Paragraph>
            인증용 SMS 메시지가 발송되었습니다. 잠시 후 입력하신 번호로 SMS
            메시지가 도착합니다.
          </Paragraph>
        </>
      )}
      {loginState.loading && <Loading />}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default Login;
