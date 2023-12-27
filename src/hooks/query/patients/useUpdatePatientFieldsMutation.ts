import { useMutation } from "@tanstack/react-query";
import { PatientsService } from "@services/Patients/Patients.service";
import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { API_SERVICES } from "@config/constants";

export const useUpdatePatientFieldsMutation = () => {
  const { mutate: updatePatientMutation } = useMutation({
    mutationKey: [API_SERVICES.PATIENTS.serviceName],
    mutationFn: (patient: Partial<Patient>) => {
      return PatientsService.updatePatientFields(patient);
    }
  });

  return updatePatientMutation;
};
