import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Container } from "@components/Container/Container.styled";

export const ProfileContainer = styled(Container)`
  padding: 15px;

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding: 20px;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding: 10px;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    padding: 0;
  }
`;

export const ProfileContainerInner = styled(FlexGroup)`
  padding: 20px;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    padding: 10px;
  }
`;
