import * as Yup from "yup";
import { BASIC_VALIDATORS } from "@config/constants";

export const ResetPasswordEmailFormSchema = Yup.object().shape({
  email: Yup.string()
    .matches(BASIC_VALIDATORS.email, "Invalid email")
    .required("Required")
});
