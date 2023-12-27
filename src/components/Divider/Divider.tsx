import React from "react";
import { Divider as AntDivider, DividerProps } from "antd";

export interface IDividerProps extends DividerProps {
  $color?: string;
  $width?: number;
}

export const DividerBase = ({ ...props }: IDividerProps) => {
  return <AntDivider {...props} />;
};
