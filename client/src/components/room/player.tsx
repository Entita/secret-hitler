import useDimensions from "../../hooks/useDimensions";
import GovernmentIndicator from "./government-indicator";
import { PlayerNameStyled, PlayerZoneStyled } from "./player.style";

interface Props {
  name: string;
  direction: string;
  num: number;
  nums: number;
  president: boolean;
  chancellor: boolean;
  parentSize: {
    width: number;
    height: number;
  };
}

export default function Player({
  name,
  direction,
  num,
  nums,
  parentSize,
  president,
  chancellor,
}: Props) {
  const [zoneRef, zoneSize]: any = useDimensions();
  const [nameRef, nameSize]: any = useDimensions();
  const getPosition = () => {
    let top, left, right, bottom, rotation, transformOrigin;

    if (direction === "top" || direction === "bottom") {
      left = (parentSize.width / (nums + 1)) * num - zoneSize.width / 3;
      if (direction === "top") top = 0;
      else bottom = 0;
    } else {
      top = (parentSize.height / (nums + 1)) * num + zoneSize.height / 3;
      if (direction === "left") {
        rotation = "rotate(-90deg)";
        transformOrigin = "left";
        left = zoneSize.width / 2;
      } else {
        rotation = "rotate(90deg)";
        transformOrigin = "right";
        right = zoneSize.width / 2;
      }
    }

    return {
      top: top !== undefined ? top + "px" : "auto",
      left: left !== undefined ? left + "px" : "auto",
      right: right !== undefined ? right + "px" : "auto",
      bottom: bottom !== undefined ? bottom + "px" : "auto",
      rotation: rotation !== undefined ? rotation : "none",
      transformOrigin:
        transformOrigin !== undefined ? transformOrigin : "center",
    };
  };
  const getPadding = () => {
    let top, left, right, bottom;
    const horizontalPadding = 5;
    const verticalPadding = 5;
    if (direction === "top" || direction === "bottom") {
      if (direction === "top") {
        left =
          -(nameSize.width - zoneSize.width - horizontalPadding * 2) / 2 -
          horizontalPadding;
        top = -nameSize.height - verticalPadding;
      } else {
        left =
          -(nameSize.width - zoneSize.width - horizontalPadding * 2) / 2 -
          horizontalPadding;
        bottom = -nameSize.height - verticalPadding;
      }
    } else {
      if (direction === "left") {
        left =
          -(nameSize.height - zoneSize.height - verticalPadding * 2) / 2 -
          horizontalPadding;
        top = -nameSize.width - verticalPadding;
      } else {
        right =
          -(nameSize.height - zoneSize.height - verticalPadding * 2) / 2 -
          horizontalPadding;
        top = -nameSize.width - verticalPadding;
      }
    }
    return {
      top: top !== undefined ? top + "px" : "auto",
      left: left !== undefined ? left + "px" : "auto",
      right: right !== undefined ? right + "px" : "auto",
      bottom: bottom !== undefined ? bottom + "px" : "auto",
    };
  };

  const getGovernmentIndicatorPosition = () => {
    let top, left, right, bottom;
    if (direction === "bottom") bottom = -zoneSize.height + 40;
    else if (direction === "left") top = 100;
    else if (direction === "right") bottom = -50;

    return {
      top: top !== undefined ? top + "px" : "auto",
      left: left !== undefined ? left + "px" : "auto",
      right: right !== undefined ? right + "px" : "auto",
      bottom: bottom !== undefined ? bottom + "px" : "auto",
    };
  };

  const getGovernmentIndicatorRotation = () => {
    let rotation = 0;

    if (direction === "left") rotation = 90;
    else if (direction === "right") rotation = -90;

    return rotation;
  };

  return (
    <PlayerZoneStyled
      ref={zoneRef}
      position={getPosition()}
      direction={direction}
    >
      {president && (
        <GovernmentIndicator
          type="president"
          position={getGovernmentIndicatorPosition()}
          rotate={getGovernmentIndicatorRotation()}
          size={150}
        />
      )}
      {chancellor && (
        <GovernmentIndicator
          type="chancellor"
          position={getGovernmentIndicatorPosition()}
          rotate={0}
          size={150}
        />
      )}
      <PlayerNameStyled ref={nameRef} padding={getPadding()}>
        {name}
      </PlayerNameStyled>
    </PlayerZoneStyled>
  );
}
