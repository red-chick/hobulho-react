import styled from "styled-components";

export const Button = styled.button`
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background: ${(props) => {
    if (props.color === "green") return props.theme.green;
    return props.theme.orange;
  }};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;

  &:disabled {
    background: #e2e2e2;
  }
`;

export const GreenButton = styled(Button)`
  background: ${(props) => props.theme.green};
`;
