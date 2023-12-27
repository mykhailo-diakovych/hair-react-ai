import * as Yup from "yup";
import { BASIC_VALIDATORS } from "@config/constants";

export const RegistrationFormSchema = Yup.object().shape({
  username: Yup.string().min(3, "Name is too short").required("Required"),
  email: Yup.string()
    .matches(BASIC_VALIDATORS.email, "Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});
