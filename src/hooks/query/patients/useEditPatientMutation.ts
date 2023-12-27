import { useMutation } from "@tanstack/react-query";
import { PatientsService } from "@services/Patients/Patients.service";
import { CreatePatientRequest } from "@services/Patients/interfaces/createPatientRequest.interface";
import { API_SERVICES } from "@config/constants";

export const useEditConsultationPatientMutation = () => {
  const { mutate: editPatientMutation } = useMutation(
    [API_SERVICES.PATIENTS.serviceName, API_SERVICES.PATIENTS.invalidationKey],
    ({
      patientId,
      patient
    }: {
      patientId: string;
      patient: CreatePatientRequest;
    }) => {
      return PatientsService.editConsultationPatient(patientId, patient);
    }
  );

  return editPatientMutation;
};
