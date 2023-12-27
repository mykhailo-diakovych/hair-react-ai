import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationCanvasWrapper = styled(FlexGroup)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-self: start;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: 100%;
  }
`;
