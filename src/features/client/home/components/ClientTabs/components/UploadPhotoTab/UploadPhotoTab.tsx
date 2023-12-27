import { useTheme } from "styled-components";
import { useUpdateEffect } from "react-use";
import React, { useContext, useRef, useState } from "react";
import { useGetUploadedImage } from "@hooks/query/image/useGetUploadedImage";
import { Toast } from "@helpers/toast";
import { getImageData } from "@helpers/getImageDataContext";
import { UploadPhoto } from "@features/clinic/patients/profile/components/UploadPhotoCard/UploadPhotoCard";
import { useSetTabStep } from "@features/client/home/components/ClientTabs/hooks/useSetTabStep";
import { ClientTabHeader } from "@features/client/home/components/ClientTabs/components/shared/ClientTabHeader/ClientTabHeader";
import { ClientTabsContext } from "@features/client/home/components/ClientTabs/ClientTabs.context";
import { ClientContext } from "@features/client/home/Client.context";
import { isFaceDetected, processImage } from "@config/deepar";
import { CLIENT_UPLOAD_PHOTO_PLACEHOLDER } from "@config/constants";
import { useUploadButton } from "@components/UploadButton/useUploadButton";
import { Title } from "@components/Title/Title";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Divider } from "@components/Divider/styled/Divider.styled";
import { DeepArCanvas } from "@components/DeepArCanvas/DeepArCanvas";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

export const UploadPhotoTab = ({
  image,
  setImage
}: {
  image?: UploadPhoto;
  setImage: React.Dispatch<React.SetStateAction<UploadPhoto>>;
}) => {
  const { clinicId } = useContext(ClientContext);

  const theme = useTheme();
  const uploadPhotoTabList = ["Only one person in the photo", "Face camera"];

  const getUploadedImage = useGetUploadedImage();

  const { next: nextStep } = useSetTabStep({ tabsName: "sim-step" });

  const { deepAr, isDeepArLoading, croppedData, setCroppedImageData } =
    useContext(ClientTabsContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFaceDetectionError, setIsFaceDetectionError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleAfterUpload = async (imageBase64: string) => {
    setIsLoading(true);
    setIsFaceDetectionError(false);
    const imageData = await getImageData(imageBase64);

    await processImage(deepAr, imageData);

    const faceDetected = await isFaceDetected(deepAr);

    if (!faceDetected) {
      Toast.error("Face is not detected");
      setIsFaceDetectionError(true);
      setIsLoading(false);
      return;
    }

    const uploadedImage = await getUploadedImage({
      image: imageBase64,
      clinic: clinicId
    });

    setImage({
      id: uploadedImage.id,
      image: imageBase64,
      parent: uploadedImage.id
    });

    setIsLoading(false);
    setIsFaceDetectionError(false);
    setCroppedImageData(imageData);

    nextStep();
  };

  const { component: uploadButtonComponent, clearUploaded } = useUploadButton({
    buttonText: (
      <Paragraph
        as={"span"}
        color={"black"}
        style={{ lineHeight: 2 }}
        size={"lg"}
      >
        Drag your photo
        <br />
        or <br />{" "}
        <Paragraph color={"malibuLight"} size={"lg"}>
          Browse here
        </Paragraph>
      </Paragraph>
    ),
    buttonBeforeIconContent: <Title level={2}>Upload photo</Title>,
    buttonIcon: "button/upload",
    buttonIconStyles: {
      width: 40,
      height: 40,
      margin: "35px 0 50px",
      padding: 0
    },
    imageProps: {
      style: {
        height: "100%"
      }
    },
    buttonProps: {
      style: {
        color: "#fff",
        minWidth: "auto",
        margin: "0 auto",
        padding: "10px",
        aspectRatio: "3/4",
        width: "100%",
        maxHeight: 500,
        boxShadow: "none",
        border: "1px dashed white"
      }
    },
    uploadButtonProps: {
      showUploadList: false
    },
    onAfterUpload: ({ image: imageBase64 }) => {
      handleAfterUpload(imageBase64);
    },
    isLoading,
    disableDoubleClickUpload: true,
    isError: isFaceDetectionError,
    errorMessage: "Face cannot be detected by our system!",
    placeholderImage: CLIENT_UPLOAD_PHOTO_PLACEHOLDER
  });

  const handleUploadPhoto = () => {
    nextStep();
  };

  useUpdateEffect(() => {
    if (!image?.image) {
      clearUploaded();
    }
  }, [image]);

  return (
    <GroupItems>
      <DeepArCanvas
        deepAr={deepAr}
        isDeepArLoading={isDeepArLoading}
        imageData={croppedData}
        ref={canvasRef}
        className={"visually-hidden"}
      />

      <ClientTabHeader header={"Upload your photo"} />

      {uploadButtonComponent}

      <FlexGroup mt={20} gap={10} column>
        {uploadPhotoTabList.map((item) => (
          <FlexGroup key={item} gap={10} centerY>
            <IconSprite
              style={{ width: 24, height: 24 }}
              iconName={"common/check"}
            />

            <Paragraph size="lg">{item}</Paragraph>
          </FlexGroup>
        ))}

        <Divider $color={theme.colors.mineshaft3} $width={1} />
      </FlexGroup>

      <GroupItems>
        <ButtonPrimary
          disabled={!image?.image}
          onClick={() => handleUploadPhoto()}
        >
          <Paragraph as={"span"} size={"lg"}>
            Upload Photo
          </Paragraph>
        </ButtonPrimary>
      </GroupItems>
    </GroupItems>
  );
};
