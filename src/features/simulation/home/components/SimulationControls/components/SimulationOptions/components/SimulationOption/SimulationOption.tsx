import React from "react";
import { getIconUrl } from "@helpers/getIconUrl";
import { StyledSimulationOption } from "@features/simulation/home/components/SimulationControls/components/SimulationOptions/components/SimulationOption/styled/SimulationOption.styled";
import { SimulationHairOption } from "@config/constants";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonProps } from "@components/Button/Button";

interface SimulationOptionProps extends ButtonProps {
  option: SimulationHairOption;
  useInlineIcons?: boolean;
  selected?: boolean;
}

export const SimulationOption = ({
  option,
  selected = false,
  ...props
}: SimulationOptionProps) => {
  return (
    <StyledSimulationOption $selected={selected} {...props}>
      {option?.iconName &&
        (option?.format && option?.format !== "svg" ? (
          <StyledImage
            src={getIconUrl(`${option.iconName}.${option?.format}`)}
            style={option.style ?? {}}
          />
        ) : (
          <IconSprite iconName={option.iconName} style={option.style ?? {}} />
        ))}

      {option?.label && !option.hideLabel ? (
        <FlexGroup mt={"auto"} centerY gap={10} center={!option.isColor}>
          {option.isColor && (
            <div
              style={{
                backgroundColor: option.value,
                borderRadius: 8,
                width: 24,
                height: 24
              }}
            ></div>
          )}

          <Paragraph style={{ textTransform: "capitalize" }} size={"lg"}>
            {option.label}
          </Paragraph>
        </FlexGroup>
      ) : null}
    </StyledSimulationOption>
  );
};
