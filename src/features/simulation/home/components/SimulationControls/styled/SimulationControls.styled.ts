import styled from "styled-components";

export const StyledSimulationControls = styled.div`
  max-width: 300px;
  //flex: 1 0 300px;
  align-items: start;
  color: ${(props) => props.theme.colors.nobel} !important;
  background-color: ${(props) => props.theme.background.dustyGray700};

  .ant-tabs-tab {
    padding: 13px !important;
    background-color: ${(props) => props.theme.background.dustyGray700};
    border-left: 1px solid ${(props) => props.theme.colors.scorpion};
    border-top: 1px solid ${(props) => props.theme.colors.scorpion};
    border-bottom: 1px solid ${(props) => props.theme.colors.scorpion};

    &-active:not:last-child {
      border-right: none;
      border-left: none;
    }
  }

  .ant-tabs-nav::before {
    display: none !important;
  }

  .ant-tabs-nav-list {
    gap: 0;
    //margin: 0 -1px;

    &:last-child {
      border-right: 1px solid ${(props) => props.theme.colors.scorpion};
    }
  }

  .ant-tabs-tab-btn {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-tabs-ink-bar {
    background-color: ${(props) => props.theme.colors.mineshaft} !important;
    transform: translate(1px, -1px);
    height: 50px !important;
    width: 68px !important;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    max-width: 100%;
    flex: 1 1 100%;
  }
`;
