import { ApiParams } from "@services/Simulation/interfaces/ModelSimulation.interface";

export interface ModelSimulationRequest {
  name?: string;
  description?: string;
  model_image: string;
  seed?: number;
  group_index?: number;
  accuracy?: number;
  resolution?: number;
  is_deleted?: boolean;
  patientId: string;
  parent?: string;
  density?: number;
  api_params?: Partial<ApiParams>;
  simulator_settings?: any;
}
