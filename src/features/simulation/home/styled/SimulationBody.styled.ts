import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationBody = styled(FlexGroup)`
  position: relative;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    flex-direction: column;
    flex: unset;
  }

  .ant-drawer.ant-drawer-inline {
    position: sticky;
  }
`;
