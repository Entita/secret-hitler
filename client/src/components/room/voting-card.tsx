import { VotingCardStyled } from "./voting-card.style";

const VotingCardsUrl: any = {
  ja: "img/ja_voting_card.png",
  nein: "img/nein_voting_card.png",
};

interface Props {
  type: string;
  size: number;
}

export default function VotingCard({ type, size }: Props) {
  return <VotingCardStyled url={VotingCardsUrl[type]} width={size} />;
}
