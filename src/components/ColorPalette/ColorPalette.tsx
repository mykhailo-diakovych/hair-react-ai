import React from "react";
import { COLOR_PALETTE_BASE } from "@config/constants";
import { ColorPalleteWrapper } from "@components/ColorPalette/styled/ColorPalleteWrapper.styled";
import { ColorPalleteItem } from "@components/ColorPalette/styled/ColorPalleteItem.styled";

interface ColorPaletteProps {
  activeColor: string;
  onChange?: (color: string) => void | any;
  setActiveColor: (color: string) => void | any;
}

export const ColorPalette = ({
  activeColor,
  onChange,
  setActiveColor
}: ColorPaletteProps) => {
  return (
    <ColorPalleteWrapper flexWrap={"wrap"} gap={6}>
      {COLOR_PALETTE_BASE.map((colorHex) => {
        return (
          <ColorPalleteItem
            key={colorHex}
            color={colorHex}
            $active={activeColor?.toUpperCase() === colorHex}
            onColorSelected={(color: string) => {
              setActiveColor(color);

              if (onChange) {
                onChange(color);
              }
            }}
          />
        );
      })}
    </ColorPalleteWrapper>
  );
};
