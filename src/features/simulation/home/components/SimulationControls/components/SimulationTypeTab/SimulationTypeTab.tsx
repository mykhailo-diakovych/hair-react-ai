import React, { useContext } from "react";
import { SimulationSettings } from "@features/simulation/home/components/SimulationControls/SimulationSettingsContext";
import { SimulationSettingItem } from "@features/simulation/home/components/SimulationControls/components/SimulationSettings/styled/SimulationSettingItem.styled";
import { SimulationOptions } from "@features/simulation/home/components/SimulationControls/components/SimulationOptions/SimulationOptions";
import { SIMULATION_HAIR_TYPES } from "@config/constants";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const SimulationTypeTab = () => {
  const {
    hairType,
    setHairType
    // thickness,
    // setThickness
  } = useContext(SimulationSettings);

  return (
    <FlexGroup padding={20} paddingTop={0} compact column>
      <FlexGroup spread>
        <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
          Type
        </Paragraph>

        <ButtonText
          onClick={() => setHairType(SIMULATION_HAIR_TYPES[0])}
          color={"malibuLight"}
        >
          Auto
        </ButtonText>
      </FlexGroup>

      <GroupItems gap={0}>
        <SimulationSettingItem style={{ paddingTop: 0 }}>
          <SimulationOptions
            selectedOption={hairType}
            setSelectedOption={setHairType}
            options={SIMULATION_HAIR_TYPES}
          />

          {/*<Paragraph color={"dustyGray"} size={"lg"} $uppercase>*/}
          {/*  Thickness*/}
          {/*</Paragraph>*/}

          {/*<SimulationOptions*/}
          {/*  selectedOption={thickness}*/}
          {/*  setSelectedOption={setThickness}*/}
          {/*  options={SIMULATION_HAIR_THICKNESS}*/}
          {/*  columns={3}*/}
          {/*/>*/}
        </SimulationSettingItem>
      </GroupItems>
    </FlexGroup>
  );
};
