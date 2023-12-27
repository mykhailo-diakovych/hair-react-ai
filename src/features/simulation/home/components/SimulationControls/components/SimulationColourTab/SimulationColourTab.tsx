import { useTheme } from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "antd";
import { useEyeDropper } from "@reactuses/core";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { SimulationSettings } from "@features/simulation/home/components/SimulationControls/SimulationSettingsContext";
import { COLOR_PALETTE_BASE } from "@config/constants";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ColorPalette } from "@components/ColorPalette/ColorPalette";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const SimulationColourTab = () => {
  const theme = useTheme();
  const { color, setColor } = useContext(SimulationSettings);

  const [colorPicked, setColorPicked] = useState(color);

  const [, openEyeDropper] = useEyeDropper();

  const handleSetEyeDropperColor = async () => {
    setColorPicked((await openEyeDropper()).sRGBHex);
  };

  useDebounceEffect(
    () => {
      if (color !== colorPicked) {
        setColor(colorPicked);
      }
    },
    200,
    [colorPicked]
  );

  useEffect(() => {
    if (color !== colorPicked) {
      setColorPicked(color);
    }
  }, [color]);

  return (
    <FlexGroup padding={20} paddingTop={0} compact column>
      <FlexGroup spread>
        <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
          Colour
        </Paragraph>

        <ButtonText
          onClick={() => {
            setColor(COLOR_PALETTE_BASE.at(-5) as string);
          }}
          color={"malibuLight"}
        >
          Auto
        </ButtonText>
      </FlexGroup>

      <ColorPalette {...{ activeColor: color, setActiveColor: setColor }} />

      <FlexGroup centerY spread>
        <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
          Choose colour
        </Paragraph>

        <ColorPicker
          value={colorPicked}
          panelRender={(panel) => (
            <div className="ant-color-picker-panel-wrapper">
              {panel}
              <ButtonIcon
                style={{
                  width: 24,
                  height: 24,
                  color: theme.colors.malibuLight
                }}
                onClick={handleSetEyeDropperColor}
                iconName={"button/eye-dropper"}
                $noHoverBg
              />
            </div>
          )}
          onChange={(value, hex) => setColorPicked(hex)}
        />
      </FlexGroup>
    </FlexGroup>
  );
};
