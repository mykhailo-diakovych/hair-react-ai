import { useQuery } from "@tanstack/react-query";
import { PatientsService } from "@services/Patients/Patients.service";
import { API_SERVICES } from "@config/constants";

export const useGetPatientByRefCodeQuery = (
  ref_code?: string,
  options = {}
) => {
  const queryResponse = useQuery(
    [
      API_SERVICES.PATIENTS.serviceName,
      ref_code,
      API_SERVICES.PATIENTS.invalidationKey
    ],
    () => {
      return PatientsService.getPatientByRefCode(ref_code);
    },
    {
      staleTime: 1000 * 60,
      ...options
    }
  );

  return queryResponse;
};
