import styled from "styled-components";
import { COLOR } from "../../../utils/color";

export const PolicyCardStyled = styled.div<any>`
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  background-color: ${COLOR.white};
  transform: rotate3d(0, 0, 0, 0deg) translateY(0px);
  transform-origin: top;

  & > * {
    width: 100%;
    height: 100%;

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 3px;
    border: 2px ${COLOR.white} solid;
  }
`;

export const PolicyCardShadowStyled = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  filter: blur(2px);
  transition: height 0.4s ease;
  transition-delay: 0s;
`;

export const ContainerStyled = styled.div<any>`
  position: absolute;
  left: ${({ position }) => position.left && position.left + "px"};
  right: ${({ position }) => position.right && position.right + "px"};
  top: ${({ position }) => position.top && position.top + "px"};
  bottom: ${({ position }) => position.bottom && position.bottom + "px"};
  width: ${({ width }) => width + "px"};
  aspect-ratio: 159/241;
  z-index: 0;
  cursor: ${({ cursor }) => cursor};

  &.flipped ${PolicyCardStyled} {
    transform: rotate3d(1, 0, 0, 70deg);
  }

  &.flipped ${PolicyCardShadowStyled} {
    height: 85%;
    transition-delay: 0.15s;
  }
`;
