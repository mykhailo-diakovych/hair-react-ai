import React, { MutableRefObject, useEffect, useRef } from "react";
import { toDataURL } from "@helpers/getImageElement";
import { processImage } from "@config/deepar";
import { StyledDeepArCanvas } from "@components/DeepArCanvas/styled/DeepArCanvas.styled";

import { DeepAr } from "../../interfaces/deepAr.interface";

interface DeepArCanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  imageData?: ImageData;
  deepAr: React.MutableRefObject<DeepAr | null>;
  isDeepArLoading: boolean;
}

export const DeepArCanvas = React.forwardRef<
  HTMLCanvasElement,
  DeepArCanvasProps
>(
  (
    { imageData, deepAr, isDeepArLoading, ...props }: DeepArCanvasProps,
    canvasRef
  ) => {
    const ref = canvasRef as MutableRefObject<HTMLCanvasElement>;

    const updateCanvasSize = (imageData: ImageData | HTMLImageElement) => {
      const parent = ref.current?.parentElement?.parentElement as HTMLElement;

      const aspect = imageData.width / imageData.height;

      if (
        imageData.width < parent.offsetHeight * aspect ||
        imageData.height < parent.offsetHeight
      ) {
        ref.current.width = parent.offsetHeight * aspect * 3;
        ref.current.height = parent.offsetHeight * 3;
      } else {
        ref.current.width = imageData.width;
        ref.current.height = imageData.height;
      }
    };

    const handleProcessImage = async () => {
      try {
        if (deepAr.current && ref.current && imageData && !isDeepArLoading) {
          updateCanvasSize(imageData);

          processImage(deepAr, imageData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    useEffect(() => {
      handleProcessImage();
    }, [imageData, isDeepArLoading, ref.current]);

    useEffect(() => {
      if (ref?.current && isDeepArLoading) {
        ref.current.width =
          window.innerWidth > window.innerHeight
            ? Math.floor(window.innerHeight * 0.55)
            : window.innerWidth;
        ref.current.height = window.innerHeight;
      }
    }, [ref.current]);

    return (
      <StyledDeepArCanvas
        ref={ref}
        id="deepar-canvas"
        onContextMenu={(e) => e.preventDefault()}
        {...props}
      />
    );
  }
);
