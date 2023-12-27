import { css } from "styled-components";

import { StyledAntUpload } from "@styles/componentsGlobals/antComponents/antUpload.styled";
import { StyledAntTooltip } from "@styles/componentsGlobals/antComponents/antTooltip.styled";
import { StyledAntTable } from "@styles/componentsGlobals/antComponents/antTable.styled";
import { StyledAntSelect } from "@styles/componentsGlobals/antComponents/antSelect.styled";
import { StyledAntPopover } from "@styles/componentsGlobals/antComponents/antPopover.styled";
import { StyledAntPagination } from "@styles/componentsGlobals/antComponents/antPaginatiion.styled";
import { StyledAntModal } from "@styles/componentsGlobals/antComponents/antModal.styled";
import { StyledAntInput } from "@styles/componentsGlobals/antComponents/antInput.styled";
import { StyledAntDrawer } from "@styles/componentsGlobals/antComponents/antDrawer.styled";
import { StyledAntColorPicker } from "@styles/componentsGlobals/antComponents/antColorPicker.styled";

export const GlobalAntDesignStyles = css`
  [class*="ant"] {
    font-family: inherit !important;
    font-size: inherit !important;
  }

  .ant-layout {
    height: 100%;
  }

  .ant-divider {
    margin: 20px 0;
  }

  .ant-btn {
    border-radius: 0 !important;
  }

  .slider-label {
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.dustyGray};
  }

  .slider-wrapper {
    background-color: ${(props) => props.theme.background.dustyGray700};
    box-shadow: inset -1px -1px 4px rgba(9, 9, 9, 0.7),
      inset 1px 1px 2px rgba(9, 9, 9, 0.5);
    border-radius: 8px;
  }

  .ant-color-picker-slider-container {
    flex-direction: column;
  }

  .ant-color-picker-panel-wrapper {
    width: 260px !important;
    padding: 10px;
    background-color: ${(props) => props.theme.colors.mineshaft};
  }

  .ant-tabs-nav-operations {
    display: none !important;
  }

  .Toastify__toast {
    z-index: 90909090909090;
  }

  .ant-drawer-content-wrapper {
    //width: auto !important;
    max-width: 100vw;
  }

  .client-tabs__container {
    padding: 0 !important;
    max-width: 487px;
    margin: 0 auto;
    width: 100%;
  }

  body:has(.ant-tabs-tab-active[data-node-key="2"]) .client-tabs__container {
    max-width: 100%;
  }

  //.ant-skeleton,
  //.ant-skeleton-image {
  //  width: 100% !important;
  //  height: 100% !important;
  //}

  ${StyledAntTable}
  ${StyledAntSelect}
  ${StyledAntModal}
  ${StyledAntPagination}
  ${StyledAntDrawer}
  ${StyledAntTooltip}
  ${StyledAntUpload}
  ${StyledAntPopover}
  ${StyledAntInput}
  ${StyledAntColorPicker}
`;
