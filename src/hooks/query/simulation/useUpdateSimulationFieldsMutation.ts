import { useMutation } from "@tanstack/react-query";
import { SimulationsService } from "@services/Simulation/Simulation.service";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { API_SERVICES } from "@config/constants";

export const useUpdateSimulationFieldsMutation = () => {
  const { mutate: updateSimulationMutation } = useMutation(
    [API_SERVICES.SIMULATIONS.serviceName],
    (simulation: Partial<ModelSimulation>) => {
      return SimulationsService.updateSimulationFields(simulation);
    }
  );

  return updateSimulationMutation;
};
