import { useEffect, useState } from "react";

interface Props {
  data: {
    doesLobbyExist: boolean;
    isPlayerInLobby: boolean;
    isLobbyFull: boolean;
    joinSuccess: boolean;
    createdLobby: boolean;
    players: Array<string>;
  };
}

export default function LobbyNoAccess({ data }: Props) {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!data.doesLobbyExist) setError("Lobby doesn't exist!");
    else if (data.isLobbyFull) setError("Lobby is currently full!");
    else setError("Unknown error.");
  }, [data]);

  return <>{error}</>;
}
