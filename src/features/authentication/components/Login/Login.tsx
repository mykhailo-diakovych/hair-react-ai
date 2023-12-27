import React from "react";
import { AuthenticationLayout } from "@features/authentication/shared/layout/AuthenticationLayout";
import { LoginForm } from "@features/authentication/components/Login/components/LoginForm/LoginForm";

export const Login = () => {
  return (
    <AuthenticationLayout title={"Login"}>
      <LoginForm />
    </AuthenticationLayout>
  );
};
