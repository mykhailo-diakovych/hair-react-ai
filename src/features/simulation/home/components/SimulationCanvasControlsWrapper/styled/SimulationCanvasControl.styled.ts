import styled from "styled-components";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const SimulationCanvasControl = styled(ButtonIcon)`
  color: ${(props) => props.theme.colors.dustyGray};
  background-color: ${(props) => props.theme.background.dustyGray700};
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.mineshaft3};
  min-width: auto !important;
  gap: 10px;
  flex: 0 0 24px;
  width: 40px;
  height: 32px;
  border-radius: ${(props) => props.theme.general.borderRadius}px !important;

  &:disabled {
    color: ${(props) => props.theme.colors.dustyGray};
  }
`;
