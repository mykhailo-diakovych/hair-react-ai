import { useNavigate } from "react-router-dom";
import React from "react";
import { Formik } from "formik";
import { Crisp } from "crisp-sdk-web";
import { useToggle } from "@hooks/useToggle";
import { useCreateClinicLeadMutation } from "@hooks/query/clinicLead/useCreateClinicLeadMutation";
import { Toast } from "@helpers/toast";
import { useHandleLogin } from "@features/authentication/shared/hooks/useHandleLogin";
import { RegistrationCredentials } from "@features/authentication/interfaces/RegistrationCredentials.interface";
import { RegistrationFormSchema } from "@features/authentication/components/Registration/components/RegistrationForm/validators/RegistrationFormSchema";
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

export const RegistrationForm = ({ className }: { className?: string }) => {
  const formInitialValues = {
    username: "",
    email: "",
    password: ""
  };

  const navigate = useNavigate();

  const [showPassword, toggleShowPassword] = useToggle(false);

  const createClinicLeadMutation = useCreateClinicLeadMutation();
  const handleLogin = useHandleLogin();

  const handleRegister = async (data: RegistrationCredentials) => {
    const paymentPlan = import.meta.env.VITE_PAYMENT_PLAN;

    try {
      createClinicLeadMutation(
        {
          clinic_name: data?.username || "",
          email: data?.email || "",
          password: data?.password || "",
          payment_plan: paymentPlan || ""
        },
        {
          onSuccess: async (clinicUser) => {
            Toast.success("Account has been created successfully");

            Crisp.chat.close();

            window.open(clinicUser.checkout_url) as any;

            setTimeout(async () => {
              await handleLogin({
                username: clinicUser.email,
                password: data.password
              });
            }, 1000);
          },
          onError: (e: any) => {
            const values: string[][] = Object.values(e.response.data);

            for (const valueArray of values) {
              for (const value of valueArray) {
                Toast.error(value as string);
              }
            }
          }
        }
      );
    } catch (error) {
      Toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleRegister}
        validationSchema={RegistrationFormSchema}
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
                fieldName="username"
                placeholder="Username"
                label={"Clinic name"}
              />

              <FormInput
                fieldName="email"
                placeholder="Email"
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

            <ButtonPrimary
              mb={32}
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
            >
              Register
            </ButtonPrimary>

            <FlexGroup gap={8} center centerY compact>
              <Paragraph size={"lg"}>Have already an account?</Paragraph>

              <ButtonText
                to={"#!"}
                fontWeight={700}
                color="malibuLight"
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                }}
              >
                Login
              </ButtonText>
            </FlexGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};
