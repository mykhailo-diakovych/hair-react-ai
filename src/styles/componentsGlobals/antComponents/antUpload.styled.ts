import { css } from "styled-components";

export const StyledAntUpload = css`
  .ant-upload {
    width: 100% !important;
    height: 100% !important;
    border: none !important;
    background-color: transparent !important;

    &-wrapper {
      height: 100%;
    }

    &-list-item {
      width: 100% !important;
      padding: 0 !important;
      border-radius: ${(props) => props.theme.general.borderRadius}px;
      overflow: hidden;

      &::before {
        width: 100%;
        height: 100%;
        border-radius: inherit !important;
      }
    }

    &-list-item-container {
      width: 100% !important;
      max-height: 64px;
    }
  }

  .ant-upload-list-item-image {
    object-fit: cover !important;
  }

  .ant-upload-select {
    margin: 0 !important;
  }
`;
