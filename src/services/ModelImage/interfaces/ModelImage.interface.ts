import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";

import { SimulatorSettings } from "@config/constants";

import {
  SimulationLightingSettings,
  SimulationRotateSettings,
  SimulationScaleSettings,
  SimulationTranslateSettings
} from "../../../interfaces/simulationSettings.interface";

export interface ModelImage {
  id: string;
  createdAt: string;
  position_type: string;
  model: string;
  image: string;
  face: string;
  mask: string;
  is_active: boolean;
  parent: string;
  lightning_settings: {
    lighting: SimulationLightingSettings;
  };
  position_settings: {
    translate: SimulationTranslateSettings;
    rotate: SimulationRotateSettings;
    scale: SimulationScaleSettings;
    hairLine: number;
  };
  originalImage?: any;
  simulations: ModelSimulation[];
  simulator_settings: SimulatorSettings;
}
