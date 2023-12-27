import React, { createContext } from "react";
import { DeepAR } from "deepar";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { ModelImage } from "@services/ModelImage/interfaces/ModelImage.interface";
import { Model } from "@services/Model/interfaces/Model.interface";
import { GeneratedSimulation } from "@features/simulator/interfaces/GeneratedSimulation.interface";

import { FaceImage } from "@features/simulator/interfaces/FaceImage.interface";

import { SIMULATOR_DEFAULT_SETTINGS } from "@config/constants";

import { HistoryState } from "../../interfaces/historyState.interface";

interface ISimulatorContext {
  model?: Model | null;
  accuracy: number;
  setAccuracy: React.Dispatch<React.SetStateAction<number>>;
  resolution: number;
  setResolution: React.Dispatch<React.SetStateAction<number>>;
  simulationAmount: number;
  setSimulationAmount: React.Dispatch<React.SetStateAction<number>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  seed: number | null;
  setSeed: React.Dispatch<React.SetStateAction<number | null>>;
  negativePrompt: string;
  setNegativePrompt: React.Dispatch<React.SetStateAction<string>>;
  hairTreatment: string;
  setHairTreatment: React.Dispatch<React.SetStateAction<string>>;
  generatedSimulations?: GeneratedSimulation;
  setGeneratedSimulations?: React.Dispatch<
    React.SetStateAction<GeneratedSimulation | undefined>
  >;
  simulationsHistory?: HistoryState<GeneratedSimulation | undefined>;
  isSavedSimulation: boolean;
  setIsSavedSimulation: React.Dispatch<React.SetStateAction<boolean>>;
  processedSimulation: ModelSimulation | null;
  setProcessedSimulation: React.Dispatch<
    React.SetStateAction<ModelSimulation | null>
  >;
  selectedModelImage: ModelImage | undefined;
  handleGenerateVariants: () => void;
  simulationsHistoryLength: number;
  isGeneratingVariants: boolean;
  faceId?: string;
  isGenerationMode: boolean;
  setIsGenerationMode: React.Dispatch<React.SetStateAction<boolean>>;
  loadedSimulations: string[];
  setLoadedSimulations: React.Dispatch<React.SetStateAction<string[]>>;
  faceImages: FaceImage[];
  handleResetSettings: () => void;
  deepAr?: React.MutableRefObject<DeepAR | null>;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  selectedImageData: ImageData | undefined;
  setSelectedImageData: React.Dispatch<
    React.SetStateAction<ImageData | undefined>
  >;
}

const DEFAULT_SIMULATOR_STORAGE: ISimulatorContext = {
  model: null,
  accuracy: SIMULATOR_DEFAULT_SETTINGS.accuracy,
  setAccuracy: () => {},
  resolution: SIMULATOR_DEFAULT_SETTINGS.resolution,
  setResolution: () => {},
  simulationAmount: SIMULATOR_DEFAULT_SETTINGS.simulationAmount,
  setSimulationAmount: () => {},
  prompt: SIMULATOR_DEFAULT_SETTINGS.prompt,
  setPrompt: () => {},
  seed: SIMULATOR_DEFAULT_SETTINGS.seed,
  setSeed: () => {},
  negativePrompt: SIMULATOR_DEFAULT_SETTINGS.negativePrompt,
  setNegativePrompt: () => {},
  hairTreatment: SIMULATOR_DEFAULT_SETTINGS.hairTreatment,
  setHairTreatment: () => {},
  generatedSimulations: undefined,
  setGeneratedSimulations: () => {},
  simulationsHistory: {
    history: [],
    position: 0,
    capacity: 0,
    back: () => {},
    forward: () => {},
    go: () => {}
  },
  isSavedSimulation: false,
  setIsSavedSimulation: () => {},
  processedSimulation: null,
  setProcessedSimulation: () => {},
  selectedModelImage: undefined,
  handleGenerateVariants: () => {},
  simulationsHistoryLength: 0,
  isGeneratingVariants: false,
  faceId: "",
  isGenerationMode: false,
  setIsGenerationMode: () => {},
  loadedSimulations: [],
  setLoadedSimulations: () => {},
  faceImages: [],
  handleResetSettings: () => {},
  selectedImageData: undefined,
  setSelectedImageData: () => {}
};

export const SimulatorContext = createContext<ISimulatorContext>(
  DEFAULT_SIMULATOR_STORAGE
);
