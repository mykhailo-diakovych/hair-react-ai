import { useMutation } from "@tanstack/react-query";
import { PatientsService } from "@services/Patients/Patients.service";
import { CreatePatientRequest } from "@services/Patients/interfaces/createPatientRequest.interface";
import { API_SERVICES } from "@config/constants";

export const useCreateConsultationPatientMutation = () => {
  const { mutate: createPatientMutation } = useMutation(
    [API_SERVICES.PATIENTS.serviceName, API_SERVICES.PATIENTS.invalidationKey],
    (patient: CreatePatientRequest) => {
      return PatientsService.createConsultationPatient(patient);
    }
  );

  return createPatientMutation;
};
