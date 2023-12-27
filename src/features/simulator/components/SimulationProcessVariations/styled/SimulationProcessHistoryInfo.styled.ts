import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationProcessHistoryInfo = styled(FlexGroup)`
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.lg}) {
    flex-direction: column;
    justify-content: center;
  }
`;
