import { UploadImageResponse } from "@services/Files/interfaces/UploadImageResponse.interface";
import { SimulatorSettings } from "@config/constants";

export interface ApiParams {
  cfg_scale: number;
  controlnet_enabled: boolean;
  controlnet_guess_mode: number;
  controlnet_guidance: number;
  controlnet_guidance_end: number;
  controlnet_guidance_start: number;
  controlnet_lowvram: boolean;
  controlnet_module: string;
  controlnet_pixel_perfect: boolean;
  controlnet_processor_res: number;
  controlnet_resize_mode: number;
  controlnet_threshold_a: number;
  controlnet_threshold_b: number;
  controlnet_weight: number;
  denoising_strength: number;
  fill_method: number;
  height: number;
  inpaint_full_res: number;
  inpaint_full_res_padding: number;
  mask_blur: number;
  negative_prompt: string;
  prompt: string;
  restore_faces: number;
  sampler_name: string;
  seed: number;
  steps: number;
  tiling: number;
  use_base64: boolean;
  width: number;
}

export interface ModelSimulation {
  id: string;
  createdAt: string;
  status: string;
  face_url: string;
  image: UploadImageResponse | null;
  model_image: string;
  name: string;
  description: string;
  seed: number;
  is_active: boolean;
  model_name: string;
  group_index: number | null;
  accuracy: number;
  resolution: number;
  is_deleted: boolean;
  patient_id: string;
  patient_name?: string;
  patient_type?: string;
  clinic_name?: string;
  original_image_url?: string;
  density?: number;
  parent?: string;
  api_params: ApiParams;
  simulator_settings: SimulatorSettings;
}
