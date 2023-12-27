import { css } from "styled-components";

export const StyledAntTooltip = css`
  .ant-tooltip {
    max-width: initial !important;
  }

  .ant-tooltip-inner:has(.slider-tooltip) {
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 100%;
    padding: 5px;
    margin-left: 2px;
    margin-top: 2px;
    min-width: 44px;
    aspect-ratio: 1;
    overflow: hidden;
  }

  .ant-tooltip:has(.slider-tooltip) {
    & .ant-tooltip-arrow {
      display: none !important;
    }
  }

  div:has(.slider-tooltip) {
    position: relative;
    z-index: 23232;
    pointer-events: none;
    transform: translateY(60%);
  }

  div:has(.slider-tooltip-vertical) {
    transform: translateX(-60%);
  }

  .ant-slider-horizontal .ant-slider-handle {
    transform: translate(-50%, calc(-50% + 5px)) !important;
  }

  .ant-slider-vertical .ant-slider-handle {
    transform: translate(calc(-50% + 5px), 50%) !important;
  }
`;
