import React, { useContext, useState } from "react";
import { SimulationSettings } from "@features/simulation/home/components/SimulationControls/SimulationSettingsContext";
import {
  LIGHTING_AXIS_SLIDER,
  LIGHTING_BRIGHTNESS_SLIDER
} from "@config/constants";
import { Slider } from "@components/Slider/styled/Slider.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const SimulationLightingTab = () => {
  const { lighting, setLighting } = useContext(SimulationSettings);

  return (
    <FlexGroup padding={20} paddingTop={0} compact column>
      <FlexGroup spread>
        <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
          Lighting direction
        </Paragraph>

        <ButtonText
          onClick={() => {
            setLighting({ x: 1, y: 1, z: 1, brightness: 1 });
          }}
          color={"malibuLight"}
        >
          Auto
        </ButtonText>
      </FlexGroup>

      <GroupItems gap={20}>
        <Slider
          $isActive
          label={"Lighting brightness"}
          min={LIGHTING_BRIGHTNESS_SLIDER.min}
          max={LIGHTING_BRIGHTNESS_SLIDER.max}
          step={LIGHTING_BRIGHTNESS_SLIDER.step}
          value={lighting?.brightness}
          onValueChange={(value: number) =>
            setLighting((prevState) => ({ ...prevState, brightness: value }))
          }
        />

        <Slider
          $isActive
          label={"x-axis"}
          min={LIGHTING_AXIS_SLIDER.min}
          max={LIGHTING_AXIS_SLIDER.max}
          step={LIGHTING_AXIS_SLIDER.step}
          value={lighting?.x}
          onValueChange={(value: number) =>
            setLighting((prevState) => ({ ...prevState, x: value }))
          }
        />

        <Slider
          $isActive
          label={"y-axis"}
          min={LIGHTING_AXIS_SLIDER.min}
          max={LIGHTING_AXIS_SLIDER.max}
          step={LIGHTING_AXIS_SLIDER.step}
          value={lighting?.y}
          onValueChange={(value: number) =>
            setLighting((prevState) => ({ ...prevState, y: value }))
          }
        />

        <Slider
          $isActive
          label={"z-axis"}
          min={LIGHTING_AXIS_SLIDER.min}
          max={LIGHTING_AXIS_SLIDER.max}
          step={LIGHTING_AXIS_SLIDER.step}
          value={lighting?.z}
          onValueChange={(value: number) =>
            setLighting((prevState) => ({ ...prevState, z: value }))
          }
        />
      </GroupItems>
    </FlexGroup>
  );
};
