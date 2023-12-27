import { useNavigate } from "react-router-dom";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { useSwitchRole } from "@hooks/useSwitchRole";
import { useCreateClinicMutation } from "@hooks/query/clinic/useCreateClinicMutation";
import { Toast } from "@helpers/toast";
import { CreateClinicSchema } from "@features/superadmin/clinics/create/validators/CreateClinicSchema";
import { CreateClinicForm } from "@features/superadmin/clinics/create/components/CreateClinicForm/CreateClinicForm";
import { API_SERVICES, ROUTES, VIEWMODS } from "@config/constants";

export interface CreateClinicFormValues {
  name: string;
  email: string;
  website_url: string;
}

export const CreateClinic = ({
  setOpenCreateClinicModal
}: {
  setOpenCreateClinicModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formInitialValues: CreateClinicFormValues = {
    name: "",
    email: "",
    website_url: ""
  };

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const createClinicMutation = useCreateClinicMutation();

  const switchRole = useSwitchRole();

  const createClinicHandler = async (
    { website_url, ...values }: CreateClinicFormValues,
    actions: FormikHelpers<CreateClinicFormValues>
  ) => {
    const url = new URL(website_url);
    const urlOrigin = url.origin; // autocomplete url when valid

    createClinicMutation(
      { ...values, website_url: urlOrigin },
      {
        onSuccess: (clinic) => {
          actions.resetForm();

          setOpenCreateClinicModal(false);

          queryClient.invalidateQueries({
            predicate: (query) =>
              query.queryKey.includes(API_SERVICES.CLINIC.invalidationKey)
          });

          switchRole({
            viewMode: VIEWMODS.CLINIC,
            clinicId: clinic.id
          });

          navigate(ROUTES.CLINIC_PATIENTS);
        },
        onError: (err: any) => {
          const errors = err.response.data;
          for (const message of Object.values(errors).flat()) {
            Toast.error(message as string);
          }
        }
      }
    );
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={createClinicHandler}
      validationSchema={CreateClinicSchema}
      validateOnMount
      validateOnBlur
    >
      <CreateClinicForm closeModal={() => setOpenCreateClinicModal(false)} />
    </Formik>
  );
};
