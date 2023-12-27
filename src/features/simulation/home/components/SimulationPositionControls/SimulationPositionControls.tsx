import React from "react";
import { StyledSimulationPositionControls } from "@features/simulation/home/components/SimulationPositionControls/styled/SimulationPositionControls.styled";
import { SimulationTranslateTab } from "@features/simulation/home/components/SimulationPositionControls/components/SImulationTranslateTab/SimulationTranslateTab";
import { SimulationScaleTab } from "@features/simulation/home/components/SimulationPositionControls/components/SimulationScaleTab/SimulationScaleTab";
import { SimulationRotateTab } from "@features/simulation/home/components/SimulationPositionControls/components/SimulationRotateTab/SimulationRotateTab";
import { SimulationLightingTab } from "@features/simulation/home/components/SimulationPositionControls/components/SimulationLightingTab/SimulationLightingTab";
import { SimulationTabs } from "@features/simulation/home/components/SimulationControls/styled/SimulationTabs.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationPositionControls = () => {
  const tabs = [
    {
      label: (
        <IconSprite
          style={{ width: 24, height: 24 }}
          iconName={"model/controls/position/translate"}
        />
      ),
      key: "1",
      children: <SimulationTranslateTab />
    },
    {
      label: (
        <IconSprite
          style={{ width: 24, height: 24 }}
          iconName={"model/controls/position/rotate"}
        />
      ),
      key: "2",
      children: <SimulationRotateTab />
    },
    {
      label: (
        <IconSprite
          style={{ width: 24, height: 24 }}
          iconName={"model/controls/position/scale"}
        />
      ),
      key: "3",
      children: <SimulationScaleTab />
    },
    {
      label: (
        <IconSprite
          style={{ width: 24, height: 24 }}
          iconName={"model/controls/position/light_direction"}
        />
      ),
      key: "4",
      children: <SimulationLightingTab />
    }
  ];

  return (
    <StyledSimulationPositionControls>
      <FlexGroup p={20} column compact>
        <Paragraph size={"lg"} color={"nobel"} $uppercase>
          Position & Lighting
        </Paragraph>
      </FlexGroup>

      <SimulationTabs
        wrapperClassName={"simulation-tabs__wrapper"}
        items={tabs}
        tabSearchParam={"model-position"}
        initiallyActiveTab={1}
      />
    </StyledSimulationPositionControls>
  );
};
