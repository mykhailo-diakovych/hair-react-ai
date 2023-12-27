import React, { useEffect, useState } from "react";

import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { useUploadPatientImageMutation } from "@hooks/query/image/useUploadPatientImageMutation";
import { toDataURL } from "@helpers/getImageElement";
import { IParentImages } from "@features/clinic/patients/profile/components/UploadPhotoList/UploadPhotoList";
import { EditPhotoCardButton } from "@features/clinic/patients/profile/components/UploadPhotoCard/styled/EditPhotoCardButton.styled";
import { EditPhotoCard } from "@features/clinic/patients/profile/components/UploadPhotoCard/components/EditPhotoCard/EditPhotoCard";
import { queryClient } from "@config/query";
import { API_SERVICES, CLINIC_STORAGE_KEY } from "@config/constants";
import { useUploadButton } from "@components/UploadButton/useUploadButton";
import { Theme } from "@components/Theme/Theme";

import { Modal } from "@components/Modal/styled/Modal.styled";
import { Loader } from "@components/Loader/Loader";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";

import { DeepAr } from "../../../../../../interfaces/deepAr.interface";

export interface UploadPhoto {
  image: string;
  id: string;
  parent?: string;
  isOriginal?: boolean;
}

interface UploadPhotoCardProps {
  id: string;
  parentImages: IParentImages[];
  photos?: UploadPhoto[];
  photo?: UploadPhoto;
  setPatientPhotos?: React.Dispatch<React.SetStateAction<UploadPhoto[]>>;
  activeButton?: string;
  setActiveButton?: React.Dispatch<React.SetStateAction<string>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  deepAr: React.MutableRefObject<DeepAr | null>;
  isDeepArLoading: boolean;
  croppedData: ImageData | undefined;
  setCroppedImageData: React.Dispatch<
    React.SetStateAction<ImageData | undefined>
  >;
  patient?: Patient;
  initialLoadingActive: React.MutableRefObject<boolean>;
}

export const DEFAULT_UPLOAD_PHOTO: UploadPhoto = {
  id: "upload-image-placeholder",
  image: ""
};

export const UploadPhotoCard = React.memo(
  ({
    id,
    parentImages,
    photo,
    setPatientPhotos,
    activeButton,
    setActiveButton,
    croppedData,
    setCroppedImageData,
    initialLoadingActive,
    patient
  }: UploadPhotoCardProps) => {
    const [showEditPhotoModal, setShowEditPhotoModal] = useState(false);
    const [uploadedPhoto, setUploadedPhoto] = useState(
      photo || DEFAULT_UPLOAD_PHOTO
    );

    const uploadPatientImageMutation = useUploadPatientImageMutation();

    const [isLoading, setIsLoading] = useState(false);

    function handleEditPhoto(id: string) {
      if (setActiveButton) {
        setActiveButton(id);
      }
    }

    const handleOnAfterUpload = async (imageBase64: string) => {
      if (patient) {
        setIsLoading(true);

        const isReuploading =
          uploadedPhoto.image !== DEFAULT_UPLOAD_PHOTO.image;

        uploadPatientImageMutation(
          {
            image: imageBase64,
            patient: patient.id,
            clinic:
              patient?.clinic ||
              (localStorage.getItem(CLINIC_STORAGE_KEY) as string),
            ...(isReuploading ? { parent: photo?.parent } : {})
          },
          {
            onSuccess: async (uploadedImage) => {
              const photoId = uploadedImage.id;
              const uploadedPhoto = {
                id: photoId,
                image: imageBase64
              };

              if (setPatientPhotos) {
                setPatientPhotos((prevPhotos) => {
                  return [
                    ...(prevPhotos?.map((image) => {
                      const isCurrentImage = isReuploading
                        ? image.id === id
                        : image.image === "";

                      return isCurrentImage
                        ? {
                            id: photoId,
                            image: imageBase64,
                            ...(uploadedImage.parent
                              ? {
                                  parent: uploadedImage.parent,
                                  origin: "FE_CROPPED"
                                }
                              : {})
                          }
                        : image;
                    }) || []),
                    ...(isReuploading ? [] : [DEFAULT_UPLOAD_PHOTO])
                  ];
                });
              }

              setUploadedPhoto(uploadedPhoto);

              handleEditPhoto(photoId);

              await queryClient.invalidateQueries({
                predicate: (query) =>
                  query.queryKey.includes(API_SERVICES.PATIENTS.invalidationKey)
              });

              setIsLoading(false);
            }
          }
        );
      }
    };

    const { component: uploadButtonComponent, updateImagePreview } =
      useUploadButton({
        id: id,
        imageWrapperStyles: {
          height: 180
        },
        buttonText: "Add photo",
        buttonProps: {
          style: {
            minWidth: "auto",
            height: 180
          }
        },
        imageProps: {
          style: {
            height: 180,
            aspectRatio: "3/4"
          }
        },
        buttonEmptyProps: {
          style: {
            height: 180
          }
        },
        uploadButtonProps: {
          showUploadList: false
        },
        additionalContent: (
          <EditPhotoCardButton
            as={"div"}
            onClick={(e: any) => {
              e.stopPropagation();

              handleEditPhoto(id);
              setShowEditPhotoModal(true);
            }}
          >
            <IconSprite
              iconName={"button/edit"}
              style={{ width: 12, height: 12 }}
            />
          </EditPhotoCardButton>
        ),
        onAfterUpload: ({ image: imageBase64 }) => {
          handleOnAfterUpload(imageBase64);
        },
        activeButton: activeButton,
        setActiveButton: setActiveButton
      });

    const initializeImagePreview = async () => {
      if (photo) {
        if (
          setActiveButton &&
          photo.id !== DEFAULT_UPLOAD_PHOTO.id &&
          !activeButton
        ) {
          setActiveButton(photo.id);
          initialLoadingActive.current = true;
        }

        updateImagePreview(photo.image);

        const initialImageBase64 = await toDataURL(photo.image);
        const uploadedPhoto = { id: photo.id, image: initialImageBase64 };

        setUploadedPhoto(uploadedPhoto);
      }
    };

    useEffect(() => {
      initializeImagePreview();
    }, []);

    useEffect(() => {
      if (activeButton && id === activeButton) {
        if (!initialLoadingActive.current) {
          setShowEditPhotoModal(true);
        }

        initialLoadingActive.current = false;
      }
    }, [initialLoadingActive.current]);

    if (isLoading) {
      return <Loader />;
    }

    return (
      <GroupItems gap={0}>
        {uploadButtonComponent}

        <Theme darkMode>
          <Modal
            title={"Edit photo"}
            isOpen={showEditPhotoModal}
            rootClassName={"edit-photo-modal"}
            setIsOpen={(isOpen: boolean) => {
              setShowEditPhotoModal(isOpen);
            }}
            getContainer={false}
          >
            <EditPhotoCard
              patient={patient}
              parentPhoto={photo}
              parentImages={parentImages}
              photo={uploadedPhoto}
              setPhoto={setUploadedPhoto}
              updateImagePreview={updateImagePreview}
              showEditPhotoModal={showEditPhotoModal}
              setShowEditPhotoModal={setShowEditPhotoModal}
              croppedData={croppedData}
              setCroppedImageData={setCroppedImageData}
              isPublic={false}
            />
          </Modal>
        </Theme>
      </GroupItems>
    );
  }
);
