import { API_SERVICES, FunctionService } from "@config/constants";
import { DeepArSettings } from "@components/DeepArCanvas/interfaces/DeepArSettings.interface";
import { Api } from "@api/api";

import { UploadImageResponse } from "./interfaces/UploadImageResponse.interface";
import { UploadImageRequest } from "./interfaces/UploadImageRequest.interface";

export class FilesServiceApi extends Api {
  public constructor({ serviceName }: { serviceName: string }) {
    super(serviceName);
  }

  public async getImageUrl<T = UploadImageRequest>(
    id: string,
    isPublic = true
  ) {
    const imageResponse = await this.get<T, UploadImageResponse>(
      isPublic
        ? (API_SERVICES.FILES.IMAGE_BY_ID as FunctionService)(id)
        : (API_SERVICES.FILES.PATIENT_IMAGE_BY_ID as FunctionService)(id),
      {
        isPublic: isPublic
      }
    );

    return imageResponse.data as UploadImageResponse;
  }

  public async uploadImage<T = UploadImageRequest>(
    imageData: T,
    isPublic: boolean
  ) {
    const imageResponse = await this.post<T, UploadImageResponse>(
      isPublic
        ? (API_SERVICES.FILES.IMAGE as string)
        : (API_SERVICES.FILES.UPLOAD_PATIENT_IMAGE as string),
      imageData,
      {
        isPublic: isPublic
      }
    );

    return imageResponse.data as UploadImageResponse;
  }

  public async uploadPatientImage<T = UploadImageRequest>(imageData: T) {
    const imageResponse = await this.post<T, UploadImageResponse>(
      API_SERVICES.FILES.UPLOAD_PATIENT_IMAGE as string,
      imageData
    );

    return imageResponse.data as UploadImageResponse;
  }

  public async updatePatientImage<T = UploadImageRequest>(
    id: string,
    imageData: T
  ) {
    const imageResponse = await this.patch<T, UploadImageResponse>(
      (API_SERVICES.FILES.UPDATE_PATIENT_IMAGE as FunctionService)(id),
      imageData
    );

    return imageResponse.data as UploadImageResponse;
  }

  public async getArSettings<T = unknown>(id?: string) {
    if (!id) {
      return {} as DeepArSettings;
    }

    const arSettings = await this.get<T, DeepArSettings>(
      (API_SERVICES.FILES.GET_AR_SETTINGS as FunctionService)(id),
      {
        isPublic: true
      }
    );

    const r = arSettings.data;

    if (!r.model) {
      r.model = {
        sex: "ml",
        ethnicity: "wt",
        hairloss: "hl_2",
        type: "st",
        style: "ur",
        length: "m",
        volume: {
          r1: 1,
          r2: 2,
          r3: 3
        }
      };
    } else {
      r.model.ethnicity = r.model.ethnicity || "wt";
      r.model.style = "ur";
      r.model.sex = r.model.sex || "ml";
      r.model.type = r.model.type || "st";
      r.model.length = "m";
      r.model.volume = r.model.volume || {
        r1: 2,
        r2: 3,
        r3: 4
      };
      r.model.hairloss = "hl_2";
    }

    if (!r.position) {
      r.position = {
        width: 1,
        height: 0,
        depth: 0,
        hairline: 0
      };
    }

    if (!r.color) {
      r.color = {
        color: "mahogany",
        brightness: 2,
        lightDirection: 3
      };
    }

    return r as DeepArSettings;
  }
}

export const FilesService = new FilesServiceApi(API_SERVICES.FILES);
