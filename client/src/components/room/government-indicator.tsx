import {
  ContainerStyled,
  GovernmentIndicatorStyled,
  HiddenContainerStyled,
  TextStyled,
} from "./government-indicator.style";

interface Props {
  position?: object;
  type: string;
  rotate: number;
  size: number;
}

export default function GovernmentIndicator({ position, type, rotate, size }: Props) {
  return (
    <ContainerStyled rotate={rotate} position={position}>
      <HiddenContainerStyled size={size}>
        <GovernmentIndicatorStyled type={type} size={size}>
          <TextStyled size={size}>{type}</TextStyled>
        </GovernmentIndicatorStyled>
      </HiddenContainerStyled>
    </ContainerStyled>
  );
}
