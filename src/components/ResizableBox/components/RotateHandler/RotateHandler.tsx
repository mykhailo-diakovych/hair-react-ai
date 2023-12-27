import React, { DetailedHTMLProps, MouseEventHandler } from "react";

import { OnRotateMouseDown } from "@components/ResizableBox/types/DraggableBox.type";
import { LEFT_MOUSE_BUTTON } from "@components/ResizableBox/helpers/utils";

import "../../ResizableBox.css";

interface RotateHandlerProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  rotationDeg: number;
  onRotateMouseDown?: OnRotateMouseDown;
  onRotateMouseMove?: MouseEventHandler<HTMLDivElement>;
  onMouseLeaveHandler?: MouseEventHandler<HTMLDivElement>;
}

export const RotateHandler = (props: RotateHandlerProps) => {
  const {
    rotationDeg,
    onRotateMouseDown,
    onMouseLeaveHandler,
    onRotateMouseMove,
    ...htmlProps
  } = props;

  const onMouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== LEFT_MOUSE_BUTTON) return;
    e.preventDefault();

    onRotateMouseDown?.(e);
  };

  return (
    <div
      className={"rotateHandler"}
      {...htmlProps}
      style={{
        transform: `translate(-50%, -50%) rotate(${-rotationDeg}deg)`,
        ...props.style
      }}
      onPointerMove={onRotateMouseMove}
      onPointerDown={onMouseDownHandler}
      onPointerLeave={onMouseLeaveHandler}
    ></div>
  );
};
