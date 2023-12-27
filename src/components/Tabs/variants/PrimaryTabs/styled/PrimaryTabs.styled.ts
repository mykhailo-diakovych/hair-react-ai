import styled from "styled-components";
import { PrimaryTabsBase } from "@components/Tabs/variants/PrimaryTabs/PrimaryTabs";

export const PrimaryTabs = styled(PrimaryTabsBase)`
  .ant-tabs-nav {
    background-color: ${(props) => props.theme.colors.white};
    padding: 0 20px;
    border-radius: ${(props) => props.theme.general.borderRadius}px;
  }

  .ant-tabs-tab {
    min-width: 100px;
    justify-content: center;
    margin-left: 0 !important;
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.black} !important;
  }

  .ant-tabs-nav-wrap {
    overflow: auto;
  }

  .ant-tabs-nav::before {
    border-bottom: none !important;
  }

  .ant-tabs-ink-bar {
    bottom: -1px;
    height: 2px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.malibuLight} !important;
  }

  .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.black} !important;
  }
`;
