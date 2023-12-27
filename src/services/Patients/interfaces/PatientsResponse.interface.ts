import { Patient } from "@services/Patients/interfaces/Patient.interface";

export interface PatientsResponse {
  count: number;
  next: number;
  previous: number;
  results: Patient[];
}
