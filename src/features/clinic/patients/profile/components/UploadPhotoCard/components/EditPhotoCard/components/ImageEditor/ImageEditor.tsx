import React, { useEffect, useMemo, useRef, useState } from "react";

import { Skeleton } from "antd";
import { getImageUrl } from "@helpers/getImageUrl";
import { UploadPhoto } from "@features/clinic/patients/profile/components/UploadPhotoCard/UploadPhotoCard";
import { ZoomControls } from "@features/clinic/patients/profile/components/UploadPhotoCard/components/EditPhotoCard/components/ImageEditor/styled/ZoomControls.styled";
import { UPLOAD_IMAGE_TYPES } from "@config/constants";
import {
  OnDragHandler,
  OnResizeHandler,
  OnRotateHandler,
  OnRotateStartHandler
} from "@components/ResizableBox/types/DraggableBox.type";
import { ResizableBox } from "@components/ResizableBox/ResizableBox";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

interface ImageManualOptions {
  imageRotate: number;
  imageType: UPLOAD_IMAGE_TYPES;
  setImageRotate: React.Dispatch<React.SetStateAction<number>>;
  flipHorizontally: boolean;
  setFlipHorizontally: React.Dispatch<React.SetStateAction<boolean>>;
  flipVertically: boolean;
  setFlipVertically: React.Dispatch<React.SetStateAction<boolean>>;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  top: number;
  setTop: React.Dispatch<React.SetStateAction<number>>;
  left: number;
  setLeft: React.Dispatch<React.SetStateAction<number>>;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  mask: HTMLImageElement | null;
  setMask: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>;
  image: HTMLImageElement | null;
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>;
  photoId: string;
  setPhoto: React.Dispatch<React.SetStateAction<UploadPhoto>>;
}

