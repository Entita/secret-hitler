import styled from "styled-components";

export const BoardStyled = styled.div<any>`
  position: relative;
  height: ${({ size }) => size + "px"};
  aspect-ratio: 2407/800;
  background-image: ${({ url }) => "url(/img/" + url + ")"};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 3px;
`;

export const ElectionTrackerStyled = styled.div<any>`
  position: absolute;
  width: ${({ size }) => size * 0.1 + "px"};
  aspect-ratio: 1/1;
  bottom: ${({ size }) => size / 15 + "px"};
  left: ${({ size, election_tracker }) =>
    size * 0.1 * 9.9125 + election_tracker * size * 0.295 + "px"};
  background-color: gold;
  border-radius: 50%;
`;
