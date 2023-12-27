import { space } from "styled-system";
import styled, { css } from "styled-components";

import { ButtonBase } from "@components/Button/Button";

export const ButtonIcon = styled(ButtonBase)`
  flex: 0 0 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: transparent;
  border-radius: 6px !important;
  color: unset;

  ${(props) =>
    props.$buttonIconBg
      ? css`
          color: ${(props) => props.theme.colors.malibuLight};
          background: ${props.color ? props.color : props.theme.colors.white};
          border: 1px solid ${(props) => props.theme.colors.malibuLight} !important;
        `
      : null}

  box-shadow: none;
  padding: 2px;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.background.primary} !important;
    color: ${(props) => props.theme.colors.malibuLight} !important;

    ${(props) =>
      props.$buttonIconBg &&
      css`
        border: 1px solid ${(props) => props.theme.colors.primary} !important;
      `}

    ${(props) =>
      props?.$noHoverBg && `background-color: transparent !important;`}
  }

  &:disabled {
    opacity: 0.5;
    filter: none;
    color: unset;
  }

  // styled-system additional props
  ${space}
`;
