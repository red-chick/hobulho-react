import styled from "styled-components";

export const LoadingFullModal = styled.section`
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

export const Form = styled.form`
  margin: 20px 0 0;
  display: flex;
  justify-content: center;
`;

export const Label = styled.label`
  font-size: 18px;
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
`;
