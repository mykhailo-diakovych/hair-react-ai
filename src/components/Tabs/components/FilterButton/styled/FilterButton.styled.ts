import styled from "styled-components";
import { darken } from "polished";
import { FilterButtonBase } from "@components/Tabs/components/FilterButton/FilterButton";

export const FilterButton = styled(FilterButtonBase)`
  background-color: ${(props) => props.theme.colors.silver400} !important;
  border: none !important;

  &:not(:disabled):hover {
    background-color: ${(props) =>
      darken(0.1, props.theme.colors.silver400)} !important;
  }
`;
