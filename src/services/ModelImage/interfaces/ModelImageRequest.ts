import { ModelImage } from "./ModelImage.interface";

export type ModelImageRequest = Omit<ModelImage, "id" | "createdAt">;
