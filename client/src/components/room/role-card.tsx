import { RoleCardStyled } from "./role-card.style";

const RoleCardsUrl: any = {
  fascist: "img/fascist_role.png",
  liberal: "img/liberal_role.png",
  hitler: "img/hitler_role.png",
  backside: "img/secret_role.png",
};

interface Props {
  type: string;
  size: number;
  show: boolean;
}

export default function RoleCard({ type, size, show }: Props) {
  return <RoleCardStyled url={show ? RoleCardsUrl[type] : RoleCardsUrl.backside} width={size} />;
}
