import { Model } from "@services/Model/interfaces/Model.interface";
import { CreateModelRequest } from "@services/Model/interfaces/CreateModelRequest";
import { API_SERVICES, FunctionService } from "@config/constants";
import { Api } from "@api/api";

export class ModelServiceApi extends Api {
  public constructor({ serviceName }: { serviceName: string }) {
    super(serviceName);
  }

  public async getModelById<T = Model>(id?: string) {
    if (!id) {
      return null;
    }

    const modelResponse = await this.get<T, Model>(
      (API_SERVICES.MODEL.BY_ID as FunctionService)(id)
    );

    return modelResponse.data;
  }

  public async createPatientModel<T = CreateModelRequest>(
    modelPayload: T,
    isPublic = false
  ) {
    const modelResponse = await this.post<T, Model>(
      API_SERVICES.MODEL.CREATE as string,
      modelPayload,
      {
        isPublic: isPublic
      }
    );

    return modelResponse.data;
  }

  public async updateModel<T extends Model>(modelPayload: T) {
    const modelResponse = await this.put<T, Model>(
      (API_SERVICES.MODEL.BY_ID as FunctionService)(modelPayload.id),
      modelPayload
    );

    return modelResponse.data;
  }

  public async updateModelFields<T extends Partial<Model>>(modelPayload: T) {
    const modelResponse = await this.patch<T, Partial<Model>>(
      (API_SERVICES.MODEL.BY_ID as FunctionService)(modelPayload.id as string),
      modelPayload
    );

    return modelResponse.data;
  }
}

export const ModelService = new ModelServiceApi(API_SERVICES.MODEL);
