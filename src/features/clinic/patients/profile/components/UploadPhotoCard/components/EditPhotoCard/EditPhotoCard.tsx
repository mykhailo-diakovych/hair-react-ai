import { useTheme } from "styled-components";
import { useStateWithHistory } from "react-use";
import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { UploadImageResponse } from "@services/Files/interfaces/UploadImageResponse.interface";
import { UploadImageRequest } from "@services/Files/interfaces/UploadImageRequest.interface";
import { useToggle } from "@hooks/useToggle";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useUploadImageMutation } from "@hooks/query/image/useUploadImageMutation";
import { Toast } from "@helpers/toast";
import { getImageElement } from "@helpers/getImageElement";
import { getImageData } from "@helpers/getImageDataContext";
import { ConditionalWrapper } from "@helpers/conditionalWrapper";
import { IParentImages } from "@features/clinic/patients/profile/components/UploadPhotoList/UploadPhotoList";
import { UploadPhoto } from "@features/clinic/patients/profile/components/UploadPhotoCard/UploadPhotoCard";
import { StyledManualControl } from "@features/clinic/patients/profile/components/UploadPhotoCard/components/EditPhotoCard/styled/MannualControl.styled";
import { EditPhotoCardSidebar } from "@features/clinic/patients/profile/components/UploadPhotoCard/components/EditPhotoCard/styled/EditPhotoCardSidebar.styled";
import { useImageEditor } from "@features/clinic/patients/profile/components/UploadPhotoCard/components/EditPhotoCard/components/ImageEditor/ImageEditor";
import { queryClient } from "@config/query";
import {
  API_SERVICES,
  CLINIC_STORAGE_KEY,
  IImageTypeEntry,
  IMAGE_TYPES_STORAGE_KEY,
  UPLOAD_IMAGE_TYPES
} from "@config/constants";
import { Slider } from "@components/Slider/styled/Slider.styled";
import { Portal } from "@components/Portal/Portal";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";
import { ButtonOutlined } from "@components/Button/styled/ButtonOutlined.styled";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";
import { Accordion } from "@components/Accordion/styled/Accordion.styled";

interface EditPhotoCardProps {
  patient?: Patient;
  parentPhoto?: UploadPhoto;
  showImagesHistory?: boolean;
  parentImages?: IParentImages[];
  photo: UploadPhoto;
  setPhoto: React.Dispatch<React.SetStateAction<UploadPhoto>>;
  updateImagePreview?: (image: string) => void;
  submitButtonText?: string;
  showEditPhotoModal?: boolean;
  setShowEditPhotoModal?: React.Dispatch<React.SetStateAction<boolean>>;
  croppedData: ImageData | undefined;
  setCroppedImageData: React.Dispatch<
    React.SetStateAction<ImageData | undefined>
  >;
  showTypeOfPhoto?: boolean;
  handleFaceDetection?: (
    uploadedImage: UploadImageResponse
  ) => Promise<any> | void;
  replaceOriginal?: boolean;
  uploadPhotoBody?: Partial<UploadImageRequest>;
  isPublic?: boolean;
}

