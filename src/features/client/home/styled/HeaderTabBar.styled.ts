import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledHeaderTabBar = styled(FlexGroup)`
  position: absolute;
  left: 0;
  right: 0;

  .ant-tabs-nav-wrap {
    width: 100%;
    flex: 1 1 100%;
  }

  .ant-tabs-nav-list {
    border-radius: 0;
    padding: 16px;
    background-color: ${(props) => props.theme.colors.mineshaft};
    display: flex;
  }

  .ant-tabs-nav {
    width: 100%;
    max-width: fit-content;
    margin: 0 auto !important;

    &::before {
      border-bottom: none !important;
    }
  }

  .ant-tabs-tab {
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin: 0 !important;
    padding: 0 !important;

    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
    border-radius: inherit;
    background-color: transparent !important;
    color: ${(props) => props.theme.colors.gray7} !important;

    &-disabled {
      cursor: not-allowed;
    }

    &:hover:not(&-disabled),
    &-active {
      color: ${(props) => props.theme.colors.primary} !important;
    }

    &:not(:first-child)::before {
      content: " / ";
      margin: 0 8px;
    }
  }

  .ant-tabs-tab-btn p {
    font-size: 16px !important;
  }

  .ant-tabs-ink-bar {
    display: none;
    z-index: 1;
    border-radius: inherit;
  }
`;
