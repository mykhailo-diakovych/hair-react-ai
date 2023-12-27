import React, { useState } from "react";
import { PatientTypes } from "@services/Patients/interfaces/PatientTypes.type";
import { ClinicListTable } from "@features/superadmin/clinics/home/components/ClinicListTable/ClinicListTable";
import { FilterOptions } from "@config/constants";
import { ControlledTabs } from "@components/Tabs/variants/ControlledTabs";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Sidebar } from "@components/Sidebar/styled/Sidebar.styled";
import { Container } from "@components/Container/Container.styled";

export const Clinics = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState(FilterOptions[0]);

  const clinicTabs = [
    {
      label: "",
      key: "1",
      children: (
        <ClinicListTable
          searchValue={searchValue}
          ordering={filterValue.ordering}
          tabView={PatientTypes.ALL}
        />
      )
    }
  ];

  return (
    <SiteWrapper>
      <Sidebar />

      <Container>
        <ControlledTabs
          title="Clinics"
          tabs={clinicTabs}
          tabSearchParam={"clinic"}
          className={"clinic-tabs"}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showFilter
          selectedFilter={filterValue}
          setSelectedFilter={setFilterValue}
        />
      </Container>
    </SiteWrapper>
  );
};
