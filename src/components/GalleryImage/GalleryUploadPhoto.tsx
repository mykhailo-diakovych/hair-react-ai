import { v4 } from "uuid";

import React from "react";
import { message } from "antd";
import { useToggle } from "@hooks/useToggle";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { StyledGalleryUploadImageButton } from "@components/GalleryImage/styled/GalleryUploadButton.styled";

import { IImage } from "../../interfaces/image.interface";

export const GalleryUploadPhoto = ({
  galleryImages,
  setGalleryImages
}: {
  galleryImages?: IImage[];
  setGalleryImages: (images: IImage[]) => void;
}) => {
  const [openGuideModal, setOpenGuideModal] = useToggle(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleUploadPhoto = (imageBase64: string | ArrayBuffer | null) => {
    messageApi.success("Image uploaded successfully");
    setOpenGuideModal(false);

    // save image to gallery images api call
    setGalleryImages([
      ...(galleryImages || []),
      {
        id: v4(),
        src: imageBase64 as string
      }
    ]);
  };

  return (
    <>
      {contextHolder}

      {/*<UploadGuideModal*/}
      {/*  handleAfterUpload={handleUploadPhoto}*/}
      {/*  isOpen={openGuideModal}*/}
      {/*  setIsOpen={setOpenGuideModal}*/}
      {/*/>*/}

      <StyledGalleryUploadImageButton
        onClick={() => {
          setOpenGuideModal(true);
        }}
      >
        <Paragraph size="sm">Photo</Paragraph>
        <IconSprite iconName="plus" />
      </StyledGalleryUploadImageButton>
    </>
  );
};
