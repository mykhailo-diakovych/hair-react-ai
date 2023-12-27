import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledClientTabHeader = styled(FlexGroup)`
  position: relative;
  background-color: ${(props) => props.theme.colors.codgray};
  padding: 10px 20px;
  margin: 0 auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;
