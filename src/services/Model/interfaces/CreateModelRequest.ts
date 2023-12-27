import { Model } from "@services/Model/interfaces/Model.interface";

export type CreateModelRequest = Pick<
  Model,
  "name" | "patient" | "effect_settings"
>;
