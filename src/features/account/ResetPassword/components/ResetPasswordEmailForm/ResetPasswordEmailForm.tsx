import { useNavigate } from "react-router-dom";
import React from "react";
import { Formik } from "formik";
import { AccountService } from "@services/Account/Account.service";
import { Toast } from "@helpers/toast";
import { ResetPasswordEmailFormSchema } from "@features/account/ResetPassword/components/ResetPasswordEmailForm/validators/ResetPasswordEmailFormSchema";
import { ROUTES } from "@config/constants";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FormInput } from "@components/Input/styled/FormInput.styled";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { Form } from "@components/Form/styled/Form.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

export const ResetPasswordEmailForm = ({
  className,
  onFormSubmitted,
  isEmailSent
}: {
  className?: string;
  onFormSubmitted?: () => void;
  isEmailSent: boolean;
}) => {
  const formInitialValues = {
    email: ""
  };

  const navigate = useNavigate();

  const handleResetPassword = async ({ email }: { email: string }) => {
    if (isEmailSent) {
      if (onFormSubmitted) {
        onFormSubmitted();
      }

      return;
    }

    try {
      const response = await AccountService.sendResetPasswordLink(email);

      if (response.errors) {
        throw new Error("Error while sending reset password link");
      }

      Toast.success(`Password reset link sent to ${email}`);

      if (onFormSubmitted) {
        onFormSubmitted();
      }
    } catch (e) {
      Toast.error(`Error while sending password reset link to ${email}`);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleResetPassword}
      validationSchema={ResetPasswordEmailFormSchema}
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
              fieldName="email"
              placeholder="Email"
              label={"Your email address"}
            />
          </GroupItems>

          <ButtonPrimary
            mb={32}
            disabled={!formik.isValid}
            onClick={formik.handleSubmit}
          >
            Send reset password link
          </ButtonPrimary>

          <FlexGroup gap={8} center centerY compact>
            <Paragraph size={"lg"}>Go back to </Paragraph>

            <ButtonText
              to={"#!"}
              fontWeight={700}
              color="malibuLight"
              onClick={() => {
                navigate(ROUTES.LOGIN);
              }}
            >
              Sign in
            </ButtonText>
          </FlexGroup>
        </Form>
      )}
    </Formik>
  );
};
