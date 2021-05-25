import styled from "styled-components";

const SelectWrapper = styled.div`
  height: auto;
`;

const StyledSelect = styled.select`
  font-size: 1rem !important;
`;

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> =
  ({ children, ...props }) => {
    return (
      <SelectWrapper className="select">
        <StyledSelect {...props}>{children}</StyledSelect>
      </SelectWrapper>
    );
  };

const StyledButtonGroup = styled.div`
  display: inline-flex;
`;

export const ButtonGroup = ({ children }) => {
  return (
    <StyledButtonGroup className="buttons has-addons">
      {children}
    </StyledButtonGroup>
  );
};

export const Error = styled.p`
  margin-top: 20px;
`;
