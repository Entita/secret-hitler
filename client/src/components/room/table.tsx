import Board from "./board";
import GovernmentIndicator from "./government-indicator";
import PolicyCard from "./policy-card";
import RoleCard from "./role-card";
import { TableStyled } from "./table.style";
import VotingCard from "./voting-card";

interface Props {
  fascistBoard: {
    type: string;
    cards: number;
    max_cards: number;
    size: number;
  };
  liberalBoard: {
    type: string;
    cards: number;
    max_cards: number;
    size: number;
    election_tracker: number;
  };
}

export default function Table({ fascistBoard, liberalBoard }: Props) {
  return (
    <TableStyled>
      <Board board={fascistBoard} />
      <Board board={liberalBoard} />

      <PolicyCard
        width={fascistBoard.size / 2.8}
        type="not_allowed"
        position={{ top: 0, left: 0 }}
        show={false}
        flipable={false}
      />

      {/* <VotingCard type="ja" size={100} /> */}
      <VotingCard type="nein" size={100} />

      {/* <RoleCard type="fascist" size={100} show={false} />
      <RoleCard type="liberal" size={100} show={true} /> */}
      <RoleCard type="hitler" size={100} show={true} />
      {/* <GovernmentIndicator type="chancellor" rotate={-12.5} size={200} /> */}
      <GovernmentIndicator type="president" rotate={-8} size={150} />
    </TableStyled>
  );
}
