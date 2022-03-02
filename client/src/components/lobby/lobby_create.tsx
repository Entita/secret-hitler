import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LobbyButtonSmallStyled,
  CreateButtonContainerStyled,
  PlayersSelectStyled,
  PlayerOptionStyled,
  PlayersLabelStyled,
  LobbyButtonStyled,
  ContainerStyled,
} from "./lobby_create.style";

export default function LobbyCreate() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<number>(5);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>(
    "Creating the lobby ..."
  );

  const fetchData = async () => {
    setLoadingText("Creating the lobby ...");
    setShowLoader(true);
    await fetch("http://localhost:4000/lobby/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        players: players,
      }),
    })
      .then((response) => response.json())
      .then((data) => navigate("/lobby/" + data))
      .catch(() => setLoadingText("Failed to create the lobby"));
  };

  return (
    <ContainerStyled>
      <PlayersLabelStyled htmlFor="players">
        How many players will play?
      </PlayersLabelStyled>
      <PlayersSelectStyled
        id="players"
        name="players"
        onChange={(e) => setPlayers(parseInt(e.target.value))}
      >
        <PlayerOptionStyled value="5">5 players</PlayerOptionStyled>
        <PlayerOptionStyled value="6">6 players</PlayerOptionStyled>
        <PlayerOptionStyled value="7">7 players</PlayerOptionStyled>
        <PlayerOptionStyled value="8">8 players</PlayerOptionStyled>
        <PlayerOptionStyled value="9">9 players</PlayerOptionStyled>
        <PlayerOptionStyled value="10">10 players</PlayerOptionStyled>
      </PlayersSelectStyled>
      <CreateButtonContainerStyled>
        <Link to="/">
          <LobbyButtonSmallStyled>Back</LobbyButtonSmallStyled>
        </Link>
        <LobbyButtonStyled onClick={() => fetchData()}>
          Create lobby
        </LobbyButtonStyled>
      </CreateButtonContainerStyled>
      {showLoader && <>{loadingText}</>}
    </ContainerStyled>
  );
}
