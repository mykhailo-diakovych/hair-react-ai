import { border } from "styled-system";
import styled from "styled-components";
import { getImageUrl } from "@helpers/getImageUrl";
import { ImageBase } from "@components/Image/Image";

export const StyledImage = styled(ImageBase)`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  object-fit: cover;
  max-width: ${(props) => props.maxWidth}px;

  &:not(.lazy-load-image-loaded)::before {
    content: "";
    position: absolute;
    z-index: 123;
    width: 100%;
    height: 100%;
    background-image: url(${getImageUrl("loader.svg")});
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(15px);
    transition: filter 0.6s ease-in-out;
  }

  &.lazy-load-image-loaded img {
    filter: blur(0);
  }

  ${border}
`;
