import { Simulation } from "@services/Simulation/interfaces/Simulation.interface";
import { Model } from "@services/Model/interfaces/Model.interface";

export interface Patient {
  email: string;
  name: string;
  phone: string;
  clinic: string;
  clinicName: string;
  notes?: string;
  type: string;
  id: string;
  refCode: string;
  clinicRefCode: string;
  default_image_url: string;
  ai_simulations: Simulation[];
  simulations: Simulation[];
  createdAt: string;
  hasClinicSims: boolean;
  is_active: boolean;
  images: {
    id: string;
    imgUrl: string;
  }[];
  patientModels: Model[];
}
