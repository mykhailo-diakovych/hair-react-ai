import React, { useContext } from "react";
import { SimulationSettings } from "@features/simulation/home/components/SimulationControls/SimulationSettingsContext";
import { SimulationSettingItem } from "@features/simulation/home/components/SimulationControls/components/SimulationSettings/styled/SimulationSettingItem.styled";
import { SimulationOptions } from "@features/simulation/home/components/SimulationControls/components/SimulationOptions/SimulationOptions";
import { SIMULATION_HAIR_STYLE } from "@config/constants";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const SimulationStyleTab = () => {
  const { hairStyle, setHairStyle } = useContext(SimulationSettings);

  return (
    <FlexGroup padding={20} paddingTop={0} compact column>
      <FlexGroup spread>
        <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
          Style
        </Paragraph>

        <ButtonText
          onClick={() => setHairStyle(SIMULATION_HAIR_STYLE[0])}
          color={"malibuLight"}
        >
          Auto
        </ButtonText>
      </FlexGroup>

      <GroupItems gap={0}>
        <SimulationSettingItem style={{ paddingTop: 0 }}>
          <SimulationOptions
            selectedOption={hairStyle}
            setSelectedOption={setHairStyle}
            columns={3}
            options={SIMULATION_HAIR_STYLE}
          />
        </SimulationSettingItem>
      </GroupItems>
    </FlexGroup>
  );
};
