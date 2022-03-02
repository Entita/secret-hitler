import { useState } from "react";
import { Link } from "react-router-dom";
import {
  JoinButtonContainerStyled,
  ContainerStyled,
  LobbyButtonBigStyled,
  LobbyButtonStyled,
  InputCodeStyled,
} from "./lobby_crossroads.style";

export default function LobbyCrossroads() {
  const [code, setCode] = useState<string>("");

  return (
    <ContainerStyled>
      <InputCodeStyled
        type="text"
        placeholder="Lobby code"
        onChange={(e) => setCode(e.target.value)}
      />
      <JoinButtonContainerStyled>
        <Link to={"/lobby/" + code}>
          <LobbyButtonBigStyled
            onClick={(e) => (code.length === 0 ? e.preventDefault() : null)}
          >
            Join
          </LobbyButtonBigStyled>
        </Link>
        <Link to="/lobby/create">
          <LobbyButtonStyled>Create</LobbyButtonStyled>
        </Link>
      </JoinButtonContainerStyled>
    </ContainerStyled>
  );
}
