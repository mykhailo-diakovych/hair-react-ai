import styled from "styled-components";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const PreviewAllWrapper = styled(FlexGroup)`
  height: 100%;

  .swiper-slide span img {
    max-height: calc(100vh - 254px);
    height: auto;
    aspect-ratio: 3 / 4;
  }

  .swiper-slide div {
    margin: auto;
  }

  .swiper-slide a {
    height: max-content;
  }
`;
