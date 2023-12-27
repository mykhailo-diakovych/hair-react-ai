import styled, { css } from "styled-components";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const StyledManualControl = styled(ButtonIcon)`
  border-radius: ${(props) => props.theme.general.borderRadius}px !important;
  background-color: ${(props) => props.theme.colors.mineshaft3} !important;
  border: 1px solid ${(props) => props.theme.colors.nobel} !important;

  ${(props) =>
    props.$isActive &&
    css`
      border: 1px solid ${(props) => props.theme.colors.malibuLight} !important;
    `}
`;
