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

const ThumbsIcon = styled.i`
  width: 24px;
  height: 24px;
  background-size: cover;
  display: inline-block;
`;

export const ThumbsUpIcon = styled(ThumbsIcon)`
  background: url("images/thumbs-up-solid-blue.svg") no-repeat;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;

export const ThumbsDownIcon = styled(ThumbsIcon)`
  background: url("images/thumbs-down-solid-red.svg") no-repeat;
  cursor: pointer;
  transform: rotateY(180deg);
  &:hover {
    transition: all 0.2s ease-in-out;
    transform: rotateY(180deg) scale(1.1);
  }
`;

export const SmallThumbsUpIcon = styled(ThumbsIcon)`
  background: url(${(props) =>
      props.selected
        ? "images/thumbs-up-solid-blue.svg"
        : "images/thumbs-up-solid.svg"})
    no-repeat;
  width: 12px;
  height: 12px;
  margin: 0 4px;
`;

export const SmallThumbsDownIcon = styled(ThumbsIcon)`
  background: url(${(props) =>
      props.selected
        ? "images/thumbs-down-solid-red.svg"
        : "images/thumbs-down-solid.svg"})
    no-repeat;
  transform: rotateY(180deg);
  width: 12px;
  height: 12px;
  position: absolute;
  top: 7px;
  right: 8px;
`;

export const LikedBar = styled.section`
  display: flex;
`;

type LikeType = {
  size: number;
  totalSize: number;
};

export const Like = styled.div<LikeType>`
  position: relative;
  background: ${(props) => props.theme.green};
  z-index: ${(props) =>
    `${(props.size / props.totalSize) * 100 > 50 ? "1" : "2"}`};
  width: ${(props) => `${(props.size / props.totalSize) * 100}%`};
  padding: 4px;
`;

export const Dislike = styled(Like)`
  background: ${(props) => props.theme.red};
  text-align: right;
`;

export const LeftCount = styled.span`
  position: absolute;
  left: 24px;
  top: 4px;
`;

export const RightCount = styled.span`
  position: absolute;
  right: 24px;
  top: 4px;
`;
