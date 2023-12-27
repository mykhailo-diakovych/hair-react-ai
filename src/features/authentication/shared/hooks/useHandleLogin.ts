import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Crisp } from "crisp-sdk-web";
import { LoginCredentials } from "@services/Authentication/interfaces/LoginCredentials.interface";
import { AuthenticationService } from "@services/Authentication/Authentication.service";
import { Toast } from "@helpers/toast";
import { parseJwt } from "@helpers/parseJwt";
import {
  ROLES,
  ROUTES,
  VIEWMODE_STORAGE_KEY,
  VIEWMODS
} from "@config/constants";

import { GlobalStorage } from "../../../../AppContext";

export const useHandleLogin = () => {
  const { setViewMode } = useContext(GlobalStorage);

  const navigate = useNavigate();

  const handleLogin = async (data: LoginCredentials) => {
    Crisp.chat.close();

    try {
      const { data: response } =
        await AuthenticationService.login<LoginCredentials>(data);

      const { access, refresh } = response;

      AuthenticationService.updateTokens(access, refresh);

      const user = parseJwt(access);

      const isAdmin = user?.role === ROLES.SUPER_ADMIN;

      setViewMode(isAdmin ? VIEWMODS.SUPERADMIN : VIEWMODS.CLINIC);
      localStorage.setItem(
        VIEWMODE_STORAGE_KEY,
        isAdmin ? VIEWMODS.SUPERADMIN : VIEWMODS.CLINIC
      );

      navigate(isAdmin ? ROUTES.CLINICS : ROUTES.CLINIC_PATIENTS);
    } catch (e: any) {
      const {
        response: { data }
      } = e;

      Toast.error(data.detail);
    }
  };

  return handleLogin;
};
