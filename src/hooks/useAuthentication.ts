import { useNavigate } from "react-router-dom";
import { useCallback, useContext } from "react";
import { ClinicService } from "@services/Clinic/Clinic.service";
import { AuthenticationService } from "@services/Authentication/Authentication.service";
import { parseJwt } from "@helpers/parseJwt";
import {
  ACCESS_TOKEN,
  CLINIC_STORAGE_KEY,
  REFRESH_TOKEN,
  ROLES,
  ROUTES,
  VIEWMODE_STORAGE_KEY,
  VIEWMODS
} from "@config/constants";

import { GlobalStorage } from "../AppContext";

class RefreshTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RefreshTokenError";
  }
}

export const useAuthentication = () => {
  const navigate = useNavigate();

  const { user, setUser, setViewMode } = useContext(GlobalStorage);

  const setUserData = async (token: string) => {
    const data = parseJwt(token);

    const clinicRefCode = data?.clinic_ref;

    if (clinicRefCode) {
      const clinic = await ClinicService.getClinic(clinicRefCode);

      localStorage.setItem(CLINIC_STORAGE_KEY, clinic?.id as string);
      localStorage.setItem(VIEWMODE_STORAGE_KEY, VIEWMODS.CLINIC);
    }

    const storageViewMode = localStorage.getItem(VIEWMODE_STORAGE_KEY);

    if (!storageViewMode) {
      const isAdmin = data?.role === ROLES.SUPER_ADMIN;
      setViewMode(isAdmin ? VIEWMODS.SUPERADMIN : VIEWMODS.CLINIC);
    }

    setUser(data);
  };

  const getAuthenticationData = useCallback(async (withError = true) => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN) || "";
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      const isAccessTokenExpired =
        (parseJwt(accessToken)?.exp || 0) < Date.now() / 1000;

      if (accessToken && !isAccessTokenExpired) {
        setUserData(accessToken);
      } else if (refreshToken) {
        await AuthenticationService.refreshToken(navigate);
      } else if (withError) {
        throw new RefreshTokenError("No found login credentials");
      }
    } catch (error: any) {
      if (error?.name === "RefreshTokenError") {
        try {
          await AuthenticationService.refreshToken(navigate);
        } catch (e) {
          navigate(ROUTES.LOGIN);
        }
      }
    } finally {
      if (!withError) {
        return;
      }

      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        navigate(ROUTES.LOGIN);
      } else {
        setUserData(token);
      }
    }
  }, []);

  return {
    user: user,
    isAdmin: user?.role === ROLES.SUPER_ADMIN,
    getAuthenticationData
  };
};
