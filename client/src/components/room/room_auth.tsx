import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServerAdress } from "../../utils/config";
import Room from "./room";
import { RoomNoAccess } from "./room_no_access";

export function RoomAuth({ socket }: any) {
  const [authError, setAuthError] = useState<string>(
    "Checking authorization ..."
  );
  const [auth, setAuth] = useState<boolean>(false);
  const params = useParams();
  const code = params.id || "";

  useEffect(() => {
    fetch(getServerAdress() + "/room/auth/" + code, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.status !== 200) return setAuthError("Not authorized");
        setAuth(true);
      })
      .catch((err) => console.error(err));
  }, [code]);

  return (
    <>
      {auth ? (
        <Room socket={socket} code={code} />
      ) : (
        <RoomNoAccess authError={authError} />
      )}
    </>
  );
}
