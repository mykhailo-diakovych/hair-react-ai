import { useQuery } from "@tanstack/react-query";
import { PatientsService } from "@services/Patients/Patients.service";
import { API_SERVICES } from "@config/constants";

export const useGetPatientQuery = (id: string, options?: Object) => {
  const queryResponse = useQuery(
    [
      API_SERVICES.PATIENTS.serviceName,
      id,
      API_SERVICES.PATIENTS.invalidationKey
    ],
    () => {
      return PatientsService.getPatientById(id);
    },
    {
      staleTime: 1000 * 60,
      ...options
    }
  );

  return queryResponse;
};
