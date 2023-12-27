import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import { ClinicService } from "@services/Clinic/Clinic.service";
import { API_SERVICES } from "@config/constants";

export const useGetAllClinicsQuery = (
  params?: AxiosRequestConfig["params"]
) => {
  const queryResponse = useQuery(
    [API_SERVICES.CLINIC.serviceName, API_SERVICES.CLINIC.invalidationKey],
    () => {
      return ClinicService.getAllClinics(params);
    },
    {
      staleTime: 1000 * 30
    }
  );

  return queryResponse;
};
