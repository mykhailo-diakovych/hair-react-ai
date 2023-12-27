import React, { useEffect } from "react";
import { useAuthentication } from "@hooks/useAuthentication";

export const ProtectedRoute = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { getAuthenticationData } = useAuthentication();

  useEffect(() => {
    getAuthenticationData();
  }, []);

  return <>{children}</>;
};
