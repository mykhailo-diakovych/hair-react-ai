import { css } from "styled-components";

export const StyledAntModal = css`
  .ant-modal-centered {
    z-index: 2424242424 !important;
  }

  .ant-modal-mask {
    background: ${(props) => props.theme.colors.gray400};
    backdrop-filter: blur(2px);
  }

  .edit-photo-modal .ant-modal-body {
    padding: 0 !important;
  }

  .ant-modal-wrap {
    overflow: hidden !important;
  }
`;
