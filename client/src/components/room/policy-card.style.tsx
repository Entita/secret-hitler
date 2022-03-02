import styled from "styled-components";
import { COLOR } from "../../utils/color";

export const ContainerStyled = styled.div<any>`
  width: ${({ width }) => width + "px"};
  aspect-ratio: 159/241;
  position: absolute;
  left: ${({ position }) =>
    position.left ? position.left + "px" : position.left};
  right: ${({ position }) =>
    position.right ? position.right + "px" : position.right};
  top: ${({ position }) => (position.top ? position.top + "px" : position.top)};
  bottom: ${({ position }) =>
    position.bottom ? position.bottom + "px" : position.bottom};

  background-image: ${({ url }) => "url(" + url + ")"};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 3px;
  box-shadow: 0 0 0 2px ${COLOR.white};
  background-color: ${COLOR.white};
`;
