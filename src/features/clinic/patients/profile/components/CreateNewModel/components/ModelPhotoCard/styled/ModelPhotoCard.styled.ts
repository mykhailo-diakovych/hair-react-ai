import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const StyledModelPhotoCard = styled(FlexGroup)`
  user-select: none;
  flex: 1 1 33.333%;
  max-width: 33.333%;
  padding: 10px;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    flex: 1 1 50%;
    max-width: 50%;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;
