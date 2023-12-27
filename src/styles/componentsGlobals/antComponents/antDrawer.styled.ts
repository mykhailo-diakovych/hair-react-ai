import { css } from "styled-components";

export const StyledAntDrawer = css`
  .ant-drawer-content {
    background: ${(props) => props.theme.background.sidebar} !important;
  }

  .ant-drawer .ant-drawer-body {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
`;
