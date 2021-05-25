import { forwardRef } from "react";
import styled from "styled-components";

const StyledButton = styled.button``;

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  forwardRef(({ children, className, ...props }, _ref) => (
    <StyledButton className={`button ${className}`} {...props}>
      {children}
    </StyledButton>
  ));
