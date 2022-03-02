import { ContainerStyled } from "./policy-card.style";

const PolicyCardUrl: any = {
  liberal: "img/liberal_card.png",
  fascist: "img/fascist_card.png",
  not_allowed: "img/not_allowed_card.png",
  backside: "img/policy_card.png",
};

interface Props {
  type: string;
  position: object;
  width: number;
  show: boolean;
}

export default function PolicyCard({ type, position, width, show }: Props) {
  return (
    <ContainerStyled
      width={width}
      position={position}
      url={show ? PolicyCardUrl[type] : PolicyCardUrl.backside}
    />
  );
}
