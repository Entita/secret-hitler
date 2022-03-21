import styled from "styled-components";
import { COLOR } from "../../../utils/color";

export const VotingCardStyled = styled.div<any>`
  width: ${({ width }) => width + "px"};
  aspect-ratio: 265/183;
  background-image: ${({ url }) => "url(/img/" + url + ")"};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${COLOR.white};
`;
