import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const ColorPalleteWrapper = styled(FlexGroup)`
  padding: 6px;
  background-color: ${(props) => props.theme.colors.mineshaft600};
  border-radius: ${(props) => props.theme.general.borderRadius}px;
`;
