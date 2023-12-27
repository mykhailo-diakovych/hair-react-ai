import { useMutation } from "@tanstack/react-query";
import { ModelService } from "@services/Model/Model.service";
import { Model } from "@services/Model/interfaces/Model.interface";
import { API_SERVICES } from "@config/constants";

export const useUpdateModelMutation = () => {
  const { mutate: updateModelMutation } = useMutation(
    [API_SERVICES.MODEL.serviceName, API_SERVICES.MODEL.invalidationKey],
    (payload: Model) => {
      return ModelService.updateModel(payload);
    }
  );

  return updateModelMutation;
};
