import ReactTooltip from "react-tooltip";
import { CardPileStyled } from "./card-pile.style";
import PolicyCard from "./policy-card";

interface Props {
  position?: object;
  width: number;
  count: number;
  draggable: boolean;
}

export function CardPile({ position, width, count, draggable }: Props) {
  return (
    <CardPileStyled
      width={width}
      position={position}
      data-tip={count + " cards left"}
    >
      <ReactTooltip
        multiline={false}
        effect="float"
        type="dark"
        place="top"
        className="tooltip"
      />
      {[...Array(count)].map((e, index) => {
        const padding =
          count > 6 ? (count > 12 ? index : index * 1.5) : index * 2;
        return (
          <PolicyCard
            width={width}
            type="not_allowed"
            key={index}
            position={{ top: padding, left: padding }}
          />
        );
      })}
    </CardPileStyled>
  );
}
