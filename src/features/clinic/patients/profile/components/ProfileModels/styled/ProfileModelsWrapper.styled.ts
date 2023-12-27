import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const ProfileModelsWrapper = styled(FlexGroup)`
  .swiper-slide {
    ${(props) => props.$shrinkModels && "flex: 1 0 auto !important;"}
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    .swiper-wrapper {
      max-width: calc(100vw - 76px);
    }
  }
`;
