import React from "react";
import { Slider as AntSlider, SliderSingleProps as AntSliderProps } from "antd";
import { getImageUrl } from "@helpers/getImageUrl";
import { formatNumber } from "@helpers/formatNumber";
import { StyledSliderValue } from "@components/Slider/styled/Slider.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

interface SliderProps extends AntSliderProps {
  label?: string;
  iconName?: string;
  sliderIcon?: string;
  unit?: string;
  auto?: boolean;
  showQuantity?: boolean;
  $isActive?: boolean;
  $vertical?: boolean;
  $backgroundImage?: string;
  $showMarks?: boolean;
  outerStyles?: React.CSSProperties;
  onChangeDebounced?: Function;
  onValueChange?: Function;
}

export const SliderVerticalBase = ({
  label,
  vertical,
  iconName,
  value,
  defaultValue,
  onChangeDebounced,
  onValueChange,
  sliderIcon,
  unit = "",
  auto = false,
  showQuantity = true,
  $isActive = false, // props for styled component
  $backgroundImage, // props for styled component
  outerStyles,
  ...props
}: SliderProps) => {
  return (
    <FlexGroup
      alignItems={"end"}
      compact
      className={"slider-outer"}
      style={outerStyles}
    >
      <FlexGroup className={"slider-controls"} centerY spread>
        <Paragraph size={"lg"} className={"slider-label"}>
          {label}
        </Paragraph>

        <FlexGroup compact centerY>
          {auto && (
            <ButtonText
              onClick={() => {
                const currentValue = defaultValue as number;

                if (onValueChange) {
                  onValueChange(currentValue);
                }
              }}
              color={"malibuLight"}
            >
              Auto
            </ButtonText>
          )}

          {showQuantity && (
            <StyledSliderValue size={"lg"}>
              {formatNumber(
                typeof value === "number" ? value : defaultValue || 0
              )}
              {unit}
            </StyledSliderValue>
          )}
        </FlexGroup>
      </FlexGroup>

      <GroupItems className={"slider-container"} gap={14}>
        <FlexGroup className={"slider-wrapper"}>
          <AntSlider
            tooltip={{
              open: false,
              formatter: (value) => {
                return (
                  <FlexGroup
                    style={{ overflow: "hidden", height: "100%" }}
                    className={`slider-tooltip ${
                      vertical ? "slider-tooltip-vertical" : ""
                    }`}
                    gap={0}
                    column
                    spread
                    center
                    centerY
                  >
                    <Paragraph size="sm">{label || value}</Paragraph>

                    {iconName && (
                      <IconSprite
                        style={{ flex: "none", width: 15, height: 15 }}
                        iconName={iconName}
                      />
                    )}
                    {sliderIcon && (
                      <StyledImage
                        style={{
                          flex: "none",
                          width: 15,
                          height: 15,
                          objectFit: "contain"
                        }}
                        src={getImageUrl(sliderIcon)}
                      />
                    )}
                  </FlexGroup>
                );
              }
            }}
            defaultValue={defaultValue}
            value={value}
            onChange={(value) => {
              if (onValueChange) {
                onValueChange(value);
              }
            }}
            {...props}
            vertical={true}
          />
        </FlexGroup>
      </GroupItems>
    </FlexGroup>
  );
};
