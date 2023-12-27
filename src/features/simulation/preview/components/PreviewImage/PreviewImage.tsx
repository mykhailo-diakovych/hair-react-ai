import React from "react";
import { Skeleton } from "antd";
import { StyledPreviewImage } from "@features/simulation/preview/components/PreviewImage/styled/PreviewImage.styled";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { FlexGroupProps } from "@components/FlexGroup/FlexGroup";

interface IPreviewImageProps extends FlexGroupProps {
  src?: string;
}

export const PreviewImage = ({ src, ...props }: IPreviewImageProps) => {
  return (
    <StyledPreviewImage
      style={{
        margin: "0 auto",
        width: src ? "auto" : "100%",
        maxWidth: "100%",
        aspectRatio: "3/4",
        objectPosition: "top center",
        maxHeight: "max(300px, calc(100vh - 184px))"
      }}
      {...props}
    >
      {src ? <StyledImage src={src} /> : <Skeleton.Image active />}
    </StyledPreviewImage>
  );
};
