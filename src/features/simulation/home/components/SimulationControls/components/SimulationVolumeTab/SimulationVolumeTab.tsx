import React, { useContext } from "react";

import { SimulationSettings } from "@features/simulation/home/components/SimulationControls/SimulationSettingsContext";
import { SimulationSettingItem } from "@features/simulation/home/components/SimulationControls/components/SimulationSettings/styled/SimulationSettingItem.styled";
import { SimulationOptions } from "@features/simulation/home/components/SimulationControls/components/SimulationOptions/SimulationOptions";
import {
  HAIR_VOLUME_TOTAL_SLIDER,
  SECTION_VOLUME_SLIDER,
  SIMULATION_SECTION_VOLUME_TYPE,
  SimulationSectionVolume
} from "@config/constants";
import { Slider } from "@components/Slider/styled/Slider.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationVolumeTab = () => {
  const {
    sectionVolumeType,
    setSectionVolumeType,
    sectionVolume,
    setSectionVolume
  } = useContext(SimulationSettings);

  return (
    <FlexGroup padding={20} paddingTop={0} gap={0} compact column>
      <SimulationSettingItem>
        <Slider
          label={"Hair volume total"}
          value={sectionVolume?.r1 + sectionVolume?.r2 + sectionVolume?.r3}
        />
      </SimulationSettingItem>

      <GroupItems gap={0}>
        <SimulationSettingItem>
          <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
            Hair section
          </Paragraph>

          <SimulationOptions
            selectedOption={sectionVolumeType}
            setSelectedOption={setSectionVolumeType}
            columns={3}
            options={SIMULATION_SECTION_VOLUME_TYPE}
          />

          <Slider
            $isActive
            label={"Section volume"}
            min={SECTION_VOLUME_SLIDER.min}
            max={SECTION_VOLUME_SLIDER.max}
            marks={SECTION_VOLUME_SLIDER.marks}
            step={null}
            $showMarks={false}
            auto
            value={sectionVolume[sectionVolumeType?.value]}
            defaultValue={
              sectionVolumeType.value === "r1"
                ? HAIR_VOLUME_TOTAL_SLIDER.default
                : SECTION_VOLUME_SLIDER.default
            }
            onValueChange={(value: number) =>
              setSectionVolume(
                (prevSectionVolume: SimulationSectionVolume) => ({
                  ...prevSectionVolume,
                  [sectionVolumeType?.value]: value
                })
              )
            }
          />
        </SimulationSettingItem>
      </GroupItems>
    </FlexGroup>
  );
};
