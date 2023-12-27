import styled, { css } from "styled-components";
import { SwitchBase } from "@components/Switch/Switch";

export const Switch = styled(SwitchBase)`
  flex: 0 0 43px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 43px;
  background-color: ${(props) => props.theme.colors.gray7} !important;
  border-radius: 39px;
  height: 26px;

  .ant-switch-inner {
    border-radius: inherit;
  }

  &:active .ant-switch-handle::before {
    inset-inline-start: unset !important;
    inset-inline-end: unset !important;
  }

  .ant-switch-handle {
    top: unset;
    background: ${(props) => props.theme.colors.white} !important;
    border-radius: 100%;

    &::before {
      width: 10px;
      height: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: none !important;
      background: ${(props) => props.theme.colors.white} !important;
    }
  }

  &.ant-switch-checked {
    background-color: ${(props) => props.theme.colors.malibuLight} !important;
  }

  ${(props) =>
    props.vertical &&
    css`
      transform: rotate(90deg);
    `}
`;
