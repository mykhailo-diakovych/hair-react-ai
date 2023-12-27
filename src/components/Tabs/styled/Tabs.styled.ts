import styled from "styled-components";
import { TabsBase } from "@components/Tabs/Tabs";

export const Tabs = styled(TabsBase)`
  .ant-tabs-nav-wrap {
    width: 100%;
  }

  .ant-tabs-content-holder,
  .ant-tabs-content,
  .ant-tabs-tabpane:has(.ant-spin-spinning) {
    height: 100%;
  }

  .ant-tabs-content-holder:has(.ant-tabs-tabpane) {
    margin-top: 24px;
  }

  .ant-tabs-nav-list {
    width: 100%;
    border-radius: 4px;
  }

  .ant-tabs-nav {
    width: 100%;
    max-width: fit-content;
    margin-bottom: 0 !important;
    display: ${(props) => props?.$hideTabs && "none !important"};

    &::before {
      border-bottom: none !important;
    }
  }

  .ant-tabs-tab {
    display: flex;
    justify-content: center;
    flex: 0 1 100%;
    margin: 0 !important;
    padding: 8px 16px !important;

    box-shadow: none;
    border-radius: 4px;

    &:hover {
      color: ${(props) => props.theme.colors.malibuLight};
    }

    &.ant-tabs-tab-active {
      color: ${(props) => props.theme.colors.malibuLight};
    }
  }

  .ant-tabs-tab-btn {
    position: relative;
    z-index: 2;
    text-align: center;
    color: inherit !important;
  }

  .ant-tabs-ink-bar {
    height: 100% !important;
    z-index: 1;
    background-color: ${(props) => props.theme.colors.zircon} !important;
    border-radius: inherit;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}) {
    .ant-tabs-nav-list {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }

    .ant-tabs-ink-bar {
      display: none;
    }

    .ant-tabs-tab-active {
      background-color: ${(props) => props.theme.colors.zircon};
    }

    .ant-tabs-nav {
      max-width: initial;
    }
  }
`;

export const TabsWrapper = styled.div<{ $bgColor?: string }>`
  padding: 0;
  background: ${(props) => props.$bgColor || props.theme.colors.white};
  border-radius: 14px;
  height: 100%;

  .ant-tabs {
    flex: 1 1 100%;
    height: 100%;
  }

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding: 24px;
  }
`;
