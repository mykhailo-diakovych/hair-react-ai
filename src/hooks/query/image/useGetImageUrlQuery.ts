import { useQuery } from "@tanstack/react-query";
import { FilesService } from "@services/Files/Files.service";
import { API_SERVICES } from "@config/constants";

export const useGetImageUrlQuery = (id?: string, options = {}) => {
  const queryResponse = useQuery(
    [API_SERVICES.FILES.serviceName, id],
    () => {
      return FilesService.getImageUrl(id || "", false);
    },
    {
      staleTime: 1000 * 120,
      enabled: !!id,
      ...options
    }
  );

  const dataComputed = Array.isArray(queryResponse.data)
    ? queryResponse.data[0]
    : queryResponse.data;

  return { ...queryResponse, data: dataComputed };
};
