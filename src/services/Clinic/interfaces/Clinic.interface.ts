export interface SimulationsAmount {
  total: number;
  last_7days: number;
  thisMonth: number;
  available: number;
}

export interface PatientsAmount {
  leads: number;
  consultations: number;
}

export enum ClinicUserRoles {
  NONE = 0,
  WEB_USER = 1,
  CLINIC_USER,
  CLINIC_ADMIN,
  CLINIC_OWNER,
  SUPERADMIN
}

export interface ClinicUser {
  user: string;
  role: ClinicUserRoles;
}

export interface ClinicPublicInfo {
  id: string;
  is_active: boolean;
  name: string;
  redirect_url: string;
  logoUrl: string;
  simulationsAmount: SimulationsAmount;
  patientsByType: PatientsAmount;
  email: string;
  website_url: string;
  legalterms_url: string;
  chat_enabled: boolean;
  auto_email_patient: boolean;
  phone_required: boolean;
}

export interface ClinicFull {
  id: string;
  ref_code: string;
  active_until: string;
  clinicUsers?: ClinicUser[];
  name: string;
  email: string;
  website_url: string;
  logo: string;
  payment_plan: string;
  simulationsAmount: SimulationsAmount;
  patientsByType: PatientsAmount;
  leads_email: string;
  legalterms_url: string;
  phone_required: boolean;
  auto_email_patient: boolean;
  sim_v2_visible: boolean;
}

export interface ClinicBrief {
  id: string;
  ref_code: string;
  name: string;
  email: string;
  active_until: string;
  leads_email: string;
  phone_required: boolean;
  auto_email_patient: boolean;
  logo: string;
  website_url: string;
  simulationsAmount: SimulationsAmount;
  patientsByType: PatientsAmount;
}
