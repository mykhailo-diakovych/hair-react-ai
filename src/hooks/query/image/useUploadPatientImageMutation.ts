import { useMutation } from "@tanstack/react-query";
import { UploadImageRequest } from "@services/Files/interfaces/UploadImageRequest.interface";
import { FilesService } from "@services/Files/Files.service";
import { API_SERVICES } from "@config/constants";

export const useUploadPatientImageMutation = () => {
  const { mutate: uploadImageMutation } = useMutation({
    mutationKey: [API_SERVICES.FILES.serviceName],
    mutationFn: (imageData: UploadImageRequest) => {
      return FilesService.uploadPatientImage(imageData);
    }
  });

  return uploadImageMutation;
};
