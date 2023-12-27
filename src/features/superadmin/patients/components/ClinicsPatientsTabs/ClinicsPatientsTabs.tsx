import React, { useState } from "react";
import { PatientTypes } from "@services/Patients/interfaces/PatientTypes.type";
import { ClinicsPatientsList } from "@features/superadmin/patients/components/ClinicsPatientsList/ClinicsPatientsList";
import { FilterOptions } from "@config/constants";
import { ControlledTabs } from "@components/Tabs/variants/ControlledTabs";

export const ClinicsPatientsTabs = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState(FilterOptions[0]);

  const patientsTabs = [
    {
      label: "All",
      key: "1",
      children: (
        <ClinicsPatientsList
          searchValue={searchValue}
          tabView={PatientTypes.ALL}
          ordering={filterValue.ordering}
        />
      )
    },
    {
      label: "Consultations",
      key: "2",
      children: (
        <ClinicsPatientsList
          searchValue={searchValue}
          tabView={PatientTypes.CONSULTATION}
          ordering={filterValue.ordering}
        />
      )
    },
    {
      label: "Leads",
      key: "3",
      children: (
        <ClinicsPatientsList
          searchValue={searchValue}
          tabView={PatientTypes.LEAD}
          ordering={filterValue.ordering}
        />
      )
    }
  ];

  return (
    <ControlledTabs
      title="Profiles"
      tabs={patientsTabs}
      tabSearchParam={"patient"}
      className={"patients-tabs"}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      showFilter
      selectedFilter={filterValue}
      setSelectedFilter={setFilterValue}
    />
  );
};
