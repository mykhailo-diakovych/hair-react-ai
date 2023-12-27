import { useQuery } from "@tanstack/react-query";
import { ClinicService } from "@services/Clinic/Clinic.service";
import { getRefCodeById } from "@helpers/getRefCodeById";
import { API_SERVICES, CLINIC_STORAGE_KEY } from "@config/constants";

export const useGetClinicQuery = <T = unknown, R = unknown>(
  clinicId: string,
  isPrivate = false
) => {
  const clinicStorageId = localStorage.getItem(CLINIC_STORAGE_KEY) || "";

  const queryResponse = useQuery(
    [
      API_SERVICES.CLINIC.serviceName,
      clinicId,
      API_SERVICES.CLINIC.invalidationKey
    ],
    () => {
      return ClinicService.getClinic<T, R>(
        isPrivate
          ? clinicId || clinicStorageId
          : getRefCodeById(clinicId || clinicStorageId),
        isPrivate
      );
    },
    {
      staleTime: 1000 * 120
    }
  );

  return queryResponse;
};
