import { useState } from "react";
import {
  CodeContainerStyled,
  CodeCopyStyled,
  CodeInputStyled,
  LobbyPlayersTableStyled,
  PlayerKickButtonStyled,
  PlayerTableStyled,
  PlayerTableTextStyled,
} from "./lobby_access.style";

interface Props {
  fetchLeave: Function;
  fetchKick: Function;
  fetchStart: Function;
  data: {
    doesLobbyExist: boolean;
    isPlayerInLobby: boolean;
    isLobbyFull: boolean;
    joinSuccess: boolean;
    createdLobby: boolean;
    players: Array<string>;
  };
  code: string;
}

export default function LobbyAccess({
  fetchLeave,
  fetchKick,
  fetchStart,
  data,
  code,
}: Props) {
  const [copyText, setCopyText] = useState<string>("Copy");
  return (
    <>
      <CodeContainerStyled>
        <CodeInputStyled value={code} readOnly />
        <CodeCopyStyled
          onClick={() => {
            navigator.clipboard.writeText(code || "");
            setCopyText("Copied");
          }}
        >
          {copyText}
        </CodeCopyStyled>
      </CodeContainerStyled>
      <LobbyPlayersTableStyled>
        {data.players.map((player: any, key: number) => {
          return (
            <PlayerTableStyled key={key}>
              <PlayerTableTextStyled key={key}>{player}</PlayerTableTextStyled>
              {data.createdLobby && key !== 0 && (
                <PlayerKickButtonStyled onClick={() => fetchKick(player)}>
                  Kick
                </PlayerKickButtonStyled>
              )}
            </PlayerTableStyled>
          );
        })}
      </LobbyPlayersTableStyled>
      <button onClick={() => fetchLeave()}>Leave lobby</button>
      {data.createdLobby && data.isLobbyFull && (
        <button onClick={() => fetchStart()}>Start game</button>
      )}
    </>
  );
}
