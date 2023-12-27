import { SimulationSectionVolume } from "@config/constants";

export interface SimulationLightingSettings {
  x: number;
  y: number;
  z: number;
  brightness: number;
}

export interface SimulationTranslateSettings {
  x: number;
  y: number;
  z: number;
}

export interface SimulationRotateSettings {
  x: number;
  y: number;
  z: number;
}

export interface SimulationScaleSettings {
  x: number;
  y: number;
  z: number;
  all: number;
}

export interface SimulationModelSettings {
  color: string;
  // toneColor: string;
  // shine: number;
  // saltAndPepper: number;
  // ombreColor: string;
  // ombreShift: number;
  // thickness: string;
  hairType?: string;
  hairStyle?: string;
  hairVolume: number;
  hairLine?: number;
  sectionVolumeType: string;
  sectionVolume: SimulationSectionVolume;
  lighting?: SimulationLightingSettings;
  rotate?: SimulationRotateSettings;
  translate?: SimulationTranslateSettings;
  scale?: SimulationScaleSettings;
}
