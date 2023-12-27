import { usePhoneValidation } from "react-international-phone";
import React, { useContext, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { CreatePatientResponse } from "@services/Patients/interfaces/createPatientResponse.interface";
import { CreateLeadPatientRequest } from "@services/Patients/interfaces/createPatientRequest.interface";
import { useCreateLeadPatientMutation } from "@hooks/query/patients/useCreateLeadPatient";
import { Toast } from "@helpers/toast";
import { ContactInfoFormSchema } from "@features/client/home/components/ClientTabs/components/ContactInfoForm/validators/ContactInfoFormSchema";
import { ContactFormInput } from "@features/client/home/components/ClientTabs/components/ContactInfoForm/styled/ContactFormInput.styled";
import { ContactFormButton } from "@features/client/home/components/ClientTabs/components/ContactInfoForm/styled/ContactFormButton.styled";
import { ClientTabsContext } from "@features/client/home/components/ClientTabs/ClientTabs.context";
import { ClientContext } from "@features/client/home/Client.context";
import { Title } from "@components/Title/Title";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { PhoneInput } from "@components/Input/styled/PhoneInput.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { Form } from "@components/Form/styled/Form.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { DeepArSettings } from "@components/DeepArCanvas/interfaces/DeepArSettings.interface";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

export interface ContactInfoFormProps {
  name: string;
  email: string;
  phone: string;
}

export const ContactInfoForm = ({ className }: { className?: string }) => {
  const { clinicId: id, clinic } = useContext(ClientContext);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);

  const formInitialValues = {
    name: "",
    email: "",
    phone: ""
  };

  const { leadPatient, setLeadPatient, originalImage, image } =
    useContext(ClientTabsContext);

  const createPatientMutation = useCreateLeadPatientMutation();

  const isPhoneRequired = clinic?.phone_required;

  const handleCreatePatient = async (
    values: ContactInfoFormProps,
    actions: FormikHelpers<ContactInfoFormProps>
  ): Promise<CreatePatientResponse> => {
    return new Promise((resolve, reject) => {
      const newPatient: CreateLeadPatientRequest = {
        ...values,
        clinic: id as string,
        parent_img_id: clinic?.auto_email_patient
          ? (originalImage?.parent as string)
          : (image?.parent as string),
        arSettings: {} as DeepArSettings
      };

      setIsCreatingProfile(true);

      createPatientMutation(newPatient, {
        onSuccess: (patientData) => {
          if (setLeadPatient) {
            setLeadPatient(patientData);
          }

          setIsCreatingProfile(false);
          actions.resetForm();

          resolve(patientData);
        },
        onError: (e: any) => {
          Toast.error(e.message);

          setIsCreatingProfile(false);

          reject();
        }
      });
    });
  };

  const handleGetSimulationLink = async (
    values: ContactInfoFormProps,
    actions: FormikHelpers<ContactInfoFormProps>
  ) => {
    if (!leadPatient) {
      await handleCreatePatient(values, actions);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={handleGetSimulationLink}
      validationSchema={ContactInfoFormSchema({ phone: isPhoneRequired })}
      validateOnMount
    >
      {(formik) => {
        const phoneValidation = usePhoneValidation(formik.values.phone);

        return (
          <Form
            className={className}
            onSubmit={formik.handleSubmit}
            style={{
              padding: "40px 30px 30px",
              flex: "initial"
            }}
          >
            <FlexGroup center centerY column>
              <Title style={{ fontSize: 22 }}>
                We’ll email your Simulation
              </Title>

              <Paragraph size={"lg"}>
                Our team will also review your results
              </Paragraph>
            </FlexGroup>

            {!leadPatient ? (
              <>
                <GroupItems style={{ marginBottom: 12 }}>
                  <ContactFormInput fieldName="email" placeholder="Email" />
                  <ContactFormInput fieldName="name" placeholder="Name" />

                  {isPhoneRequired ? (
                    <PhoneInput
                      value={formik.values.phone}
                      onChange={(phone: string) =>
                        formik.setFieldValue("phone", phone)
                      }
                    />
                  ) : null}
                </GroupItems>

                <GroupItems>
                  <ContactFormButton
                    disabled={
                      formik.errors.email ||
                      formik.errors.name ||
                      (!phoneValidation.isValid && isPhoneRequired) ||
                      isCreatingProfile
                    }
                    onClick={formik.handleSubmit}
                  >
                    Access Simulations
                    {isCreatingProfile && (
                      <IconSprite
                        iconName={"common/spinner"}
                        style={{ marginLeft: 5, width: 16, height: 16 }}
                      />
                    )}
                  </ContactFormButton>
                </GroupItems>
              </>
            ) : (
              <ButtonPrimary
                onClick={() => {
                  window.location.href = clinic?.website_url || "";
                }}
              >
                Back to Clinic
              </ButtonPrimary>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
