import { AxiosRequestConfig } from "axios";
import {
  ClinicBrief,
  ClinicFull,
  ClinicPublicInfo,
  ClinicUser
} from "@services/Clinic/interfaces/Clinic.interface";
import { getRefCodeById } from "@helpers/getRefCodeById";
import { CreateClinicFormValues } from "@features/superadmin/clinics/create/CreateClinic";
import {
  API_SERVICES,
  BASIC_PLAN_ID,
  CLINIC_STORAGE_KEY,
  FunctionService
} from "@config/constants";
import { Api } from "@api/api";

export class ClinicServiceApi extends Api {
  public constructor({ serviceName }: { serviceName: string }) {
    super(serviceName);
  }

  public async createClinic<T = CreateClinicFormValues>(clinicData: T) {
    const clinic = await this.post<T, ClinicBrief>(
      API_SERVICES.CLINIC.CREATE as string,
      {
        ...clinicData,
        payment_plan: BASIC_PLAN_ID
      }
    );

    return clinic.data;
  }

  public async getClinic<
    T = unknown,
    R = ClinicBrief | ClinicPublicInfo | ClinicFull
  >(clinicId?: string, isPrivate = false) {
    if (!clinicId) {
      return null;
    }

    const clinicStorageId = localStorage.getItem(CLINIC_STORAGE_KEY);
    const id = clinicId || clinicStorageId || "";

    const clinic = await this.get<T, R>(
      (API_SERVICES.CLINIC.GET as FunctionService)(
        isPrivate ? id : getRefCodeById(id)
      ),
      {
        isPublic: !isPrivate
      }
    );

    return clinic.data;
  }

  public async getAllClinics<T = unknown>(
    params?: AxiosRequestConfig["params"]
  ) {
    const clinics = await this.get<
      T,
      { count: number; results: ClinicBrief[] }
    >(API_SERVICES.CLINIC.GET_ALL as string, {
      params: params
    });

    return clinics.data;
  }

  public async updateClinic<
    T extends Partial<Omit<ClinicFull, "logo"> & { logo: File }>
  >(clinicData: T) {
    if (!clinicData.id) {
      return;
    }

    const formData = new FormData();

    for (const key in clinicData) {
      if (key !== "logo") {
        formData.append(key, clinicData[key] as string);
      }
    }

    if (clinicData.logo) {
      formData.append("logo", clinicData.logo);
    }

    const clinic = await this.patch<
      FormData,
      Partial<ClinicBrief> | Partial<ClinicFull>
    >((API_SERVICES.CLINIC.GET as FunctionService)(clinicData?.id), formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return clinic.data;
  }

  public async createClinicUser<T = ClinicUser>(clinicId: string, userData: T) {
    const clinic = await this.post<T, ClinicUser>(
      (API_SERVICES.CLINIC.CREATE_USER as FunctionService)(clinicId),
      userData
    );

    return clinic.data;
  }
}

export const ClinicService = new ClinicServiceApi(API_SERVICES.CLINIC);
