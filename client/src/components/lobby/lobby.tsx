import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Lobby() {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingText, setLoadingText] = useState<string>(
    "Joining the lobby ..."
  );
  const code = params.id;

  useEffect(() => {
    fetch("http://localhost:4000/lobby/" + code, {
      method: "GET",
      // credentials: "same-origin",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({
      //   players: players,
      // }),
    })
      .then((response) => response.json())
      .then((data) => setLoading(false))
      .catch(() => setLoadingText("Failed to join the lobby"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{loading ? <>{loadingText}</> : <>{code}</>}</>;
}
