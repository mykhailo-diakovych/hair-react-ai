import * as Yup from "yup";
import { BASIC_VALIDATORS } from "@config/constants";

export const ContactInfoFormSchema = ({ phone = true } = {}) =>
  Yup.object().shape({
    name: Yup.string().min(3, "Name is too short").required("Required"),
    email: Yup.string()
      .matches(BASIC_VALIDATORS.email, "Invalid email")
      .required("Required"),
    ...(phone ? { phone: Yup.string().required("Required") } : {})
  });
