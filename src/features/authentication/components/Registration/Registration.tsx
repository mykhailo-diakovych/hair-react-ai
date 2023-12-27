import React from "react";
import { AuthenticationLayout } from "@features/authentication/shared/layout/AuthenticationLayout";
import { RegistrationForm } from "@features/authentication/components/Registration/components/RegistrationForm/RegistrationForm";

export const Registration = () => {
  return (
    <AuthenticationLayout title={"Sign up"}>
      <RegistrationForm />
    </AuthenticationLayout>
  );
};
