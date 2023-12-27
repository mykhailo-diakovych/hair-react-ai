import { useTheme } from "styled-components";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { UploadImageResponse } from "@services/Files/interfaces/UploadImageResponse.interface";
import { FilesService } from "@services/Files/Files.service";
import { useGetPatientQuery } from "@hooks/query/patients/useGetPatientQuery";
import { useCreateModelImageMutation } from "@hooks/query/modelImage/useCreateModelImageMutation";
import { useCreateModelMutation } from "@hooks/query/model/useCreateModelMutation";
import { useGetUploadedImage } from "@hooks/query/image/useGetUploadedImage";
import { Toast } from "@helpers/toast";
import { toDataURL } from "@helpers/getImageElement";
import { ConditionalWrapper } from "@helpers/conditionalWrapper";
import { UploadPhoto } from "@features/clinic/patients/profile/components/UploadPhotoCard/UploadPhotoCard";
import { CreateNewModelSchema } from "@features/clinic/patients/profile/components/CreateNewModel/validators/CreateNewModelSchema";
import { ModelPhotoCardsWrapper } from "@features/clinic/patients/profile/components/CreateNewModel/styled/ModelPhotoCardsWrapper.styled";
import {
  CreateNewModelControls,
  CreateNewModelControlsWrapper
} from "@features/clinic/patients/profile/components/CreateNewModel/styled/CreateNewModelControls.styled";
import { StyledCreateNewModel } from "@features/clinic/patients/profile/components/CreateNewModel/styled/CreateNewModel.styled";
import { ModelPhotoCard } from "@features/clinic/patients/profile/components/CreateNewModel/components/ModelPhotoCard/ModelPhotoCard";
import {
  API_SERVICES,
  CLINIC_STORAGE_KEY,
  UPLOAD_IMAGE_CUSTOM_UPLOADED
} from "@config/constants";
import { Title } from "@components/Title/Title";
import { Spinner } from "@components/Spinner/styled/Spinner.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FieldInput } from "@components/Input/variants/FieldInput";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Divider } from "@components/Divider/styled/Divider.styled";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

export interface ISelectedListItem {
  id: string;
  image?: string;
  checked?: boolean;
  isOriginal?: boolean;
}

interface CreateNewModelValues {
  model: string;
}

