import { position } from "styled-system";
import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const ZoomControls = styled(FlexGroup)`
  color: ${(props) => props.theme.colors.dustyGray};
  background-color: ${(props) => props.theme.background.dustyGray700};
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.mineshaft3};
  width: auto;
  gap: 10px;
  z-index: 232323;
  border-radius: ${(props) => props.theme.general.borderRadius}px;
  position: absolute;

  ${position}
`;
