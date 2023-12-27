import * as Yup from "yup";
import { BASIC_VALIDATORS } from "@config/constants";

export const LoginFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .matches(BASIC_VALIDATORS.email, "Invalid email")
    .required("Required")
});
