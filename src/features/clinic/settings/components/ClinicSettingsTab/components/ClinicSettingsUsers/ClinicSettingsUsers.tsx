import React from "react";
import { ClinicFull } from "@services/Clinic/interfaces/Clinic.interface";
import { ClinicSettingsUsersWrapper } from "@features/clinic/settings/components/ClinicSettingsTab/components/ClinicSettingsUsers/styled/ClinicSettingsUsersWrapper.styled";
import { ClinicSettingsUser } from "@features/clinic/settings/components/ClinicSettingsTab/components/ClinicSettingsUser/ClinicSettingsUser";

export const ClinicSettingsUsers = ({
  clinic
}: {
  clinic?: ClinicFull | null;
}) => {
  return (
    <ClinicSettingsUsersWrapper>
      {clinic?.clinicUsers?.map((user) => (
        <ClinicSettingsUser user={user} key={user.user} />
      ))}
    </ClinicSettingsUsersWrapper>
  );
};
