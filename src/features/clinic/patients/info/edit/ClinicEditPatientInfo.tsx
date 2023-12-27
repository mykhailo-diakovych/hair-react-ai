import React from "react";
import { Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { Patient } from "@services/Patients/interfaces/Patient.interface";
import { useUpdatePatientFieldsMutation } from "@hooks/query/patients/useUpdatePatientFieldsMutation";
import { Toast } from "@helpers/toast";
import { EditPatientSchema } from "@features/clinic/patients/info/shared/validators/FormValidator";
import { IPatientInfoFormValues } from "@features/clinic/patients/info/shared/interfaces/PatientInfoFormValues.interface";
import { InfoPatientForm } from "@features/clinic/patients/info/shared/components/InfoPatientForm/InfoPatientForm";
import { API_SERVICES } from "@config/constants";

export const ClinicEditPatientInfo = ({
  patientId,
  patient,
  setOpenEditPatientModal
}: {
  patientId: string;
  patient?: Patient;
  setOpenEditPatientModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formInitialValues: IPatientInfoFormValues = {
    name: patient?.name || "",
    phone: patient?.phone || "",
    email: patient?.email || "",
    notes: patient?.notes || ""
  };

  const editPatient = useUpdatePatientFieldsMutation();

  const queryClient = useQueryClient();

  const editPatientHandler = (values: IPatientInfoFormValues) => {
    if (patient) {
      editPatient(
        {
          id: patientId,
          ...values
        },
        {
          onSuccess: () => {
            Toast.success("Patient has been saved successfully");

            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey.includes(API_SERVICES.PATIENTS.invalidationKey)
            });
          },
          onError: (error: any) => {
            Toast.error(
              `Cannot save patient because of an error: ${Object.entries(
                error.response.data
              )
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n")}`
            );
          }
        }
      );

      setOpenEditPatientModal(false);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={editPatientHandler}
      validationSchema={EditPatientSchema}
      validateOnMount
      validateOnBlur
    >
      <InfoPatientForm patient={patient} editMode />
    </Formik>
  );
};
