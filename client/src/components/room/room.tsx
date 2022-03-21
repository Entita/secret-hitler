import Table from "./table";
import { ContainerStyled, HandContainerStyled } from "./room.style";
import { useEffect, useState } from "react";
import { getServerAdress } from "../../utils/config";
import useDimensions from "../../hooks/useDimensions";
import CardType from "./cards/card-type";

interface updateGameStateTypes {
  turn: string;
  role: string;
  party: string;
  players: Array<object>;
  president: string;
  gameOver: boolean;
  chancellor: string;
  nominatedChancellor: string;
  liberalCards: number;
  fascistCards: number;
  electionTracker: number;
  numOfPlayers: number;
  policyCards: Array<string>;
  alreadyVoted: boolean;
  votes: Array<object>;
  action: string;
  history: Array<string>;
  drawPileCount: number;
  discardPileCount: number;
}

const gameStateMessages = {
  president_nominates: "The President nominates the Chancellor",
  government_voting: "Citizens elect their government",
  government_cancel: "The government has not been elected",
  election_tracker_moves: "Election tracker is shifting",
  election_tracker_maxed: "New policy is being deployed",
  president_pick_policy: "The president picks the policy",
  chancellor_pick_policy: "The chancellor picks the policy",
  apply_the_policy: "The policy is being applied",
  new_president: "The president is being elected",
  action_investigate: "The president is investigating a citizen",
  action_murder: "The president is assassinating a citizen",
  action_veto: "The veto law is enforced",
  action_examine: "The president is examining the policy",
  action_president: "The president is choosing his successor",
  game_over: "The game is over",
};

export default function Room({ socket, code }: any) {
  const [ref, size]: any = useDimensions();
  const [sessionID, setSessionID] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [turn, setTurn] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [party, setParty] = useState<string>("");
  const [players, setPlayers] = useState<Array<object>>([]);
  const [chancellor, setChancellor] = useState<string>("");
  const [president, setPresident] = useState<string>("");
  const [nominatedChancellor, setNominatedChancellor] = useState<string>("");
  const [liberalCards, setLiberalCards] = useState<number>(0);
  const [fascistCards, setFascistCards] = useState<number>(0);
  const [electionTracker, setElectionTracker] = useState<number>(0);
  const [numOfPlayers, setNumOfPlayers] = useState<number>(0);
  const [policyCards, setPolicyCards] = useState<Array<string>>([]);
  const [alreadyVoted, setAlreadyVoted] = useState<boolean>(false);
  const [votes, setVotes] = useState<Array<object>>([]);
  const [action, setAction] = useState<string>("");
  const [history, setHistory] = useState<Array<string>>([]);
  const [drawPileCount, setDrawPileCount] = useState<number>(0);
  const [discardPileCount, setDiscardPileCount] = useState<number>(0);

  const currentState = () => {
    if (president !== "") {
      if (nominatedChancellor === "") return "president_nominates";
      if (!alreadyVoted) return "government_voting";
      // if (cancelVote) return "government_cancel"
    }
  };

  const playerEvent = (state: string) => {
    switch (state) {
      case "president_nominates":
        break;
      default:
        console.error("Invalid state in 'PlayerEvent'.");
        break;
    }
  };

  const getSessionID = () => {
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
  };

  useEffect(() => {
    getSessionID();

    socket.on(
      "updateGameState",
      ({
        gameOver,
        turn,
        role,
        party,
        players,
        chancellor,
        president,
        nominatedChancellor,
        liberalCards,
        fascistCards,
        electionTracker,
        numOfPlayers,
        policyCards,
        alreadyVoted,
        votes,
        action,
        history,
        drawPileCount,
        discardPileCount,
      }: updateGameStateTypes) => {
        gameOver && setGameOver(gameOver);
        turn && setTurn(turn);
        role && setRole(role);
        party && setParty(party);
        players && setPlayers(players);
        chancellor && setChancellor(chancellor);
        president && setPresident(president);
        nominatedChancellor && setNominatedChancellor(nominatedChancellor);
        liberalCards && setLiberalCards(liberalCards);
        fascistCards && setFascistCards(fascistCards);
        electionTracker && setElectionTracker(electionTracker);
        numOfPlayers && setNumOfPlayers(numOfPlayers);
        policyCards && setPolicyCards(policyCards);
        alreadyVoted && setAlreadyVoted(alreadyVoted);
        votes && setVotes(votes);
        action && setAction(action);
        history && setHistory(history);
        drawPileCount && setDrawPileCount(drawPileCount);
        discardPileCount && setDiscardPileCount(discardPileCount);
      }
    );

    socket.on("updateGameState", (data: any) => {
      console.log(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const state = currentState();

  return (
    <ContainerStyled ref={ref}>
      <Table
        fascistBoard={{
          type: "fascist",
          cards: fascistCards,
          max_cards: 6,
          size: size.width / 6 || 0,
        }}
        liberalBoard={{
          type: "liberal",
          cards: liberalCards,
          max_cards: 5,
          size: size.width / 6 || 0,
          election_tracker: electionTracker,
        }}
        players={players}
        tableSize={{ width: size.width * 0.85, height: size.height * 0.85 }}
        drawPileCount={drawPileCount}
        discardPileCount={discardPileCount}
      />
      <HandContainerStyled>
        <CardType type={"role"} role={role} size={100} />
        <CardType type={"party"} role={role} size={100} />
      </HandContainerStyled>
      {turn === sessionID && <>{state && playerEvent(state)}</>}
    </ContainerStyled>
  );
}
