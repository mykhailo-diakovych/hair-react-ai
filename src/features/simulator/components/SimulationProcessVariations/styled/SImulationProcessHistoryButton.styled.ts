import styled from "styled-components";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const SimulationProcessHistoryButton = styled(ButtonIcon)`
  border-radius: ${(props) => props.theme.general.borderRadius}px !important;
  background-color: ${(props) => props.theme.colors.mineshaft600} !important;

  &:disabled {
    opacity: 0.3;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    width: 24px !important;
    height: 24px !important;
    flex: 0 0 24px;
  }
`;
