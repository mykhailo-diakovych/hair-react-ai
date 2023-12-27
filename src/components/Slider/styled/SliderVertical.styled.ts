import styled, { css } from "styled-components";
import { getImageUrl } from "@helpers/getImageUrl";
import { SliderVerticalBase } from "@components/Slider/SliderVertical";

export const SliderVertical = styled(SliderVerticalBase)`
  flex: 1 1 100%;

  margin: 15px 20px;
  max-width: 100%;
  padding-block: 5px;

  ${(props) =>
    props.vertical
      ? css`
          min-height: 200px;
          min-width: auto;
          width: auto;
          height: initial;
        `
      : "min-width: 200px;"}

  .slider-outer:has(&) {
    flex: 0 0 50px;

    .slider-controls {
      width: 30px;
      transform: rotate(-90deg);
    }

    .slider-label {
      margin-right: 104px;
      margin-left: 10px;
    }
  }

  .ant-slider-rail {
    border: 1px solid #ffffff;
    border-radius: 2.5px;
    background-color: ${(props) => props.theme.colors.black};
    height: 5px;
    //width: 100% !important;
  }

  &.ant-slider-vertical .ant-slider-rail {
    height: 100%;
  }

  .ant-slider-track,
  &:hover .ant-slider-track {
    border: 1px solid #ffffff;
    border-radius: 2.5px;
    height: 5px;
    background-color: ${(props) => props.theme.colors.malibuLight};
  }

  .ant-slider-handle {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    /* transform: translate(-50%, calc(-50% + 5px)) !important; */

    &::before,
    &::after {
      inset-inline-start: 0 !important;
      inset-block-start: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-shadow: none !important;
      transition: none !important;
    }

    &::before {
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url(${(props) => getImageUrl(props.$backgroundImage)});
      background-color: ${(props) => props.theme.colors.malibu};
      border-radius: inherit;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    &::after {
      z-index: -1;
      background: ${(props) => props.theme.colors.malibuLight};
      transform: scale(2);
    }
  }

  ${(props) =>
    !props.$isActive
      ? css`
          display: none;
        `
      : css`
          opacity: 1;
          visibility: visible;
          pointer-events: all;
          cursor: pointer;
        `}

  ${(props) =>
    props.$showMarks === false &&
    css`
      .ant-slider-mark {
        display: none;
      }

      .ant-slider-step {
        display: none;
      }

      &.ant-slider-with-marks {
        margin-bottom: 15px !important;
      }
    `}
`;
