import React, { DetailedHTMLProps, MouseEventHandler } from "react";

import {
  OnResizeMouseDown,
  ResizeHandlerType
} from "@components/ResizableBox/types/DraggableBox.type";
import { LEFT_MOUSE_BUTTON } from "@components/ResizableBox/helpers/utils";

interface ResizeHandlerProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  type: ResizeHandlerType;
  onResizeMouseDown?: OnResizeMouseDown;
  scale?: number;
}

export const ResizeHandler = ({ style, ...props }: ResizeHandlerProps) => {
  const { type, onResizeMouseDown, ...htmlProps } = props;

  const onMouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== LEFT_MOUSE_BUTTON) return;
    e.preventDefault();
    document.body.style.cursor = style?.cursor ?? "auto";
    onResizeMouseDown?.(e, type);
  };

  return (
    <div
      className={"resizeHandler"}
      style={{
        ...style,
        transform: `translate(-50%, -50%) scale(${1 / (props?.scale || 1)})`
      }}
      {...htmlProps}
      onPointerDown={onMouseDownHandler}
    />
  );
};
