import styled, { css } from "styled-components";
import { Button } from "@components/Button/styled/Button.styled";

export const StyledSimulationOption = styled(Button)`
  padding: 8px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: ${(props) => props.theme.general.borderRadius}px !important;
  background-color: ${(props) => props.theme.colors.mineshaft600};
  min-width: initial;

  svg {
    width: 100%;
  }

  ${(props) =>
    props.$selected &&
    css`
      border: 1px solid ${props.theme.colors.malibuLight};
    `}
`;
