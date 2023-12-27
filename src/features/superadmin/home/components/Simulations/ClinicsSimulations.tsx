import React, { useState } from "react";
import { PatientTypes } from "@services/Patients/interfaces/PatientTypes.type";
import { ClinicsSimulationsList } from "@features/superadmin/home/components/Simulations/components/ClinicsSimulationsList/ClinicsSimulationsList";
import { FilterOptions } from "@config/constants";
import { ControlledTabs } from "@components/Tabs/variants/ControlledTabs";

export const ClinicsSimulations = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState(FilterOptions[0]);

  const simulationsTabs = [
    {
      label: "All",
      key: "1",
      children: (
        <ClinicsSimulationsList
          searchValue={searchValue}
          ordering={filterValue.ordering}
          tabView={PatientTypes.ALL}
        />
      )
    },
    {
      label: "Consultations",
      key: "2",
      children: (
        <ClinicsSimulationsList
          searchValue={searchValue}
          ordering={filterValue.ordering}
          tabView={PatientTypes.CONSULTATION}
        />
      )
    },
    {
      label: "Leads",
      key: "3",
      children: (
        <ClinicsSimulationsList
          searchValue={searchValue}
          ordering={filterValue.ordering}
          tabView={PatientTypes.LEAD}
        />
      )
    }
  ];

  return (
    <ControlledTabs
      title="Simulations"
      className={"simulations-tabs"}
      tabSearchParam={"simulation"}
      tabs={simulationsTabs}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      showFilter
      selectedFilter={filterValue}
      setSelectedFilter={setFilterValue}
    />
  );
};
