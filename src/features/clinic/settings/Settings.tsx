import { useNavigate } from "react-router-dom";
import React from "react";
import { ClinicFull } from "@services/Clinic/interfaces/Clinic.interface";
import { useGetClinicQuery } from "@hooks/query/clinic/useGetClinicQuery";
import { LeadSettingsTab } from "@features/clinic/settings/components/LeadSettingsTab/LeadSettingsTab";
import { ClinicSettingsTab } from "@features/clinic/settings/components/ClinicSettingsTab/ClinicSettingsTab";
import {
  ACCESS_TOKEN,
  CLINIC_STORAGE_KEY,
  REFRESH_TOKEN,
  ROUTES
} from "@config/constants";
import { PrimaryTabs } from "@components/Tabs/variants/PrimaryTabs/styled/PrimaryTabs.styled";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Sidebar } from "@components/Sidebar/styled/Sidebar.styled";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Container } from "@components/Container/Container.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

export const Settings = () => {
  const navigate = useNavigate();

  const clinicId = localStorage.getItem(CLINIC_STORAGE_KEY) as string;

  const { data: clinic } = useGetClinicQuery<unknown, ClinicFull>(
    clinicId,
    true
  );

  return (
    <SiteWrapper>
      <Sidebar />

      <Container>
        <FlexGroup
          compact
          column
          style={{
            marginLeft: "auto",
            width: "100%",
            maxWidth: 175
          }}
        >
          <ButtonPrimary
            onClick={() => {
              localStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(REFRESH_TOKEN);
              navigate(ROUTES.LOGIN);
            }}
            iconName={"navigation/lock"}
            style={{ gap: 8 }}
            iconStyle={{ width: 20, height: 20 }}
          >
            Logout
          </ButtonPrimary>
        </FlexGroup>

        <PrimaryTabs
          tabSearchParam={"settings"}
          defaultActiveTab={"clinic"}
          items={[
            {
              key: "clinic",
              label: "Clinic settings",
              children: <ClinicSettingsTab clinic={clinic} />
            },
            {
              key: "lead",
              label: "Lead capture",
              children: <LeadSettingsTab clinic={clinic} />
            }
          ]}
        />
      </Container>
    </SiteWrapper>
  );
};
