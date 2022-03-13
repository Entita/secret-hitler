import { RoleCardStyled } from "./role-card.style";

const RoleCardsUrl: any = {
  fascist: "fascist_role.png",
  liberal: "liberal_role.png",
  hitler: "hitler_role.png",
  backside: "secret_role.png",
};

interface Props {
  type: string;
  size: number;
  show: boolean;
}

export default function RoleCard({ type, size, show }: Props) {
  return <RoleCardStyled url={show ? RoleCardsUrl[type] : RoleCardsUrl.backside} width={size} />;
}
