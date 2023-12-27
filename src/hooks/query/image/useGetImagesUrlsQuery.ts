import { useQuery } from "@tanstack/react-query";
import { FilesService } from "@services/Files/Files.service";
import { API_SERVICES } from "@config/constants";

export const useGetImagesUrlsQuery = (ids: string[]) => {
  const queryResponse = useQuery(
    [API_SERVICES.FILES.serviceName, ...ids],
    () => {
      return Promise.all(ids.map((id) => FilesService.getImageUrl(id, false)));
    },
    {
      staleTime: 1000 * 120
    }
  );

  return queryResponse;
};
