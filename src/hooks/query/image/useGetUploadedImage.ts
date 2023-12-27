import { UploadImageResponse } from "@services/Files/interfaces/UploadImageResponse.interface";
import { UploadImageRequest } from "@services/Files/interfaces/UploadImageRequest.interface";
import { useUploadImageMutation } from "@hooks/query/image/useUploadImageMutation";

export const useGetUploadedImage = (
  isPublic = true
): ((settings: UploadImageRequest) => Promise<UploadImageResponse>) => {
  const uploadPhotoMutation = useUploadImageMutation(isPublic);

  const getUploadedPatientImage = async (
    settings: UploadImageRequest
  ): Promise<UploadImageResponse> => {
    return new Promise((resolve) => {
      uploadPhotoMutation(settings, {
        onSuccess: async (uploadedImage: UploadImageResponse) => {
          resolve(uploadedImage);
        }
      });
    });
  };

  return getUploadedPatientImage;
};
