import styled, { css } from "styled-components";
import { getImageUrl } from "@helpers/getImageUrl";
import { SliderBase } from "@components/Slider/Slider";
import { Paragraph } from "@components/Paragraph/Paragraph";

export const Slider = styled(SliderBase).attrs((props) => ({
  isActive: props.$isActive
}))`
  flex: 1 1 100%;

  margin: 15px 20px;
  max-width: 100%;
  padding-block: 5px;

  ${(props) => (props.vertical ? "min-height: 200px;" : "min-width: 200px;")}

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

  .ant-slider-mark {
    margin-top: 10px;
  }

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

  .ant-slider-dot {
    border-radius: 1px !important;
    width: 2px !important;
    height: 16px !important;
    background-color: ${(props) => props.theme.colors.mineshaft3} !important;
    inset-block-start: -6px !important;
    border: none !important;

    &-active {
      background-color: ${(props) => props.theme.colors.malibuLight} !important;
    }
  }
`;

export const StyledSliderValue = styled(Paragraph)`
  padding: 2px 12px;
  min-width: 52px;
  text-align: center;
  background: #171717;
  border: 1px solid
    ${(props) =>
      props.theme.config.darkMode
        ? props.theme.colors.white
        : props.theme.colors.black};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.dustyGray};
`;
