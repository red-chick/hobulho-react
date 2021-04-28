import styled, { keyframes } from "styled-components";

export const LoadingContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.i`
  width: 48px;
  height: 48px;
  background-size: cover;
  display: inline-block;
  background: url("images/circle-notch-solid-white.svg") no-repeat;
  color: white;
  animation ${rotate} 2s linear infinite;
`;
