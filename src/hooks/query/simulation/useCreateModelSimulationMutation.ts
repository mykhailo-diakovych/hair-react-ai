import { useMutation } from "@tanstack/react-query";
import { SimulationsService } from "@services/Simulation/Simulation.service";
import { ModelSimulationRequest } from "@services/Simulation/interfaces/ModelSimulationRequest.interface";
import { API_SERVICES } from "@config/constants";

export const useCreateModelSimulationMutation = (isPublic = false) => {
  const { mutate: createModelSimulationMutation } = useMutation(
    [API_SERVICES.SIMULATIONS.serviceName],
    (modelSimulation: ModelSimulationRequest) => {
      return SimulationsService.createModelSimulation(
        modelSimulation,
        isPublic
      );
    }
  );

  return createModelSimulationMutation;
};
