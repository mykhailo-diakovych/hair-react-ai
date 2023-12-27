import * as Yup from "yup";
import { BASIC_VALIDATORS } from "@config/constants";

const PatientValidationSchema = {
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Required"),
  phone: Yup.string()
    .matches(BASIC_VALIDATORS.phone, "Phone number is not valid")
    .optional()
};

export const CreatePatientSchema = Yup.object().shape({
  ...PatientValidationSchema,
  email: Yup.string().matches(BASIC_VALIDATORS.email, "Invalid email")
});

export const EditPatientSchema = Yup.object().shape({
  ...PatientValidationSchema,
  email: Yup.string().matches(BASIC_VALIDATORS.email, "Invalid email")
});
