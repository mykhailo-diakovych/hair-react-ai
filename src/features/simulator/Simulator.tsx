import { useTheme } from "styled-components";
import { useStateWithHistory, useUpdateEffect } from "react-use";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { ModelImageService } from "@services/ModelImage/ModelImage.service";
import { Model } from "@services/Model/interfaces/Model.interface";
import { useToggle } from "@hooks/useToggle";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useDeepAr } from "@hooks/useDeepAr";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { useCreateModelSimulationMutation } from "@hooks/query/simulation/useCreateModelSimulationMutation";
import { useUpdateModelImageFieldsMutation } from "@hooks/query/modelImage/useUpdateModelImageFieldsMutation";
import { useGetModelByIdQuery } from "@hooks/query/model/useGetModelByIdQuery";
import { useGetImagesUrlsQuery } from "@hooks/query/image/useGetImagesUrlsQuery";
import { Toast } from "@helpers/toast";
import { getRandomSeed } from "@helpers/getRandomSeed";
import { getRandomInRange } from "@helpers/getRandomInRange";
import { normalizeValue } from "@helpers/deepar/normalizeValue";
import { SimulationProcessBody } from "@features/simulator/styled/SimulationProcessBody.styled";
import { SimulatorContext } from "@features/simulator/Simulator.context";
import { GeneratedSimulation } from "@features/simulator/interfaces/GeneratedSimulation.interface";
import { FaceImage } from "@features/simulator/interfaces/FaceImage.interface";
import { SimulationProcessMain } from "@features/simulator/components/SimulationProcessVariations/styled/SimulationProcessMain.styled";
import { SimulationProcessVariations } from "@features/simulator/components/SimulationProcessVariations/SimulationProcessVariations";
import { SimulationProcessSettings } from "@features/simulator/components/SimulationProcessSettings/SimulationProcessSettings";
import { SimulationProcessOriginal } from "@features/simulator/components/SimulationProcessOriginal/SimulationProcessOriginal";
import { SimulationProcessWrapper } from "@features/simulator/components/shared/styled/SimulationProcessWrapper.styled";
import { StyledSimulationSidebar } from "@features/simulation/home/styled/SimulationSidebar.styled";
import { Header } from "@features/simulation/home/components/Header/styled/Header.styled";
import { queryClient } from "@config/query";
import { processImage, shutdown } from "@config/deepar";
import {
  API_SERVICES,
  ROUTES,
  SIMULATOR_DEFAULT_SETTINGS
} from "@config/constants";
import { Theme } from "@components/Theme/Theme";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Sidebar } from "@components/Sidebar/styled/Sidebar.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Navigation } from "@components/Navigation/Navigation";
import { Loader } from "@components/Loader/Loader";
import { IconSprite } from "@components/Icon/IconSprite";
import { GalleryImageContainer } from "@components/GalleryImage/GalleryImageContainer";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { DeepArCanvas } from "@components/DeepArCanvas/DeepArCanvas";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";

import { IImage } from "../../interfaces/image.interface";

