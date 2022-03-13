import { useState } from "react";
import {
  ContainerStyled,
  PolicyCardStyled,
  PolicyCardShadowStyled,
} from "./policy-card.style";

const PolicyCardUrl: any = {
  liberal: "liberal_card.png",
  fascist: "fascist_card.png",
  not_allowed: "not_allowed_card.png",
  backside: "policy_card.png",
};

interface Props {
  type: string;
  position: object;
  width: number;
  show: boolean;
  flipable: boolean;
}

export default function PolicyCard({
  type,
  position,
  width,
  show,
  flipable,
}: Props) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <ContainerStyled
      className={flipable && clicked && "flipped"}
      position={position}
      width={width}
      onClick={() => setClicked(!clicked)}
      flipable={flipable}
    >
      <PolicyCardStyled
        url={show ? PolicyCardUrl[type] : PolicyCardUrl.backside}
      />
      <PolicyCardShadowStyled />
    </ContainerStyled>
  );
}
