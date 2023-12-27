import {
  ClinicLead,
  CreateClinicLeadRequest
} from "@services/ClinicLead/interfaces/ClinicLead.interface";
import { API_SERVICES } from "@config/constants";
import { Api } from "@api/api";

export class ClinicLeadServiceApi extends Api {
  public constructor({ serviceName }: { serviceName: string }) {
    super(serviceName);
  }

  public async createClinicUser<T = CreateClinicLeadRequest>(payload: T) {
    const clinicLead = await this.post<
      T,
      ClinicLead & { errors: Record<string, string> }
    >(API_SERVICES.CLINIC_LEAD.CREATE as string, payload, {
      isPublic: true
    });

    if (clinicLead.data?.errors) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw clinicLead.data?.errors;
    }

    return clinicLead.data as ClinicLead;
  }
}

export const ClinicLeadService = new ClinicLeadServiceApi(
  API_SERVICES.CLINIC_LEAD
);
