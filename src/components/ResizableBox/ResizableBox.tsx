import React, {
  CSSProperties,
  DetailedHTMLProps,
  MouseEvent,
  MouseEventHandler,
  useMemo,
  useRef
} from "react";

import classnames from "classnames";

import {
  OnDragEndHandler,
  OnDragHandler,
  OnDragStartHandler,
  OnResizeEndHandler,
  OnResizeHandler,
  OnResizeStartHandler,
  OnRotateEndHandler,
  OnRotateHandler,
  OnRotateMouseDown,
  OnRotateStartHandler
} from "@components/ResizableBox/types/DraggableBox.type";
import { useRotate } from "@components/ResizableBox/hooks/useRotate";
import { useResize } from "@components/ResizableBox/hooks/useResize";
import { useDrag } from "@components/ResizableBox/hooks/useDrag";
import {
  getParametricPos,
  getResizeCursors
} from "@components/ResizableBox/helpers/utils";
import { RotateHandler } from "@components/ResizableBox/components/RotateHandler/RotateHandler";
import { ResizeHandler } from "@components/ResizableBox/components/ResizeHandler/ResizeHandler";
import { Rectangle } from "@components/ResizableBox/components/Rectangle/Rectangle";
import { MoveHandler } from "@components/ResizableBox/components/MoveHandler/MoveHandler";

import "./ResizableBox.css";

export interface ResizableBoxProps
  extends Omit<
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "onDrag" | "onDragEnd" | "onResize"
  > {
  width: number;
  height: number;
  left: number;
  top: number;
  rotationDeg?: number;
  scale?: number;
  color?: CSSProperties["color"];
  draggable?: boolean;
  dragHandler?: boolean;
  dragHandlerDeg?: number;
  resizable?: boolean;
  aspectRatio?: boolean | number;
  rotatable?: boolean;
  snapAngle?: number | boolean;
  rotateHandlerDeg?: number;
  minWidth?: number;
  minHeight?: number;
  handlersOffset?: number;
  handlersSpaceOut?: number;
  relativeHandlers?: boolean;
  onDragStart?: OnDragStartHandler;
  onDrag?: OnDragHandler;
  onDragEnd?: OnDragEndHandler;
  onResizeStart?: OnResizeStartHandler;
  onResize?: OnResizeHandler;
  onResizeEnd?: OnResizeEndHandler;
  onRotateStart?: OnRotateStartHandler;
  onRotate?: OnRotateHandler;
  onRotateEnd?: OnRotateEndHandler;
  onRotateMouseUp?: MouseEvent;
  onRotateMouseMove?: MouseEventHandler<HTMLDivElement>;
  onMouseLeaveHandler?: MouseEventHandler<HTMLDivElement>;
}

