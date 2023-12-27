export interface ClinicLead {
  id: string;
  clinic_name: string;
  email: string;
  payment_plan: string;
  checkout_url: string;
}

export interface CreateClinicLeadRequest {
  clinic_name: string;
  email: string;
  password: string;
  payment_plan: string;
}
