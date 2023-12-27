import { ModelImageRequest } from "@services/ModelImage/interfaces/ModelImageRequest";
import { API_SERVICES, FunctionService } from "@config/constants";
import { Api } from "@api/api";

import { ModelImage } from "./interfaces/ModelImage.interface";

export class ModelImageServiceApi extends Api {
  public constructor({ serviceName }: { serviceName: string }) {
    super(serviceName);
  }

  public async getModelImage(id?: string) {
    if (!id) {
      return {} as ModelImage;
    }

    const modelImage = await this.get<unknown, ModelImage>(
      (API_SERVICES.MODEL_IMAGE.BY_ID as FunctionService)(id)
    );

    return modelImage.data;
  }

  public async createModelImage<T = ModelImageRequest>(
    modelImageData: T,
    isPublic = false
  ) {
    const imageResponse = await this.post<T, ModelImage>(
      API_SERVICES.MODEL_IMAGE.CREATE as string,
      modelImageData,
      {
        isPublic: isPublic
      }
    );

    return imageResponse.data;
  }

  public async updateModelImage<T extends ModelImage>(modelImageData: T) {
    const imageResponse = await this.put<T, ModelImage>(
      (API_SERVICES.MODEL_IMAGE.BY_ID as FunctionService)(modelImageData.id),
      modelImageData
    );

    return imageResponse.data;
  }

  public async updateModelImageFields<T extends Partial<ModelImage>>(
    modelImageData: T
  ) {
    if (!modelImageData.id) {
      return {};
    }

    const imageResponse = await this.patch<T, ModelImage>(
      (API_SERVICES.MODEL_IMAGE.BY_ID as FunctionService)(modelImageData.id),
      modelImageData
    );

    return imageResponse.data;
  }
}

export const ModelImageService = new ModelImageServiceApi(
  API_SERVICES.MODEL_IMAGE
);
