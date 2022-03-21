import styled from "styled-components";

export const CardPileStyled = styled.div<any>`
  position: absolute;
  width: ${({ width }) => width + "px"};
  left: ${({ position }) => position.left && position.left + "px"};
  right: ${({ position }) => position.right && position.right + "px"};
  top: ${({ position }) => position.top && position.top + "px"};
  bottom: ${({ position }) => position.bottom && position.bottom + "px"};
  aspect-ratio: 159/241;
  z-index: 1;
`;
