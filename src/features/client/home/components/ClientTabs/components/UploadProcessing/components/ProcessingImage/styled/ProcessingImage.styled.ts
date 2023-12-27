import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const ProcessingImageWrapper = styled(FlexGroup)`
  position: relative;
  overflow: hidden;
`;

export const ProcessingImageLoader = styled(FlexGroup)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;
