import styled from "styled-components";

export const Form = styled.form`
  margin: 20px 0 0;
  display: block;
  text-align: center;

  & > section {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Control = styled.section`
  display: block;
  font-size: 18px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  width: 370px;
  margin: 0 10px;

  @media screen and (max-width: 700px) {
    width: 100%;
    margin: 0 0 10px;
  }
`;

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  className,
  ...props
}) => (
  <StyledInput className={`input ${className}`} {...props}>
    {children}
  </StyledInput>
);
