import styled from "styled-components";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const GenerateSimulationHistoryButton = styled(ButtonIcon)`
  flex: 0 0 32px !important;
  width: 32px !important;
  height: 32px !important;

  border-radius: ${(props) => props.theme.general.borderRadius}px !important;
  background-color: ${(props) => props.theme.colors.mineshaft600} !important;

  &:disabled {
    opacity: 0.3;
  }
`;
