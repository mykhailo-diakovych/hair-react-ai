import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";

export interface GeneratedSimulation {
  createdAt: string;
  simulations: ModelSimulation[];
}
