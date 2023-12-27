import React from "react";
import { AuthenticationLayout } from "@features/authentication/shared/layout/AuthenticationLayout";
import { ResetPasswordForm } from "@features/account/ResetPassword/components/ResetPasswordForm/ResetPasswordForm";

export const ResetPassword = () => {
  return (
    <AuthenticationLayout title={"Reset password"}>
      <ResetPasswordForm />
    </AuthenticationLayout>
  );
};
