import { css } from "styled-components";
import { rgba } from "polished";

export const StyledAntSelect = css`
  .ant-select-arrow {
    transition: transform 0.3s;
  }

  .ant-select-open .ant-select-arrow {
    transform: rotate(-180deg);
  }

  .ant-select-dropdown {
    z-index: 999999999999;
    padding: 0 !important;
    border: 1px solid ${(props) => props.theme.colors.mystic};
    border-radius: 6px !important;
  }

  .ant-select-item {
    color: inherit !important;
    border-radius: 0 !important;

    &:last-child {
      border-bottom: 0;
    }
  }

  .ant-select-item-option-disabled {
    color: ${(props) =>
      props.theme.config.darkMode
        ? props.theme.colors.black
        : rgba(props.theme.colors.white, 0.5)} !important;
  }
`;
