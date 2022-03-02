import {
  ContainerStyled,
  GovernmentIndicatorStyled,
  HiddenContainerStyled,
  TextStyled,
} from "./government-indicator.style";

interface Props {
  type: string;
  rotate: number;
  size: number;
}

export default function GovernmentIndicator({ type, rotate, size }: Props) {
  return (
    <ContainerStyled rotate={rotate}>
      <HiddenContainerStyled size={size}>
        <GovernmentIndicatorStyled type={type} size={size}>
          <TextStyled size={size}>{type}</TextStyled>
        </GovernmentIndicatorStyled>
      </HiddenContainerStyled>
    </ContainerStyled>
  );
}
