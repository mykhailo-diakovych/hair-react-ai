import { DeepArSettings } from "@components/DeepArCanvas/interfaces/DeepArSettings.interface";

export interface CreatePatientRequest {
  email: string;
  name: string;
  phone: string;
  device_id?: string;
  clinic: string;
  notes: string;
  type?: "Lead" | "Consultation";
}

export interface CreateLeadPatientRequest {
  arSettings: DeepArSettings;
  email: string;
  name: string;
  parent_img_id: string;
  phone: string;
  clinic?: string;
  clinicRefCode?: string;
}
