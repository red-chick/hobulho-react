import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { firebaseApp, newRecaptchaVerifier } from "../../common/utils/firebase";

const LoadingFullModal = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [auth, setAuth] = useState("");

  //FIXME: useReducer 를 이용하도록 변경
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [confirmationResultLoading, setConfirmationResultLoading] = useState(
    false
  );
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [recaptchaVerifierLoading, setRecaptchaVerifierLoading] = useState(
    null
  );

  useEffect(() => {
    setRecaptchaVerifier(newRecaptchaVerifier());
  }, []);

  const onPhoneNumberAuth = () => {
    setConfirmationResultLoading(true);
    firebaseApp
      .auth()
      .signInWithPhoneNumber(`+82${phone}`, recaptchaVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setConfirmationResultLoading(false);
      })
      .catch((err) => {
        setConfirmationResultLoading(false);
        console.error("err", err);
      });
  };

  const onAuthCode = () => {
    if (!confirmationResult) return;
    setRecaptchaVerifierLoading(true);
    confirmationResult
      .confirm(auth)
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        setRecaptchaVerifierLoading(false);
        console.error("err", err);
      });
  };

  return (
    <>
      <section>
        <input
          type="text"
          placeholder="'-' 없이 입력"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <button onClick={onPhoneNumberAuth}>인증 요청</button>
      </section>
      {confirmationResultLoading && <p>인증 요청중입니다..</p>}
      {confirmationResult && (
        <section>
          <input
            type="text"
            placeholder="인증번호 6자리"
            value={auth}
            onChange={(e) => {
              setAuth(e.target.value);
            }}
          />
          <button onClick={onAuthCode}>로그인</button>
        </section>
      )}
      {recaptchaVerifierLoading && (
        <LoadingFullModal>로그인 중입니다..</LoadingFullModal>
      )}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default Login;
