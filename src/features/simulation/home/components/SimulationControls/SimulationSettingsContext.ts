import React, { createContext, MutableRefObject, RefObject } from "react";

import { InputRef } from "antd/es/input";
import {
  DEFAULT_SECTION_VOLUME,
  HAIR_VOLUME_TOTAL_SLIDER,
  SIMULATION_HAIR_STYLE,
  SIMULATION_HAIR_TYPES,
  SIMULATION_SECTION_VOLUME_TYPE,
  SimulationHairOption,
  SimulationSectionVolume
} from "@config/constants";

import {
  SimulationLightingSettings,
  SimulationRotateSettings,
  SimulationScaleSettings,
  SimulationTranslateSettings
} from "../../../../../interfaces/simulationSettings.interface";
import { DeepAr } from "../../../../../interfaces/deepAr.interface";

interface ISimulationSettings {
  inputRef: RefObject<InputRef> | null;
  canvasRef?: MutableRefObject<HTMLCanvasElement> | null;
  deepAr: MutableRefObject<DeepAr | null> | null;
  selectedImageData?: ImageData;
  color: string;
  setColor: (color: string) => void;
  hairType?: SimulationHairOption;
  setHairType: (hairType: SimulationHairOption) => void;
  // thickness: SimulationHairOption;
  // setThickness: (thickness: SimulationHairOption) => void;
  hairStyle?: SimulationHairOption;
  setHairStyle: (hairStyle: SimulationHairOption) => void;
  hairVolume: number;
  setHairVolume: (hairVolume: number) => void;
  hairLine: number;
  setHairLine: (hairLine: number) => void;
  sectionVolumeType: SimulationHairOption;
  setSectionVolumeType: (sectionVolumeType: SimulationHairOption) => void;
  sectionVolume: SimulationSectionVolume;
  setSectionVolume: React.Dispatch<
    React.SetStateAction<SimulationSectionVolume>
  >;
  lighting: SimulationLightingSettings;
  setLighting: React.Dispatch<React.SetStateAction<SimulationLightingSettings>>;
  translate: SimulationTranslateSettings;
  setTranslate: React.Dispatch<
    React.SetStateAction<SimulationTranslateSettings>
  >;
  scale: SimulationScaleSettings;
  setScale: React.Dispatch<React.SetStateAction<SimulationScaleSettings>>;
  rotate: SimulationRotateSettings;
  setRotate: React.Dispatch<React.SetStateAction<SimulationRotateSettings>>;
}

const DEFAULT_SIMULATION_SETTINGS: ISimulationSettings = {
  inputRef: null,
  canvasRef: null,
  deepAr: null,
  color: "#000",
  setColor: () => {},
  hairType: SIMULATION_HAIR_TYPES[0],
  setHairType: () => {},
  // thickness: SIMULATION_HAIR_THICKNESS[0],
  // setThickness: () => {},
  hairStyle: SIMULATION_HAIR_STYLE[0],
  setHairStyle: () => {},
  hairVolume: HAIR_VOLUME_TOTAL_SLIDER.default,
  setHairVolume: () => {},
  hairLine: 0.55,
  setHairLine: () => {},
  sectionVolumeType: SIMULATION_SECTION_VOLUME_TYPE[0],
  setSectionVolumeType: () => {},
  sectionVolume: DEFAULT_SECTION_VOLUME,
  setSectionVolume: () => {},
  lighting: { x: 0, y: 0, z: 0, brightness: 0 },
  setLighting: () => {},
  translate: { x: 0, y: 0, z: 0 },
  setTranslate: () => {},
  scale: { x: 1, y: 1, z: 1, all: 1 },
  setScale: () => {},
  rotate: { x: 0, y: 0, z: 0 },
  setRotate: () => {}
};

export const SimulationSettings = createContext<ISimulationSettings>(
  DEFAULT_SIMULATION_SETTINGS
);
