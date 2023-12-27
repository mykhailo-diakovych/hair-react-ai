import styled from "styled-components";
import { SimulationCanvasControls } from "@features/simulation/home/components/SimulationCanvasControlsWrapper/styled/SimulationCanvasControls.styled";

export const SimulationCanvasZoomControls = styled(SimulationCanvasControls)`
  color: ${(props) => props.theme.colors.dustyGray};
  background-color: ${(props) => props.theme.background.dustyGray700};
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.mineshaft3};
  width: auto;
  gap: 10px;
  border-radius: ${(props) => props.theme.general.borderRadius}px;
`;
