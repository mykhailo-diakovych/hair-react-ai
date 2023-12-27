import styled from "styled-components";
import { GroupItems } from "@components/GroupItems/GroupItems";

export const SimulationProcessImageWrapper = styled(GroupItems)`
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  max-height: max(calc(100vh - 220px), 500px);
  overflow: auto;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.lg}) {
    //grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    max-height: calc(100vh - 100px);
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;
