import React, { useState } from "react";
import { PatientTypes } from "@services/Patients/interfaces/PatientTypes.type";
import { useDebounce } from "@hooks/useDebounce";
import { SimulationsList } from "@features/clinic/home/components/Simulations/components/SimulationsList/SimulationsList";
import { ControlledTabs } from "@components/Tabs/variants/ControlledTabs";

export const Simulations = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const simulationsTabs = [
    {
      label: "All",
      key: "1",
      children: (
        <SimulationsList
          searchValue={debouncedSearchValue}
          tabView={PatientTypes.ALL}
        />
      )
    },
    {
      label: "Consultations",
      key: "2",
      children: (
        <SimulationsList
          searchValue={debouncedSearchValue}
          tabView={PatientTypes.CONSULTATION}
        />
      )
    },
    {
      label: "Leads",
      key: "3",
      children: (
        <SimulationsList
          searchValue={debouncedSearchValue}
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
    />
  );
};
