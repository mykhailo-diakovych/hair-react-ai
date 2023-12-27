import { css } from "styled-components";

export const StyledAntTable = css`
  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-table,
  .ant-table-container,
  .ant-table-content {
    height: 100%;
  }

  .ant-table-content table {
    height: 100%;
  }

  .ant-table-wrapper {
    max-width: calc(100vw - 76px);
    overflow: auto;
    height: 100%;

    @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
      max-width: calc(100vw - 126px);
    }
  }

  .ant-table {
    background: transparent !important;
  }

  .ant-table-thead {
    background-color: ${(props) => props.theme.background.primary};
  }

  .ant-table-thead .ant-table-cell {
    vertical-align: middle;
    white-space: nowrap;
    border-bottom: none !important;
  }

  .ant-table-thead .ant-table-cell:first-of-type {
    padding-left: 25px !important;
    border-radius: 10px 0 0 10px;
  }

  .ant-table-thead .ant-table-cell:last-of-type {
    padding-right: 25px !important;
    border-radius: 0 10px 10px 0;
  }

  .ant-table-row:last-of-type .ant-table-cell {
    border-bottom: none !important;
  }

  .ant-table-cell {
    vertical-align: top;
    padding: 20px 10px !important;
    background: transparent !important;
    border-bottom: 1px solid ${(props) => props.theme.colors.mystic} !important;

    &:first-of-type {
      padding-left: 0 !important;
    }

    &:last-of-type {
      padding-right: 0 !important;
    }
  }

  .ant-table-placeholder .ant-table-cell {
    border-bottom: none !important;
  }

  .ant-table-thead .ant-table-cell::before {
    display: none;
  }

  .ant-table-pagination {
    display: none !important;
  }

  .ant-collapse-borderless {
    background-color: transparent !important;
  }

  .full-height-cell {
    display: flex;
    align-items: stretch;
  }

  .cell-content {
    flex-grow: 1;
  }

  .profile-simulations {
    padding: 10px;
    border-radius: 14px 14px;
    border: 1.5px solid ${(props) => props.theme.colors.mystic};

    .ant-table-cell {
      padding: 20px 10px;

      &:first-of-type {
        padding-left: 10px !important;
      }

      &:last-of-type {
        padding-right: 10px !important;
      }
    }
  }

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    .ant-table-wrapper {
      max-width: calc(100vw - 356px);
    }

    .profile-simulations {
      max-width: calc(100vw - 324px);
    }
  }
`;
