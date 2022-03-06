import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServerAdress } from "../../utils/config";
import {
  LobbyPlayersTableStyled,
  PlayerTableStyled,
  PlayerTableTextStyled,
} from "./lobby.style";

export default function Lobby({ socket }: any) {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingText, setLoadingText] = useState<string>(
    "Joining the lobby ..."
  );
  const [data, setData] = useState<any>(null);
  const code = params.id;

  useEffect(() => {
    fetch(getServerAdress() + "/lobby/" + code, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);

        if (data.isPlayerInLobby) {
          socket.emit("lobby update");

          socket.on("lobby update players", () => {
            fetch(getServerAdress() + "/lobby/update_players/" + code, {
              method: "POST",
              credentials: "include",
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("updated data", data);
                setData(data);
              })
              .catch((err) => console.error(err));
          });
        }
      })
      .catch(() => setLoadingText("Failed to join the lobby"));

    return () => socket.off("lobby update players");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <>{loadingText}</>
      ) : (
        <>
          {data.doesLobbyExist && data.isPlayerInLobby && (
            <>
              <span>Created lobby:</span>
              <span>{JSON.stringify(data.createdLobby)}</span>
              <LobbyPlayersTableStyled>
                {data.players.map((player: any, key: number) => {
                  return (
                    <PlayerTableStyled key={key}>
                      <PlayerTableTextStyled key={key}>
                        {player}
                      </PlayerTableTextStyled>
                    </PlayerTableStyled>
                  );
                })}
              </LobbyPlayersTableStyled>
              <button
                onClick={() => {
                  fetch(getServerAdress() + "/lobby/leave/" + code, {
                    method: "POST",
                    credentials: "include",
                  })
                    .then(() => {
                      socket.emit("lobby update");
                      navigate("/");
                    })
                    .catch((err) => console.error(err));
                }}
              >
                Leave lobby
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}
