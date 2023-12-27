import { useMutation } from "@tanstack/react-query";
import { ModelService } from "@services/Model/Model.service";
import { CreateModelRequest } from "@services/Model/interfaces/CreateModelRequest";
import { API_SERVICES } from "@config/constants";

export const useCreateModelMutation = (isPublic = false) => {
  const { mutate: createModelMutation } = useMutation(
    [API_SERVICES.MODEL.serviceName, API_SERVICES.MODEL.invalidationKey],
    (payload: CreateModelRequest) => {
      return ModelService.createPatientModel(payload, isPublic);
    }
  );

  return createModelMutation;
};
