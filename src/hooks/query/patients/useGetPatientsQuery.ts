import { useQuery } from "@tanstack/react-query";
import { PatientsService } from "@services/Patients/Patients.service";
import { API_SERVICES } from "@config/constants";

export const useGetPatientsQuery = ({
  type,
  ordering,
  search,
  clinicId,
  offset,
  limit,
  isActive = true,
  allClinics = false
}: {
  type?: string;
  ordering?: string;
  isActive?: boolean;
  search?: string;
  clinicId?: string;
  offset?: number;
  limit?: number;
  allClinics?: boolean;
}) => {
  const queryResponse = useQuery(
    [
      API_SERVICES.PATIENTS.serviceName,
      type,
      ordering,
      search,
      offset,
      isActive,
      limit,
      API_SERVICES.PATIENTS.invalidationKey
    ],
    () => {
      return PatientsService.getPatients({
        type,
        ordering,
        search,
        offset: offset || 0,
        limit: limit || 40,
        clinicId,
        isActive,
        allClinics
      });
    },
    {
      staleTime: 1000 * 60
    }
  );

  return queryResponse;
};
