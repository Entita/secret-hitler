import styled from "styled-components";

export const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

const button = styled.button`
  background-color: limegreen;
  box-shadow: inset 0 0 6px 2px green;
  border-radius: 8px;
  color: whitesmoke;
  font-weight: bold;
  -webkit-text-stroke: 1px green;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const LobbyButtonSmallStyled = styled(button)`
  width: 6rem;
  height: 2.4rem;
  font-size: 21px;
`;

export const LobbyButtonStyled = styled(button)`
  width: 16rem;
  height: 4rem;
  font-size: 26px;
`;

export const CreateButtonContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const PlayersSelectStyled = styled.select``;
export const PlayerOptionStyled = styled.option``;
export const PlayersLabelStyled = styled.label``;
