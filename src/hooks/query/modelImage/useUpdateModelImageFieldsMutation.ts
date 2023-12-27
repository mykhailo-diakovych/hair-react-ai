import { useMutation } from "@tanstack/react-query";
import { ModelImageService } from "@services/ModelImage/ModelImage.service";
import { ModelImage } from "@services/ModelImage/interfaces/ModelImage.interface";
import { API_SERVICES } from "@config/constants";

export const useUpdateModelImageFieldsMutation = () => {
  const { mutate: updateModelImageMutation } = useMutation({
    mutationKey: [API_SERVICES.MODEL_IMAGE.serviceName],
    mutationFn: (modelImage: Partial<ModelImage>) => {
      return ModelImageService.updateModelImageFields(modelImage);
    }
  });

  return updateModelImageMutation;
};
