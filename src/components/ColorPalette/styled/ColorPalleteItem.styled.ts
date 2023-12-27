import styled, { css } from "styled-components";
import { ColorPaletteItemBase } from "@components/ColorPalette/components/ColorPaletteItem";

export const ColorPalleteItem = styled(ColorPaletteItemBase)`
  background-color: ${({ color }) => color} !important;
  width: 30px !important;
  height: 30px !important;
  border-radius: ${({ theme }) => theme.general.borderRadius / 2}px !important;
  flex: 0 0 30px;
  padding: 0 !important;
  min-width: auto !important;
  border: none !important;

  ${(props) =>
    props.$active &&
    css`
      border: 3px solid ${props.theme.colors.black} !important;
    `}

  &:not(:disabled):hover {
    background-color: ${({ color }) => color} !important;
  }
`;
