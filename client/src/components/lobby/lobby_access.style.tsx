import styled from "styled-components";

export const LobbyPlayersTableStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 1rem;
`;

export const PlayerTableStyled = styled.div`
  border: 2px solid black;
  border-radius: 6px;
  background-color: lightgrey;
  padding: 0.8rem 0.6rem;
  overflow: hidden;
  min-width: 26rem;
  text-align: center;
`;

export const PlayerTableTextStyled = styled.span`
  font-size: 18px;
`;

export const PlayerKickButtonStyled = styled.button`
  padding: 0.3rem 0.8rem;
  background-color: orangered;
  color: whitesmoke;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  box-shadow: 1px 1px 1px black;
  transition: 0.2s ease;
  float: right;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const CodeContainerStyled = styled.div`
  position: relative;
  width: fit-content;
`;

export const CodeInputStyled = styled.input`
  padding-right: 4rem;
`;

export const CodeCopyStyled = styled.button`
  position: absolute;
  right: 0;
  width: 4rem;
`;
