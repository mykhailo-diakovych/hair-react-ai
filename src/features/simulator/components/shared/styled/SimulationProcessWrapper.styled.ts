import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationProcessWrapper = styled(FlexGroup)`
  max-width: 700px;
  margin: 0 auto;
  align-self: flex-start;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.lg}) {
    padding-top: 0 !important;
  }
`;
