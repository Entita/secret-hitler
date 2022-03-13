import Table from "./table";
import { ContainerStyled } from "./room.style";
import { useEffect, useState } from "react";
import { getServerAdress } from "../../utils/config";

interface updateGameStateTypes {
  gameStateMessage: string;
  turn: string;
  role: string;
  party: string;
  president: string;
  gameOver: boolean;
  chancellor: string;
  proposedChancellor: string;
  liberalCards: number;
  fascistCards: number;
  electionTracker: number;
  policyCards: Array<string>;
  alreadyVoted: boolean;
  votes: Array<object>;
  action: string;
  history: Array<string>;
}

export default function Room({ socket, code }: any) {
  const [sessionID, setSessionID] = useState<string>("");
  const [gameStateMessage, setGameStateMessage] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [turn, setTurn] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [party, setParty] = useState<string>("");
  const [chancellor, setChancellor] = useState<string>("");
  const [president, setPresident] = useState<string>("");
  const [proposedChancellor, setProposedChancellor] = useState<string>("");
  const [liberalCards, setLiberalCards] = useState<number>(0);
  const [fascistCards, setFascistCards] = useState<number>(0);
  const [electionTracker, setElectionTracker] = useState<number>(0);
  const [policyCards, setPolicyCards] = useState<Array<string>>([]);
  const [alreadyVoted, setAlreadyVoted] = useState<boolean>(false);
  const [votes, setVotes] = useState<Array<object>>([]);
  const [action, setAction] = useState<string>("");
  const [history, setHistory] = useState<Array<string>>([]);

  function getSessionID() {
    fetch(getServerAdress() + "/room/get_session_id", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.status !== 200) throw response;
        return response.json();
      })
      .then((id) => {
        setSessionID(id);
        socket.emit("updateGameState", { code: code, sessionID: id });
      });
  }

  useEffect(() => {
    getSessionID();

    socket.on(
      "updateGameState",
      ({
        gameStateMessage,
        gameOver,
        turn,
        role,
        party,
        chancellor,
        president,
        proposedChancellor,
        liberalCards,
        fascistCards,
        electionTracker,
        policyCards,
        alreadyVoted,
        votes,
        action,
        history,
      }: updateGameStateTypes) => {
        gameStateMessage && setGameStateMessage(gameStateMessage);
        gameOver && setGameOver(gameOver);
        turn && setTurn(turn);
        role && setRole(role);
        party && setParty(party);
        chancellor && setChancellor(chancellor);
        president && setPresident(president);
        proposedChancellor && setProposedChancellor(proposedChancellor);
        liberalCards && setLiberalCards(liberalCards);
        fascistCards && setFascistCards(fascistCards);
        electionTracker && setElectionTracker(electionTracker);
        policyCards && setPolicyCards(policyCards);
        alreadyVoted && setAlreadyVoted(alreadyVoted);
        votes && setVotes(votes);
        action && setAction(action);
        history && setHistory(history);
      }
    );
    
    socket.on("updateGameState", (data: any) => {
      console.log(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContainerStyled>
      <Table
        fascistBoard={{
          type: "fascist",
          cards: fascistCards,
          max_cards: 6,
          size: 224,
        }}
        liberalBoard={{
          type: "liberal",
          cards: liberalCards,
          max_cards: 5,
          size: 224,
          election_tracker: electionTracker,
        }}
      />
    </ContainerStyled>
  );
}
