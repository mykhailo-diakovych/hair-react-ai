import { useMutation } from "@tanstack/react-query";
import { AccountService } from "@services/Account/Account.service";
import { ResetPasswordRequest } from "@features/account/ResetPassword/interfaces/ResetPassword.interface";
import { API_SERVICES } from "@config/constants";

export const useResetPasswordMutation = <T = ResetPasswordRequest>() => {
  const { mutate: resetPasswordMutation } = useMutation({
    mutationKey: [
      API_SERVICES.ACCOUNT.serviceName,
      API_SERVICES.ACCOUNT.invalidationKey
    ],
    mutationFn: (payload: T) => {
      return AccountService.resetPassword<T>(payload);
    }
  });

  return resetPasswordMutation;
};
