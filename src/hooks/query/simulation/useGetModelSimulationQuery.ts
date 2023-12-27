import { useQuery } from "@tanstack/react-query";
import { SimulationsService } from "@services/Simulation/Simulation.service";
import { API_SERVICES } from "@config/constants";

export const useGetModelSimulationQuery = (id?: string, options = {}) => {
  const queryResponse = useQuery(
    [API_SERVICES.SIMULATIONS.serviceName, id],
    () => {
      return SimulationsService.getModelSimulation(id);
    },
    {
      staleTime: 1000 * 30,
      ...options
    }
  );

  return queryResponse;
};
