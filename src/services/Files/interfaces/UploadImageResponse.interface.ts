export interface UploadImageResponse {
  image: string;
  device_id: string;
  creator: string;
  parent: string;
  clinic: string;
  patient: string;
  origin: string;
  id: string;
  is_valid: boolean;
  validation_status: string;
  createdAt: string;
  clinicName: string;
  patientName: string;
  patientType: string;
  clinicRefCode: string;
  patientRefCode: string;
  simulationUrls: string;
  aiSimulationUrls: string;
  images: string[];
}
