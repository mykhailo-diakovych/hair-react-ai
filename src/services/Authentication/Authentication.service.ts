import { NavigateFunction } from "react-router-dom";
import { ILoginResponse } from "@services/Authentication/interfaces/LoginResponse.interface";
import { Toast } from "@helpers/toast";
import {
  ACCESS_TOKEN,
  API_SERVICES,
  REFRESH_TOKEN,
  ROUTES,
  ServiceOptions
} from "@config/constants";
import { AxiosBaseApiInstance } from "@config/axios";

class AuthenticationServiceApi {
  private serviceName: string;

  public constructor({ serviceName }: ServiceOptions) {
    this.serviceName = serviceName;
  }

  private clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  public updateTokens(access: string, refresh: string) {
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
  }

  public async login<T>(
    data: T
  ): Promise<{ isError: boolean; data: ILoginResponse }> {
    const response = await AxiosBaseApiInstance.post<
      T,
      { data: ILoginResponse }
    >(this.serviceName + API_SERVICES.AUTHENTICATION.LOGIN, data);

    if (!response) {
      return { isError: true, data: <ILoginResponse>{} };
    }

    return { isError: false, data: response?.data };
  }

  public async logout() {
    this.clearTokens();
  }

  public redirectToLogin(navigate?: NavigateFunction) {
    if (navigate) {
      navigate(ROUTES.LOGIN);
    } else {
      window.location.href = ROUTES.LOGIN;
    }
  }

  public async refreshToken(navigate?: NavigateFunction) {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken) {
      throw new Error("Refresh token is not set");
      return;
    }

    try {
      const response = await AxiosBaseApiInstance.post<
        {
          refresh: string;
        },
        { data: ILoginResponse & { errors: unknown } }
      >(this.serviceName + API_SERVICES.AUTHENTICATION.REFRESH_TOKEN, {
        refresh: localStorage.getItem(REFRESH_TOKEN)
      });

      if (response?.data?.errors) {
        const errorMsg = "Refresh token is invalid";
        Toast.error(errorMsg);

        this.clearTokens();

        this.redirectToLogin(navigate);
        return new Error("Refresh token is invalid");
      }

      const { access, refresh } = response.data;

      this.updateTokens(access, refresh);
    } catch (error) {
      this.clearTokens();
      this.redirectToLogin(navigate);
      return new Error("Refresh token is invalid");
    }
  }

  public async sendResetPasswordLink(email: string) {
    const formData = new FormData();
    formData.set("email", email);

    const response = await AxiosBaseApiInstance.post(
      import.meta.env.VITE_ACCOUNTS_API + "/password/reset/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response?.data;
  }
}

export const AuthenticationService = new AuthenticationServiceApi(
  API_SERVICES.AUTHENTICATION
);
