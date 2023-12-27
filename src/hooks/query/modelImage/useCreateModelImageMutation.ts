import { useMutation } from "@tanstack/react-query";
import { ModelImageService } from "@services/ModelImage/ModelImage.service";
import { ModelImageRequest } from "@services/ModelImage/interfaces/ModelImageRequest";
import { API_SERVICES } from "@config/constants";

export const useCreateModelImageMutation = (isPublic = false) => {
  const { mutate: createModelImageMutation } = useMutation({
    mutationKey: [API_SERVICES.MODEL_IMAGE.serviceName],
    mutationFn: (modelImage: Partial<ModelImageRequest>) => {
      return ModelImageService.createModelImage(
        {
          ...modelImage
        },
        isPublic
      );
    }
  });

  return createModelImageMutation;
};