export const Simulator = () => {
  const { id } = useParams() as { id: string };
  const { data: model, isLoading: isModelLoading } = useGetModelByIdQuery(id, {
    staleTime: 0
  });

  const navigate = useNavigate();

  const theme = useTheme();

  const { data: modelImages } = useGetImagesUrlsQuery(
    model?.modelImages
      ?.filter((modelImage) => modelImage.is_active)
      ?.map((modelImage) => {
        return modelImage.image;
      }) || []
  );

  const patientSimulationImages: IImage[] = useMemo(() => {
    if (!modelImages || modelImages?.length === 0) {
      return [];
    }

    const modelImagesArray = Array.isArray(modelImages)
      ? modelImages
      : [modelImages];

    return (
      modelImagesArray?.map((image) => ({
        id: image.id,
        src: image.image
      })) || []
    );
  }, [modelImages]);

  const [galleryImages, setGalleryImages] = useState<IImage[]>(
    patientSimulationImages
  );

  useUpdateEffect(() => {
    setGalleryImages(patientSimulationImages);
  }, [patientSimulationImages]);

  useEffect(() => {
    return () => {
      setGalleryImages([]);

      queryClient.invalidateQueries([API_SERVICES.MODEL.invalidationKey]);
    };
  }, []);

  const [selectedImageId, setSelectedImageId] = useState("");
  const selectedModelImage = useMemo(() => {
    return model?.modelImages?.find(
      (modelImage) => modelImage.image === selectedImageId
    );
  }, [model, selectedImageId]);

  const [selectedImageData, setSelectedImageData] = useState<ImageData>();
  const [isGenerating, setIsGenerating] = useState(false);

  const [processedSimulation, setProcessedSimulation] =
    useState<ModelSimulation | null>(null);

  const [showSettings, toggleShowSettings] = useToggle(false);

  const isSettingsHidden = useMediaQuery(
    `(max-width: ${theme.breakpoints.md})`
  );

  const [showSavedSimulationSettings, setShowSavedSimulationSettings] =
    useState(false);

  const [generatedSimulations, setGeneratedSimulations, simulationsHistory] =
    useStateWithHistory(
      {
        createdAt: "",
        simulations: []
      } as GeneratedSimulation | undefined,
      300
    );

  const [isSavedSimulation, setIsSavedSimulation] = useState(false);

  const [accuracy, setAccuracy] = useState(SIMULATOR_DEFAULT_SETTINGS.accuracy);
  const [resolution, setResolution] = useState(
    SIMULATOR_DEFAULT_SETTINGS.resolution
  );
  const [simulationAmount, setSimulationAmount] = useState(
    SIMULATOR_DEFAULT_SETTINGS.simulationAmount
  );
  const [prompt, setPrompt] = useState(SIMULATOR_DEFAULT_SETTINGS.prompt);
  const [seed, setSeed] = useState<number | null>(
    SIMULATOR_DEFAULT_SETTINGS.seed
  );
  const [negativePrompt, setNegativePrompt] = useState(
    SIMULATOR_DEFAULT_SETTINGS.negativePrompt
  );
  const [hairTreatment, setHairTreatment] = useState<string>(
    SIMULATOR_DEFAULT_SETTINGS.hairTreatment
  );

  const updateModelImageFieldsMutation = useUpdateModelImageFieldsMutation();
  const createModelSimulationMutation = useCreateModelSimulationMutation();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { deepAr, loading: isDeepArLoading } = useDeepAr(canvasRef);

  const simulationsHistoryLength = useMemo(() => {
    return (
      simulationsHistory?.history?.reduce(
        (prev: number, generatedSimulation) => {
          return (
            prev +
            Number(
              generatedSimulation?.simulations &&
                generatedSimulation.simulations.length > 0
            )
          );
        },
        0
      ) || 0
    );
  }, [selectedModelImage, generatedSimulations]);

  const [isGeneratingVariants, setIsGeneratingVariants] = useState(false);

  const [faceId, setFaceId] = useState("");

  const [loadedSimulations, setLoadedSimulations] = useState<string[]>([]);

  const location = useLocation() as {
    state: {
      isGenerationMode: boolean;
      modelImages: { id: string; face: string }[];
    };
  };

  const modelImagesFaces = location?.state?.modelImages || null;

  const [isGenerationMode, setIsGenerationMode] = useState(
    location?.state?.isGenerationMode
  );

  useEffect(() => {
    if (!selectedModelImage) {
      return;
    }

    setFaceId(
      modelImagesFaces?.find(
        (modelImage) => modelImage.id === selectedModelImage.id
      )?.face || selectedModelImage.face
    );
  }, [selectedModelImage]);

  const [faceImages, setFaceImages] = useState<FaceImage[]>([]);

  const handleResetSettings = () => {
    setAccuracy(SIMULATOR_DEFAULT_SETTINGS.accuracy);
    setResolution(SIMULATOR_DEFAULT_SETTINGS.resolution);
    setSimulationAmount(SIMULATOR_DEFAULT_SETTINGS.simulationAmount);
    setPrompt(SIMULATOR_DEFAULT_SETTINGS.prompt);
    setNegativePrompt(SIMULATOR_DEFAULT_SETTINGS.negativePrompt);
    setHairTreatment(SIMULATOR_DEFAULT_SETTINGS.hairTreatment);
    // setThickness(SIMULATION_HAIR_THICKNESS[0]);
    // setColor(SIMULATION_PROCESS_HAIR_COLOURS[0]);
  };

  const getDistinctRandomValue = (
    currentValue: number,
    defaultValue: number,
    deviation = 20
  ) => {
    while (currentValue === defaultValue) {
      currentValue = getRandomInRange(
        Math.max(defaultValue - deviation, 0),
        Math.min(defaultValue + deviation, 100)
      );
    }

    return currentValue;
  };

  const handleCreateSimulation = async (
    seedRandom: number,
    lastGroupIndex: number
  ): Promise<ModelSimulation> => {
    return new Promise((resolve, reject) => {
      const accuracyComputed = processedSimulation
        ? getDistinctRandomValue(
            accuracy,
            accuracy,
            +import.meta.env.VITE_ACCURACY_DEVIATION || 30
          )
        : accuracy;
      const seedComputed = processedSimulation
        ? processedSimulation.seed
        : seed || seedRandom;

      const cfgScale = normalizeValue(
        accuracyComputed,
        0,
        100,
        +import.meta.env.VITE_CFG_SCALE_MIN || 25,
        +import.meta.env.VITE_CFG_SCALE_MAX || 1
      );
      const denoisingStrength = normalizeValue(
        accuracyComputed,
        0,
        100,
        +import.meta.env.VITE_DENOISING_STRENGTH_MIN || 0.8,
        +import.meta.env.VITE_DENOISING_STRENGTH_MAX || 0.1
      );
      const steps = normalizeValue(
        resolution,
        0,
        100,
        +import.meta.env.VITE_STEPS_MIN || 10,
        +import.meta.env.VITE_STEPS_MAX || 150
      );

      createModelSimulationMutation(
        {
          model_image: selectedModelImage?.id as string,
          seed: seedComputed,
          accuracy: accuracyComputed,
          resolution: resolution,
          group_index: lastGroupIndex + 1,
          is_deleted: true,
          patientId: model?.patient as string,
          api_params: {
            sampler_name: hairTreatment,
            prompt: prompt,
            negative_prompt: negativePrompt,
            cfg_scale: Math.floor(cfgScale),
            denoising_strength: denoisingStrength,
            steps: Math.floor(steps)
          }
        },
        {
          onSuccess: (simulation) => {
            return resolve(simulation);
          },
          onError: () => {
            Toast.error("Error while creating model simulation");
            return reject();
          }
        }
      );
    });
  };

  const handleUpdateModelImageMutation = async (faceImageId: string) => {
    return new Promise(async (resolve) => {
      const modelImage = await ModelImageService.getModelImage(
        selectedModelImage?.id
      );

      updateModelImageFieldsMutation(
        {
          id: modelImage?.id as string,
          face: faceImageId,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          simulator_settings: {
            ...(modelImage?.simulator_settings || {}),
            face: faceImageId,
            mask: modelImage?.mask,
            lightning_settings: modelImage?.lightning_settings,
            position_settings: modelImage?.position_settings
          }
        },
        {
          onSuccess: () => {
            resolve(true);
          },
          onError: () => {
            Toast.error("Error while updating model image");
            resolve(false);
          }
        }
      );
    });
  };

  const handleGenerateVariants = async () => {
    setProcessedSimulation(null);
    setIsGeneratingVariants(true);

    if (simulationsHistory.position === simulationsHistoryLength) {
      simulationsHistory.history.pop();
    }

    const seedNumbers = new Set();
    const simulations: ModelSimulation[] = [];

    const faceImageId =
      simulationsHistory.position === simulationsHistoryLength
        ? faceId
        : generatedSimulations?.simulations.at(0)?.image?.parent ||
          selectedModelImage?.face;

    await handleUpdateModelImageMutation(faceImageId as string);

    const groupIndices =
      simulationsHistory?.history?.flatMap((generatedSimulations) => {
        return (
          generatedSimulations?.simulations.flatMap(
            (simulation) => simulation?.group_index || 0
          ) || []
        );
      }) || [];

    const lastGroupIndex = Math.max(
      ...groupIndices,
      simulationsHistoryLength + 1
    );

    setFaceImages((prev) => {
      const isFaceImageExists = prev.some(
        (faceImage) =>
          faceImage.modelImageId === selectedModelImage?.id &&
          faceImage.group_index === simulations?.at(0)?.group_index
      );

      if (isFaceImageExists) {
        return prev;
      }

      return [
        ...prev,
        {
          modelImageId: selectedModelImage?.id as string,
          face: faceImageId as string,
          group_index: lastGroupIndex + 1
        }
      ];
    });

    for (let step = 0; step < simulationAmount; step++) {
      let seed = getRandomSeed();
      while (seedNumbers.has(seed)) {
        seed = getRandomSeed();
      }

      seedNumbers.add(seed);

      const simulation = await handleCreateSimulation(seed, lastGroupIndex);
      simulations.push(simulation);
    }

    simulationsHistory.go(simulationsHistory.history.length - 1);
    setGeneratedSimulations({
      createdAt: new Date().toString(),
      simulations: simulations
    } as GeneratedSimulation);
    setIsGeneratingVariants(false);
  };

  const groupSimulationImages = async () => {
    if (selectedModelImage) {
      simulationsHistory.history.splice(0, simulationsHistory.history.length);
      simulationsHistory.go(0);

      const groups = new Map();
      selectedModelImage.simulations?.forEach((simulation) => {
        const groupIndex = simulation.group_index || 0;

        if (!simulation.parent) {
          groups.set(groupIndex, [
            ...(groups.get(groupIndex) || []),
            simulation
          ]);
        }
      });

      Array.from(groups.values())
        .reverse()
        .forEach((simulations) => {
          const historyItem = {
            createdAt:
              simulations?.at(0)?.createdAt || selectedModelImage?.createdAt,
            simulations: simulations || []
          };

          setGeneratedSimulations(historyItem);

          setFaceImages((prev) => {
            const isFaceImageExists = prev.some(
              (faceImage) =>
                faceImage.modelImageId === selectedModelImage?.id &&
                faceImage.group_index === simulations?.at(0)?.group_index
            );

            if (isFaceImageExists) {
              return prev;
            }

            return [
              ...prev,
              {
                modelImageId: selectedModelImage?.id as string,
                face: simulations?.at(0)?.image?.parent || "",
                group_index: simulations?.at(0)?.group_index || 0
              }
            ];
          });
        });

      if (isGenerationMode) {
        setGeneratedSimulations({
          simulations: [],
          createdAt: new Date().toString()
        });

        setTimeout(() => {
          simulationsHistory.go(simulationsHistory.history.length + 1);
        }, 1500);
      }
    }
  };

  useEffect(() => {
    if (!isDeepArLoading) {
      processImage(deepAr, selectedImageData as ImageData, 10);
    }
  }, [isDeepArLoading]);

  useDebounceEffect(
    () => {
      groupSimulationImages();
    },
    500,
    [selectedModelImage]
  );

  if (isModelLoading) {
    return <Loader />;
  }

  return (
    <Theme style={{ height: "100%" }} darkMode>
      <SiteWrapper>
        <FlexGroup column style={{ height: "100%" }} gap={0}>
          <Header
            breadCrumbsItems={[
              {
                title: (
                  <ButtonText
                    onClick={async () => {
                      await shutdown(deepAr);

                      navigate(ROUTES.EDIT_SIMULATION_BY_ID(id as string));
                    }}
                  >
                    <FlexGroup centerY>
                      <IconSprite
                        iconName={"pagination/arrow-left"}
                        style={{ width: 16, height: 16 }}
                      />

                      <Paragraph>Back to editing</Paragraph>
                    </FlexGroup>
                  </ButtonText>
                )
              }
            ]}
            middleItem={
              <Paragraph color={theme.colors.white}>Simulator</Paragraph>
            }
            actionButton={
              <FlexGroup compact>
                <ButtonPrimaryOutlined
                  onClick={() => {
                    navigate(
                      ROUTES.VIEW_PATIENT_BY_ID(model?.patient as string)
                    );
                  }}
                >
                  Patient profile
                </ButtonPrimaryOutlined>

                {isSettingsHidden && (
                  <>
                    <Sidebar.MenuButton onClick={toggleShowSettings}>
                      <IconSprite
                        style={{ width: 26, height: 26 }}
                        iconName="button/menu"
                      />
                    </Sidebar.MenuButton>

                    <Navigation
                      menuOpen={showSettings}
                      toggleMenuOpen={toggleShowSettings}
                      contentWrapperStyle={{ width: "auto" }}
                      bodyStyle={{ padding: 0 }}
                      element={
                        <SimulationProcessSettings
                          showSettings={showSettings}
                          isGenerating={isGenerating}
                          showSavedSimulationSettings={
                            showSavedSimulationSettings
                          }
                          setShowSavedSimulationSettings={
                            setShowSavedSimulationSettings
                          }
                        />
                      }
                    />
                  </>
                )}
              </FlexGroup>
            }
          />

          <SimulatorContext.Provider
            value={{
              deepAr,
              canvasRef,
              model,
              accuracy,
              setAccuracy,
              resolution,
              setResolution,
              simulationAmount,
              setSimulationAmount,
              prompt,
              setPrompt,
              seed,
              setSeed,
              negativePrompt,
              setNegativePrompt,
              hairTreatment,
              setHairTreatment,
              generatedSimulations,
              setGeneratedSimulations,
              simulationsHistory,
              isSavedSimulation,
              setIsSavedSimulation,
              processedSimulation,
              setProcessedSimulation,
              selectedModelImage,
              handleGenerateVariants,
              simulationsHistoryLength,
              isGeneratingVariants,
              faceId,
              isGenerationMode,
              setIsGenerationMode,
              loadedSimulations,
              setLoadedSimulations,
              faceImages,
              handleResetSettings,
              selectedImageData,
              setSelectedImageData
            }}
          >
            <SimulationProcessBody spread gap={0}>
              <StyledSimulationSidebar justifyContent={"start"} column center>
                <GalleryImageContainer
                  galleryImages={galleryImages}
                  setSelectedImageData={setSelectedImageData}
                  setGalleryImages={setGalleryImages}
                  selectedImageId={selectedImageId}
                  setSelectedImageId={setSelectedImageId}
                  initialImages={patientSimulationImages}
                  onSwitchPhoto={() => {
                    setLoadedSimulations([]);

                    setProcessedSimulation(null);

                    setGeneratedSimulations({
                      createdAt: new Date().toString(),
                      simulations: []
                    } as GeneratedSimulation);

                    simulationsHistory?.history?.splice(0, Infinity);
                    simulationsHistory?.go(0);

                    queryClient.invalidateQueries({
                      predicate: (query) =>
                        query.queryKey.includes(
                          API_SERVICES.MODEL.invalidationKey
                        )
                    });
                  }}
                />
              </StyledSimulationSidebar>

              <FlexGroup gap={0}>
                <SimulationProcessMain
                  className={"simulation-variations__wrapper"}
                >
                  <SimulationProcessWrapper
                    column
                    gap={20}
                    style={{ position: "relative" }}
                  >
                    <SimulationProcessOriginal
                      modelImage={selectedModelImage}
                    />

                    <DeepArCanvas
                      deepAr={deepAr}
                      isDeepArLoading={isDeepArLoading}
                      imageData={selectedImageData}
                      ref={canvasRef}
                      className={"visually-hidden"}
                    />
                  </SimulationProcessWrapper>

                  <SimulationProcessVariations
                    setShowSettings={toggleShowSettings}
                    isGenerating={isGenerating}
                    setIsGenerating={setIsGenerating}
                    model={model as Model}
                    setShowSavedSimulationSettings={
                      setShowSavedSimulationSettings
                    }
                  />
                </SimulationProcessMain>

                {!isSettingsHidden && (
                  <SimulationProcessSettings
                    showSettings={showSettings && !isSettingsHidden}
                    isGenerating={isGenerating}
                    showSavedSimulationSettings={showSavedSimulationSettings}
                    setShowSavedSimulationSettings={
                      setShowSavedSimulationSettings
                    }
                  />
                )}
              </FlexGroup>
            </SimulationProcessBody>
          </SimulatorContext.Provider>
        </FlexGroup>
      </SiteWrapper>
    </Theme>
  );
};
