import React, { useContext } from "react";
import { SimulationSettings } from "@features/simulation/home/components/SimulationControls/SimulationSettingsContext";
import { HAIRLINE_SLIDER, TRANSLATE_SLIDER } from "@config/constants";
import { Slider } from "@components/Slider/styled/Slider.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const SimulationTranslateTab = () => {
  const { hairLine, setHairLine, translate, setTranslate } =
    useContext(SimulationSettings);

  return (
    <FlexGroup padding={20} paddingTop={0} compact column>
      <FlexGroup spread>
        <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
          Translate
        </Paragraph>

        <ButtonText
          onClick={() => {
            setTranslate({ x: 0, y: 0, z: 0 });
          }}
          color={"malibuLight"}
        >
          Auto
        </ButtonText>
      </FlexGroup>

      <GroupItems gap={20}>
        <Slider
          $isActive
          label={"Hair line"}
          min={HAIRLINE_SLIDER.sliderMin}
          max={HAIRLINE_SLIDER.sliderMax}
          step={HAIRLINE_SLIDER.step}
          value={hairLine}
          onValueChange={(value: number) => {
            setHairLine(value);
          }}
        />

        <Slider
          $isActive
          label={"x-axis"}
          min={TRANSLATE_SLIDER.min}
          max={TRANSLATE_SLIDER.max}
          step={TRANSLATE_SLIDER.step}
          value={translate?.x}
          onValueChange={(value: number) =>
            setTranslate((prevState) => ({ ...prevState, x: value }))
          }
        />

        <Slider
          $isActive
          label={"y-axis"}
          min={TRANSLATE_SLIDER.min}
          max={TRANSLATE_SLIDER.max}
          step={TRANSLATE_SLIDER.step}
          value={translate?.y}
          onValueChange={(value: number) =>
            setTranslate((prevState) => ({ ...prevState, y: value }))
          }
        />

        <Slider
          $isActive
          label={"z-axis"}
          min={TRANSLATE_SLIDER.min}
          max={TRANSLATE_SLIDER.max}
          step={TRANSLATE_SLIDER.step}
          value={translate?.z}
          onValueChange={(value: number) =>
            setTranslate((prevState) => ({ ...prevState, z: value }))
          }
        />
      </GroupItems>
    </FlexGroup>
  );
};
