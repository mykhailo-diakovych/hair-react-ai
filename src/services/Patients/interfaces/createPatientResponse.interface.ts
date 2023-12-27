import { Simulation } from "@services/Simulation/interfaces/Simulation.interface";

export interface CreatePatientResponse {
  email: string;
  name: string;
  phone: string;
  device_id: string;
  clinic: string;
  notes: string;
  type: string;
  id: string;
  refCode: string;
  clinicRefCode: string;
  default_image_url: string;
  simulations: Simulation[];
  ai_simulations: string;
  createdAt: string;
  hasClinicSims: string;
  is_active: boolean;
}
