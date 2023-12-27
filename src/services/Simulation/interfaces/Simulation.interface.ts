import { DeepArSettings } from "@components/DeepArCanvas/interfaces/DeepArSettings.interface";

export interface Simulation {
  id: string;
  imgId: string;
  imgPreview: string;
  imgUrl: string;
  image_1: string;
  image_2: string;
  image_low_density: string;
  image_high_density: string;
  createdAt: string;
  status: string;
  isClinicCreated: boolean;
  imagesMl?: string[];
  images_ai_hd?: {
    [key: string]: string;
  };
  images_ai_ld?: Object;
  arSettings?: DeepArSettings;
  index: number;
}
