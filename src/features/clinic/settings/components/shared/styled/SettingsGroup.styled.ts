import styled from "styled-components";
import { GroupItems } from "@components/GroupItems/GroupItems";

export const SettingsGroup = styled(GroupItems)`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.general.borderRadius}px;
  overflow: hidden;
  padding: 20px;
`;
