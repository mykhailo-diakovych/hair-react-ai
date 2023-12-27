import { useMutation } from "@tanstack/react-query";
import { ClinicFull } from "@services/Clinic/interfaces/Clinic.interface";
import { ClinicService } from "@services/Clinic/Clinic.service";
import { API_SERVICES } from "@config/constants";

export const useUpdateClinicMutation = <
  T extends Partial<Omit<ClinicFull, "logo"> & { logo: File }>
>() => {
  const { mutate: updateClinicMutation } = useMutation({
    mutationKey: [
      API_SERVICES.CLINIC.serviceName,
      API_SERVICES.CLINIC.invalidationKey
    ],
    mutationFn: (clinic: T) => {
      return ClinicService.updateClinic(clinic);
    }
  });

  return updateClinicMutation;
};
