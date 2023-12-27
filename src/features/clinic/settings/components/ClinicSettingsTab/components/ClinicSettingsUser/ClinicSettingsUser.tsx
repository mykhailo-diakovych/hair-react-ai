import React from "react";
import { ClinicUser } from "@services/Clinic/interfaces/Clinic.interface";
import { ClinicSettingsUserButton } from "@features/clinic/settings/components/ClinicSettingsTab/components/ClinicSettingsUser/styled/ClinicSettingsUserButton.styled";
import { StyledClinicSettingsUser } from "@features/clinic/settings/components/ClinicSettingsTab/components/ClinicSettingsUser/styled/ClinicSettingsUser.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const ClinicSettingsUser = ({ user }: { user: ClinicUser }) => {
  // const deletePatient = useDeletePatientMutation();
  //
  // const handleRemovePatient = () => {
  //   deletePatient(patient.id, {
  //     onSuccess: () => {
  //       Toast.success("Patient deleted successfully");
  //     },
  //     onError: () => {
  //       Toast.error("Something went wrong");
  //     }
  //   });
  // };

  // const showDeleteUserToast = () => {
  //   const toastId = toast(
  //     <GroupItems>
  //       <Paragraph>Are you sure want to delete patient {user.role}?</Paragraph>

  //       <FlexGroup center centerY>
  //         <ButtonPrimaryOutlined
  //           onClick={() => {
  //             toast.dismiss(toastId);
  //           }}
  //           style={{ width: "auto", fontWeight: 400 }}
  //         >
  //           Cancel
  //         </ButtonPrimaryOutlined>

  //         <ButtonPrimary
  //           onClick={() => {
  //             // handleRemovePatient();
  //           }}
  //         >
  //           Delete
  //         </ButtonPrimary>
  //       </FlexGroup>
  //     </GroupItems>
  //   );
  // };

  return (
    <StyledClinicSettingsUser>
      <FlexGroup>
        <StyledImage
          style={{
            flex: "0 0 32px",
            width: 32,
            height: 32,
            overflow: "hidden"
          }}
        />

        <FlexGroup style={{ wordBreak: "break-word" }} gap={0} column>
          <Paragraph size={"lg"} fontWeight={500}>
            {user.role}
          </Paragraph>

          <Paragraph size={"md"} color="mineshaft600">
            {user.user}
          </Paragraph>
        </FlexGroup>
      </FlexGroup>

      <ClinicSettingsUserButton
        onClick={() => {
          // showDeletePatientToast();
        }}
        iconName={"common/cross"}
      />
    </StyledClinicSettingsUser>
  );
};
