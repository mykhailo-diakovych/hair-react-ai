import { css } from "styled-components";

export const StyledAntPopover = css`
  .ant-popover-arrow {
    display: none !important;
  }

  .ant-popover-inner {
    padding: 0 !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }

  .ant-popover-content,
  .ant-popover-inner,
  .ant-popover-inner-content {
    height: 100%;
  }

  .color-popover {
    right: 10px;
  }
`;
