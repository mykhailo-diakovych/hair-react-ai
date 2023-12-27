import React, { useContext, useEffect, useRef, useState } from "react";
import { useGetUploadedImage } from "@hooks/query/image/useGetUploadedImage";
import { useGetArSettingsQuery } from "@hooks/query/image/useGetArSettingsQuery";
import { getImageData } from "@helpers/getImageDataContext";
import { getEffectPath } from "@helpers/deepar/getEffectPath";
import {
  ProcessingImageLoader,
  ProcessingImageWrapper
} from "@features/client/home/components/ClientTabs/components/UploadProcessing/components/ProcessingImage/styled/ProcessingImage.styled";
import { ContactInfoModal } from "@features/client/home/components/ClientTabs/components/ContactInfoModal/styled/ContactInfoModal.styled";
import { ContactInfoForm } from "@features/client/home/components/ClientTabs/components/ContactInfoForm/ContactInfoForm";
import { ClientTabsContext } from "@features/client/home/components/ClientTabs/ClientTabs.context";
import { ClientContext } from "@features/client/home/Client.context";
import {
  changePosition,
  changeScale,
  changeSectionVolumeForSlot,
  clearEffect,
  processImage,
  switchEffect,
  takeScreenshot
} from "@config/deepar";
import {
  IMAGE_ORIGINS,
  LEAD_FLOW_DEFAULT_VOLUMES,
  SCALE_SLIDER,
  SIMULATION_HAIR_STYLE,
  SIMULATION_HAIR_TYPES
} from "@config/constants";
import { Progressbar } from "@components/Progressbar/Progressbar";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { DeepArCanvas } from "@components/DeepArCanvas/DeepArCanvas";

