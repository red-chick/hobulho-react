import styled from "styled-components";

export const Form = styled.form`
  margin: 20px 0 0;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Label = styled.label`
  font-size: 18px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  width: 370px;
  height: 36px;
  margin: 0 10px;
  padding: 0 15px;
  font-size: 14px;
  color: #000000;
  border: 1px solid #d5d5d5;

  :focus,
  :active {
    border: 1px solid #d5d5d5;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    margin: 0 0 10px;
  }
`;
