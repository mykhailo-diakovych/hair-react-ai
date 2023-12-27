import * as Yup from "yup";

export const ResetPasswordFormSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});
