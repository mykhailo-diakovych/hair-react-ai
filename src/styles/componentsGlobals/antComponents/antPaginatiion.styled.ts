import { css } from "styled-components";

export const StyledAntPagination = css`
  #root {
    .ant-pagination-item,
    .ant-pagination-jump-next,
    .ant-pagination-jump-prev {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background-color: ${(props) => props.theme.colors.athens};
      border: 1px solid ${(props) => props.theme.colors.mystic};

      &-active {
        background-color: ${(props) => props.theme.colors.malibuLight};
        border-color: ${(props) => props.theme.colors.malibu};
        font-weight: inherit;

        a {
          color: ${(props) => props.theme.colors.white} !important;
        }
      }
    }

    .ant-pagination-next,
    .ant-pagination-prev {
      & .ant-pagination-item-link {
        border-radius: 6px;
        border: 1px solid ${(props) => props.theme.colors.mystic};
        background-color: ${(props) => props.theme.colors.athens};
      }
    }

    .ant-pagination-item-ellipsis {
      color: inherit !important;
      opacity: 1 !important;
    }

    .ant-pagination-item-link-icon {
      display: none;
    }

    .ant-pagination-disabled .ant-pagination-item-link {
      color: ${(props) => props.theme.colors.gray7} !important;
      border: 1px solid ${(props) => props.theme.colors.athens};
    }
  }
`;
