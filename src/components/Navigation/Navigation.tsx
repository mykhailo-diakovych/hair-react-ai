import React, { ReactNode } from "react";
import { DrawerProps } from "antd/es/drawer";
import { Drawer } from "antd";
import { Theme } from "@components/Theme/Theme";

interface NavigationProps extends DrawerProps {
  menuOpen: boolean;
  toggleMenuOpen: any;
  element?: ReactNode;
}

export const Navigation = ({
  menuOpen,
  toggleMenuOpen,
  placement = "left",
  element,
  ...props
}: NavigationProps) => {
  return (
    <Drawer
      placement={placement}
      closable={false}
      onClose={toggleMenuOpen}
      open={menuOpen}
      key="left"
      forceRender={true}
      {...props}
    >
      {element}
    </Drawer>
  );
};
