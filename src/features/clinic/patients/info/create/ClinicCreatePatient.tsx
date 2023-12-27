import { useNavigate } from "react-router-dom";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { CreatePatientRequest } from "@services/Patients/interfaces/createPatientRequest.interface";
import { ClinicBrief } from "@services/Clinic/interfaces/Clinic.interface";
import { useCreateConsultationPatientMutation } from "@hooks/query/patients/useCreatePatientMutation";
import { useGetClinicQuery } from "@hooks/query/clinic/useGetClinicQuery";
import { Toast } from "@helpers/toast";
import { CreatePatientSchema } from "@features/clinic/patients/info/shared/validators/FormValidator";
import { IPatientInfoFormValues } from "@features/clinic/patients/info/shared/interfaces/PatientInfoFormValues.interface";
import { InfoPatientForm } from "@features/clinic/patients/info/shared/components/InfoPatientForm/InfoPatientForm";
import { API_SERVICES, CLINIC_STORAGE_KEY, ROUTES } from "@config/constants";

export const ClinicCreatePatient = ({
  setOpenCreatePatientModal
}: {
  setOpenCreatePatientModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const clinicId = localStorage.getItem(CLINIC_STORAGE_KEY) as string;

  const { data: clinic } = useGetClinicQuery<unknown, ClinicBrief>(
    clinicId,
    true
  );

  const formInitialValues: IPatientInfoFormValues = {
    name: "",
    phone: "",
    email: "",
    notes: ""
  };

  const queryClient = useQueryClient();
  const createPatient = useCreateConsultationPatientMutation();

  const navigate = useNavigate();

  const createPatientHandler = async (
    values: IPatientInfoFormValues,
    actions: FormikHelpers<IPatientInfoFormValues>
  ) => {
    try {
      const patientData: CreatePatientRequest = {
        ...values,
        clinic: clinic?.id || ""
      };

      createPatient(patientData, {
        onSuccess: (patient) => {
          Toast.success("Patient has been created successfully");

          actions.resetForm();

          queryClient.invalidateQueries([API_SERVICES.CLINIC.invalidationKey]);
          queryClient.invalidateQueries([
            API_SERVICES.PATIENTS.invalidationKey
          ]);
          queryClient.invalidateQueries([API_SERVICES.MODEL.invalidationKey]);

          setOpenCreatePatientModal(false);

          navigate(ROUTES.VIEW_PATIENT_BY_ID(patient.id));
        },
        onError: (error: any) => {
          Toast.error(
            `Cannot create patient because of an error: ${Object.entries(
              error.response.data
            )
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n")}`
          );
        }
      });
    } catch (e: any) {
      console.log(e);

      Toast.error(`Unexpected error: ${e.message}`);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={createPatientHandler}
      validationSchema={CreatePatientSchema}
      validateOnMount
      validateOnBlur
    >
      <InfoPatientForm />
    </Formik>
  );
};
