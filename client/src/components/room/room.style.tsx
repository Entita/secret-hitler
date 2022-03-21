import styled from "styled-components";
import { COLOR } from "../../utils/color";

export const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${COLOR.white};
`;

export const HandContainerStyled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  gap: 4px;
`;
