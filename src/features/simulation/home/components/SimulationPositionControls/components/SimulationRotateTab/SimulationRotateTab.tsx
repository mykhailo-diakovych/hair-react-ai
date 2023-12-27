import React, { useContext } from "react";
import { SimulationSettings } from "@features/simulation/home/components/SimulationControls/SimulationSettingsContext";
import { ROTATE_SLIDER } from "@config/constants";
import { Slider } from "@components/Slider/styled/Slider.styled";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const SimulationRotateTab = () => {
  const { rotate, setRotate } = useContext(SimulationSettings);

  return (
    <FlexGroup padding={20} paddingTop={0} compact column>
      <GroupItems gap={20}>
        <Slider
          $isActive
          label={"Rotate on x-axis"}
          min={ROTATE_SLIDER.min}
          max={ROTATE_SLIDER.max}
          step={ROTATE_SLIDER.step}
          defaultValue={ROTATE_SLIDER.default}
          auto
          value={rotate?.x}
          onValueChange={(value: number) =>
            setRotate((prevState) => ({ ...prevState, x: value }))
          }
        />

        <Slider
          $isActive
          label={"Rotate on y-axis"}
          min={ROTATE_SLIDER.min}
          max={ROTATE_SLIDER.max}
          step={ROTATE_SLIDER.step}
          defaultValue={ROTATE_SLIDER.default}
          auto
          value={rotate?.y}
          onValueChange={(value: number) =>
            setRotate((prevState) => ({ ...prevState, y: value }))
          }
        />

        {/* <Slider
          $isActive
          label={"Rotate on z-axis"}
          min={ROTATE_SLIDER.min}
          max={ROTATE_SLIDER.max}
          step={ROTATE_SLIDER.step}
          defaultValue={ROTATE_SLIDER.default}
          auto
          value={rotate?.z}
          onValueChange={(value: number) =>
            setRotate((prevState) => ({ ...prevState, z: value }))
          }
        /> */}
      </GroupItems>
    </FlexGroup>
  );
};
