import Board from "./board";
import GovernmentIndicator from "./government-indicator";
import PolicyCard from "./policy-card";
import RoleCard from "./role-card";
import { TableStyled } from "./table.style";
import VotingCard from "./voting-card";

export default function Table() {
  const fascist_board = {
    type: "fascist",
    cards: 1,
    max_cards: 6,
    size: 224,
  };

  const liberal_board = {
    type: "liberal",
    cards: 2,
    max_cards: 5,
    size: 224,
    election_tracker: 0,
  };

  return (
    <TableStyled>
      <Board board={fascist_board} />
      <Board board={liberal_board} />

      <PolicyCard
        width={fascist_board.size / 2.8}
        type="not_allowed"
        position={{ top: 0, left: 0 }}
        show={false}
      />

      <VotingCard type="ja" size={100} />
      <VotingCard type='nein' size={100} />

      <RoleCard type="fascist" size={100} show={false} />
      <RoleCard type="liberal" size={100} show={true} />
      <RoleCard type="hitler" size={100} show={true} />
      <GovernmentIndicator type="chancellor" rotate={-12.5} size={200} />
      <GovernmentIndicator type="president" rotate={-8} size={150} />
    </TableStyled>
  );
}
