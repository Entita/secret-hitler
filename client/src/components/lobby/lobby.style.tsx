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
  min-width: 24rem;
  text-align: center;
`;

export const PlayerTableTextStyled = styled.span`
  font-size: 18px;
`;
