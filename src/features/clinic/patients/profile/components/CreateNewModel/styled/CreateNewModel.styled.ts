import styled from "styled-components";
import { GroupItems } from "@components/GroupItems/GroupItems";

export const StyledCreateNewModel = styled(GroupItems)`
  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    gap: 6px;
  }
`;
