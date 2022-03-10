import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServerAdress } from "../../utils/config";
import LobbyAccess from "./lobby_access";
import LobbyNoAccess from "./lobby_no_access";

export default function Lobby({ socket }: any) {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingText, setLoadingText] = useState<string>(
    "Joining the lobby ..."
  );
  const [data, setData] = useState<any>(null);
  const code = params.id || "";

  function fetchInit() {
    fetch(getServerAdress() + "/lobby/" + code, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);

        if (data.isPlayerInLobby) {
          initWebSockets();
        }
      })
      .catch(() => setLoadingText("Failed to join the lobby"));
  }

  function initWebSockets() {
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

  function fetchLeave() {
    fetch(getServerAdress() + "/lobby/leave/" + code, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        socket.emit("lobby update");
        navigate("/");
      })
      .catch((err) => console.error(err));
  }

  function fetchKick(player: string) {
    fetch(getServerAdress() + "/lobby/kick/" + code, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerToKick: player,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        socket.emit("lobby update");
        setData(data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchInit();

    return () => socket.off("lobby update players");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <>{loadingText}</>
      ) : (
        <>
          {data.doesLobbyExist && data.isPlayerInLobby ? (
            <LobbyAccess
              fetchLeave={fetchLeave}
              fetchKick={fetchKick}
              data={data}
              code={code}
            />
          ) : (
            <LobbyNoAccess data={data} />
          )}
        </>
      )}
    </>
  );
}
