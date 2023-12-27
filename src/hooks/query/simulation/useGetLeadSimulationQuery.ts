import { useQuery } from "@tanstack/react-query";
import { SimulationsService } from "@services/Simulation/Simulation.service";
import { API_SERVICES } from "@config/constants";

export const useGetLeadSimulationMutation = (id?: string, options = {}) => {
  const queryResponse = useQuery(
    [API_SERVICES.SIMULATIONS.serviceName, id],
    () => {
      return SimulationsService.getLeadSimulation(id);
    },
    {
      staleTime: 1000 * 10,
      ...options
    }
  );

  return queryResponse;
};
