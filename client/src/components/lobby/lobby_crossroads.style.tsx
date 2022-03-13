import styled from "styled-components";

export const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

export const JoinButtonContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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

export const LobbyButtonStyled = styled(button)`
  width: 9rem;
  height: 3.2rem;
  font-size: 26px;
`;

export const LobbyButtonBigStyled = styled(button)`
  width: 11rem;
  height: 3.6rem;
  font-size: 32px;
`;

export const InputCodeStyled = styled.input``;