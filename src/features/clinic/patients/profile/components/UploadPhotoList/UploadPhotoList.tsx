import React, { useEffect, useRef, useState } from "react";
import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { FilesService } from "@services/Files/Files.service";
import { useDeepAr } from "@hooks/useDeepAr";
import { toDataURL } from "@helpers/getImageElement";
import { UploadPhotoListWrapper } from "@features/clinic/patients/profile/components/UploadPhotoList/styled/UploadPhotoListWrapper.styled";
import { StyledUploadPhotoList } from "@features/clinic/patients/profile/components/UploadPhotoList/styled/UploadPhotoList.styled";
import {
  DEFAULT_UPLOAD_PHOTO,
  UploadPhoto,
  UploadPhotoCard
} from "@features/clinic/patients/profile/components/UploadPhotoCard/UploadPhotoCard";
import { UPLOAD_IMAGE_CUSTOM_UPLOADED } from "@config/constants";
import { Spinner } from "@components/Spinner/styled/Spinner.styled";

export interface IParentImages {
  parentId: string;
  images: string[];
}

export const UploadPhotoList = ({
  patient,
  isLoading,
  isFetching
}: {
  patient?: Patient;
  isLoading: boolean;
  isFetching: boolean;
}) => {
  const [patientPhotos, setPatientPhotos] = useState<UploadPhoto[]>([
    DEFAULT_UPLOAD_PHOTO
  ]);
  const [parentImages, setParentImages] = useState<IParentImages[]>([]);

  const [activeButton, setActiveButton] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { deepAr, loading: isDeepArLoading } = useDeepAr(canvasRef);
  const [croppedData, setCroppedImageData] = useState<ImageData | undefined>();

  const initialLoadingActive = useRef(true);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const updateParentImages = async () => {
    const patientImages: UploadPhoto[] = [];
    for (const patientPhoto of patient?.images || []) {
      const parentId = patientPhoto?.id as string;

      const parentImage = await FilesService.getImageUrl(parentId);

      const parentChildImages = await Promise.all(
        parentImage?.images.map((image) => {
          return FilesService.getImageUrl(image);
        })
      );

      const aggregatedImagesIds: string[] = parentChildImages.flatMap(
        (parentChild) => parentChild?.images as string[]
      );

      const aggregatedImages = await Promise.all(
        aggregatedImagesIds.map((image) => {
          return FilesService.getImageUrl(image);
        })
      );

      const filteredParentImages = [
        ...aggregatedImages,
        ...parentChildImages
      ]?.filter(
        (image) => !UPLOAD_IMAGE_CUSTOM_UPLOADED?.includes(image?.origin)
      );

      setParentImages((prevState) => [
        ...prevState,
        {
          parentId: parentId,
          images: [...(filteredParentImages || []), parentId]
        } as IParentImages
      ]);

      const croppedImage =
        filteredParentImages?.length > 0
          ? filteredParentImages?.at(0)
          : parentImage;

      if (croppedImage) {
        const imageBase64 = await toDataURL(croppedImage.image);

        const patientPhoto: UploadPhoto = {
          id: croppedImage.id,
          image: imageBase64,
          parent: parentId
        };

        patientImages.push(patientPhoto);
      }
    }

    return patientImages;
  };

  const handleLoadPatientImages = async () => {
    setIsLoadingImages(true);

    const patientImages = await updateParentImages();

    if (patient) {
      setPatientPhotos((prevPhotos) => [
        ...(
          patientImages?.filter(
            (image) => image.id !== DEFAULT_UPLOAD_PHOTO.id
          ) || []
        ).map((image) => {
          const prevImageParent = prevPhotos?.find(
            (img) => img.id === image.id
          )?.parent;

          return {
            ...image,
            ...(prevImageParent ? { parent: prevImageParent } : {})
          } as UploadPhoto;
        }),
        DEFAULT_UPLOAD_PHOTO
      ]);
    }

    setIsLoadingImages(false);
  };

  useEffect(() => {
    if (patient) {
      handleLoadPatientImages();
    }
  }, [patient]);

  useEffect(() => {
    if (patient && !isLoading && isFetching) {
      updateParentImages();
    }
  }, [isLoading, isFetching]);

  return (
    <UploadPhotoListWrapper column>
      <StyledUploadPhotoList>
        {patientPhotos?.map((photo, index) => (
          <UploadPhotoCard
            parentImages={parentImages}
            setPatientPhotos={setPatientPhotos}
            photos={patientPhotos}
            photo={photo}
            id={photo.id}
            key={photo.id + index}
            initialLoadingActive={initialLoadingActive}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            canvasRef={canvasRef}
            deepAr={deepAr}
            isDeepArLoading={isDeepArLoading}
            croppedData={croppedData}
            setCroppedImageData={setCroppedImageData}
            patient={patient}
          />
        ))}
      </StyledUploadPhotoList>

      {isLoadingImages && <Spinner tip={"Loading photos"} />}
    </UploadPhotoListWrapper>
  );
};
