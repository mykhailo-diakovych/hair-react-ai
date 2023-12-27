import { useTheme } from "styled-components";
import React, { useMemo } from "react";
import { useFormikContext } from "formik";
import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { IPatientInfoFormValues } from "@features/clinic/patients/info/shared/interfaces/PatientInfoFormValues.interface";
import { FieldTextArea } from "@components/TextArea/variants/FieldTextArea";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FieldInput } from "@components/Input/variants/FieldInput";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { Form } from "@components/Form/styled/Form.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";
import { Button } from "@components/Button/styled/Button.styled";

interface InfoPatientFormProps {
  patient?: Patient;
  editMode?: boolean;
}

export const InfoPatientForm = ({
  patient,
  editMode = false
}: InfoPatientFormProps) => {
  const formik = useFormikContext<IPatientInfoFormValues>();

  const theme = useTheme();

  const isValuesChanged =
    patient?.name !== formik.values.name ||
    patient?.phone !== formik.values.phone ||
    patient?.email !== formik.values.email ||
    patient?.notes !== formik.values.notes;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <GroupItems gap={20} style={{ marginBottom: 30 }}>
        <FieldInput
          fieldName="name"
          placeholder="Your name"
          label={"Full name *"}
        />

        <FieldInput
          fieldName="phone"
          placeholder="Your phone number"
          label={"Phone number"}
        />

        <FieldInput
          fieldName="email"
          placeholder="Your email"
          label={"Email"}
        />

        <FieldTextArea
          fieldName={"notes"}
          placeholder={"Notes"}
          label={"Notes"}
        />
      </GroupItems>

      <FlexGroup compact>
        {editMode ? (
          <Button
            border={"none"}
            style={{ color: theme.colors.scorpion }}
            color={theme.colors.gray7}
            onClick={() => {
              formik.handleSubmit();
            }}
            disabled={!isValuesChanged || !formik.isValid}
          >
            <Paragraph size={"lg"} fontWeight={500}>
              Save changes
            </Paragraph>
          </Button>
        ) : (
          <>
            <ButtonText
              onClick={() => formik.handleSubmit()}
              color={theme.colors.malibuLight}
              style={{ width: "100%" }}
            >
              <Paragraph size={"lg"} fontWeight={500}>
                Cancel
              </Paragraph>
            </ButtonText>

            <ButtonPrimary
              disabled={!formik.isValid}
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              <Paragraph size={"lg"} fontWeight={500}>
                Add new patient
              </Paragraph>
            </ButtonPrimary>
          </>
        )}
      </FlexGroup>
    </Form>
  );
};
