import * as Yup from "yup";
import { BASIC_VALIDATORS } from "@config/constants";

export const CreateClinicSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name is too short").required("Required"),
  email: Yup.string()
    .matches(BASIC_VALIDATORS.email, "Invalid email")
    .required("Clinic email is required"),
  website_url: Yup.string()
    .matches(
      BASIC_VALIDATORS.url,
      "Website url should start with http or https and have correct top-level domain"
    )
    .required("Website url is required")
});
