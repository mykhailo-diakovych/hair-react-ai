import { border, color, space } from "styled-system";
import styled from "styled-components";
import { darken, lighten } from "polished";
import { ButtonBase } from "@components/Button/Button";

export const Button = styled(ButtonBase)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.black};
  background: ${(props) =>
    props.color ? props.color : props.theme.colors.white};

  height: auto;
  padding: 6px 25px;
  width: 100%;
  min-width: 110px;
  font-weight: 500;
  box-shadow: none;
  transition: all 0.3s ease-in-out;
  border-radius: 0;

  &:disabled {
    opacity: 0.5;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    color: #fff;
  }

  &:not(:disabled):hover {
    background: ${(props) =>
      props.color
        ? props.theme.config.darkMode
          ? lighten(0.1, props.color)
          : darken(0.1, props.color)
        : props.theme.config.darkMode
        ? lighten(0.1, props.theme.colors.white)
        : darken(0.1, props.theme.colors.white)} !important;
    color: ${(props) => props.theme.colors.black} !important;
  }

  &:active {
    background-color: ${(props) =>
      props.color
        ? props.color
        : props.theme.config.darkMode
        ? lighten(0.1, props.theme.colors.white)
        : darken(0.1, props.theme.colors.white)} !important;
  }

  // styled-system additional props
  ${space}
  ${color}
  ${border}
`;
