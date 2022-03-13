import { BoardStyled, ElectionTrackerStyled } from "./board.style";
import PolicyCard from "./policy-card";

const BoardUrl: any = {
  liberal: "liberal_board.png",
  fascist: "fascist_board.png",
};

interface Props {
  board: {
    type: string;
    cards: number;
    max_cards: number;
    size: number;
    election_tracker?: number;
  };
}

export default function Board({ board }: Props) {
  return (
    <BoardStyled url={BoardUrl[board.type]} size={board.size}>
      {[...Array(board.cards)].map((trash, index) => {
        const board_top = board.size / 4.3;
        const board_left = board.type === "fascist" ? board.size / 4 : board.size / 2.2;
        const card_width = board.size / 2.8
        const card_space = board.type === "fascist" ? board.size / 13.5 : board.size / 12.6;
        const position_left = board_left + (card_width + card_space) * index;
        return (
          <PolicyCard
            key={index}
            width={card_width}
            type={board.type}
            position={{ top: board_top, left: position_left }}
            show={true}
            flipable={true}
          />
        );
      })}
      {board.type === "liberal" && (
        <ElectionTrackerStyled election_tracker={board.election_tracker} size={board.size} />
      )}
    </BoardStyled>
  );
}
