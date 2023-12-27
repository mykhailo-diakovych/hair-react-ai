import React from "react";
import { SimulationTabs } from "@features/simulation/home/components/SimulationControls/styled/SimulationTabs.styled";
import { StyledSimulationControls } from "@features/simulation/home/components/SimulationControls/styled/SimulationControls.styled";

import { SimulationVolumeTab } from "@features/simulation/home/components/SimulationControls/components/SimulationVolumeTab/SimulationVolumeTab";
import { SimulationTypeTab } from "@features/simulation/home/components/SimulationControls/components/SimulationTypeTab/SimulationTypeTab";
import { SimulationStyleTab } from "@features/simulation/home/components/SimulationControls/components/SimulationStyleTab/SimulationStyleTab";
import { SimulationColourTab } from "@features/simulation/home/components/SimulationControls/components/SimulationColourTab/SimulationColourTab";

import { IconSprite } from "@components/Icon/IconSprite";

export const SimulationControls = () => {
  const tabs = [
    {
      label: (
        <IconSprite
          style={{ width: 24, height: 24 }}
          iconName={"model/controls/colour"}
        />
      ),
      key: "1",
      children: <SimulationColourTab />
    },
    {
      label: (
        <IconSprite
          style={{ width: 24, height: 24 }}
          iconName={"model/controls/type"}
        />
      ),
      key: "2",
      children: <SimulationTypeTab />
    },
    {
      label: (
        <IconSprite
          style={{ width: 24, height: 24 }}
          iconName={"model/controls/style"}
        />
      ),
      key: "3",
      children: <SimulationStyleTab />
    },
    {
      label: (
        <IconSprite
          style={{ width: 24, height: 24 }}
          iconName={"model/controls/volume"}
        />
      ),
      key: "4",
      children: <SimulationVolumeTab />
    }
  ];

  return (
    <StyledSimulationControls>
      <SimulationTabs
        wrapperClassName={"simulation-tabs__wrapper"}
        items={tabs}
        tabSearchParam={"model"}
      />
    </StyledSimulationControls>
  );
};
