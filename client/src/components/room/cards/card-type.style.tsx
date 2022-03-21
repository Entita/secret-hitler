import styled from "styled-components";

export const CardTypeStyled = styled.div<any>`
  width: ${({ width }) => width + "px"};
  aspect-ratio: 214/312;
  cursor: pointer;

  & > * {
    width: 100%;
    height: 100%;

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
