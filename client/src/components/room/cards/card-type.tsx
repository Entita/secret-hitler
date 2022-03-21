import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { CardTypeStyled } from "./card-type.style";

const role_images:any = {
  fascist: "/img/fascist_role.png",
  liberal: "/img/liberal_role.png",
  hitler: "/img/hitler_role.png",
  backside: "/img/secret_role.png",
};

const party_images:any = {
  fascist: "/img/fascist_party.png",
  liberal: "/img/liberal_party.png",
  backside: "/img/secret_party.png",
};

interface Props {
  type: string;
  role: string;
  size: number;
}

export default function CardType({ type, role, size }: Props) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <ReactTooltip
        multiline={false}
        effect="float"
        type="dark"
        place="top"
        className="tooltip"
      />
      <CardTypeStyled
        width={size}
        data-tip="Click to rotate"
        onClick={() => setShow(!show)}
      >
        <img
          src={
            show
              ? type === "role"
                ? role_images[role]
                : party_images[role]
              : type === "role"
              ? role_images.backside
              : party_images.backside
          }
          alt={type + " card-" + role}
        />
      </CardTypeStyled>
    </>
  );
}
