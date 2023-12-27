import { ResetPasswordRequest } from "@features/account/ResetPassword/interfaces/ResetPassword.interface";
import { API_SERVICES, ServiceOptions } from "@config/constants";
import { AxiosBaseApiInstance } from "@config/axios";

class AccountServiceApi {
  private serviceName: string;

  public constructor({ serviceName }: ServiceOptions) {
    this.serviceName = serviceName;
  }

  public async sendResetPasswordLink(email: string) {
    const response = await AxiosBaseApiInstance.post(
      `${this.serviceName}${
        API_SERVICES.ACCOUNT.RESET_PASSWORD_EMAIL as string
      }`,
      { email }
    );

    return response?.data;
  }

  public async resetPassword<T = ResetPasswordRequest>(payload: T) {
    const response = await AxiosBaseApiInstance.post(
      `${this.serviceName}${API_SERVICES.ACCOUNT.RESET_PASSWORD as string}`,
      payload
    );

    return response?.data;
  }
}

export const AccountService = new AccountServiceApi(API_SERVICES.ACCOUNT);
