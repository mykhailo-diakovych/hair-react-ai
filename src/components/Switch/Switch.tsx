import React from "react";
import { Switch } from "antd";
import { SwitchProps as AntSwitchProps } from "antd";

interface SwitchProps extends AntSwitchProps {
  defaultActive?: boolean;
  vertical?: boolean;
}

export const SwitchBase = ({ ...props }: SwitchProps) => {
  return <Switch {...props} />;
};
