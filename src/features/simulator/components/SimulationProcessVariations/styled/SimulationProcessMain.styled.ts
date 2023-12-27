import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationProcessMain = styled(FlexGroup)`
  position: relative;
  padding: 24px 40px 60px;
  gap: 40px;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xl}) {
    padding: 10px 20px 50px;
    gap: 20px;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.lg}) {
    flex-direction: column;
    padding-bottom: 110px;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    padding: 5px;
  }
`;
