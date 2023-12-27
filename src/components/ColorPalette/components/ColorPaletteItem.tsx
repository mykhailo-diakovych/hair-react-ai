import { ButtonType } from "src/types/buttonTypes.type";
import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { Button } from "@components/Button/styled/Button.styled";
import { ButtonProps } from "@components/Button/Button";

interface ColorPaletteItemProps extends ButtonProps {
  color: string;
  active?: boolean;
  onColorSelected?: (color: string) => void | any;
}

export const ColorPaletteItemBase = ({
  color,
  active,
  onColorSelected,
  ...props
}: ColorPaletteItemProps) => {
  return (
    <Button
      color={color}
      active={active}
      onClick={() => {
        if (onColorSelected) {
          onColorSelected(color);
        }
      }}
      {...props}
    />
  );
};
