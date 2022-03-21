import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { CardTypeStyled } from "./card-type.style";

const role_images = [
  "/img/fascist_role.png",
  "/img/liberal_role.png",
  "/img/hitler_role.png",
  "/img/secret_role.png",
];

const party_images = [
  "/img/fascist_party.png",
  "/img/liberal_party.png",
  "/img/secret_party.png",
];

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
                ? role_images[0]
                : party_images[0]
              : type === "role"
              ? role_images[3]
              : party_images[2]
          }
          alt={type + " card-" + role}
        />
      </CardTypeStyled>
    </>
  );
}
