import styled from "styled-components";

export const QuestionsContainer = styled.ul`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
  width: 100%;
  max-width: 900px;
  padding: 0;
  margin: 40px 0;

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
