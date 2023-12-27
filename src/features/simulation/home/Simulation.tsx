import { useTheme } from "styled-components";
import { useUpdateEffect } from "react-use";

import { useNavigate, useParams } from "react-router-dom";
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { InputRef } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { ModelImage } from "@services/ModelImage/interfaces/ModelImage.interface";
import { Model } from "@services/Model/interfaces/Model.interface";
import { useToggle } from "@hooks/useToggle";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useDeepAr } from "@hooks/useDeepAr";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { useUpdateModelImageMutation } from "@hooks/query/modelImage/useUpdateModelImageMutation";
import { useUpdateModelMutation } from "@hooks/query/model/useUpdateModelMutation";
import { useUpdateModelFieldsMutation } from "@hooks/query/model/useUpdateModelFieldsMutation";
import { useGetModelByIdQuery } from "@hooks/query/model/useGetModelByIdQuery";
import { useGetUploadedImage } from "@hooks/query/image/useGetUploadedImage";
import { useGetImagesUrlsQuery } from "@hooks/query/image/useGetImagesUrlsQuery";
import { Toast } from "@helpers/toast";
import { normalizeSliderValue } from "@helpers/deepar/normalizeValue";
import { getMaterialPath } from "@helpers/deepar/getMaterialPath";
import { getEffectPath } from "@helpers/deepar/getEffectPath";
import { ConditionalWrapper } from "@helpers/conditionalWrapper";
import { StyledSimulationSidebar } from "@features/simulation/home/styled/SimulationSidebar.styled";
import { SimulationCanvasWrapper } from "@features/simulation/home/styled/SimulationCanvasWrapper.styled";
import { SimulationBody } from "@features/simulation/home/styled/SimulationBody.styled";
import { SimulationPositionControls } from "@features/simulation/home/components/SimulationPositionControls/SimulationPositionControls";
import { SimulationControls } from "@features/simulation/home/components/SimulationControls/SimulationControls";
import { SimulationCanvasControlsWrapper } from "@features/simulation/home/components/SimulationCanvasControlsWrapper/SimulationCanvasControlsWrapper";
import { ModelInput } from "@features/simulation/home/components/Header/styled/ModelInput.styled";
import { Header } from "@features/simulation/home/components/Header/styled/Header.styled";
import {
  changeEffectColor,
  changeEffectVisibility,
  changeHairline,
  changeLighting,
  changeMaterial,
  changePosition,
  changeRotate,
  changeScale,
  changeSectionVolumeForSlot,
  processImage,
  switchEffect,
  takeScreenshot
} from "@config/deepar";
import {
  API_SERVICES,
  DEFAULT_ROTATE_SLIDER,
  DEFAULT_SECTION_VOLUME,
  DEFAULT_TRANSLATE_SLIDER,
  HAIRLINE_SLIDER,
  ROUTES,
  SIMULATION_HAIR_STYLE,
  SIMULATION_HAIR_TYPES,
  SIMULATION_SECTION_VOLUME_TYPE,
  SimulationHairOption,
  SimulationSectionVolume,
  DEFAULT_SCALE_SLIDER,
  DEFAULT_LIGHTING_SLIDER,
  CLINIC_STORAGE_KEY,
  LIGHTING_BRIGHTNESS_SLIDER,
  TRANSLATE_SLIDER,
  ROTATE_SLIDER,
  SCALE_SLIDER,
  LIGHTING_AXIS_SLIDER
} from "@config/constants";
import { Theme } from "@components/Theme/Theme";
import { Spinner } from "@components/Spinner/styled/Spinner.styled";
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
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

import {
  SimulationLightingSettings,
  SimulationModelSettings,
  SimulationRotateSettings,
  SimulationScaleSettings,
  SimulationTranslateSettings
} from "../../../interfaces/simulationSettings.interface";
import { IImage } from "../../../interfaces/image.interface";
import { DeepAr } from "../../../interfaces/deepAr.interface";
import { SimulationSettings } from "./components/SimulationControls/SimulationSettingsContext";

