import styled from "styled-components";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const EditPhotoCardButton = styled(ButtonIcon)`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 32px;
  height: 32px;
  border-radius: 100% !important;
  border: 1px solid ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.white};
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);

  &:not(:disabled):hover {
    color: ${(props) => props.theme.colors.white} !important;
    background-color: rgba(255, 255, 255, 0.4) !important;
  }
`;
