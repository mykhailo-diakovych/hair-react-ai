import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledSimulationSidebar = styled(FlexGroup)`
  flex: 0 0 60px;
  background-color: ${(props) => props.theme.colors.mineshaft};

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    flex: 0 0 108px;
  }
`;
