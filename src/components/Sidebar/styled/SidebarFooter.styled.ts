import styled from "styled-components";
import { GroupItems } from "@components/GroupItems/GroupItems";

export const StyledSidebarFooter = styled(GroupItems)`
  cursor: pointer;
  gap: 5px;
  background-color: ${(props) => props.theme.colors.mineshaft600};
  padding: 16px;
  min-height: 120px;
  border-radius: ${(props) => props.theme.general.borderRadius}px;
`;
