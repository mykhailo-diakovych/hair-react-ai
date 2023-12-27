import React from "react";
import { ApiParams } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { SimulationImageTooltipStyled } from "@features/simulator/components/SimulationProcessVariations/components/SimulationImageSettings/styled/SimulationImageTooltip.styled";
import { SimulationImageParam } from "@features/simulator/components/SimulationProcessVariations/components/SimulationImageSettings/components/SimulationImageParam/SimulationImageParam";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationImageSettings = ({
  apiParams
}: {
  apiParams?: ApiParams;
}) => {
  return (
    <SimulationImageTooltipStyled
      placement="bottom"
      title={
        <FlexGroup column gap={5}>
          <SimulationImageParam
            item={"sampler name"}
            value={apiParams?.sampler_name}
            $uppercase
          />

          <SimulationImageParam
            item={"cfg scale"}
            value={apiParams?.cfg_scale}
            $uppercase
          />

          <SimulationImageParam
            item={"denoising strength"}
            value={apiParams?.denoising_strength}
            $uppercase
          />

          <SimulationImageParam
            item={"steps"}
            value={apiParams?.steps}
            $uppercase
          />

          <SimulationImageParam
            item={"seed"}
            value={apiParams?.seed}
            $uppercase
          />

          <SimulationImageParam item={"prompt"} value={apiParams?.prompt} />

          <SimulationImageParam
            item={"negative prompt"}
            value={apiParams?.negative_prompt}
          />
        </FlexGroup>
      }
    >
      <IconSprite width={16} height={16} iconName="common/info" />
    </SimulationImageTooltipStyled>
  );
};
