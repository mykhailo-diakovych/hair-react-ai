import styled, { css } from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const CarouselOuter = styled(FlexGroup)`
  position: relative;
  display: flex;
  margin: 0 auto;
  padding: 0 40px;
  max-width: 1000px;

  ${(props) =>
    props.$expandSlides &&
    css`
      .swiper-wrapper {
        max-width: 100%;
      }

      .swiper-slide {
        flex: 1 1 auto;
        width: auto !important;
      }
    `}
`;