export const CreateNewModel = ({ closeModal }: { closeModal: () => void }) => {
  const theme = useTheme();

  const formInitialValues: CreateNewModelValues = {
    model: ""
  };

  const [modelTitle, setModelTitle] = useState("");

  const { id } = useParams() as { id: string };
  const { data: patient, isFetching } = useGetPatientQuery(id);

  const [patientImages, setPatientImages] = useState<UploadPhoto[]>([]);

  const createModelMutation = useCreateModelMutation();
  const createModelImageMutation = useCreateModelImageMutation();

  const [selectedList, setSelectedList] = useState<ISelectedListItem[]>([]);

  const selectedPhotos = selectedList.filter((item) => item.checked);

  const [isCreatingModel, setIsCreatingModel] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const isAllSelected = selectedList.every(
    (item) => item.checked || item?.isOriginal
  );

  const handleSelectDeselectAll = () => {
    setSelectedList(
      selectedList.map((item) => ({
        ...item,
        checked: item?.isOriginal ? false : !isAllSelected
      }))
    );
  };

  const getUploadedPatientImage = useGetUploadedImage(false);
  const queryClient = useQueryClient();

  const handleCreateModel = async () => {
    if (!modelTitle) {
      return Toast.error("Model title is required");
    }

    if (!selectedList.some((item) => item.checked)) {
      return Toast.error(
        "You need to select at least one photo to create a model"
      );
    }

    if (patient) {
      setIsCreatingModel(true);

      const uploadedImages: UploadImageResponse[] = [];
      for (const selectedPhoto of selectedPhotos) {
        if (selectedPhoto?.isOriginal) continue;

        const imageBase64 = await toDataURL(selectedPhoto?.image as string);

        const uploadedImage = await getUploadedPatientImage({
          image: imageBase64,
          clinic:
            patient?.clinic ||
            (localStorage.getItem(CLINIC_STORAGE_KEY) as string)
        });
        uploadedImages.push(uploadedImage);
      }

      createModelMutation(
        {
          name: modelTitle,
          patient: patient.id
        },
        {
          onSuccess: async (modelData) => {
            Toast.success("Model has been created successfully");

            uploadedImages.map(async (uploadedImage) => {
              createModelImageMutation(
                {
                  model: modelData.id,
                  image: uploadedImage.id
                },
                {
                  onError: () => {
                    Toast.error(
                      `The model image with id#${uploadedImage.id} could not be uploaded to the model`
                    );
                  }
                }
              );
            });

            if (modelTitle) {
              setModelTitle("");
            }

            setIsCreatingModel(false);

            await queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey.includes(API_SERVICES.PATIENTS.invalidationKey)
            });

            closeModal();
          },
          onError: () => {
            Toast.error("Something went wrong while creating model");

            setIsCreatingModel(false);
          }
        }
      );
    }
  };

  const updatePatientImages = async () => {
    if (patient) {
      const images = [];
      setIsLoadingImages(true);

      for (const patientImage of patient?.images) {
        const image = await FilesService.getImageUrl(patientImage?.id, false);

        let croppedImageId, croppedImage;
        for (let i = 0; i < image.images.length; i++) {
          croppedImage = await FilesService.getImageUrl(
            image?.images?.at(i) as string,
            false
          );

          if (
            UPLOAD_IMAGE_CUSTOM_UPLOADED?.includes(
              croppedImage.origin as string
            )
          ) {
            continue;
          }

          croppedImageId = image.images.at(i) as string;
          break;
        }

        images.push({
          id: croppedImageId,
          image: croppedImage?.image,
          isOriginal: image?.images.length === 0
        } as UploadPhoto);
      }
      setIsLoadingImages(false);
      setPatientImages(images);
    }
  };

  useEffect(() => {
    if (isFetching) return;

    updatePatientImages();
  }, [patient, isFetching]);

  useEffect(() => {
    setSelectedList(
      patientImages?.map((image) => {
        const listItem: ISelectedListItem = {
          ...image,
          checked: !image?.isOriginal
        };

        return listItem;
      }) || []
    );
  }, [patientImages]);

  return (
    <StyledCreateNewModel className="create-new-model">
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleCreateModel}
        validationSchema={CreateNewModelSchema}
        validateOnMount
        validateOnBlur
      >
        {(formik) => {
          return (
            <>
              <Title size={"lg"}>Name a model</Title>
              <FieldInput
                fieldName="model"
                placeholder="Model title"
                value={modelTitle}
                onChange={(e: any) => {
                  setModelTitle(e.target.value);
                }}
              />
              <Divider />
              <FlexGroup compact centerY spread mb={15}>
                <Title level={2}>
                  Select photos you want to use in this model
                </Title>

                <ButtonText
                  onClick={() => handleSelectDeselectAll()}
                  fontWeight={700}
                  color={theme.colors.malibuLight}
                >
                  {isAllSelected ? "Deselect All" : "Select All"}
                </ButtonText>
              </FlexGroup>
              <div style={{ height: 380, overflow: "hidden" }}>
                <ConditionalWrapper
                  wrapper={(children) =>
                    isLoadingImages || isCreatingModel ? (
                      <FlexGroup style={{ position: "relative" }}>
                        <Spinner
                          tip={
                            isCreatingModel
                              ? "Creating model"
                              : "Loading photos"
                          }
                        />

                        {children}
                      </FlexGroup>
                    ) : (
                      <>{children}</>
                    )
                  }
                >
                  <ModelPhotoCardsWrapper gap={0}>
                    {selectedList.map((item) => {
                      return (
                        <ModelPhotoCard
                          key={item.id}
                          selectedList={selectedList}
                          setSelectedList={setSelectedList}
                          photoCard={item}
                        />
                      );
                    })}
                  </ModelPhotoCardsWrapper>
                </ConditionalWrapper>
              </div>
              <CreateNewModelControlsWrapper spread>
                <Paragraph>{selectedPhotos.length} photos selected</Paragraph>

                <CreateNewModelControls>
                  <ButtonPrimaryOutlined
                    style={{ width: "auto" }}
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </ButtonPrimaryOutlined>

                  <ButtonPrimary
                    disabled={
                      selectedPhotos?.length === 0 ||
                      isLoadingImages ||
                      isCreatingModel
                    }
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    style={{ width: "auto" }}
                  >
                    Create model
                  </ButtonPrimary>
                </CreateNewModelControls>
              </CreateNewModelControlsWrapper>
            </>
          );
        }}
      </Formik>
    </StyledCreateNewModel>
  );
};
