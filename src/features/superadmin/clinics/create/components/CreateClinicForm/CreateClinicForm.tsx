import { useTheme } from "styled-components";
import React from "react";
import { useFormikContext } from "formik";
import { CreateClinicFormValues } from "@features/superadmin/clinics/create/CreateClinic";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FieldInput } from "@components/Input/variants/FieldInput";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { Form } from "@components/Form/styled/Form.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

interface CreateClinicFormProps {
  closeModal: () => void;
}

export const CreateClinicForm = ({ closeModal }: CreateClinicFormProps) => {
  const formik = useFormikContext<CreateClinicFormValues>();

  const theme = useTheme();

  return (
    <Form onSubmit={formik.handleSubmit}>
      <GroupItems gap={20} style={{ marginBottom: 30 }}>
        <FieldInput
          fieldName="name"
          placeholder="Clinic name"
          label={"Clinic name *"}
        />

        <FieldInput
          fieldName="website_url"
          placeholder="Clinic website url"
          label={"Clinic website url *"}
          showErrorLabel
        />

        <FieldInput
          fieldName="email"
          placeholder="Clinic email"
          label={"Clinic email *"}
        />
      </GroupItems>

      <FlexGroup compact>
        <ButtonText
          onClick={() => formik.handleSubmit()}
          color={theme.colors.malibuLight}
          style={{ width: "100%" }}
        >
          <Paragraph size={"lg"} fontWeight={500} onClick={closeModal}>
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
            Create new clinic
          </Paragraph>
        </ButtonPrimary>
      </FlexGroup>
    </Form>
  );
};
