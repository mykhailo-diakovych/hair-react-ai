import { css } from "styled-components";
import { darken } from "polished";

export const GlobalSwiperStyles = css`
  .swiper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .swiper-wrapper {
    display: flex;
    max-width: 240px;
  }

  .swiper-slide {
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    margin-right: 0;
    transition-property: transform;

    &:last-child {
      margin-right: 0 !important;
    }
  }

  button.swiper-button-prev,
  button.swiper-button-next {
    background-color: ${(props) => props.theme.colors.malibuLight} !important;
    border-radius: 100% !important;
    width: 24px !important;
    height: 24px !important;
    border: none !important;
    color: ${(props) => props.theme.colors.white} !important;

    &::before,
    &::after {
      content: "" !important;
    }

    &:not(:disabled):hover {
      background-color: ${(props) =>
        darken(0.1, props.theme.colors.malibuLight)} !important;
      color: ${(props) => props.theme.colors.white} !important;
      border: none !important;
    }
  }

  .swiper-button-disabled {
    opacity: 0.3 !important;
  }
`;
