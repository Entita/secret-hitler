import styled from "styled-components";
import { COLOR } from "../../utils/color";

export const ContainerStyled = styled.div<any>`
  z-index: 0;
  transform: ${({ rotate }) => "rotate(" + rotate + "deg)"};
`;

export const HiddenContainerStyled = styled.div<any>`
  width: ${({ size }) => size + size * 0.25 + "px"};
  aspect-ratio: 5/1;
  overflow: hidden;
`;

export const GovernmentIndicatorStyled = styled.div<any>`
  width: ${({ size }) => size + "px"};
  aspect-ratio: 4/1;
  position: relative;
  left: ${({ size }) => size * 0.1 + "px"};
  background-color: ${COLOR.orange};
  border-radius: 4px 2px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    position: absolute;
    content: "";
    aspect-ratio: 1/1;
    width: ${({ size }) => size * 0.25 + "px"};
    right: ${({ size }) => -(size * 0.025) + "px"};
    z-index: -1;
    border-radius: 0 2px 0 0;
    background-color: ${COLOR.dark_orange};
    transform: rotate(-12.5deg);
  }
`;

export const TextStyled = styled.span<any>`
  text-transform: capitalize;
  font-family: Rockwell_Bold;
  font-size: ${({ size }) => size * 0.1 + "px"};
  letter-spacing: 4px;
  color: ${COLOR.white};
  text-shadow: 1px 1px 4px black;
  -webkit-text-stroke: 1px ${COLOR.dark_orange};
`;
