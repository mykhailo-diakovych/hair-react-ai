import React, { useContext, useState } from "react";
import { SimulationSettings } from "@features/simulation/home/components/SimulationControls/SimulationSettingsContext";
import { DEFAULT_SCALE_SLIDER, SCALE_SLIDER } from "@config/constants";
import { Slider } from "@components/Slider/styled/Slider.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const SimulationScaleTab = () => {
  const { scale, setScale } = useContext(SimulationSettings);

  return (
    <FlexGroup padding={20} paddingTop={0} compact column>
      <FlexGroup spread>
        <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
          Scale
        </Paragraph>

        <ButtonText
          onClick={() => {
            setScale({
              x: DEFAULT_SCALE_SLIDER.x,
              y: DEFAULT_SCALE_SLIDER.y,
              z: DEFAULT_SCALE_SLIDER.z,
              all: DEFAULT_SCALE_SLIDER.all
            });
          }}
          color={"malibuLight"}
        >
          Auto
        </ButtonText>
      </FlexGroup>

      <GroupItems gap={20}>
        <Slider
          $isActive
          label={"all dimensions"}
          min={SCALE_SLIDER.min}
          max={SCALE_SLIDER.max}
          step={SCALE_SLIDER.step}
          value={scale?.all}
          onValueChange={(value: number) => {
            setScale((prevState) => ({
              ...prevState,
              x: value,
              y: value,
              z: value,
              all: value
            }));
          }}
        />

        <Slider
          $isActive
          label={"x-axis"}
          min={SCALE_SLIDER.min}
          max={SCALE_SLIDER.max}
          step={SCALE_SLIDER.step}
          value={scale?.x}
          onValueChange={(value: number) =>
            setScale((prevState) => ({ ...prevState, x: value }))
          }
        />

        <Slider
          $isActive
          label={"y-axis"}
          min={SCALE_SLIDER.min}
          max={SCALE_SLIDER.max}
          step={SCALE_SLIDER.step}
          value={scale?.y}
          onValueChange={(value: number) =>
            setScale((prevState) => ({ ...prevState, y: value }))
          }
        />

        <Slider
          $isActive
          label={"z-axis"}
          min={SCALE_SLIDER.min}
          max={SCALE_SLIDER.max}
          step={SCALE_SLIDER.step}
          value={scale?.z}
          onValueChange={(value: number) =>
            setScale((prevState) => ({ ...prevState, z: value }))
          }
        />
      </GroupItems>
    </FlexGroup>
  );
};
