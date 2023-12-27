import React, { useState } from "react";
import { PatientTypes } from "@services/Patients/interfaces/PatientTypes.type";
import { PatientsList } from "@features/clinic/patients/home/components/PatientsList/PatientsList";
import { ControlledTabs } from "@components/Tabs/variants/ControlledTabs";

export const PatientsTabs = () => {
  const [searchValue, setSearchValue] = useState("");

  const patientsTabs = [
    {
      label: "All",
      key: "1",
      children: (
        <PatientsList searchValue={searchValue} tabView={PatientTypes.ALL} />
      )
    },
    {
      label: "Consultations",
      key: "2",
      children: (
        <PatientsList
          searchValue={searchValue}
          tabView={PatientTypes.CONSULTATION}
        />
      )
    },
    {
      label: "Leads",
      key: "3",
      children: (
        <PatientsList searchValue={searchValue} tabView={PatientTypes.LEAD} />
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
    />
  );
};
