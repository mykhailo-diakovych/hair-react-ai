import styled from "styled-components";
import { Tabs } from "antd";

export const SimulationPreviewTabs = styled(Tabs)`
  width: 100%;

  .ant-tabs-tabpane {
    display: flex;
    justify-content: center;

    &-hidden {
      display: none;
    }
  }

  .ant-tabs-tab {
    margin-left: 0 !important;
  }

  .ant-tabs-nav {
    border-radius: ${(props) => props.theme.general.borderRadius}px;
    width: 100%;
    overflow: hidden;
    background-color: ${(props) => props.theme.background.dustyGray700};
  }

  .ant-tabs-nav-list {
    padding: 13px 0;
    width: 100%;
  }

  .ant-tabs-tab {
    justify-content: center;
    flex: 1 1 50%;
    padding: 0;
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
    background-color: ${(props) => props.theme.colors.black} !important;
  }

  .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.dovegray} !important;
  }

  .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.black} !important;
  }
`;
