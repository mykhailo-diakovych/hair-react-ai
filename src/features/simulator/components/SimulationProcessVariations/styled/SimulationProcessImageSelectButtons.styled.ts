import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationProcessImageSelectButtons = styled(FlexGroup)`
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}) {
    flex-direction: column;
    gap: 10px;
  }
`;
