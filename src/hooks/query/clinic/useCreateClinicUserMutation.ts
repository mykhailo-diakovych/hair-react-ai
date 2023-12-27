import { useMutation } from "@tanstack/react-query";
import { ClinicUser } from "@services/Clinic/interfaces/Clinic.interface";
import { ClinicService } from "@services/Clinic/Clinic.service";
import { API_SERVICES } from "@config/constants";

export const useCreateClinicUserMutation = <T = ClinicUser>() => {
  const { mutate: createClinicUserMutation } = useMutation({
    mutationKey: [
      API_SERVICES.CLINIC.serviceName,
      API_SERVICES.CLINIC.invalidationKey
    ],
    mutationFn: ({ clinicId, user }: { clinicId: string; user: T }) => {
      return ClinicService.createClinicUser<T>(clinicId, user);
    }
  });

  return createClinicUserMutation;
};
