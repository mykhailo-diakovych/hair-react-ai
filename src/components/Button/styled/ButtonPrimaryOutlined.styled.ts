import styled from "styled-components";
import { darken, lighten } from "polished";
import { ButtonOutlined } from "@components/Button/styled/ButtonOutlined.styled";

export const ButtonPrimaryOutlined = styled(ButtonOutlined)`
  border-color: ${(props) => props.theme.colors.malibuLight} !important;
  color: ${(props) => props.theme.colors.malibuLight} !important;
  border-radius: ${(props) => props.theme.general.borderRadius}px !important;

  &:not(:disabled):hover {
    color: ${(props) => darken(0.1, props.theme.colors.black)} !important;
    border-color: ${(props) =>
      lighten(0.1, props.theme.colors.malibuLight)} !important;
    background-color: ${(props) => props.theme.colors.malibuLight};
  }

  &:disabled {
    opacity: 0.33;
  }
`;
