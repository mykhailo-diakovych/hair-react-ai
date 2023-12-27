import React from "react";
import { SimulationOption } from "@features/simulation/home/components/SimulationControls/components/SimulationOptions/components/SimulationOption/SimulationOption";
import { SimulationHairOption } from "@config/constants";
import { GroupItems } from "@components/GroupItems/GroupItems";

interface SimulationOptionsProps {
  options: SimulationHairOption[];
  selectedOption?: SimulationHairOption;
  setSelectedOption: (option: SimulationHairOption) => void;
  columns?: number;
}

export const SimulationOptions = ({
  options,
  selectedOption,
  setSelectedOption,
  columns = 2
}: SimulationOptionsProps) => {
  return (
    <GroupItems $columns={columns} gap={12}>
      {options.map((option) => (
        <SimulationOption
          key={option.id}
          option={option}
          selected={selectedOption?.id === option.id}
          onClick={() => setSelectedOption(option)}
        />
      ))}
    </GroupItems>
  );
};
