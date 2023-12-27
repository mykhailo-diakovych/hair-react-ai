import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledClinicSettingsUser = styled(FlexGroup)`
  position: relative;
  background-color: ${(props) => props.theme.colors.mystic};
  border-radius: ${(props) => props.theme.general.borderRadius}px;
  padding: 8px;
`;
