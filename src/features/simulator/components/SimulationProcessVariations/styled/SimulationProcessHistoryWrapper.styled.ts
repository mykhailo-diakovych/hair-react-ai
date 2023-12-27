import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationProcessHistoryWrapper = styled(FlexGroup)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    position: static;
    order: 3;
  }
`;
