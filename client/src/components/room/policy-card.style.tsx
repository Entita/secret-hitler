import styled from "styled-components";
import { COLOR } from "../../utils/color";

export const PolicyCardStyled = styled.div<any>`
  width: 100%;
  height: 100%;

  background-image: ${({ url }) => "url(/img/" + url + ")"};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 3px;
  box-shadow: 0 0 0 2px ${COLOR.white};
  background-color: ${COLOR.white};
  transform: rotate3d(0, 0, 0, 0deg) translateY(0px);
  transform-origin: top;
  transition: transform 0.6s ease;
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
  left: ${({ position }) =>
    position.left ? position.left + "px" : position.left};
  right: ${({ position }) =>
    position.right ? position.right + "px" : position.right};
  top: ${({ position }) => (position.top ? position.top + "px" : position.top)};
  bottom: ${({ position }) =>
    position.bottom ? position.bottom + "px" : position.bottom};
  width: ${({ width }) => width + "px"};
  aspect-ratio: 159/241;
  z-index: 0;
  cursor: ${({ flipable }) => (flipable ? "pointer" : "default")};

  &.flipped ${PolicyCardStyled} {
    transform: rotate3d(1, 0, 0, 70deg);
  }

  &.flipped ${PolicyCardShadowStyled} {
    height: 85%;
    transition-delay: 0.15s;
  }
`;
