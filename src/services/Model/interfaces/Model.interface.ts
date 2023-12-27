import { SimulationSectionVolume } from "@config/constants";

import { ModelImage } from "../../ModelImage/interfaces/ModelImage.interface";
import { SimulationModelSettings } from "../../../interfaces/simulationSettings.interface";

export interface Model {
  id: string;
  createdAt?: string;
  name: string;
  patient?: string;
  clinicRefCode?: string;
  effect_settings?: {
    history: SimulationModelSettings[];
    historyIndex: number;
    sectionVolume?: SimulationSectionVolume;
    color?: string;
    hairType?: string;
    hairStyle?: string;
    sectionVolumeType?: string;
  };
  modelImages?: ModelImage[];
  is_active?: boolean;
}
