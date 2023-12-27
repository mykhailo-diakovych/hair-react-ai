import styled from "styled-components";
import { Select as AntSelect } from "antd";

export const PaginationSelect = styled(AntSelect)`
  color: inherit !important;
  border-radius: 6px !important;

  .ant-select-selector {
    padding: 0 10px !important;
    border: 1px solid ${(props) => props.theme.colors.mystic} !important;
  }

  &.ant-select-open .ant-select-selector {
    border: 1px solid ${(props) => props.theme.colors.malibuLight} !important;
  }

  .ant-select-selection-item {
    color: inherit !important;
  }

  .ant-select-arrow {
    color: inherit;
  }
`;
