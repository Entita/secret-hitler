import Board from "./board";
import { TableStyled } from "./table.style";
import Players from "./players";

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
  players: Array<object>;
  tableSize: {
    width: number;
    height: number;
  };
  drawPileCount: number;
  discardPileCount: number;
}

export default function Table({
  fascistBoard,
  liberalBoard,
  players,
  tableSize,
  drawPileCount,
  discardPileCount,
}: Props) {
  return (
    <TableStyled>
      <Players players={players} parentSize={tableSize} />
      <Board
        board={fascistBoard}
        drawPileCount={drawPileCount}
        discardPileCount={discardPileCount}
      />
      <Board
        board={liberalBoard}
        drawPileCount={drawPileCount}
        discardPileCount={discardPileCount}
      />

      {/* <VotingCard type="ja" size={100} /> */}
      {/* <VotingCard type="nein" size={100} /> */}
    </TableStyled>
  );
}