export const ProcessingImage = ({
  loadingTitle = "Processing..."
}: {
  loadingTitle?: string;
}) => {
  const { clinic } = useContext(ClientContext);
  const {
    deepAr,
    isDeepArLoading,
    croppedData: selectedImageData,
    setIsSimulationReady,
    image,
    setOriginalImage,
    setImageWithEffect,
    isOpenContactInfoModal,
    setIsOpenContactInfoModal
  } = useContext(ClientTabsContext);

  const [showSimulationProgress, setShowSimulationProgress] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getUploadedImage = useGetUploadedImage();

  const {
    data: defaultArSettings,
    refetch: refetchSettings,
    isFetching: isFetchingSetting,
    isLoading: isLoadingSettings
  } = useGetArSettingsQuery(image?.id, {
    enabled: clinic?.auto_email_patient || false
  });

  const handleSetupDeepArDefaultSettings = async (
    volumes = LEAD_FLOW_DEFAULT_VOLUMES
  ) => {
    return new Promise(async (resolve) => {
      if (deepAr) {
        for (const slotInd of [1, 2, 3]) {
          await switchEffect(
            deepAr,
            getEffectPath({
              style:
                SIMULATION_HAIR_STYLE.find(
                  (style) => style.value === defaultArSettings?.model?.style
                ) || SIMULATION_HAIR_STYLE[0],
              type:
                SIMULATION_HAIR_TYPES.find(
                  (type) => type.value === defaultArSettings?.model?.type
                ) || SIMULATION_HAIR_TYPES[0],
              hairloss:
                defaultArSettings?.model?.hairloss?.replace("n", "hl_") ||
                "hl_2",
              slotInd: slotInd
            }),
            slotInd
          );
        }

        changePosition(deepAr, 0, 0.25, 0);
        changeScale(deepAr, SCALE_SLIDER.default, SCALE_SLIDER.default + 0.005);

        [1, 2, 3].map((slotInd) => {
          changeSectionVolumeForSlot(deepAr, selectedImageData as ImageData, {
            hairStyle: SIMULATION_HAIR_STYLE[0],
            hairType: SIMULATION_HAIR_TYPES[0],
            slotInd,
            volume: volumes[slotInd - 1]
          });
        });

        setTimeout(() => {
          resolve(true);
        }, 1000);
      }
    });
  };

  const uploadImagesForSimulations = async () => {
    if (image) {
      const parentImgBase64 = image.image;
      const imageData = await getImageData(parentImgBase64);

      if (canvasRef.current) {
        canvasRef.current.width = imageData.width;
        canvasRef.current.height = imageData.height;
      }

      await clearEffect(deepAr);

      // process image to deepAr canvas
      await processImage(deepAr, imageData, 5);

      const imageWithoutEffectBase64 = (await takeScreenshot(deepAr))?.props
        .src as string; // take screenshot of deepAr image without effect

      // use default setting for deepAr
      await handleSetupDeepArDefaultSettings();

      // process image to deepAr canvas
      await processImage(deepAr, imageData, 5);

      const imageLowHairDensity = (await takeScreenshot(deepAr))?.props
        .src as string; // take screenshot of deepAr image with effect

      // use default setting for deepAr
      await handleSetupDeepArDefaultSettings([5500, 5500, 5500]);

      // process image to deepAr canvas
      await processImage(deepAr, imageData, 5);

      const imageHighHairDensity = (await takeScreenshot(deepAr))?.props
        .src as string; // take screenshot of deepAr image with effect

      const originalImage = await getUploadedImage({
        image: imageWithoutEffectBase64,
        parent: image?.id,
        origin: IMAGE_ORIGINS.CAMERA
      }); // attach cropped image to uploaded image

      const uploadedImageLowDensity = await getUploadedImage({
        image: imageLowHairDensity,
        parent: image?.id,
        origin: IMAGE_ORIGINS.AIMASK
      }); // attach deepAr image to uploaded image

      await getUploadedImage({
        image: imageHighHairDensity,
        parent: image?.id,
        origin: IMAGE_ORIGINS.AIMASK
      }); // attach deepAr image to uploaded image

      // save original & model images
      setOriginalImage(originalImage);
      setImageWithEffect(uploadedImageLowDensity);

      setShowSimulationProgress(false);
      setIsOpenContactInfoModal(true);
      setIsSimulationReady(true);
    }
  };

  useEffect(() => {
    if (!clinic?.auto_email_patient) {
      return;
    }

    if (!isDeepArLoading && !isLoadingSettings && !isFetchingSetting) {
      return;
    }

    uploadImagesForSimulations();
  }, [isDeepArLoading, image?.image, isLoadingSettings, isFetchingSetting]);

  useEffect(() => {
    if (!clinic?.auto_email_patient) {
      return;
    }

    refetchSettings();
  }, []);

  useEffect(() => {
    if (!image?.image || clinic?.auto_email_patient) return;

    // setTimeout(() => {
    setIsOpenContactInfoModal(true);
    setIsSimulationReady(true);
    setShowSimulationProgress(false);
    // }, 2000);
  }, [image?.image]);

  return (
    <ProcessingImageWrapper column>
      <DeepArCanvas
        style={{ width: "100%" }}
        className={"visually-hidden"}
        deepAr={deepAr}
        isDeepArLoading={isDeepArLoading}
        imageData={selectedImageData}
        ref={canvasRef}
      />

      <StyledImage
        src={image?.image}
        imageStyles={{
          aspectRatio: "3/4",
          objectPosition: "top center",
          filter: "blur(15px)"
        }}
      />

      {showSimulationProgress && (
        <ProcessingImageLoader column>
          <Progressbar active title={loadingTitle} />
        </ProcessingImageLoader>
      )}

      <ContactInfoModal
        isOpen={isOpenContactInfoModal}
        setIsOpen={setIsOpenContactInfoModal}
        getContainer={false}
        showCloseIcon={false}
        maskClosable={false}
      >
        <ContactInfoForm />
      </ContactInfoModal>
    </ProcessingImageWrapper>
  );
};
