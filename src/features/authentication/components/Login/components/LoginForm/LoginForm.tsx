import { useNavigate } from "react-router-dom";
import React from "react";
import { Formik } from "formik";
import { useToggle } from "@hooks/useToggle";
import { useHandleLogin } from "@features/authentication/shared/hooks/useHandleLogin";
import { LoginFormSchema } from "@features/authentication/components/Login/components/LoginForm/validators/LoginFormSchema";
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

export const LoginForm = ({ className }: { className?: string }) => {
  const formInitialValues = {
    username: "",
    password: ""
  };

  const navigate = useNavigate();

  const [showPassword, toggleShowPassword] = useToggle(false);
  const handleLogin = useHandleLogin();

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleLogin}
      validationSchema={LoginFormSchema}
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
          <GroupItems style={{ marginBottom: 12 }}>
            <FormInput
              fieldName="username"
              placeholder="Username"
              label={"Your email address"}
            />

            <FormInput
              fieldName="password"
              type={!showPassword ? "password" : "text"}
              label={"Your password"}
              placeholder="Password"
              suffix={
                <ButtonIcon $noHoverBg onClick={() => toggleShowPassword()}>
                  <IconSprite
                    iconName={"common/eye"}
                    className={`password-status-icon${
                      showPassword ? " is-visible" : ""
                    }`}
                  />
                </ButtonIcon>
              }
              onPressEnter={() => formik.handleSubmit()}
            />
          </GroupItems>

          <FlexGroup gap={8} mb={24} center centerY compact>
            <Paragraph size={"lg"}>Forgot your password?</Paragraph>

            <ButtonText
              to={"#!"}
              fontWeight={700}
              color="malibuLight"
              onClick={() => {
                navigate(ROUTES.RESET_PASSWORD_EMAIL);
              }}
            >
              Reset
            </ButtonText>
          </FlexGroup>

          <ButtonPrimary
            mb={32}
            disabled={!formik.isValid}
            onClick={() => formik.handleSubmit()}
          >
            Login
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};
