import { BorderProps } from "styled-system";
import {
  LazyLoadImage,
  LazyLoadImageProps
} from "react-lazy-load-image-component";
import React, { CSSProperties } from "react";

import cn from "classnames";
import { getImageUrl } from "@helpers/getImageUrl";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { ImageError } from "@components/Image/styled/ImageError.styled";
import { IconSprite } from "@components/Icon/IconSprite";

export interface IImageProps extends LazyLoadImageProps, BorderProps {
  onLoaded?: (img: HTMLImageElement) => void | any;
  maxWidth?: string;
  imageStyles?: CSSProperties;
  defaultPlaceholder?: boolean;
  isError?: boolean;
  errorAltImages?: string[];
}

export const ImageBase = ({
  maxWidth,
  onLoaded,
  style,
  imageStyles = {},
  className,
  src,
  defaultPlaceholder = true,
  isError = false,
  errorAltImages = [],
  ...props
}: IImageProps) => {
  return (
    <>
      <LazyLoadImage
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        onLoad={(e: any) => {
          if (onLoaded) {
            onLoaded(e.target as HTMLImageElement);
          }
        }}
        src={
          isError
            ? getImageUrl("empty.jpg")
            : defaultPlaceholder
            ? src || getImageUrl("placeholder-black.png")
            : src
        }
        delayTime={25000}
        delayMethod={"debounce"}
        style={{ maxWidth: maxWidth || "auto", ...imageStyles }}
        loading={"lazy"}
        effect={"blur"}
        onError={(e) => {
          const image = e.target as HTMLImageElement;

          const allAltImages = [
            ...errorAltImages,
            getImageUrl("placeholder-black.png")
          ];

          const brokenImageIndex = allAltImages.findIndex(
            (img) => img === image?.src
          );

          image.src =
            allAltImages[brokenImageIndex === -1 ? 0 : brokenImageIndex + 1];

          if (brokenImageIndex === allAltImages.length - 1) {
            console.log("error while loading  image");
          }
        }}
        wrapperClassName={cn(className)}
        wrapperProps={{ style }}
        {...props}
      />

      {isError && (
        <ImageError center centerY>
          <IconSprite
            iconName={"common/image"}
            style={{ width: 48, height: 48, color: "red" }}
          />

          <Paragraph size={"lg"} color={"red"} $uppercase>
            Failed
          </Paragraph>
        </ImageError>
      )}
    </>
  );
};
