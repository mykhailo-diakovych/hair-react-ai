import { PatientsResponse } from "@services/Patients/interfaces/PatientsResponse.interface";
import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { CreatePatientResponse } from "@services/Patients/interfaces/createPatientResponse.interface";
import {
  CreateLeadPatientRequest,
  CreatePatientRequest
} from "@services/Patients/interfaces/createPatientRequest.interface";
import {
  API_SERVICES,
  CLINIC_STORAGE_KEY,
  FunctionService
} from "@config/constants";
import { Api } from "@api/api";

interface GetPatientsParams {
  type?: string;
  ordering?: string;
  search?: string;
  clinicId?: string;
  offset: number;
  limit: number;
  isActive?: boolean;
  allClinics?: boolean;
}

export class PatientsServiceApi extends Api {
  public constructor({ serviceName }: { serviceName: string }) {
    super(serviceName);
  }

  public async getPatientById<T = unknown>(id: string) {
    const patient = await this.get<T, Patient>(
      (API_SERVICES.PATIENTS.GET_BY_ID as FunctionService)(id)
    );

    return patient.data;
  }

  public async getPatientByRefCode<T = unknown>(
    ref_code?: string,
    isPublic = true
  ) {
    if (!ref_code) {
      return null;
    }

    const patient = await this.get<T, Patient>(
      (API_SERVICES.PATIENTS.GET_BY_REF_CODE as FunctionService)(ref_code),
      {
        isPublic: isPublic
      }
    );

    return patient.data;
  }

  public async getPatients<T = unknown>(
    {
      type,
      ordering,
      search,
      clinicId,
      offset,
      limit,
      isActive,
      allClinics
    } = {} as Partial<GetPatientsParams>
  ) {
    const clinicStorageId = localStorage.getItem(CLINIC_STORAGE_KEY) as string;

    const patients = await this.get<T, PatientsResponse>(
      API_SERVICES.PATIENTS.GET_ALL as string,
      {
        params: {
          ...(!allClinics ? { clinic: clinicId || clinicStorageId } : {}),
          type,
          ordering,
          search,
          offset,
          limit,
          is_active: isActive
        }
      }
    );

    return patients.data;
  }

  public async createConsultationPatient<T = CreatePatientRequest>(
    patient: T,
    isPublic = false
  ) {
    const patientResponse = await this.post<T, CreatePatientResponse>(
      API_SERVICES.PATIENTS.CREATE_CONSULTATION as string,
      {
        type: "Consultation",
        ...patient
      },
      {
        isPublic: isPublic
      }
    );

    return patientResponse?.data;
  }

  public async createLeadPatient<T = CreateLeadPatientRequest>(patient: T) {
    const patientResponse = await this.post<T, CreatePatientResponse>(
      API_SERVICES.PATIENTS.CREATE_LEAD as string,
      {
        ...patient,
        type: "Lead"
      },
      {
        isPublic: true
      }
    );

    return patientResponse?.data;
  }

  public async editConsultationPatient<T = CreatePatientRequest>(
    patientId: string,
    patientData: T
  ) {
    const patientResponse = await this.put<T, CreatePatientResponse>(
      (API_SERVICES.PATIENTS.EDIT_CONSULTATION as FunctionService)(patientId),
      {
        ...patientData,
        type: "Consultation"
      },
      {
        isPublic: false
      }
    );

    return patientResponse?.data;
  }

  public async deleteClinicPatient<T = unknown>(id: string) {
    const patientResponse = await this.delete<T, unknown>(
      (API_SERVICES.PATIENTS.DELETE as FunctionService)(id)
    );

    return patientResponse?.data;
  }

  public async updatePatientFields<T extends Partial<Patient>>(patient: T) {
    if (!patient?.id) {
      return;
    }

    const patientResponse = await this.patch<T, Patient>(
      (API_SERVICES.PATIENTS.UPDATE as FunctionService)(patient?.id),
      patient
    );

    return patientResponse?.data;
  }
}

export const PatientsService = new PatientsServiceApi(API_SERVICES.PATIENTS);
