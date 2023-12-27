import { Simulation } from "@services/Simulation/interfaces/Simulation.interface";
import { ModelSimulationRequest } from "@services/Simulation/interfaces/ModelSimulationRequest.interface";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { isUID } from "@helpers/isUID";
import { API_SERVICES, FunctionService } from "@config/constants";
import { Api } from "@api/api";

import { ResultsType } from "../../types/ResultsType";

export interface ModelSimulationsQuery {
  image__clinic?: string;
  image__patient?: string;
  image__patient__type?: string;
  is_active?: boolean;
  is_deleted?: boolean;
  limit?: number;
  offset?: number;
  ordering?: string;
  status?: string;
}

export class SimulationServiceApi extends Api {
  public constructor({ serviceName }: { serviceName: string }) {
    super(serviceName);
  }

  public async deleteSimulation(simulationId: string) {
    const deletedSimulation = await this.delete(
      `${API_SERVICES.SIMULATIONS.DELETE}${simulationId}/`,
      {
        isPublic: false
      }
    );

    return deletedSimulation.data;
  }

  public async createModelSimulation<T extends ModelSimulationRequest>(
    modelSimulation: T,
    isPublic = false
  ) {
    const createdModelSimulation = await this.post<T, ModelSimulation>(
      API_SERVICES.SIMULATIONS.CREATE_MODEL_SIMULATION as string,
      modelSimulation,
      {
        isPublic: isPublic
      }
    );

    return createdModelSimulation.data;
  }

  public async getModelSimulations<T extends ModelSimulationsQuery>(
    queryParams: T
  ) {
    const modelSimulations = await this.get<T, ResultsType<ModelSimulation[]>>(
      API_SERVICES.SIMULATIONS.GET_MODEL_SIMULATIONS as string,
      {
        params: queryParams
      }
    );

    return modelSimulations.data;
  }

  public async getModelSimulation(id?: string) {
    if (id && !isUID(id)) {
      return null;
    }

    const modelSimulation = await this.get<unknown, ModelSimulation>(
      (API_SERVICES.SIMULATIONS.GET_MODEL_SIMULATION as FunctionService)(
        id as string
      ),
      {
        isPublic: true
      }
    );

    return modelSimulation.data;
  }

  public async getLeadSimulation(imageId?: string) {
    if (!imageId) {
      return {} as Simulation;
    }

    const simulation = await this.post<unknown, Simulation>(
      (API_SERVICES.SIMULATIONS.LEAD_SIMULATION as FunctionService)(imageId),
      {},
      {
        isPublic: true
      }
    );

    return simulation.data;
  }

  public async updateSimulationFields<T extends Partial<ModelSimulation>>(
    simulation: T
  ) {
    const updatedSimulation = await this.patch<T, ModelSimulation>(
      (API_SERVICES.SIMULATIONS.UPDATE_SIMULATION as FunctionService)(
        simulation.id as string
      ),
      simulation
    );

    return updatedSimulation.data;
  }

  public async updateSimulation<T extends ModelSimulation>(simulation: T) {
    const updatedSimulation = await this.patch<T, ModelSimulation>(
      (API_SERVICES.SIMULATIONS.UPDATE_SIMULATION as FunctionService)(
        simulation.id
      ),
      simulation
    );

    return updatedSimulation.data;
  }
}

export const SimulationsService = new SimulationServiceApi(
  API_SERVICES.SIMULATIONS
);
