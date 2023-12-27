import styled from "styled-components";

export const StyledFilterPopover = styled.div<{ index: number }>`
  --thumb-active-height: 28px;
  max-width: 200px;

  .ant-segmented {
    display: block;
  }

  .ant-segmented-group {
    display: flex;
    flex-direction: column;
  }

  .ant-segmented-item {
    background-color: transparent !important;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }

  .ant-segmented-item:nth-of-type(${(props) => props.index + 1}) {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.silver400} !important;
  }

  .ant-segmented-item-label {
    padding: 3px 30px;
  }

  .ant-segmented-thumb {
    transition: transform 0.3s ease-in-out !important;
    height: var(--thumb-active-height);
    transform: translateY(
      calc(${(props) => props.index} * var(--thumb-active-height))
    ) !important;
    visibility: hidden !important;
  }
`;
