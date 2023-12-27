import React, { DetailedHTMLProps, MouseEventHandler } from "react";

import { LEFT_MOUSE_BUTTON } from "@components/ResizableBox/helpers/utils";

import { MoveArrows } from "@components/ResizableBox/components/MoveHandler/components/MoveArrows";

import { OnDragMouseDown } from "../../types/DraggableBox.type";

interface MoveHandlerProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  rotationDeg: number;
  onDragMouseDown: OnDragMouseDown;
}

export const MoveHandler = (props: MoveHandlerProps) => {
  const { rotationDeg, onDragMouseDown, ...htmlProps } = props;

  const onMouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== LEFT_MOUSE_BUTTON) return;
    e.preventDefault();
    document.body.style.cursor = "grabbing";
    onDragMouseDown?.(e);
  };

  return (
    <div
      className={"moveHandler"}
      {...htmlProps}
      style={{
        transform: `translate(-50%, -50%) rotate(${-rotationDeg}deg)`,
        ...htmlProps.style
      }}
      onPointerDown={onMouseDownHandler}
    >
      <MoveArrows />
    </div>
  );
};
