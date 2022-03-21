import styled from "styled-components";

export const PlayerNameStyled = styled.span<any>`
  position: absolute;
  width: max-content;
  top: ${({ padding }) => padding.top};
  bottom: ${({ padding }) => padding.bottom};
  left: ${({ padding }) => padding.left};
  right: ${({ padding }) => padding.right};
  font-size: 24px;
  font-weight: bold;
  padding: 0.4rem 1.2rem;
  background-color: whitesmoke;
  border-radius: 4px;
`;
export const PlayerZoneStyled = styled.div<any>`
  position: absolute;
  height: 5rem;
  width: 15rem;
  top: ${({ position }) => position.top};
  left: ${({ position }) => position.left};
  right: ${({ position }) => position.right};
  bottom: ${({ position }) => position.bottom};
  transform: ${({ position }) => position.rotation};
  transform-origin: ${({ position }) => position.transformOrigin};
`;
