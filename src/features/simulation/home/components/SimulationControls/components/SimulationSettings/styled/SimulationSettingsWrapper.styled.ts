import styled, { css } from "styled-components";
import { Accordion } from "@components/Accordion/styled/Accordion.styled";

export const SimulationSettingsWrapper = styled(Accordion)`
  transition: opacity 0.2s;

  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}

  .ant-collapse-content-box {
    padding: 0 !important;
  }

  .ant-collapse-header {
    justify-content: center;
    flex-direction: row-reverse;
    background-color: transparent !important;
    color: ${(props) => props.theme.colors.malibuLight} !important;
  }

  .ant-collapse-header-text {
    margin-inline-end: initial !important;
    flex: initial !important;
  }

  .ant-collapse-expand-icon {
    padding-inline-end: 0 !important;
  }

  .ant-collapse-item {
    border-top: none !important;
  }

  .ant-collapse-item:last-child {
    border-bottom: none !important;
  }
`;
