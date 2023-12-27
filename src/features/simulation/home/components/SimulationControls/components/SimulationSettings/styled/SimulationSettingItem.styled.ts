import styled from "styled-components";
import { GroupItems } from "@components/GroupItems/GroupItems";

export const SimulationSettingItem = styled(GroupItems)`
  padding: 20px 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.colors.scorpion};
  }
`;
