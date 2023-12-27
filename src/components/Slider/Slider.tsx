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
  onClickAuto?: () => any | void;
  showQuantity?: boolean;
  $isActive?: boolean;
  $vertical?: boolean;
  $backgroundImage?: string;
  $showMarks?: boolean;
  outerStyles?: React.CSSProperties;
  onChangeDebounced?: Function;
  onValueChange?: Function;
  [key: string]: any;
}

export const SliderBase = ({
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
  onClickAuto,
  showQuantity = true,
  disabled,
  outerStyles = {},
  $isActive = false, // props for styled component
  $backgroundImage, // props for styled component
  $showMarks, // props for styled component
  ...props
}: SliderProps) => {
  return (
    <GroupItems
      style={{
        ...(disabled
          ? { opacity: 0.3, cursor: "not-allowed", transition: "opacity 0.2s" }
          : { transition: "opacity 0.2s" }),
        ...outerStyles
      }}
      className={"slider-container"}
      gap={props?.isActive ? 14 : 0}
    >
      <FlexGroup centerY spread>
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

                if (onClickAuto) {
                  onClickAuto();
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
          disabled={disabled}
          onChange={(value) => {
            if (onValueChange) {
              onValueChange(value);
            }
          }}
          {...props}
          vertical={vertical}
          marks={props.marks}
        />
      </FlexGroup>
    </GroupItems>
  );
};
