import { useQuery } from "@tanstack/react-query";
import { FilesService } from "@services/Files/Files.service";
import { API_SERVICES } from "@config/constants";

export const useGetArSettingsQuery = (id?: string, options = {}) => {
  const queryResponse = useQuery(
    [API_SERVICES.FILES.serviceName, id],
    () => {
      return FilesService.getArSettings(id);
    },
    {
      staleTime: 1000 * 120,
      ...options
    }
  );

  return queryResponse;
};
