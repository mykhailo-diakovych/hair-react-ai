import { useMutation } from "@tanstack/react-query";
import { ClinicService } from "@services/Clinic/Clinic.service";
import { CreateClinicFormValues } from "@features/superadmin/clinics/create/CreateClinic";
import { API_SERVICES } from "@config/constants";

export const useCreateClinicMutation = <T = CreateClinicFormValues>() => {
  const { mutate: createClinicMutation } = useMutation({
    mutationKey: [
      API_SERVICES.CLINIC.serviceName,
      API_SERVICES.CLINIC.invalidationKey
    ],
    mutationFn: (payload: T) => {
      return ClinicService.createClinic<T>(payload);
    }
  });

  return createClinicMutation;
};
