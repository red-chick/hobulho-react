import styled from "styled-components";

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  box-shadow: 0 3px 11px rgba(0, 0, 0, 0.04);
  padding: 16px;
`;

export const TitleWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.section`
  flex-shrink: 1;
`;

export const TrashIcon = styled.i`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  background-size: cover;
  display: inline-block;
  margin-left: 8px;
  background: url("images/trash-alt-solid.svg") no-repeat;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;

export const IconWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

export const ThumbsUpIcon = styled.i`
  width: 24px;
  height: 24px;
  background-size: cover;
  display: inline-block;
  background: url("images/thumbs-up-solid-blue.svg") no-repeat;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;

export const ThumbsDownIcon = styled.i`
  width: 24px;
  height: 24px;
  background-size: cover;
  display: inline-block;
  background: url("images/thumbs-down-solid-red.svg") no-repeat;
  cursor: pointer;
  transform: rotateY(180deg);
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: rotateY(180deg) scale(1.1);
  }
`;

type SmallThumbsType = {
  selected: boolean;
};

export const SmallThumbsUpIcon = styled.i<SmallThumbsType>`
  width: 12px;
  height: 12px;
  background-size: cover;
  display: inline-block;
  background: ${(props) => {
    return props.selected
      ? "url(images/thumbs-up-solid-blue.svg) no-repeat"
      : "url(images/thumbs-up-solid.svg) no-repeat";
  }};
  margin: 0 4px 0 8px;
`;

export const SmallThumbsDownIcon = styled.i<SmallThumbsType>`
  width: 12px;
  height: 12px;
  background-size: cover;
  display: inline-block;
  background: ${(props) => {
    return props.selected
      ? "url(images/thumbs-down-solid-red.svg) no-repeat"
      : "url(images/thumbs-down-solid.svg) no-repeat";
  }};
  transform: rotateY(180deg);
  margin: 0 8px 0 4px;
`;

const getPercent = (totalSize, size) => {
  return `${(size / totalSize) * 100}%`;
};

type ResultContainerType = {
  totalSize: number;
  likeSize: number;
};

export const ResultContainer = styled.section<ResultContainerType>`
  position: relative;
  width: 100%;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.lightblue} 0%,
    ${(props) => props.theme.lightblue}
      ${(props) => getPercent(props.totalSize, props.likeSize)},
    ${(props) => props.theme.lightred}
      ${(props) => getPercent(props.totalSize, props.likeSize)},
    ${(props) => props.theme.lightred} 100%
  );
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Like = styled.section``;

export const Dislike = styled.section``;
