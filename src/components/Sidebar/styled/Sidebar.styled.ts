import styled from "styled-components";
import { SidebarBase } from "@components/Sidebar/Sidebar";

export const Sidebar = styled(SidebarBase)`
  &.ant-layout-sider {
    position: sticky;
    top: 0;

    display: flex;
    flex-direction: column;
    width: 244px !important;
    min-width: 244px !important;
    flex: 0 0 244px !important;
    max-width: initial !important;
    background-color: ${(props) => props.theme.background.sidebar};
    padding: 24px;
    color: ${(props) => props.theme.colors.white};
    min-height: 100vh;
    min-height: 100dvh;
  }

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    gap: 10px 20px;
    flex: 1 1 auto;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    &.ant-layout-sider {
      width: auto !important;
      flex: 1 1 auto !important;
      min-width: auto !important;
      padding: 10px;
    }
  }
`;
