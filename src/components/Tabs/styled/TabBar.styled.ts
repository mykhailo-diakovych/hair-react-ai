import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledTabBar = styled(FlexGroup)`
  flex-wrap: wrap;
  padding: 10px 10px 10px;

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.lg}) {
    flex-wrap: nowrap;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}) {
    align-items: stretch;
    flex-direction: column;
  }
`;
