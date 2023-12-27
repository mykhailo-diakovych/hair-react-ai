import { color, space } from "styled-system";
import styled, { css } from "styled-components";

import { darken, lighten } from "polished";
import { ButtonBase } from "@components/Button/Button";

export const ButtonOutlined = styled(ButtonBase)`
  display: inline-flex;
  gap: 5px;
  font-weight: 600;
  align-items: center;
  padding: 10px 16px;
  min-width: 110px;
  justify-content: center;
  background-color: transparent;
  border-color: ${(props) =>
    props.$outlineColor
      ? props.$outlineColor
      : props.color
      ? props.color
      : props.theme.colors.primary};
  line-height: 1;
  box-shadow: none;
  height: auto;
  border-radius: ${(props) => props.theme.general.borderRadius}px !important;
  color: ${(props) => (props.color ? props.color : "inherit")} !important;

  ${(props) =>
    props.danger &&
    css`
      border-color: ${props.theme.colors.red};
      color: ${props.theme.colors.red} !important;
      background-color: transparent !important;

      &:hover {
        color: ${props.theme.colors.white} !important;
        background-color: ${props.theme.colors.red} !important;
      }
    `}

  ${(props) =>
    props.$paddingY &&
    css`
      padding-top: ${props.$paddingY}px;
      padding-bottom: ${props.$paddingY}px;
    `}

  &:not(:disabled):hover {
    color: ${(props) => props.theme.colors.primary} !important;
    background-color: ${(props) =>
      darken(0.01, props.theme.background.primary)} !important;
  }

  &:active {
    background-color: ${(props) =>
      props.color
        ? props.color
        : props.theme.config.darkMode
        ? lighten(0.2, props.theme.colors.white)
        : darken(0.2, props.theme.colors.white)} !important;
  }

  // styled-system additional props
  ${space}
  ${color}
`;
