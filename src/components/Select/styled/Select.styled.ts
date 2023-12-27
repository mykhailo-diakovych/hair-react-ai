import styled from "styled-components";
import { SelectBase } from "@components/Select/Select";

export const Select = styled(SelectBase)`
  .ant-select-selector {
    background-color: ${(props) => props.theme.colors.mineshaft600} !important;
    border-radius: ${(props) => props.theme.general.borderRadius};
    color: ${(props) => props.theme.colors.white} !important;
    border: none !important;
  }

  .ant-select-arrow,
  .ant-select-selector,
  .ant-select-selection-item {
    color: inherit !important;
  }
`;