export const ResizableBox = (props: ResizableBoxProps) => {
  const {
    width,
    height,
    left,
    top,
    rotationDeg = 0,
    scale = 1,
    color,
    draggable = true,
    dragHandler = false,
    dragHandlerDeg = 180,
    resizable = true,
    aspectRatio = false,
    rotatable = true,
    snapAngle = 45,
    minWidth = 10,
    minHeight = 10,
    handlersOffset = 20,
    handlersSpaceOut = 50,
    relativeHandlers = true,
    onDragStart,
    onDrag,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
    onRotateStart,
    onRotate,
    onRotateEnd,
    onRotateMouseUp,
    onRotateMouseMove,
    onMouseLeaveHandler,
    children,
    ...htmlProps
  } = props;

  const resizableRef = useRef<HTMLDivElement>(null);
  const [onDragMouseDown, isDragging] = useDrag({
    styles: { left, top },
    scale,
    onDragStart,
    onDrag,
    onDragEnd
  });

  const [onResizeMouseDown, isResizing] = useResize({
    styles: { left, top, width, height, rotationDeg },
    scale,
    minHeight,
    minWidth,
    aspectRatio,
    onResizeStart,
    onResize,
    onResizeEnd
  });

  const [onRotateMouseDown, isRotating] = useRotate({
    styles: { top, left, width, height, rotationDeg },
    resizableRef,
    snapAngle,
    onRotateStart,
    onRotate,
    onRotateEnd
  });

  const offsets = useMemo(
    () => ({
      left: width < handlersSpaceOut ? (handlersSpaceOut - width) / 2 : 0,
      top: height < handlersSpaceOut ? (handlersSpaceOut - height) / 2 : 0
    }),
    [width, height, handlersSpaceOut, scale]
  );

  const dragHandlerPos = useMemo(() => {
    return {
      ...getParametricPos(
        width * scale,
        height * scale,
        dragHandlerDeg - (relativeHandlers ? 0 : rotationDeg),
        handlersOffset + offsets.left,
        handlersOffset + offsets.top
      )
    };
  }, [
    isRotating,
    width,
    height,
    dragHandlerDeg,
    relativeHandlers,
    handlersOffset,
    offsets,
    scale
  ]);

  const dragCursor = useMemo((): CSSProperties["cursor"] => {
    if (!draggable || isResizing || isRotating) return;
    if (!isDragging) return "grab";
    return "grabbing";
  }, [draggable, isResizing, isRotating, isDragging]);

  const resizeCursors: any = useMemo(() => {
    if (!resizable || isDragging || isRotating) return {};
    return getResizeCursors(rotationDeg);
  }, [resizable, isDragging, isRotating, rotationDeg]);

  const handleRotateMouseDown: OnRotateMouseDown = (e) => {
    onRotateMouseDown(e);

    if (onRotateStart) {
      onRotateStart(e);
    }
  };

  const handleRotateMouseUp = (e: any) => {
    if (onRotateMouseUp) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onRotateMouseUp(e);
    }
  };

  return (
    <div
      {...htmlProps}
      className={classnames("mainContainer", htmlProps.className)}
      ref={resizableRef}
      style={{
        left,
        top,
        width: width,
        height: height,
        overflow: "visible",
        transform: `rotate(${rotationDeg}deg) scale(${scale})`,
        ...htmlProps.style
      }}
    >
      <Rectangle
        onDragMouseDown={onDragMouseDown}
        draggable={draggable}
        style={{ color, cursor: dragCursor }}
      >
        {children}
      </Rectangle>

      {draggable && dragHandler && (
        <MoveHandler
          style={{
            ...dragHandlerPos,
            fill: color,
            cursor: dragCursor
          }}
          rotationDeg={rotationDeg}
          onDragMouseDown={onDragMouseDown}
        />
      )}

      {resizable && (
        <>
          <ResizeHandler
            style={{
              color,
              left: -offsets.left,
              top: -offsets.top,
              cursor: resizeCursors.nw,
              zIndex: 101
            }}
            type="nw"
            scale={scale}
            onResizeMouseDown={onResizeMouseDown}
          />
          <ResizeHandler
            style={{
              left: width / 2,
              top: -offsets.top,
              color,
              cursor: resizeCursors.n,
              zIndex: 101
            }}
            type="n"
            scale={scale}
            onResizeMouseDown={onResizeMouseDown}
          />
          <ResizeHandler
            style={{
              left: width + offsets.left,
              top: -offsets.top,
              color,
              cursor: resizeCursors.ne,
              zIndex: 101
            }}
            type="ne"
            scale={scale}
            onResizeMouseDown={onResizeMouseDown}
          />
          <ResizeHandler
            style={{
              left: -offsets.left,
              top: height / 2,
              color,
              cursor: resizeCursors.w,
              zIndex: 101
            }}
            type="w"
            scale={scale}
            onResizeMouseDown={onResizeMouseDown}
          />
          <ResizeHandler
            style={{
              left: width + offsets.left,
              top: height / 2,
              color,
              cursor: resizeCursors.e,
              zIndex: 101
            }}
            type="e"
            scale={scale}
            onResizeMouseDown={onResizeMouseDown}
          />
          <ResizeHandler
            style={{
              left: 0 - offsets.left,
              top: height + offsets.top,
              color,
              cursor: resizeCursors.sw,
              zIndex: 101
            }}
            type="sw"
            scale={scale}
            onResizeMouseDown={onResizeMouseDown}
          />
          <ResizeHandler
            style={{
              left: width / 2,
              top: height + offsets.top,
              color,
              cursor: resizeCursors.s,
              zIndex: 101
            }}
            type="s"
            scale={scale}
            onResizeMouseDown={onResizeMouseDown}
          />
          <ResizeHandler
            style={{
              left: width + offsets.left,
              top: height + offsets.top,
              color,
              cursor: resizeCursors.se,
              zIndex: 101
            }}
            type="se"
            scale={scale}
            onResizeMouseDown={onResizeMouseDown}
          />
        </>
      )}
      {rotatable && (
        <>
          <RotateHandler
            style={{
              left: -offsets.left,
              top: -offsets.top,
              fill: color,
              zIndex: 90
            }}
            data-cursor={"rotate/nw-rotate"}
            rotationDeg={rotationDeg}
            onRotateMouseDown={handleRotateMouseDown}
            onRotateMouseMove={onRotateMouseMove}
            onMouseLeaveHandler={onMouseLeaveHandler}
            onMouseUp={handleRotateMouseUp}
          />

          <RotateHandler
            style={{
              left: width + offsets.left,
              top: -offsets.top,
              fill: color,
              zIndex: 90
            }}
            data-cursor={"rotate/ne-rotate"}
            rotationDeg={rotationDeg}
            onRotateMouseDown={handleRotateMouseDown}
            onRotateMouseMove={onRotateMouseMove}
            onMouseLeaveHandler={onMouseLeaveHandler}
            onMouseUp={handleRotateMouseUp}
          />

          <RotateHandler
            style={{
              left: 0 - offsets.left,
              top: height + offsets.top,
              fill: color,
              zIndex: 90
            }}
            data-cursor={"rotate/sw-rotate"}
            rotationDeg={rotationDeg}
            onRotateMouseDown={handleRotateMouseDown}
            onRotateMouseMove={onRotateMouseMove}
            onMouseLeaveHandler={onMouseLeaveHandler}
            onMouseUp={handleRotateMouseUp}
          />

          <RotateHandler
            style={{
              left: width + offsets.left,
              top: height + offsets.top,
              fill: color,
              zIndex: 90
            }}
            data-cursor={"rotate/se-rotate"}
            rotationDeg={rotationDeg}
            onRotateMouseDown={handleRotateMouseDown}
            onRotateMouseMove={onRotateMouseMove}
            onMouseLeaveHandler={onMouseLeaveHandler}
            onMouseUp={handleRotateMouseUp}
          />
        </>
      )}
    </div>
  );
};
