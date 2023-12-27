import { useMutation } from "@tanstack/react-query";
import { ModelImageService } from "@services/ModelImage/ModelImage.service";
import { ModelImage } from "@services/ModelImage/interfaces/ModelImage.interface";
import { API_SERVICES } from "@config/constants";

export const useUpdateModelImageMutation = () => {
  const { mutate: updateModelImageMutation } = useMutation({
    mutationKey: [API_SERVICES.MODEL_IMAGE.serviceName],
    mutationFn: (modelImage: ModelImage) => {
      return ModelImageService.updateModelImage(modelImage);
    }
  });

  return updateModelImageMutation;
};
