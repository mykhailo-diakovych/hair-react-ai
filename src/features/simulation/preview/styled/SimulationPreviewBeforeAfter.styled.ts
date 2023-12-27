import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationPreviewBeforeAfterWrapper = styled(FlexGroup)`
  padding: 20px;
  margin: 0 auto;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    flex-direction: column;
  }
`;

export const SimulationPreviewBeforeAfter = styled(FlexGroup)`
  max-height: calc(100vh - 100px);
`;
