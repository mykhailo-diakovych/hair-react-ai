import styled from "styled-components";
import { darken } from "polished";
import { Button } from "@components/Button/styled/Button.styled";

export const ButtonPrimary = styled(Button)`
  color: #fff !important;
  background-color: ${(props) => props.theme.colors.malibuLight} !important;
  border-radius: ${(props) => props.theme.general.borderRadius}px !important;
  border: none !important;

  &:not(:disabled):hover {
    background-color: ${(props) =>
      darken(0.1, props.theme.colors.malibuLight)} !important;
    color: #fff !important;
  }
`;
