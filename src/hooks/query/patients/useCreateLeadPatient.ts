import { useMutation } from "@tanstack/react-query";
import { PatientsService } from "@services/Patients/Patients.service";
import { CreateLeadPatientRequest } from "@services/Patients/interfaces/createPatientRequest.interface";
import { API_SERVICES } from "@config/constants";

export const useCreateLeadPatientMutation = () => {
  const { mutate: createPatientMutation } = useMutation(
    [API_SERVICES.PATIENTS.serviceName, API_SERVICES.PATIENTS.invalidationKey],
    (patient: CreateLeadPatientRequest) => {
      return PatientsService.createLeadPatient(patient);
    }
  );

  return createPatientMutation;
};
