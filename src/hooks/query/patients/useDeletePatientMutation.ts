import { useMutation } from "@tanstack/react-query";
import { PatientsService } from "@services/Patients/Patients.service";
import { API_SERVICES } from "@config/constants";

export const useDeletePatientMutation = () => {
  const { mutate: deletePatientMutation } = useMutation(
    [API_SERVICES.PATIENTS.serviceName, API_SERVICES.PATIENTS.invalidationKey],
    (id: string) => {
      return PatientsService.deleteClinicPatient(id);
    }
  );

  return deletePatientMutation;
};
