import { useQuery } from "@tanstack/react-query";
import {
  ModelSimulationsQuery,
  SimulationsService
} from "@services/Simulation/Simulation.service";
import { API_SERVICES } from "@config/constants";

export const useGetModelSimulationsQuery = (
  queryParams: ModelSimulationsQuery,
  options = {}
) => {
  const queryResponse = useQuery(
    [
      API_SERVICES.SIMULATIONS.serviceName,
      queryParams,
      API_SERVICES.SIMULATIONS.invalidationKey
    ],
    () => {
      return SimulationsService.getModelSimulations(queryParams);
    },
    {
      staleTime: 1000 * 30,
      ...options
    }
  );

  return queryResponse;
};
