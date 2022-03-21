import { useState } from "react";
import {
  ContainerStyled,
  PolicyCardStyled,
  PolicyCardShadowStyled,
} from "./policy-card.style";

const PolicyCardUrl: any = {
  liberal: "/img/liberal_card.png",
  fascist: "/img/fascist_card.png",
  not_allowed: "/img/not_allowed_card.png",
  backside: "/img/policy_card.png",
};

interface Props {
  position?: object;
  type: string;
  width: number;
  show?: boolean;
  flippable?: boolean;
}

export default function PolicyCard({
  type,
  position,
  width,
  show,
  flippable,
}: Props) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <ContainerStyled
      className={flippable && clicked && "flipped"}
      position={position}
      width={width}
      onClick={() => setClicked(!clicked)}
      flippable={flippable}
      cursor={flippable && "pointer"}
    >
      <PolicyCardStyled>
        <img
          src={show ? PolicyCardUrl[type] : PolicyCardUrl.backside}
          alt={type}
        />
      </PolicyCardStyled>

      {flippable && <PolicyCardShadowStyled />}
    </ContainerStyled>
  );
}
