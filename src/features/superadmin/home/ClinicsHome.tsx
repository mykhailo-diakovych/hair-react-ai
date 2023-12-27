import React from "react";
import { ClinicsSimulations } from "@features/superadmin/home/components/Simulations/ClinicsSimulations";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Sidebar } from "@components/Sidebar/styled/Sidebar.styled";
import { Container } from "@components/Container/Container.styled";

export const ClinicsHome = () => {
  return (
    <SiteWrapper>
      <Sidebar />

      <Container>
        <ClinicsSimulations />
      </Container>
    </SiteWrapper>
  );
};
