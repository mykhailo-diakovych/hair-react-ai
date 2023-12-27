import React, {
  DetailedHTMLProps,
  MouseEventHandler,
  TouchEventHandler
} from "react";

import { OnDragMouseDown } from "@components/ResizableBox/types/DraggableBox.type";
import { LEFT_MOUSE_BUTTON } from "@components/ResizableBox/helpers/utils";

interface RectangleProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  draggable: boolean;
  onDragMouseDown: OnDragMouseDown;
}

export const Rectangle = ({ children, ...props }: RectangleProps) => {
  const { draggable, onDragMouseDown, ...htmlProps } = props;

  const onMouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== LEFT_MOUSE_BUTTON) return;
    e.preventDefault();
    document.body.style.cursor = "grabbing";
    onDragMouseDown?.(e);
  };

  return (
    <div
      className={"rectangle"}
      {...htmlProps}
      onPointerDown={draggable ? onMouseDownHandler : undefined}
    >
      {children}
    </div>
  );
};
