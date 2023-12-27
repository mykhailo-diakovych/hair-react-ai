import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledLeadSettingsOption = styled(FlexGroup)`
  border-radius: ${(props) => 2 * props.theme.general.borderRadius}px;
  background-color: ${(props) => props.theme.colors.mystic};
  padding: 20px;
`;
