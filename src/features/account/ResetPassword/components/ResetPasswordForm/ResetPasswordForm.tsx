import { useNavigate } from "react-router-dom";
import React from "react";
import { Formik } from "formik";
import { useToggle } from "@hooks/useToggle";
import { useResetPasswordMutation } from "@hooks/query/account/useResetPasswordMutation";
import { Toast } from "@helpers/toast";
import { ResetPasswordFormSchema } from "@features/account/ResetPassword/components/ResetPasswordForm/validators/ResetPasswordFormSchema";
import { ROUTES } from "@config/constants";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FormInput } from "@components/Input/styled/FormInput.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { Form } from "@components/Form/styled/Form.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

interface ResetPasswordCredentials {
  newPassword: string;
  confirmPassword: string;
}

export const ResetPasswordForm = ({ className }: { className?: string }) => {
  const formInitialValues = {
    newPassword: "",
    confirmPassword: ""
  };

  const navigate = useNavigate();

  const [showNewPassword, toggleShowNewPassword] = useToggle(false);
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false);

  const resetPasswordMutation = useResetPasswordMutation();

  const handleResetPassword = async ({
    newPassword,
    confirmPassword
  }: ResetPasswordCredentials) => {
    if (newPassword === confirmPassword) {
      const params = new URLSearchParams(location.search);

      const uid = params.get("id") || "";
      const token = params.get("key") || "";

      await resetPasswordMutation(
        {
          new_password1: newPassword,
          new_password2: confirmPassword,
          uid,
          token
        },
        {
          onSuccess: ({ detail }) => {
            Toast.success(detail);

            setTimeout(() => {
              navigate(ROUTES.LOGIN);
            }, 1000);
          },
          onError: (e: any) => {
            const error = e.response.data;

            if (error?.token) {
              Toast.error("Token is invalid or expired");
              return;
            }

            if (error?.new_password1 || error?.new_password2) {
              Toast.error(
                error?.new_password1?.at(0) || error?.new_password2?.at(0)
              );
              return;
            }

            Toast.error("Error during password reset");
          }
        }
      );
    } else {
      Toast.error("Passwords do not match");
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleResetPassword}
      validationSchema={ResetPasswordFormSchema}
      validateOnMount
    >
      {(formik) => (
        <Form
          className={className}
          onSubmit={formik.handleSubmit}
          style={{
            padding: 15,
            flex: "initial"
          }}
        >
          <GroupItems style={{ marginBottom: 24 }}>
            <FormInput
              fieldName="newPassword"
              type={!showNewPassword ? "password" : "text"}
              label={"Your new password"}
              suffix={
                <ButtonIcon $noHoverBg onClick={() => toggleShowNewPassword()}>
                  <IconSprite
                    iconName={"common/eye"}
                    className={`password-status-icon${
                      showNewPassword ? " is-visible" : ""
                    }`}
                  />
                </ButtonIcon>
              }
            />

            <FormInput
              fieldName="confirmPassword"
              type={!showConfirmPassword ? "password" : "text"}
              label={"Confirm your new password"}
              suffix={
                <ButtonIcon
                  $noHoverBg
                  onClick={() => toggleShowConfirmPassword()}
                >
                  <IconSprite
                    iconName={"common/eye"}
                    className={`password-status-icon${
                      showConfirmPassword ? " is-visible" : ""
                    }`}
                  />
                </ButtonIcon>
              }
            />
          </GroupItems>

          <ButtonPrimary
            mb={32}
            disabled={!formik.isValid}
            onClick={formik.handleSubmit}
          >
            Change password
          </ButtonPrimary>

          <FlexGroup gap={8} center centerY compact>
            <Paragraph size={"lg"}>Go back to </Paragraph>

            <ButtonText
              to={"#!"}
              fontWeight={700}
              color="malibuLight"
              onClick={() => {
                navigate(ROUTES.RESET_PASSWORD_EMAIL);
              }}
            >
              Reset password email form
            </ButtonText>
          </FlexGroup>
        </Form>
      )}
    </Formik>
  );
};
