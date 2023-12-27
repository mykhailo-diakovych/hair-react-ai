import React, { useContext, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { ModelSimulationRequest } from "@services/Simulation/interfaces/ModelSimulationRequest.interface";
import { ModelImage } from "@services/ModelImage/interfaces/ModelImage.interface";
import { Model } from "@services/Model/interfaces/Model.interface";
import { FilesService } from "@services/Files/Files.service";
import { useUpdateSimulationFieldsMutation } from "@hooks/query/simulation/useUpdateSimulationFieldsMutation";
import { useCreateModelSimulationMutation } from "@hooks/query/simulation/useCreateModelSimulationMutation";
import { useGetModelImageQuery } from "@hooks/query/modelImage/useGetModelImageQuery";
import { useCreateModelImageMutation } from "@hooks/query/modelImage/useCreateModelImageMutation";
import { useGetUploadedImage } from "@hooks/query/image/useGetUploadedImage";
import { Toast } from "@helpers/toast";
import { toDataURL } from "@helpers/getImageElement";
import { normalizeSliderValue } from "@helpers/deepar/normalizeValue";
import { getEffectPath } from "@helpers/deepar/getEffectPath";
import { SimulatorContext } from "@features/simulator/Simulator.context";
import { SaveSimulationSchema } from "@features/simulator/components/SaveSimulationForm/SaveSimulationSchema";
import { getSectionDensitiesArray } from "@features/simulator/components/SaveSimulationForm/helpers/getSectionDensities";
import {
  changeEffectColor,
  changeHairline,
  changeLighting,
  changePosition,
  changeRotate,
  changeScale,
  changeSectionVolumeForSlot,
  processImage,
  switchEffect,
  takeScreenshot
} from "@config/deepar";
import {
  CLINIC_STORAGE_KEY,
  HAIRLINE_SLIDER,
  LIGHTING_AXIS_SLIDER,
  LIGHTING_BRIGHTNESS_SLIDER,
  ROTATE_SLIDER,
  SCALE_SLIDER,
  SIMULATION_HAIR_STYLE,
  SIMULATION_HAIR_TYPES,
  SimulationHairOption,
  SimulationSectionVolume,
  TRANSLATE_SLIDER
} from "@config/constants";
import { FieldTextArea } from "@components/TextArea/variants/FieldTextArea";
import { Switch } from "@components/Switch/styled/Switch.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { Form } from "@components/Form/styled/Form.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

import { SimulationModelSettings } from "../../../../interfaces/simulationSettings.interface";

interface SaveSimulationValues {
  simulationName: string;
  description: string;
  withDensity?: boolean;
}

export const SaveSimulationForm = ({
  model,
  closeModal
}: {
  model?: Model;
  closeModal: () => void;
}) => {
  const formInitialValues: SaveSimulationValues = {
    simulationName: "",
    description: ""
  };

  const [withDensity, setWithDensity] = useState(false);

  const {
    deepAr,
    setIsSavedSimulation,
    setProcessedSimulation,
    selectedImageData,
    processedSimulation
  } = useContext(SimulatorContext);

  const { data: processedSimulationModelImage } = useGetModelImageQuery(
    processedSimulation?.model_image as string
  );

  const updateSimulation = useUpdateSimulationFieldsMutation();

  const getUploadedPatientImage = useGetUploadedImage(false);

  const createModelImageMutation = useCreateModelImageMutation();
  const createModelSimulationMutation = useCreateModelSimulationMutation();

  const [isSavingSimulations, setIsSavingSimulations] = useState(false);

  const changeSectionVolume = async ({
    hairStyle,
    hairType,
    sectionVolume,
    timeout = 0
  }: {
    hairStyle: SimulationHairOption;
    hairType: SimulationHairOption;
    sectionVolume: SimulationSectionVolume;
    timeout?: number;
  }) => {
    if (deepAr) {
      Object.values(sectionVolume).map((volume, sectionInd) =>
        changeSectionVolumeForSlot(deepAr, selectedImageData as ImageData, {
          hairStyle: hairStyle,
          hairType: hairType,
          slotInd: sectionInd + 1,
          volume: volume
        })
      );
    }

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, timeout)
    );
  };

  const getHairOptionValue = (
    hairOptions: SimulationHairOption[],
    option?: string
  ) => {
    return hairOptions.find(
      (hairOption) => hairOption.value === option
    ) as SimulationHairOption;
  };

  const changePositionLightingSettings = async (
    modelState: SimulationModelSettings
  ) => {
    if (deepAr) {
      const lightningSettings =
        processedSimulation?.simulator_settings?.lightning_settings;
      const positionSettings =
        processedSimulation?.simulator_settings?.position_settings;

      const convertedHairline = normalizeSliderValue(
        (positionSettings?.hairLine as number) ?? HAIRLINE_SLIDER.default,
        HAIRLINE_SLIDER
      );

      changeHairline(deepAr, selectedImageData as ImageData, convertedHairline);

      const extendedModelState = {
        ...(modelState || {}),
        ...lightningSettings,
        ...positionSettings
      };

      changeEffectColor(
        deepAr,
        selectedImageData as ImageData,
        modelState?.color,
        extendedModelState?.lighting?.brightness ??
          LIGHTING_BRIGHTNESS_SLIDER.default
      );

      changePosition(
        deepAr,
        extendedModelState?.translate?.x ?? TRANSLATE_SLIDER.default,
        extendedModelState?.translate?.y ?? TRANSLATE_SLIDER.default,
        extendedModelState?.translate?.z ?? TRANSLATE_SLIDER.default
      );
      changeRotate(
        deepAr,
        extendedModelState?.rotate?.x ?? ROTATE_SLIDER.default,
        extendedModelState?.rotate?.y ?? ROTATE_SLIDER.default
      );
      changeScale(
        deepAr,
        extendedModelState?.scale?.x ?? SCALE_SLIDER.default,
        extendedModelState?.scale?.y ?? SCALE_SLIDER.default,
        extendedModelState?.scale?.z ?? SCALE_SLIDER.default
      );
      changeLighting(
        deepAr,
        selectedImageData as ImageData,
        extendedModelState?.lighting?.x ?? LIGHTING_AXIS_SLIDER.default,
        extendedModelState?.lighting?.y ?? LIGHTING_AXIS_SLIDER.default,
        extendedModelState?.lighting?.z ?? LIGHTING_AXIS_SLIDER.default
      );
    }
  };

  const handleChangeEffect = async (modelState: SimulationModelSettings) => {
    if (deepAr) {
      const modelStyle = getHairOptionValue(
        SIMULATION_HAIR_STYLE,
        modelState?.hairStyle
      );
      const modelType = getHairOptionValue(
        SIMULATION_HAIR_TYPES,
        modelState?.hairType
      );

      await Promise.all(
        [1, 2, 3].map((slotInd) => {
          return switchEffect(
            deepAr,
            getEffectPath({
              style: modelStyle,
              type: modelType,
              slotInd: slotInd
            }),
            slotInd
          );
        })
      );

      await changePositionLightingSettings(modelState);

      changeSectionVolume({
        hairStyle: modelStyle,
        hairType: modelType,
        sectionVolume: modelState?.sectionVolume,
        timeout: 1000
      });
    }
  };

  const handleCreateModelImage = async (
    face: string,
    originalImageBase64: string
  ): Promise<ModelImage> => {
    return new Promise(async (resolve, reject) => {
      if (!processedSimulation) {
        return reject();
      }

      const { simulator_settings } = processedSimulation;

      const { mask, lightning_settings, position_settings } =
        simulator_settings;

      const uploadedImage = await getUploadedPatientImage({
        image: originalImageBase64,
        clinic: localStorage.getItem(CLINIC_STORAGE_KEY) as string
      });

      createModelImageMutation(
        {
          simulator_settings,
          lightning_settings,
          position_settings,
          image: uploadedImage.id,
          model: model?.id,
          mask,
          face: face,
          parent: processedSimulationModelImage?.id,
          is_active: false
        },
        {
          onSuccess: (modelImage) => {
            resolve(modelImage);
          },
          onError: () => {
            reject();
          }
        }
      );
    });
  };

  const handleCreateSimulation = async (options: ModelSimulationRequest) => {
    return new Promise((resolve) => {
      createModelSimulationMutation(options, {
        onSuccess: (simulation) => {
          resolve(simulation);
        },
        onError: () => {
          Toast.error("Error while creating model simulation");
        }
      });
    });
  };

  const handleProcessSimulationWithDensity = async (
    values: SaveSimulationValues
  ) => {
    if (processedSimulation && deepAr?.current) {
      const {
        seed,
        cfg_scale: cfgScale,
        denoising_strength: denoisingStrength,
        prompt,
        sampler_name: samplerName,
        negative_prompt: negativePrompt,
        steps
      } = processedSimulation.api_params;

      const { accuracy, resolution } = processedSimulation;

      const effectSettings = processedSimulation?.simulator_settings
        ?.effect_settings as SimulationModelSettings;

      await processImage(deepAr, selectedImageData as ImageData, 10);
      await handleChangeEffect(effectSettings);
      await processImage(deepAr, selectedImageData as ImageData, 10);

      const hairStyle = getHairOptionValue(
        SIMULATION_HAIR_STYLE,
        effectSettings?.hairStyle
      );
      const hairType = getHairOptionValue(
        SIMULATION_HAIR_TYPES,
        effectSettings?.hairType
      );

      const simulationImagesWithDensity: {
        imageBase64: string;
        density: number;
      }[] = [];

      const densitiesCount = 10;
      const densityForFirstSlot = getSectionDensitiesArray(
        effectSettings.sectionVolume.r1,
        densitiesCount
      );
      const densityForSecondSlot = getSectionDensitiesArray(
        effectSettings.sectionVolume.r2,
        densitiesCount
      );
      const densityForThirdSlot = getSectionDensitiesArray(
        effectSettings.sectionVolume.r3,
        densitiesCount
      );

      const SECTION_VOLUMES_DENSITY = new Array(densitiesCount)
        .fill(effectSettings.sectionVolume)
        .map((_, index) => {
          return {
            r1: densityForFirstSlot[index],
            r2: densityForSecondSlot[index],
            r3: densityForThirdSlot[index]
          };
        })
        .reverse();

      await changeSectionVolume({
        hairStyle: hairStyle,
        hairType: hairType,
        sectionVolume: SECTION_VOLUMES_DENSITY[0],
        timeout: 500
      });
      await processImage(deepAr, selectedImageData as ImageData, 10);

      for (let i = 0; i < SECTION_VOLUMES_DENSITY.length; i++) {
        const totalDensity =
          SECTION_VOLUMES_DENSITY[i].r1 +
          SECTION_VOLUMES_DENSITY[i].r2 +
          SECTION_VOLUMES_DENSITY[i].r3;

        if (
          !totalDensity ||
          simulationImagesWithDensity.length === densitiesCount
        ) {
          break;
        }

        await changeSectionVolume({
          hairStyle: hairStyle,
          hairType: hairType,
          sectionVolume: SECTION_VOLUMES_DENSITY[i],
          timeout: 500
        });
        await processImage(deepAr, selectedImageData as ImageData, 10);

        const simulationImage = await takeScreenshot(deepAr);

        simulationImagesWithDensity.push({
          imageBase64: simulationImage?.props.src as string,
          density: totalDensity
        });
      }

      const { image } = await FilesService.getImageUrl(
        processedSimulationModelImage?.image as string
      );
      const originalImageBase64 = await toDataURL(image);

      for (const simulationImageWithDensity of simulationImagesWithDensity.reverse()) {
        const uploadedImageWithDensity = await getUploadedPatientImage({
          image: simulationImageWithDensity?.imageBase64 as string,
          clinic: localStorage.getItem(CLINIC_STORAGE_KEY) as string
        });

        const densityModelImage = await handleCreateModelImage(
          uploadedImageWithDensity?.id,
          originalImageBase64
        );

        await handleCreateSimulation({
          model_image: densityModelImage?.id as string,
          seed: seed || processedSimulation.seed,
          accuracy: accuracy,
          resolution: resolution,
          is_deleted: true,
          patientId: model?.patient as string,
          parent: processedSimulation.id,
          name: values.simulationName,
          description: values.description || "",
          density: simulationImageWithDensity.density,
          api_params: {
            sampler_name: samplerName,
            prompt: prompt,
            negative_prompt: negativePrompt,
            cfg_scale: Math.floor(cfgScale),
            denoising_strength: denoisingStrength,
            steps: Math.floor(steps)
          }
        });
      }
    }
  };

  const handleSaveSimulation = async (
    values: SaveSimulationValues,
    actions: FormikHelpers<SaveSimulationValues>
  ) => {
    setIsSavingSimulations(true);

    if (withDensity) {
      actions.resetForm();
      await handleProcessSimulationWithDensity(values);
    }

    updateSimulation(
      {
        id: processedSimulation?.id,
        name: values.simulationName,
        description: values.description || "",
        is_deleted: false
      },
      {
        onSuccess: () => {
          Toast.success("Simulation saved successfully");

          actions.resetForm();
          setIsSavingSimulations(false);

          setIsSavedSimulation(true);
          setProcessedSimulation(null);
          closeModal();
        }
      }
    );
  };

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleSaveSimulation}
        validationSchema={SaveSimulationSchema}
        validateOnMount
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <GroupItems>
              <FieldTextArea
                label={"Name simulation"}
                fieldName={"simulationName"}
              />

              <FieldTextArea
                label={"Add description (optional)"}
                fieldName={"description"}
              />

              <FlexGroup compact mb={30}>
                <Switch onChange={(state: boolean) => setWithDensity(state)} />

                <FlexGroup compact column gap={0}>
                  <Paragraph size={"lg"}>Process with density option</Paragraph>
                  <Paragraph color={"nobel"} size={"lg"}>
                    It will take 2-3 minutes
                  </Paragraph>
                </FlexGroup>
              </FlexGroup>
            </GroupItems>

            <FlexGroup compact alignSelf={"end"}>
              <ButtonPrimaryOutlined
                style={{ minWidth: "auto" }}
                onClick={() => closeModal()}
              >
                Cancel
              </ButtonPrimaryOutlined>

              <ButtonPrimary
                disabled={!formik.isValid || isSavingSimulations}
                onClick={formik.handleSubmit}
              >
                Save simulation
                {isSavingSimulations && (
                  <IconSprite
                    iconName={"common/spinner"}
                    style={{ marginLeft: 5, width: 16, height: 16 }}
                  />
                )}
              </ButtonPrimary>
            </FlexGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};
