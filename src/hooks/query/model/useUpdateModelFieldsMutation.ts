import { useMutation } from "@tanstack/react-query";
import { ModelService } from "@services/Model/Model.service";
import { Model } from "@services/Model/interfaces/Model.interface";
import { API_SERVICES } from "@config/constants";

export const useUpdateModelFieldsMutation = () => {
  const { mutate: updateModelMutation } = useMutation(
    [API_SERVICES.MODEL.serviceName, API_SERVICES.MODEL.invalidationKey],
    (payload: Partial<Model>) => {
      return ModelService.updateModelFields(payload);
    }
  );

  return updateModelMutation;
};
