import { useQuery } from "@tanstack/react-query";
import { ModelImageService } from "@services/ModelImage/ModelImage.service";
import { API_SERVICES } from "@config/constants";

export const useGetModelImageQuery = (id?: string, options?: Object) => {
  const queryResponse = useQuery(
    [API_SERVICES.MODEL_IMAGE.serviceName],
    () => {
      return ModelImageService.getModelImage(id);
    },
    {
      staleTime: 1000 * 30,
      ...options
    }
  );

  return queryResponse;
};
