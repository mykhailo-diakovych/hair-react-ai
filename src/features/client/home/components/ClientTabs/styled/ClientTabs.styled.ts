import styled from "styled-components";
import { Tabs } from "@components/Tabs/styled/Tabs.styled";

export const StyledClientTabs = styled(Tabs)`
  .ant-tabs-content-holder {
    margin-top: 0 !important;
  }

  .ant-tabs-nav-wrap {
    width: 100%;
    flex: 1 1 100%;
  }

  .ant-tabs-nav-list {
    gap: 0;
    width: auto;
    margin: 0 auto;
    border-radius: 0;
    padding: 16px;
  }

  .ant-tabs-nav {
    width: 100%;
    flex: 1 1 100%;
    max-width: initial;
    background-color: ${(props) => props.theme.colors.mineshaft};
    margin: 0 auto 20px !important;

    &::before {
      border-bottom: none !important;
    }
  }

  .ant-tabs-tab {
    display: flex;
    justify-content: center;
    flex: 0 1 100%;
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
      content: " > ";
      margin: 0 8px;
    }
  }

  .ant-tabs-tab-btn {
    position: relative;
    z-index: 2;
    text-align: center;
    color: inherit !important;
  }

  .ant-tabs-ink-bar {
    display: none;
    z-index: 1;
    border-radius: inherit;
    height: 2px !important;
    background-color: ${(props) => props.theme.colors.primary} !important;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}) {
    .ant-tabs-nav-list {
      display: flex !important;
      padding: 0 !important;
      //flex-wrap: wrap;
    }

    .ant-tabs-tab {
      padding: 16px !important;

      &:not(:first-child)::before {
        display: none;
      }
    }

    .ant-tabs-ink-bar {
      display: block;
    }
  }

  @media (max-width: 390px) {
    .ant-tabs-tab {
      padding: 8px !important;
    }
  }
`;
