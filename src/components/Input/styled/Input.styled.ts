import { layout } from "styled-system";
import styled from "styled-components";
import { rgba } from "polished";
import { InputBase } from "@components/Input/Input";

export const Input = styled(InputBase)`
  width: 100%;
  padding: 8px;
  font-size: ${window.matchMedia("(pointer: coarse)").matches
    ? "16px"
    : "inherit"} !important;
  font-weight: 500;
  border: 1px solid
    ${(props) =>
      props.theme.config.darkMode ? "transparent" : props.theme.colors.gray7};
  background-color: ${(props) => props.theme.background.inputBgColor};
  border-radius: ${(props) => props.theme.general.borderRadius}px;

  & .ant-input {
    color: ${(props) => props.theme.colors.black} !important;
    background-color: transparent;
  }

  .ant-input-prefix + .ant-input {
    margin-left: 5px;
  }

  &:has(.ant-input:placeholder-shown) {
    color: ${(props) => rgba(props.theme.colors.black, 0.5)} !important;
  }

  & .ant-input:invalid {
    color: ${(props) => rgba(props.theme.colors.black, 0.5)} !important;
  }

  & .ant-input::placeholder,
  &::placeholder {
    font-size: inherit;
    font-family: inherit;
    color: ${(props) => rgba(props.theme.colors.black, 0.5)};
    font-weight: 500;
    background-color: transparent;
  }

  ${layout}
`;
