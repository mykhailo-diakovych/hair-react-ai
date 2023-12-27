import { space, grid, layout } from "styled-system";
import styled from "styled-components";
import { GroupItemsProps } from "@components/GroupItems/GroupItems";

export const StyledGroupItems = styled.div<GroupItemsProps>`
  display: grid;
  width: 100%;
  grid-gap: ${(props) =>
    props.gap || props.gap === 0 ? `${props.gap}px` : "12px"};
  background-color: ${(props) => (props.bgColor ? props.bgColor : null)};

  ${(props) => props.compact && "justify-items: start;"}

  ${(props) =>
    props.$columns && `grid-template-columns: repeat(${props.$columns}, 1fr)`};

  ${space};
  ${layout};
  ${grid};
`;
