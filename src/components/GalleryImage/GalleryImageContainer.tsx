import { useThrottleFn, useUpdateEffect } from "react-use";
import React, { useEffect, useState } from "react";
import { useDebounceFn } from "@reactuses/core";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { getImgObjSource } from "@helpers/getImageDataContext";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { StyledGalleryImageContainer } from "@components/GalleryImage/styled/GalleryImageContainer.styled";
import { GalleryImage } from "@components/GalleryImage/styled/GalleryImage.styled";

import { IImage } from "../../interfaces/image.interface";

interface GalleryImageContainerProps {
  galleryImages?: IImage[];
  setSelectedImageData?: (imageData: ImageData) => void | any;
  selectedImageId?: string;
  setSelectedImageId?: React.Dispatch<React.SetStateAction<string>>;
  setGalleryImages: React.Dispatch<React.SetStateAction<IImage[]>>;
  initialImages?: IImage[];
  imageWidth?: string;
  isLoadingImageData?: boolean;
  setIsLoadingImageData?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  onSwitchPhoto?: () => void;
}

export const GalleryImageContainer = ({
  galleryImages,
  setSelectedImageData,
  selectedImageId,
  setSelectedImageId,
  setGalleryImages,
  initialImages = [],
  setIsLoadingImageData,
  imageWidth = "100%",
  disabled = false,
  onSwitchPhoto
}: GalleryImageContainerProps) => {
  const [selectedId, setSelectedId] = useState<string>(
    selectedImageId as string
  );

  const handleClickGalleryImage = async (
    e: React.MouseEvent | null,
    image: IImage
  ) => {
    const isPreviouslySelected = (
      galleryImages?.length ? galleryImages : initialImages
    )?.some((galleryImage) => {
      return galleryImage?.id === image?.id && image.selected;
    });

    if (isPreviouslySelected && e) {
      return;
    }

    if (setSelectedImageData) {
      setIsLoadingImageData?.(true);

      if (image?.imageData) {
        setSelectedImageData(image?.imageData);

        if (setSelectedImageId) {
          setSelectedImageId(image?.id);
        }

        setIsLoadingImageData?.(false);
      } else {
        getImgObjSource(image?.src).then((imageData) => {
          setGalleryImages(
            (galleryImages?.length ? galleryImages : initialImages)?.map(
              (galleryImage) => {
                return {
                  ...galleryImage,
                  selected: galleryImage?.id === image?.id,
                  ...(galleryImage?.id === image?.id
                    ? { imageData: imageData }
                    : {})
                };
              }
            ) || []
          );

          if (imageData) {
            setSelectedImageData(imageData);
          }

          if (setSelectedImageId) {
            setSelectedImageId(image?.id);
          }

          setIsLoadingImageData?.(false);
        });
      }
    }

    onSwitchPhoto?.();

    setGalleryImages(
      (galleryImages?.length ? galleryImages : initialImages)?.map(
        (galleryImage) => {
          return {
            ...galleryImage,
            selected: galleryImage?.id === image?.id
          };
        }
      ) || []
    );
  };

  const preloadDataImages = async () => {
    setIsLoadingImageData?.(true);

    if (galleryImages) {
      const galleryImagesWithImageData: IImage[] = await Promise.all(
        galleryImages.map((galleryImage) => {
          if (!galleryImage?.imageData) {
            return getImgObjSource(galleryImage?.src).then((imageData) => {
              return {
                ...galleryImage,
                imageData
              } as IImage;
            });
          } else {
            return new Promise<IImage>((resolve) => resolve(galleryImage));
          }
        })
      );

      setGalleryImages(galleryImagesWithImageData);
    }

    setIsLoadingImageData?.(false);
  };

  useEffect(() => {
    if (initialImages?.length) {
      setSelectedId(initialImages[0]?.id);

      handleClickGalleryImage(null, initialImages[0]);
    }
  }, [initialImages]);

  useUpdateEffect(() => {
    if (
      galleryImages &&
      galleryImages?.length > 0 &&
      galleryImages.some((g) => !g.imageData)
    ) {
      preloadDataImages();
    }
  }, [galleryImages]);

  return (
    <StyledGalleryImageContainer $disabled={disabled}>
      {galleryImages?.map((image) => {
        return (
          <GalleryImage
            onClick={(e: any) => {
              setSelectedId(image?.id);

              handleClickGalleryImage(e, image);
            }}
            $width={imageWidth}
            $selected={image.id === selectedId}
            key={image.id}
          >
            <StyledImage src={image.src} />
          </GalleryImage>
        );
      })}
    </StyledGalleryImageContainer>
  );
};
