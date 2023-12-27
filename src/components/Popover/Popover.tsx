import React from "react";
import { PopoverProps as AntPopoverProps, Popover as AntPopover } from "antd";

export interface PopoverProps extends AntPopoverProps {
  children: React.ReactNode;
}

export const Popover = React.memo(({ children, ...props }: PopoverProps) => {
  return (
    <AntPopover
      getTooltipContainer={() =>
        document.querySelector(".container") as HTMLElement
      }
      placement="topLeft"
      autoAdjustOverflow={false}
      {...props}
    >
      {children}
    </AntPopover>
  );
});
