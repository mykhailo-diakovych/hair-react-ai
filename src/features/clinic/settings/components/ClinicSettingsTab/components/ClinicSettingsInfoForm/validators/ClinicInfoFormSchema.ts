import * as Yup from "yup";

export const ClinicInfoFormSchema = Yup.object().shape({
  clinicName: Yup.string().required("Required")
});
