import { useQuery } from "@tanstack/react-query";
import { ModelService } from "@services/Model/Model.service";
import { API_SERVICES } from "@config/constants";

export const useGetModelByIdQuery = (id?: string, options = {}) => {
  const queryResponse = useQuery(
    [API_SERVICES.MODEL.serviceName, id, API_SERVICES.MODEL.invalidationKey],
    () => {
      return ModelService.getModelById(id);
    },
    {
      staleTime: 1000 * 60,
      ...options
    }
  );

  return queryResponse;
};