export const useImageEditor = (
  photo: string,
  {
    imageRotate,
    imageType,
    setImageRotate,
    flipHorizontally,
    setFlipHorizontally,
    flipVertically,
    setFlipVertically,
    scale,
    setScale,
    top,
    setTop,
    left,
    setLeft,
    width,
    setWidth,
    height,
    setHeight,
    mask,
    setMask,
    image,
    setImage
  }: ImageManualOptions
) => {
  const imageEditor = useRef<HTMLImageElement | null>(null);
  const [position, setPosition] = useState({
    x: left,
    y: top
  });

  const [cursor, setCursor] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  const ZOOM_DEFAULT_OPTIONS = useMemo(
    () => ({
      minZoom: 100,
      defaultZoom: 100,
      maxZoom: 126,
      zoomStep: 1
    }),
    []
  );

  const [maskZoom, setMaskZoom] = useState(ZOOM_DEFAULT_OPTIONS.defaultZoom);

  const onDragHandler: OnDragHandler = (e) => {
    setLeft(e.style.left);
    setTop(e.style.top);
  };

  const onResizeHandler: OnResizeHandler = (e) => {
    setLeft(e.style.left);
    setTop(e.style.top);
    setWidth(e.style.width);
    setHeight(e.style.height);
  };

  const onRotateHandler: OnRotateHandler = (e) => {
    setPosition({
      x: e.nativeEvent.x,
      y: e.nativeEvent.y
    });

    setImageRotate(e.style.rotationDeg);
  };

  const onRotateStart: OnRotateStartHandler = (e) => {
    if (e?.target) {
      setIsRotating(true);
      setCursor((e.target as HTMLDivElement)?.dataset?.cursor || "");
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", () => {
      setCursor(null);
      setIsRotating(false);
    });
  }, []);

  const setImageFitContainer = async (imageReplaced?: HTMLImageElement) => {
    const img = imageReplaced || image;

    if (img && imageEditor?.current && mask) {
      const w = imageEditor?.current?.clientWidth / img.naturalWidth;
      const h = imageEditor?.current?.clientHeight / img.naturalHeight;

      // Proportion
      const p = Math.min(h, w);

      if (p === 0) return;

      if (
        img.naturalWidth < imageEditor?.current?.clientWidth ||
        img.naturalHeight < imageEditor?.current?.clientHeight
      ) {
        const canvas = document.createElement("canvas");

        canvas.width = mask?.offsetWidth;
        canvas.height = mask?.offsetHeight;

        const dx = (mask?.offsetWidth - img.naturalWidth) / 2;
        const dy = (mask?.offsetHeight - img.naturalHeight) / 2;

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(img, dx, dy);

        // Image size
        setWidth(mask?.offsetWidth);
        setHeight(mask?.offsetHeight);

        // Image position to center of the container
        setLeft((imageEditor?.current?.offsetWidth - mask?.offsetWidth) / 2);
        setTop((imageEditor?.current?.offsetHeight - mask?.offsetHeight) / 2);
      } else {
        // Image size
        setWidth(img.naturalWidth * p);
        setHeight(img.naturalHeight * p);

        // Image position to center of the container
        setLeft((imageEditor?.current?.offsetWidth - img.naturalWidth * p) / 2);
        setTop(
          (imageEditor?.current?.offsetHeight - img.naturalHeight * p) / 2
        );
      }
    }
  };

  const onCrop = async (): Promise<string> => {
    return new Promise((resolve, _) => {
      const imageCanvas = document.createElement("canvas");
      const imageContext = imageCanvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;

      if (image && mask && imageEditor.current) {
        const imgWidth = Math.floor(image?.width * scale) || 0;
        const imgHeight = Math.floor(image?.height * scale) || 0;

        imageCanvas.width = imgWidth;
        imageCanvas.height = imgHeight;

        const rotationAngle = ((imageRotate % 360) * Math.PI) / 180;

        imageContext.translate(image.width / 2, image.height / 2);
        imageContext.rotate(rotationAngle);
        imageContext.translate(-image.width / 2, -image.height / 2);

        // Flip the canvas horizontally
        if (flipVertically && flipHorizontally) {
          imageContext.translate(imgWidth, imgHeight);
          imageContext.scale(-1, -1);
        } else if (flipHorizontally) {
          imageContext.translate(imgWidth, 0);
          imageContext.scale(-1, 1);
        } else if (flipVertically) {
          imageContext.translate(0, imgHeight);
          imageContext.scale(1, -1);
        } else {
          imageContext.scale(1, 1);
        }

        imageContext.fillStyle = "black";
        imageContext.fillRect(0, 0, imgWidth, imgHeight);
        imageContext.drawImage(image, 0, 0, imgWidth, imgHeight);

        const canvasCropped = document.createElement(
          "canvas"
        ) as HTMLCanvasElement;

        const contextCropped = canvasCropped.getContext("2d", {
          willReadFrequently: true,
          alpha: false
        }) as CanvasRenderingContext2D;

        const { left: maskLeft, top: maskTop } = mask.getBoundingClientRect();

        const { left: editorLeft, top: editorTop } =
          imageEditor.current.getBoundingClientRect();

        const deltaX = maskLeft - editorLeft;
        const deltaY = maskTop - editorTop;

        canvasCropped.width = Math.floor(mask.width);
        canvasCropped.height = Math.floor(mask.height);

        const dx = (imgWidth - Math.floor(image.width)) / 2;
        const dy = (imgHeight - Math.floor(image.height)) / 2;

        const offsetX = Math.floor(deltaX - left + dx);
        const offsetY = Math.floor(deltaY - top + dy);

        // Get cropped selection
        const imageData = imageContext.getImageData(
          offsetX,
          offsetY,
          Math.floor(mask.width),
          Math.floor(mask.height)
        );

        contextCropped.putImageData(
          imageData,
          0,
          0,
          0,
          0,
          Math.floor(mask.width),
          Math.floor(mask.height)
        );

        // fill image border with black color if image is out of mask borders
        contextCropped.fillStyle = "black";

        const fillX = Math.min(-offsetX + imgWidth, mask.width);
        const fillY = Math.min(-offsetY + imgHeight, mask.height);

        contextCropped.fillRect(0, 0, mask.width, -offsetY); // top rect
        contextCropped.fillRect(0, 0, -offsetX, mask.height); // left rect
        contextCropped.fillRect(fillX, 0, mask.width, mask.height); // right rect
        contextCropped.fillRect(0, fillY, mask.width, mask.height); // bottom rect

        resolve(canvasCropped.toDataURL("image/jpeg", 1));
      }
    });
  };

  const onReset = async (img?: HTMLImageElement) => {
    // reset manual settings options
    await setImageFitContainer(img);

    setFlipHorizontally(false);
    setFlipVertically(false);
    setScale(1);
    setImageRotate(0);
  };

  const handleChangeMaskZoom = (zoomIn = true) => {
    setMaskZoom((prevZoom: number) => {
      const currentZoom =
        ((prevZoom +
          (zoomIn ? 1 : -1) * ZOOM_DEFAULT_OPTIONS.zoomStep -
          ZOOM_DEFAULT_OPTIONS.minZoom) %
          ZOOM_DEFAULT_OPTIONS.maxZoom) +
        ZOOM_DEFAULT_OPTIONS.minZoom;

      if (
        currentZoom < ZOOM_DEFAULT_OPTIONS.minZoom ||
        currentZoom >= ZOOM_DEFAULT_OPTIONS.maxZoom
      ) {
        return prevZoom;
      }

      return currentZoom;
    });
  };

  useEffect(() => {
    setImageFitContainer();
  }, [mask]);

  return {
    component: (
      <GroupItems
        ref={imageEditor}
        className={"image-editor"}
        style={{
          position: "relative",
          maxWidth: "90%",
          margin: "auto",
          height: "90%",
          touchAction: "none"
        }}
      >
        <StyledImage
          onLoaded={(image) => {
            setMask(image);
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 100,
            width: "max-content",
            height: `calc(80% * ${maskZoom / ZOOM_DEFAULT_OPTIONS.minZoom})`,
            transformOrigin: "center",
            transform: `translate(-50%, -50%)`,
            pointerEvents: "none"
          }}
          imageStyles={{
            objectFit: "contain"
          }}
          src={getImageUrl(`mask/${imageType}.png`)}
        />

        <ResizableBox
          className={"image-movable"}
          width={width}
          height={height}
          left={left}
          top={top}
          scale={scale}
          aspectRatio={true}
          rotationDeg={imageRotate}
          onDrag={onDragHandler}
          onResize={onResizeHandler}
          onRotate={onRotateHandler}
          onRotateMouseMove={(e) => {
            if (e.buttons === 1 && !isRotating) {
              setCursor(null);
              return;
            }

            setPosition({
              x: e.clientX,
              y: e.clientY
            });

            setCursor((e.target as any).dataset.cursor);
          }}
          onMouseLeaveHandler={(e) => {
            if (e.buttons === 1) {
              return;
            }

            setCursor(null);
          }}
          onRotateStart={onRotateStart}
          onRotateEnd={() => {
            setCursor(null);
          }}
        >
          {photo ? (
            <img
              alt={"photo"}
              onLoad={(e) => {
                setImage(e.target as HTMLImageElement);
              }}
              src={photo}
              style={{
                width: "100%",
                transform: `scale(${flipHorizontally ? -1 : 1}, ${
                  flipVertically ? -1 : 1
                })`
              }}
            />
          ) : (
            <Skeleton.Image
              active
              style={{
                width: "100vw",
                height: "100vh"
              }}
            />
          )}
        </ResizableBox>

        <div
          style={{
            pointerEvents: "none",
            top: position.y,
            left: position.x,
            opacity: cursor ? 1 : 0,
            transform: `translate(-50%, -50%)`
          }}
          className="custom-cursor"
        >
          {cursor && (
            <IconSprite style={{ width: 16, height: 16 }} iconName={cursor} />
          )}
        </div>

        <ZoomControls gap={2} centerY bottom={20} left={20}>
          <ButtonIcon
            disabled={
              maskZoom ===
              ZOOM_DEFAULT_OPTIONS.maxZoom - ZOOM_DEFAULT_OPTIONS.zoomStep
            }
            style={{
              width: 24,
              height: 24,
              flex: "0 0 24px"
            }}
            iconName={"model/controls/zoom-in"}
            onClick={() => handleChangeMaskZoom(true)}
          />

          <Paragraph size={"lg"}>{maskZoom}%</Paragraph>

          <ButtonIcon
            disabled={maskZoom === ZOOM_DEFAULT_OPTIONS.minZoom}
            style={{
              width: 24,
              height: 24,
              flex: "0 0 24px"
            }}
            iconName={"model/controls/zoom-out"}
            onClick={() => handleChangeMaskZoom(false)}
          />
        </ZoomControls>
      </GroupItems>
    ),
    onCrop: onCrop,
    onReset: onReset
  };
};
