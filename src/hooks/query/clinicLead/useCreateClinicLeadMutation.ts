import { useMutation } from "@tanstack/react-query";
import { CreateClinicLeadRequest } from "@services/ClinicLead/interfaces/ClinicLead.interface";
import { ClinicLeadService } from "@services/ClinicLead/ClinicLead.service";
import { API_SERVICES } from "@config/constants";

export const useCreateClinicLeadMutation = () => {
  const { mutate: createClinicLead } = useMutation({
    mutationKey: [API_SERVICES.CLINIC_LEAD.serviceName],
    mutationFn: (payload: CreateClinicLeadRequest) => {
      return ClinicLeadService.createClinicUser(payload);
    }
  });

  return createClinicLead;
};
