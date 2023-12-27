import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationProcessBody = styled(FlexGroup)`
  color: ${(props) => props.theme.colors.black};

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    flex-direction: column;
    flex: unset;
  }
`;