export const EditPhotoCard = ({
  patient,
  parentPhoto,
  photo,
  setPhoto,
  updateImagePreview,
  submitButtonText = "Submit",
  setShowEditPhotoModal,
  setCroppedImageData,
  handleFaceDetection,
  replaceOriginal = true,
  uploadPhotoBody = {},
  isPublic = true,
  ...props
}: EditPhotoCardProps) => {
  const theme = useTheme();

  const [imageRotate, setImageRotate] = useState(0);
  const [flipHorizontally, setFlipHorizontally] = useState(false);
  const [flipVertically, setFlipVertically] = useState(false);
  const [scale, setScale] = useState(1);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [mask, setMask] = useState<HTMLImageElement | null>(null);

  const [imageType] = useState(UPLOAD_IMAGE_TYPES.FRONT);

  const {
    component: ImageEditor,
    onCrop,
    onReset
  } = useImageEditor(photo.image, {
    imageRotate,
    imageType,
    setImageRotate,
    flipHorizontally: flipHorizontally,
    setFlipHorizontally: setFlipHorizontally,
    flipVertically: flipVertically,
    setFlipVertically: setFlipVertically,
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
    setImage,
    photoId: photo.id,
    setPhoto
  });

  // const [isModalCropOpen, setIsModalCropOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useStateWithHistory<UploadPhoto>();

  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);
  const [isEditPhotoSettingsOpen, setIsEditPhotoSettingsOpen] =
    useToggle(false);

  const uploadImageMutation = useUploadImageMutation(isPublic);

  const updatePhotoCardImage = async (cropped?: UploadPhoto) => {
    const croppedImageObject = cropped || croppedImage;

    if (replaceOriginal && croppedImageObject && setPhoto) {
      setPhoto(croppedImageObject); // replace original image with cropped
    }

    if (croppedImageObject) {
      if (updateImagePreview) {
        updateImagePreview(croppedImageObject?.image); // update image preview in photo card
      }

      const imageReplaced = await getImageElement(
        croppedImageObject?.image,
        undefined,
        true
      );

      setImage(imageReplaced);

      await onReset(imageReplaced); // reset image params
    }
  };

  const handleSetImageType = (id: string, value: UPLOAD_IMAGE_TYPES) => {
    const imageTypes = JSON.parse(
      localStorage.getItem(IMAGE_TYPES_STORAGE_KEY) || "[]"
    ) as IImageTypeEntry[];

    const imageTypesMap = new Map(imageTypes || []);

    imageTypesMap.set(id, value);
    const entries = Array.from(imageTypesMap.entries());

    localStorage.setItem(IMAGE_TYPES_STORAGE_KEY, JSON.stringify(entries));
  };

  const handleSavePhoto = async (cropped?: string) => {
    try {
      if (imageType === UPLOAD_IMAGE_TYPES.PLACEHOLDER) {
        throw new Error("Please select the type of photo");
      }

      const croppedImageId = cropped || (croppedImage?.image as string);

      const uploadImageBody: UploadImageRequest = {
        image: croppedImageId,
        parent: parentPhoto?.parent || parentPhoto?.id,
        clinic: localStorage.getItem(CLINIC_STORAGE_KEY) as string,
        ...(patient
          ? {
              patient: patient.id,
              clinic:
                patient.clinic ||
                (localStorage.getItem(CLINIC_STORAGE_KEY) as string)
            }
          : {}),
        ...uploadPhotoBody
      };

      if (parentPhoto?.image && croppedImageId) {
        uploadImageMutation(uploadImageBody, {
          onSuccess: async (uploadedCropped) => {
            handleSetImageType(uploadedCropped.id, imageType);

            const newCroppedImage: UploadPhoto = {
              id: uploadedCropped.id,
              image: croppedImageId
            };

            setCroppedImage(newCroppedImage);

            if (handleFaceDetection) {
              const isDetected = await handleFaceDetection(uploadedCropped);

              if (!isDetected) {
                console.log("Face is not detected");
                return;
              }
            }

            await updatePhotoCardImage(newCroppedImage);

            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey.includes(API_SERVICES.PATIENTS.invalidationKey)
            });

            if (setShowEditPhotoModal) {
              setShowEditPhotoModal(false); // close modal
            }
          },
          onError: (error: any) => {
            Toast.error(error?.message);
          }
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onRotateButtonClick = (direction: "left" | "right") => {
    const sign = direction === "left" ? -1 : 1;

    setImageRotate((prev) => (prev + sign * 90) % 360);
  };

  const handleOnCropEnd = async () => {
    const cropped = await onCrop();
    const croppedData = await getImageData(cropped);

    setCroppedImageData(croppedData);
    setCroppedImage((prev) => ({ ...prev, image: cropped } as UploadPhoto));

    await handleSavePhoto(cropped);
  };

  const handleResetUploadedPhoto = async () => {
    const img = await getImageElement(
      parentPhoto?.image as string,
      undefined,
      true
    );

    await onReset(img);
  };

  useEffect(() => {
    handleResetUploadedPhoto();
  }, [parentPhoto]);

  return (
    <>
      <FlexGroup compact gap={0}>
        <GroupItems
          className={"image-editor__wrapper"}
          style={{
            position: "relative",
            overflow: "hidden",
            height: "min(calc(100vh - 200px), 780px)",
            alignSelf: "start"
          }}
        >
          {ImageEditor}

          {/*{showImagesHistory && (*/}
          {/*  <EditorRedoUndoControls*/}
          {/*    croppedImagesHistory={croppedImagesHistory}*/}
          {/*    updatePhotoCard={updatePhotoCardImage}*/}
          {/*    isLoading={isCroppedImagesLoading}*/}
          {/*  />*/}
          {/*)}*/}
        </GroupItems>

        <ConditionalWrapper
          wrapper={(children) =>
            isMobile ? (
              <Portal selector={".edit-photo__wrapper"}>{children}</Portal>
            ) : (
              <>{children}</>
            )
          }
        >
          <EditPhotoCardSidebar column spread>
            <GroupItems gap={0}>
              {/*{showTypeOfPhoto && (
                <GroupItems p={20} gap={15}>
                  <Select
                    label={"Type of photo"}
                    value={imageType}
                    onChange={(value: UPLOAD_IMAGE_TYPES) => {
                      setImageType(value);
                    }}
                    options={[
                      {
                        value: UPLOAD_IMAGE_TYPES.PLACEHOLDER,
                        label: "Type",
                        disabled: true
                      },
                      { value: UPLOAD_IMAGE_TYPES.FRONT, label: "Front" },
                      { value: UPLOAD_IMAGE_TYPES.BACK, label: "Back" },
                      { value: UPLOAD_IMAGE_TYPES.TOP, label: "Top" },
                      {
                        value: UPLOAD_IMAGE_TYPES.SIDE_LEFT,
                        label: "Side (left)"
                      },
                      {
                        value: UPLOAD_IMAGE_TYPES.SIDE_RIGHT,
                        label: "Side (right)"
                      }
                    ]}
                  />
                </GroupItems>
              )}*/}

              <Paragraph
                style={{ textTransform: "uppercase" }}
                padding={"10px 15px 10px"}
                size={"lg"}
              >
                Manual settings:
              </Paragraph>

              <Accordion
                accordion={true}
                iconStyle={{ width: 20, height: 20 }}
                accordionItems={[
                  {
                    id: "rotate",
                    title: "Rotate and flip",
                    iconName: "image/rotate",
                    children: (
                      <GroupItems>
                        <FlexGroup>
                          <StyledManualControl
                            $buttonIconBg
                            onClick={() => onRotateButtonClick("left")}
                            iconName={"image/rotate-left"}
                            iconStyle={{ width: 20, height: 20 }}
                          />

                          <StyledManualControl
                            $buttonIconBg
                            onClick={() => onRotateButtonClick("right")}
                            iconName={"image/rotate-right"}
                            iconStyle={{ width: 20, height: 20 }}
                          />

                          <StyledManualControl
                            $buttonIconBg
                            $isActive={flipVertically}
                            onClick={() => setFlipVertically(!flipVertically)}
                            iconName={"image/flip-vertically"}
                            iconStyle={{ width: 20, height: 20 }}
                          />

                          <StyledManualControl
                            $buttonIconBg
                            $isActive={flipHorizontally}
                            onClick={() =>
                              setFlipHorizontally(!flipHorizontally)
                            }
                            iconName={"image/flip-horizontally"}
                            iconStyle={{ width: 20, height: 20 }}
                          />
                        </FlexGroup>

                        <Slider
                          value={imageRotate}
                          onValueChange={(value: number) =>
                            setImageRotate(value)
                          }
                          $isActive
                          label={"Rotate"}
                          min={-180}
                          step={1}
                          max={180}
                        />
                      </GroupItems>
                    )
                  },
                  {
                    id: "scale",
                    title: "Scale",
                    iconName: "image/scale",
                    children: (
                      <GroupItems>
                        <Slider
                          $isActive
                          label={"Scale"}
                          min={0.4}
                          max={3}
                          step={0.05}
                          value={scale}
                          onChange={(value: number) => setScale(value)}
                        />
                      </GroupItems>
                    )
                  },
                  {
                    id: "move",
                    title: "Move",
                    iconName: "image/move",
                    children: (
                      <GroupItems>
                        <Slider
                          $isActive
                          label={"X"}
                          defaultValue={0}
                          min={-200}
                          max={
                            (image?.closest(".image-editor")?.clientWidth ??
                              400) / 2
                          }
                          value={left || 0}
                          onChange={(value: number) => {
                            setLeft(value);
                          }}
                        />

                        <Slider
                          $isActive
                          label={"Y"}
                          defaultValue={0}
                          min={-200}
                          max={
                            (image?.closest(".image-editor")?.clientHeight ??
                              400) / 2
                          }
                          value={top || 0}
                          onChange={(value: number) => setTop(value)}
                        />
                      </GroupItems>
                    )
                  }
                ]}
              />
            </GroupItems>

            <GroupItems p={20} gap={15}>
              <ButtonPrimary onClick={handleOnCropEnd}>
                {submitButtonText}
              </ButtonPrimary>

              <ButtonOutlined
                border={"none"}
                color={theme.colors.malibu}
                onClick={() => {
                  onReset();
                }}
              >
                Reset to auto
              </ButtonOutlined>
            </GroupItems>
          </EditPhotoCardSidebar>
        </ConditionalWrapper>

        {isMobile && (
          <FlexGroup compact p={10}>
            <ButtonIcon onClick={setIsEditPhotoSettingsOpen}>
              <IconSprite
                style={{ width: 26, height: 26 }}
                iconName="button/menu"
              />
            </ButtonIcon>
          </FlexGroup>
        )}

        <Drawer
          placement={"bottom"}
          closable={false}
          onClose={setIsEditPhotoSettingsOpen}
          open={isEditPhotoSettingsOpen}
          key="left"
          forceRender={true}
          getContainer={false}
          {...props}
        >
          <FlexGroup className={"edit-photo__wrapper"} />
        </Drawer>
      </FlexGroup>
    </>
  );
};
