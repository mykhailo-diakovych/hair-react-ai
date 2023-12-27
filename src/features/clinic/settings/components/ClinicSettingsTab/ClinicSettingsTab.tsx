import React from "react";
import { ClinicFull } from "@services/Clinic/interfaces/Clinic.interface";
import { SettingsGroup } from "@features/clinic/settings/components/shared/styled/SettingsGroup.styled";
import { ClinicSettingsMembership } from "@features/clinic/settings/components/ClinicSettingsTab/components/ClinicSettingsMembership/ClinicSettingsMembership";
import { ClinicSettingsInfoForm } from "@features/clinic/settings/components/ClinicSettingsTab/components/ClinicSettingsInfoForm/ClinicSettingsInfoForm";
import { Spinner } from "@components/Spinner/styled/Spinner.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";

export const ClinicSettingsTab = ({
  clinic
}: {
  clinic?: ClinicFull | null;
}) => {
  if (!clinic) {
    return <Spinner />;
  }

  return (
    <GroupItems
      style={{
        maxWidth: 500
      }}
      gap={24}
    >
      <SettingsGroup>
        <Paragraph>Clinic info</Paragraph>

        <ClinicSettingsInfoForm clinic={clinic} />
      </SettingsGroup>

      {/*<SettingsGroup>*/}
      {/*  <Paragraph>Clinic users</Paragraph>*/}

      {/*  <ClinicSettingsUsers clinic={clinic} />*/}

      {/*  <Divider $color={"#d7d7d7"} />*/}

      {/*  <Paragraph>Invite your team users:</Paragraph>*/}

      {/*  <ClinicSettingsInviteForm clinic={clinic} />*/}
      {/*</SettingsGroup>*/}

      <SettingsGroup>
        <ClinicSettingsMembership />
      </SettingsGroup>
    </GroupItems>
  );
};
