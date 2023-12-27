import { css } from "styled-components";

export const StyledAntInput = css`
  #root {
    .ant-input-prefix {
      margin-right: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    .ant-input {
      &[type="password"] {
        &:not(:placeholder-shown) {
          font-family: auto !important;
        }
      }
    }
  }

  .ant-input-clear-icon {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
  }

  .ant-input-clear-icon svg,
  .ant-input-clear-icon .ant-btn {
    width: 100%;
    height: 100%;
  }
`;
