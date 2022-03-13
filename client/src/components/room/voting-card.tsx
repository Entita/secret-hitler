import { VotingCardStyled } from "./voting-card.style";

const VotingCardsUrl: any = {
  ja: "ja_voting_card.png",
  nein: "nein_voting_card.png",
};

interface Props {
  type: string;
  size: number;
}

export default function VotingCard({ type, size }: Props) {
  return <VotingCardStyled url={VotingCardsUrl[type]} width={size} />;
}
