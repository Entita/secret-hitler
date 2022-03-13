import styled from "styled-components";

export const RoleCardStyled = styled.div<any>`
  width: ${({ width }) => width + "px"};
  aspect-ratio: 214/312;
  background-image: ${({ url }) => "url(/img/" + url + ")"};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