export const Simulation = () => {
  const { id } = useParams() as { id: string };
  const { data: model, isLoading: isModelLoading } = useGetModelByIdQuery(id);
  const updateModelMutation = useUpdateModelMutation();
  const updateModelImageMutation = useUpdateModelImageMutation();

  const [selectedImageData, setSelectedImageData] = useState<ImageData>();
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { deepAr, loading } = useDeepAr(canvasRef);

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

  const [galleryImages, setGalleryImages] = useState<IImage[]>([]);

  useUpdateEffect(() => {
    setGalleryImages(patientSimulationImages);
  }, [patientSimulationImages]);

  const [isLoadingImageData, setIsLoadingImageData] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState("");

  const selectedModelImage = useMemo(() => {
    return model?.modelImages?.find(
      (modelImage) => modelImage.image === selectedImageId
    ) as ModelImage;
  }, [model, selectedImageId]);

  const [modelName, setModelName] = useState(model?.name);
  useEffect(() => {
    setModelName(model?.name);
  }, [model]);

  const inputRef = React.useRef<InputRef>(null);

  // Hair color settings
  const [color, setColor] = useState("#000");
  // const [toneColor, setToneColor] = useState("#B28356");
  // const [shine, setShine] = useState(50);
  // const [saltAndPepper, setSaltAndPepper] = useState(50);
  // const [ombreColor, setOmbreColor] = useState("#9F6C3A");
  // const [ombreShift, setOmbreShift] = useState(50);

  // Hair type settings
  const [hairType, setHairType] = useState<SimulationHairOption | undefined>(
    SIMULATION_HAIR_TYPES[0]
  );
  // const [thickness, setThickness] = useState<SimulationHairOption>(
  //   SIMULATION_HAIR_THICKNESS[0]
  // );

  // Hairstyle settings
  const [hairStyle, setHairStyle] = useState<SimulationHairOption | undefined>(
    SIMULATION_HAIR_STYLE[0]
  );

  // Hair and section volume settings
  const [hairLine, setHairLine] = useState<number>(HAIRLINE_SLIDER.default);
  const [sectionVolumeType, setSectionVolumeType] =
    useState<SimulationHairOption>(
      SIMULATION_SECTION_VOLUME_TYPE[0] as SimulationHairOption
    );
  const [sectionVolume, setSectionVolume] = useState<SimulationSectionVolume>(
    DEFAULT_SECTION_VOLUME
  );
  const [hairVolume, setHairVolume] = useState<number>(
    sectionVolume?.r1 + sectionVolume?.r2 + sectionVolume?.r3
  );

  const updateModelFieldsMutation = useUpdateModelFieldsMutation();

  const isUpdatingFirstTime = useRef(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const isTriggeringRedoUndo = useRef(false);
  const isSwitchingGalleryImage = useRef(false);
  const isUpdatingHistory = useRef(false);

  const theme = useTheme();

  const isSettingsHidden = useMediaQuery(
    `(max-width: ${theme.breakpoints.md})`
  );
  const [showSettings, toggleShowSettings] = useToggle(false);

  // Position & Lighting settings
  const [translate, setTranslate] = useState<SimulationTranslateSettings>(
    DEFAULT_TRANSLATE_SLIDER
  );
  const [rotate, setRotate] = useState<SimulationRotateSettings>(
    DEFAULT_ROTATE_SLIDER
  );
  const [scale, setScale] =
    useState<SimulationScaleSettings>(DEFAULT_SCALE_SLIDER);
  const [lighting, setLighting] = useState<SimulationLightingSettings>(
    DEFAULT_LIGHTING_SLIDER
  );

  const [effectVisible, toggleEffectVisible] = useState(true);

  const getUploadedPatientImage = useGetUploadedImage(false);
  const [isGeneratingSimulations, setIsGeneratingSimulations] = useState(false);

  const queryClient = useQueryClient();

  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<
    number | undefined
  >(model?.effect_settings?.historyIndex);

  const handleChangeEffect = async (
    deepAr: MutableRefObject<DeepAr | null> | null,
    modelState?: SimulationModelSettings
  ) => {
    if (deepAr && effectVisible) {
      const modelStyle = SIMULATION_HAIR_STYLE.find(
        (style) => style.value === modelState?.hairStyle
      );
      const modelType = SIMULATION_HAIR_TYPES.find(
        (type) => type.value === modelState?.hairType
      );

      await Promise.all(
        [1, 2, 3].map((slotInd) => {
          return switchEffect(
            deepAr,
            getEffectPath({
              style: modelStyle ?? hairStyle,
              type: modelType ?? hairType,
              slotInd: slotInd
            }),
            slotInd
          );
        })
      );

      const lightningSettings =
        selectedModelImage.lightning_settings ?? lighting;
      const positionSettings = selectedModelImage.position_settings ?? {
        translate,
        rotate,
        scale
      };

      const convertedHairline = normalizeSliderValue(
        positionSettings?.hairLine ?? HAIRLINE_SLIDER.default,
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
        modelState?.color ?? color,
        extendedModelState?.lighting?.brightness ??
          LIGHTING_BRIGHTNESS_SLIDER?.default
      );

      changePosition(
        deepAr,
        extendedModelState?.translate?.x ?? TRANSLATE_SLIDER?.default,
        extendedModelState?.translate?.y ?? TRANSLATE_SLIDER?.default,
        extendedModelState?.translate?.z ?? TRANSLATE_SLIDER?.default
      );
      changeRotate(
        deepAr,
        extendedModelState?.rotate?.x ?? ROTATE_SLIDER?.default,
        extendedModelState?.rotate?.y ?? ROTATE_SLIDER?.default
      );
      changeScale(
        deepAr,
        extendedModelState?.scale?.x ?? SCALE_SLIDER?.default,
        extendedModelState?.scale?.y ?? SCALE_SLIDER?.default,
        extendedModelState?.scale?.z ?? SCALE_SLIDER?.default
      );
      changeLighting(
        deepAr,
        selectedImageData as ImageData,
        extendedModelState?.lighting?.x ?? LIGHTING_AXIS_SLIDER?.default,
        extendedModelState?.lighting?.y ?? LIGHTING_AXIS_SLIDER?.default,
        extendedModelState?.lighting?.z ?? LIGHTING_AXIS_SLIDER?.default
      );

      Object.values(modelState?.sectionVolume ?? sectionVolume).map(
        (volume, sectionInd) =>
          changeSectionVolumeForSlot(deepAr, selectedImageData as ImageData, {
            hairStyle: modelStyle ?? hairStyle,
            hairType: modelType ?? hairType,
            slotInd: sectionInd + 1,
            volume: volume
          })
      );
    }
  };

  const handleUpdateModelMutation = async (
    newModelState: SimulationModelSettings
  ) => {
    isUpdatingHistory.current = true;

    const historyIndex = Number.isInteger(model?.effect_settings?.historyIndex)
      ? (model?.effect_settings?.historyIndex as number)
      : 0;

    const saveHistoryIndex = currentHistoryIndex || historyIndex;

    const effectSettings =
      model?.effect_settings?.history?.slice(0, saveHistoryIndex) || [];

    setCurrentHistoryIndex(saveHistoryIndex + 1);

    return new Promise((resolve) => {
      updateModelFieldsMutation(
        {
          id: model?.id,
          effect_settings: {
            historyIndex: saveHistoryIndex + 1,
            history: [...effectSettings, newModelState]
            // historyIndex: 0,
            // history: []
          }
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              isUpdatingHistory.current = false;
            }, 5000);
            resolve(true);
          },
          onError: () => {
            resolve(false);
          }
        }
      );
    });
  };

  const handleUpdateModelImageMutation = async (newModelImage: ModelImage) => {
    return new Promise((resolve) => {
      updateModelImageMutation(
        {
          ...newModelImage
        },
        {
          onSuccess: () => {
            resolve(true);
          },
          onError: () => {
            resolve(false);
          }
        }
      );
    });
  };

  const updateModelChangeHistory = async () => {
    return new Promise(async (resolve) => {
      if (isTriggeringRedoUndo.current) {
        isTriggeringRedoUndo.current = false;
        return resolve(true);
      }

      const newModelState: SimulationModelSettings = {
        color,
        // toneColor,
        // shine,
        // saltAndPepper,
        // ombreColor,
        // ombreShift,
        // thickness: thickness.value,
        hairType: hairType?.value,
        hairStyle: hairStyle?.value,
        hairVolume: hairVolume,
        sectionVolume: sectionVolume,
        sectionVolumeType: sectionVolumeType.value
        // lighting,
        // translate,
        // rotate,
        // scale,
        // hairLine
      };

      await handleUpdateModelImageMutation({
        ...selectedModelImage,
        lightning_settings: {
          lighting
        },
        position_settings: {
          translate,
          rotate,
          scale,
          hairLine
        }
      });

      await handleUpdateModelMutation(newModelState);

      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(API_SERVICES.MODEL.invalidationKey)
      });

      resolve(true);
    });
  };

  const triggerChangeModel = async (
    immediate = false,
    redoUndoHistoryIndex?: number
  ) => {
    return new Promise((resolve) => {
      const modelState = model?.effect_settings?.history?.at(
        (redoUndoHistoryIndex ||
          currentHistoryIndex ||
          model?.effect_settings?.historyIndex) - 1
      );

      processImage(deepAr, selectedImageData as ImageData);

      const lightningSettings = selectedModelImage.lightning_settings;
      const positionSettings = selectedModelImage.position_settings;

      if (
        effectVisible &&
        modelState &&
        (immediate ||
          color !== modelState?.color ||
          // toneColor !== modelState?.toneColor ||
          // shine !== modelState?.shine ||
          // saltAndPepper !== modelState?.saltAndPepper ||
          // ombreColor !== modelState?.ombreColor ||
          // ombreShift !== modelState?.ombreShift ||
          // thickness.value !== modelState?.thickness ||
          hairType?.value !== modelState?.hairType ||
          hairStyle?.value !== modelState?.hairStyle ||
          hairVolume !== modelState?.hairVolume ||
          sectionVolumeType.value !== modelState?.sectionVolumeType ||
          sectionVolume.r1 !== modelState?.sectionVolume.r1 ||
          sectionVolume.r2 !== modelState?.sectionVolume.r2 ||
          sectionVolume.r3 !== modelState?.sectionVolume.r3 ||
          hairLine !== positionSettings?.hairLine ||
          translate.x !== positionSettings?.translate.x ||
          translate.y !== positionSettings?.translate.y ||
          translate.z !== positionSettings?.translate.z ||
          rotate.x !== positionSettings?.rotate.x ||
          rotate.y !== positionSettings?.rotate.y ||
          rotate.z !== positionSettings?.rotate.z ||
          scale.x !== positionSettings?.scale.x ||
          scale.y !== positionSettings?.scale.y ||
          scale.z !== positionSettings?.scale.z ||
          scale.all !== positionSettings?.scale.all ||
          lighting.x !== lightningSettings?.lighting.x ||
          lighting.x !== lightningSettings?.lighting.y ||
          lighting.x !== lightningSettings?.lighting.z ||
          lighting.brightness !== lightningSettings?.lighting.brightness)
      ) {
        setColor(modelState?.color);
        // setToneColor(modelState.toneColor);
        // setShine(modelState.shine);
        // setSaltAndPepper(modelState.saltAndPepper);
        // setOmbreColor(modelState.ombreColor);
        // setOmbreShift(modelState.ombreShift);
        // setThickness(
        //   SIMULATION_HAIR_THICKNESS.find(
        //     (type) => type.value === modelState?.thickness
        //   ) as SimulationHairOption
        // );
        setHairType(
          (SIMULATION_HAIR_TYPES.find(
            (type) => type.value === modelState?.hairType
          ) as SimulationHairOption) ?? SIMULATION_HAIR_TYPES[0]
        );
        setHairStyle(
          (SIMULATION_HAIR_STYLE.find(
            (style) => style.value === modelState?.hairStyle
          ) as SimulationHairOption) ?? SIMULATION_HAIR_STYLE[0]
        );
        setSectionVolumeType(
          SIMULATION_SECTION_VOLUME_TYPE.find(
            (volume) => volume.value === modelState?.sectionVolumeType
          ) as SimulationHairOption
        );
        setHairVolume(modelState?.hairVolume);
        setSectionVolume({
          r1: modelState?.sectionVolume?.r1,
          r2: modelState?.sectionVolume?.r2,
          r3: modelState?.sectionVolume?.r3
        });

        setHairLine(positionSettings?.hairLine || HAIRLINE_SLIDER.default);
        setTranslate(positionSettings?.translate || DEFAULT_TRANSLATE_SLIDER);
        setScale(positionSettings?.scale || DEFAULT_SCALE_SLIDER);
        setRotate(positionSettings?.rotate || DEFAULT_ROTATE_SLIDER);
        setLighting(lightningSettings?.lighting || DEFAULT_LIGHTING_SLIDER);
      }

      resolve(true);
    });
  };

  const updateHistory = async () => {
    await updateModelChangeHistory();
  };

  const changeModelEffectCallback = async (
    modelState?: SimulationModelSettings
  ) => {
    await handleChangeEffect(deepAr, modelState);

    updateHistory();
  };

  const changePositionLightingSettings = async (
    modelImage: ModelImage,
    imageData: ImageData
  ) => {
    return new Promise(async (resolve) => {
      const lightningSettings = modelImage?.lightning_settings;
      const positionSettings = modelImage?.position_settings;

      const convertedHairline = normalizeSliderValue(
        positionSettings?.hairLine ?? HAIRLINE_SLIDER.default,
        HAIRLINE_SLIDER
      );

      changeHairline(deepAr, imageData as ImageData, convertedHairline);
      changeEffectColor(
        deepAr,
        imageData as ImageData,
        color,
        lightningSettings?.lighting?.brightness ??
          LIGHTING_BRIGHTNESS_SLIDER.default
      );

      changePosition(
        deepAr,
        positionSettings?.translate?.x ?? TRANSLATE_SLIDER.default,
        positionSettings?.translate?.y ?? TRANSLATE_SLIDER.default,
        positionSettings?.translate?.z ?? TRANSLATE_SLIDER.default
      );
      changeRotate(
        deepAr,
        positionSettings?.rotate?.x ?? ROTATE_SLIDER.default,
        positionSettings?.rotate?.y ?? ROTATE_SLIDER.default,
        positionSettings?.rotate?.z ?? ROTATE_SLIDER.default
      );

      changeScale(
        deepAr,
        positionSettings?.scale?.x ?? SCALE_SLIDER.default,
        positionSettings?.scale?.y ?? SCALE_SLIDER.default,
        positionSettings?.scale?.z ?? SCALE_SLIDER.default
      );
      changeLighting(
        deepAr,
        imageData as ImageData,
        lightningSettings?.lighting?.x ?? LIGHTING_AXIS_SLIDER.default,
        lightningSettings?.lighting?.y ?? LIGHTING_AXIS_SLIDER.default,
        lightningSettings?.lighting?.z ?? LIGHTING_AXIS_SLIDER.default
      );

      Object.values(sectionVolume).map((volume, sectionInd) =>
        changeMaterial(
          deepAr,
          imageData as ImageData,
          getMaterialPath({
            style: hairStyle,
            type: hairType,
            material: `${volume}.png`
          }),
          sectionInd + 1
        )
      );

      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };

  useUpdateEffect(() => {
    if (
      !loading &&
      effectVisible &&
      hairType &&
      hairStyle &&
      !isUpdatingFirstTime.current
    ) {
      handleChangeEffect(deepAr);
    }
  }, [hairType, hairStyle]);

  useUpdateEffect(() => {
    if (!loading && effectVisible && !isUpdatingFirstTime.current) {
      const convertedHairline = normalizeSliderValue(hairLine, HAIRLINE_SLIDER);

      changeHairline(deepAr, selectedImageData as ImageData, convertedHairline);
    }
  }, [hairLine]);

  useUpdateEffect(() => {
    if (
      !loading &&
      effectVisible &&
      translate &&
      !isUpdatingFirstTime.current
    ) {
      changePosition(deepAr, translate.x, translate.y, translate.z);
    }
  }, [translate?.x, translate?.y, translate?.z]);

  useUpdateEffect(() => {
    if (!loading && effectVisible && rotate && !isUpdatingFirstTime.current) {
      changeRotate(deepAr, rotate.x, rotate.y, rotate.z);
    }
  }, [rotate?.x, rotate?.y, rotate?.z]);

  useUpdateEffect(() => {
    if (!loading && effectVisible && lighting && !isUpdatingFirstTime.current) {
      changeLighting(
        deepAr,
        selectedImageData as ImageData,
        lighting.x,
        lighting.y,
        lighting.z
      );
    }
  }, [lighting?.x, lighting?.y, lighting?.z]);

  useUpdateEffect(() => {
    if (!loading && effectVisible && scale && !isUpdatingFirstTime.current) {
      changeScale(deepAr, scale.x, scale.y, scale.z);
    }
  }, [scale?.x, scale?.y, scale?.z]);

  useUpdateEffect(() => {
    if (
      !loading &&
      effectVisible &&
      color &&
      lighting &&
      !isUpdatingFirstTime.current
    ) {
      changeEffectColor(
        deepAr,
        selectedImageData as ImageData,
        color,
        lighting.brightness
      );
    }
  }, [color, lighting?.brightness]);

  useUpdateEffect(() => {
    if (
      !loading &&
      effectVisible &&
      sectionVolume &&
      !isUpdatingFirstTime.current
    ) {
      changeSectionVolumeForSlot(deepAr, selectedImageData as ImageData, {
        hairStyle,
        hairType,
        slotInd: 1,
        volume: sectionVolume.r1
      });
    }
  }, [sectionVolume?.r1]);

  useUpdateEffect(() => {
    if (
      !loading &&
      effectVisible &&
      sectionVolume &&
      !isUpdatingFirstTime.current
    ) {
      changeSectionVolumeForSlot(deepAr, selectedImageData as ImageData, {
        hairStyle,
        hairType,
        slotInd: 2,
        volume: sectionVolume.r2
      });
    }
  }, [sectionVolume?.r2]);

  useUpdateEffect(() => {
    if (
      !loading &&
      effectVisible &&
      sectionVolume &&
      !isUpdatingFirstTime.current
    ) {
      changeSectionVolumeForSlot(deepAr, selectedImageData as ImageData, {
        hairStyle,
        hairType,
        slotInd: 3,
        volume: sectionVolume.r3
      });
    }
  }, [sectionVolume?.r3]);

  useDebounceEffect(
    () => {
      if (
        !loading &&
        !isUpdatingFirstTime.current &&
        effectVisible &&
        !isGeneratingSimulations
      ) {
        updateHistory();
      }
    },
    1000,
    [
      color,
      hairType,
      hairStyle,
      hairLine,
      scale,
      lighting?.x,
      lighting?.y,
      lighting?.z,
      lighting?.brightness,
      scale?.x,
      scale?.y,
      scale?.z,
      scale?.all,
      translate?.x,
      translate?.y,
      translate?.z,
      rotate?.x,
      rotate?.y,
      rotate?.z,
      sectionVolume?.r1,
      sectionVolume?.r2,
      sectionVolume?.r3
    ]
  );

  useUpdateEffect(() => {
    changeEffectVisibility(deepAr, effectVisible);
  }, [effectVisible]);

  const handleUpdateModelImage = async (payload: ModelImage) => {
    return new Promise((resolve) => {
      updateModelImageMutation(payload, {
        onSuccess: () => {
          // Toast.success("Model image has been updated");
          resolve(true);
        },
        onError: () => {
          resolve(false);
        }
      });
    });
  };

  const handleTriggerRedoUndo = async (redoUndoIndex: number): Promise<any> => {
    if (!loading && !isUpdatingFirstTime.current) {
      console.log("Triggering redo/undo...");
      isTriggeringRedoUndo.current = true;

      await triggerChangeModel(false, redoUndoIndex);
    }
  };

  const handleInitialModelLoading = async () => {
    if (
      !loading &&
      !isModelLoading &&
      selectedImageId &&
      !isGeneratingSimulations
    ) {
      console.log("Initial model loading...");
      isUpdatingFirstTime.current = true;

      if (
        !model?.effect_settings ||
        model?.effect_settings?.history?.length === 0
      ) {
        await changeModelEffectCallback();
        await updateModelChangeHistory();
      } else {
        const modelState = model?.effect_settings?.history?.at(
          model?.effect_settings?.historyIndex - 1
        );

        await handleChangeEffect(deepAr, modelState);
      }

      await triggerChangeModel(true);

      setTimeout(() => {
        isUpdatingFirstTime.current = false;
        setIsInitialLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    handleInitialModelLoading();
  }, [loading, selectedImageId]);

  const handleGenerateSimulations = async () => {
    setIsGeneratingSimulations(true);

    updateModelMutation({
      ...model,
      id: model?.id as string,
      name: modelName || model?.name || ""
    });

    const uploadedFaces: {
      id: string;
      face: string;
    }[] = [];

    const activeModelsImages =
      model?.modelImages?.filter((modelImage) => modelImage.is_active) || [];

    for (const modelImage of activeModelsImages) {
      const imageData = galleryImages.find(
        (galleryImage) => galleryImage.id === modelImage.image
      )?.imageData as ImageData;

      changeEffectVisibility(deepAr, true);

      await processImage(deepAr, imageData, 2);

      await changePositionLightingSettings(modelImage, imageData);

      await processImage(deepAr, imageData, 2);

      const simulationImage = await takeScreenshot(deepAr);

      const uploadedMask = await getUploadedPatientImage({
        image: simulationImage?.props.src as string,
        clinic: localStorage.getItem(CLINIC_STORAGE_KEY) as string
      });

      uploadedFaces.push({
        id: modelImage.image,
        face: uploadedMask?.id as string
      });

      changeEffectVisibility(deepAr, false);

      const originalImage = await takeScreenshot(deepAr);

      const uploadedOriginalImage = await getUploadedPatientImage({
        image: originalImage?.props.src as string,
        clinic: localStorage.getItem(CLINIC_STORAGE_KEY) as string
      });

      await handleUpdateModelImage({
        ...modelImage,
        image: uploadedOriginalImage?.id,
        face: uploadedMask?.id
      });
    }

    await queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey.includes(API_SERVICES.MODEL.invalidationKey)
    });

    setTimeout(() => {
      navigate(ROUTES.PROCESS_SIMULATION_BY_ID(id as string), {
        state: {
          isGenerationMode: true,
          modelImages: uploadedFaces
        }
      });
      setIsGeneratingSimulations(false);
    }, 1000);
  };

  useEffect(() => {
    if (!isModelLoading && !currentHistoryIndex) {
      setCurrentHistoryIndex(model?.effect_settings?.historyIndex);
    }
  }, [isModelLoading]);

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
                    color={"dovegray"}
                    $hoverColor={theme.colors.malibuLight}
                    onClick={() =>
                      navigate(
                        ROUTES.VIEW_PATIENT_BY_ID(model?.patient as string)
                      )
                    }
                  >
                    <FlexGroup centerY>
                      <IconSprite
                        iconName={"pagination/arrow-left"}
                        style={{ width: 16, height: 16 }}
                      />

                      <Paragraph>Profile</Paragraph>
                    </FlexGroup>
                  </ButtonText>
                )
              }
            ]}
            middleItem={
              <ModelInput
                onChange={(e: any) => {
                  setModelName(e.target.value);
                }}
                label={"Model name:"}
                name={"model"}
                placeholder={"Enter title"}
                value={modelName}
                suffix={
                  <ButtonText
                    color={!modelName ? "dovegray" : "malibuLight"}
                    onClick={() => {
                      updateModelFieldsMutation(
                        {
                          id: model?.id as string,
                          name: modelName || model?.name || ""
                        },
                        {
                          onSuccess: () => {
                            Toast.success(
                              "Model name has been updated successfully"
                            );
                          }
                        }
                      );
                    }}
                  >
                    save
                  </ButtonText>
                }
                hLabel
              />
            }
            actionButton={
              <FlexGroup compact>
                <FlexGroup className="header-buttons__group" compact>
                  {selectedModelImage?.simulations?.length > 0 && (
                    <ButtonPrimaryOutlined
                      onClick={() => {
                        navigate(
                          ROUTES.PROCESS_SIMULATION_BY_ID(id as string),
                          {
                            state: {
                              isGenerationMode: false,
                              modelImages: model?.modelImages?.map(
                                (modelImage) => ({
                                  id: modelImage.id,
                                  face: modelImage.face
                                })
                              )
                            }
                          }
                        );
                      }}
                    >
                      Go to simulator
                    </ButtonPrimaryOutlined>
                  )}

                  <ButtonPrimary
                    style={{ width: "auto" }}
                    onClick={handleGenerateSimulations}
                  >
                    Send to Simulator
                  </ButtonPrimary>
                </FlexGroup>

                {isSettingsHidden && (
                  <FlexGroup compact>
                    <>
                      <Sidebar.MenuButton onClick={toggleShowSettings}>
                        <IconSprite
                          style={{ width: 26, height: 26 }}
                          iconName="button/menu"
                        />
                      </Sidebar.MenuButton>
                    </>
                  </FlexGroup>
                )}
              </FlexGroup>
            }
          />

          <SimulationBody spread gap={0}>
            <StyledSimulationSidebar justifyContent={"start"} column center>
              <GalleryImageContainer
                galleryImages={galleryImages}
                setSelectedImageData={setSelectedImageData}
                selectedImageId={selectedImageId}
                setSelectedImageId={setSelectedImageId}
                setGalleryImages={setGalleryImages}
                initialImages={patientSimulationImages}
                isLoadingImageData={isLoadingImageData}
                setIsLoadingImageData={setIsLoadingImageData}
                onSwitchPhoto={() => {
                  isSwitchingGalleryImage.current = true;

                  setTimeout(() => {
                    isSwitchingGalleryImage.current = false;
                  }, 6000);
                }}
              />
            </StyledSimulationSidebar>

            <SimulationCanvasWrapper
              className={"deepar-canvas__container"}
              column
              compact
              gap={0}
            >
              <DeepArCanvas
                deepAr={deepAr}
                isDeepArLoading={loading}
                imageData={selectedImageData}
                ref={canvasRef}
              />

              {(isGeneratingSimulations ||
                isModelLoading ||
                modelImages?.length === 0) && <Loader />}

              {(isLoadingImageData || isInitialLoading) && <Spinner />}

              <SimulationCanvasControlsWrapper
                changesHistorySize={
                  model?.effect_settings?.history?.length || 0
                }
                currentModelState={currentHistoryIndex || 0}
                onChange={(historyIndex) => handleTriggerRedoUndo(historyIndex)}
                canvas={canvasRef.current}
                effectVisible={effectVisible}
                toggleEffectVisible={toggleEffectVisible}
                currentHistoryIndex={currentHistoryIndex}
                setCurrentHistoryIndex={setCurrentHistoryIndex}
                model={model as Model}
                isSwitchingGalleryImage={isSwitchingGalleryImage}
                isUpdatingHistory={isUpdatingHistory}
              />
            </SimulationCanvasWrapper>

            <ConditionalWrapper
              wrapper={(children) =>
                isSettingsHidden ? (
                  <>
                    <Navigation
                      menuOpen={showSettings}
                      placement={"bottom"}
                      toggleMenuOpen={toggleShowSettings}
                      contentWrapperStyle={{
                        width: "100vw",
                        height: 300
                      }}
                      bodyStyle={{ padding: 0 }}
                      element={children}
                      getContainer={false}
                    />
                  </>
                ) : (
                  <>{children}</>
                )
              }
            >
              <SimulationSettings.Provider
                value={{
                  inputRef,
                  deepAr,
                  selectedImageData,
                  color,
                  setColor,
                  // toneColor,
                  // setToneColor,
                  // shine,
                  // setShine,
                  // saltAndPepper,
                  // setSaltAndPepper,
                  // ombreColor,
                  // setOmbreColor,
                  // ombreShift,
                  // setOmbreShift,
                  // thickness,
                  // setThickness,
                  hairType,
                  setHairType,
                  hairStyle,
                  setHairStyle,
                  hairVolume,
                  setHairVolume,
                  sectionVolumeType,
                  setSectionVolumeType,
                  sectionVolume,
                  setSectionVolume,
                  hairLine,
                  setHairLine,
                  lighting,
                  setLighting,
                  translate,
                  setTranslate,
                  scale,
                  setScale,
                  rotate,
                  setRotate
                }}
              >
                <FlexGroup
                  style={{
                    flex: "1 0 300px",
                    backgroundColor: theme.background.dustyGray700,
                    border: `1px solid ${theme.colors.scorpion}`,
                    maxHeight: "calc(100vh - 71px)",
                    overflow: "auto"
                  }}
                  compact
                  column
                  spread
                >
                  <SimulationControls />

                  <SimulationPositionControls />
                </FlexGroup>
              </SimulationSettings.Provider>
            </ConditionalWrapper>
          </SimulationBody>
        </FlexGroup>
      </SiteWrapper>
    </Theme>
  );
};
