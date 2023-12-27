import styled from "styled-components";
import { Tabs } from "@components/Tabs/styled/Tabs.styled";

export const SimulationTabs = styled(Tabs)`
  .simulation-tabs__wrapper:has(&) {
    background-color: ${(props) => props.theme.colors.mineshaft};
    padding: 0;
    height: auto;
  }

  & .ant-tabs-nav {
    max-width: none;
  }

  & .ant-tabs-tab {
    border-radius: 0 !important;
    color: ${(props) => props.theme.colors.chateau};
  }

  & .ant-tabs-tab-active {
    color: ${(props) => props.theme.colors.malibuLight} !important;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    .ant-tabs-ink-bar {
      display: none !important;
    }

    .ant-tabs-tab {
      transition: background-color 0.2s ease-in-out;
    }

    .ant-tabs-tab-active {
      background-color: ${(props) => props.theme.colors.mineshaft};
    }
  }
`;
