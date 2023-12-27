import React from "react";
import { ClinicsPatientsTabs } from "@features/superadmin/patients/components/ClinicsPatientsTabs/ClinicsPatientsTabs";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Sidebar } from "@components/Sidebar/styled/Sidebar.styled";
import { Container } from "@components/Container/Container.styled";

export const ClinicsPatients = () => {
  return (
    <SiteWrapper>
      <Sidebar />

      <Container>
        <ClinicsPatientsTabs />
      </Container>
    </SiteWrapper>
  );
};
