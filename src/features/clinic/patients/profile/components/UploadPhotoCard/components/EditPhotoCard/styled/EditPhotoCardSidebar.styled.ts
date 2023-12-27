import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const EditPhotoCardSidebar = styled(FlexGroup)`
  margin-left: auto !important;
  background-color: ${(props) => props.theme.colors.codgray};
  max-width: 260px !important;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-left: initial !important;
    max-width: 100% !important;
  }
`;
