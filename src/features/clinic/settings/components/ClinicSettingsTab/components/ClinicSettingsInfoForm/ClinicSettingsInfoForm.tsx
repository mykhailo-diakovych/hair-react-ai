import { useTheme } from "styled-components";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { ClinicFull } from "@services/Clinic/interfaces/Clinic.interface";
import { useUpdateClinicMutation } from "@hooks/query/clinic/useUpdateClinicMutation";
import { Toast } from "@helpers/toast";
import { dataUrlToFile } from "@helpers/dataUrlToFile";
import { ClinicInfoFormSchema } from "@features/clinic/settings/components/ClinicSettingsTab/components/ClinicSettingsInfoForm/validators/ClinicInfoFormSchema";
import { API_SERVICES } from "@config/constants";
import { useUploadButton } from "@components/UploadButton/useUploadButton";
import { Spinner } from "@components/Spinner/styled/Spinner.styled";
import { FormInput } from "@components/Input/styled/FormInput.styled";
import { Form } from "@components/Form/styled/Form.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

interface ClinicInfoFormValues {
  clinicName: string;
}

export const ClinicSettingsInfoForm = ({
  clinic
}: {
  clinic?: ClinicFull | null;
}) => {
  const [clinicLogoUrl, setClinicLogoUrl] = useState<string | undefined>(
    clinic?.logo
  );
  const [clinicLogo, setClinicLogo] = useState<File>();

  const theme = useTheme();

  const updateClinic = useUpdateClinicMutation();
  const queryClient = useQueryClient();

  const { component: uploadLogoButton, updateImagePreview } = useUploadButton({
    buttonText: "Click or drop image",
    buttonIcon: "button/upload",
    buttonProps: {
      style: {
        backgroundColor: theme.colors.mystic,
        borderRadius: theme.general.borderRadius,
        overflow: "hidden",
        height: 140
      }
    },
    imageProps: {
      imageStyles: {
        flex: "0 1 auto",
        width: "auto",
        height: "100%",
        objectFit: "none"
      },
      style: {
        flex: "1 1 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }
    },
    uploadButtonProps: {
      showUploadList: false
    },
    onAfterUpload: ({ image: imageBase64, files }) => {
      setClinicLogoUrl(imageBase64);
      setClinicLogo(files?.at(0)?.originFileObj as File);
    }
  });

  const formInitialValues = {
    clinicName: clinic?.name || ""
  };

  const handleSubmitClinicForm = async (values: ClinicInfoFormValues) => {
    if (clinic) {
      updateClinic(
        {
          id: clinic.id,
          ...(values.clinicName ? { name: values.clinicName } : {}),
          ...(clinicLogo ? { logo: clinicLogo } : {})
        },
        {
          onSuccess: () => {
            Toast.success("Clinic info updated successfully");

            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey.includes(API_SERVICES.CLINIC.invalidationKey)
            });
          },
          onError: (error: any) => {
            Toast.error(error?.message);
          }
        }
      );
    }
  };

  const onInitializeClinic = async () => {
    if (clinic) {
      const clinicLogo = clinic?.logo;
      updateImagePreview(clinicLogo);

      const logoFile = await dataUrlToFile(clinicLogo, "logo.jpeg");
      setClinicLogo(logoFile);
      setClinicLogoUrl(clinicLogo);
    }
  };

  useEffect(() => {
    onInitializeClinic();
  }, [clinic]);

  if (!clinic) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={(values) => {
        handleSubmitClinicForm(values);
      }}
      validationSchema={ClinicInfoFormSchema}
      validateOnMount
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <FormInput fieldName={"clinicName"} label={"Clinic name"} />

          {uploadLogoButton}

          {(formik.values.clinicName !== clinic?.name ||
            clinicLogoUrl !== clinic?.logo) && (
            <ButtonPrimary
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Save changes
            </ButtonPrimary>
          )}
        </Form>
      )}
    </Formik>
  );
};
