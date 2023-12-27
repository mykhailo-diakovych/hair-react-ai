import React from "react";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup, FlexGroupProps } from "@components/FlexGroup/FlexGroup";

interface SavedSimulationItemProps extends FlexGroupProps {
  item: string;
  value?: any;
  unit?: string;
  $uppercase?: boolean;
}

export const SavedSimulationItem = ({
  item,
  value,
  minWidth,
  unit = "",
  $uppercase,
  ...props
}: SavedSimulationItemProps) => {
  const hideValue = value === undefined || value === null || value === "";

  const isColor = !hideValue && value.toString().at(0) === "#";

  return (
    <FlexGroup minWidth={minWidth} compact spread {...props}>
      <Paragraph $uppercase={$uppercase} size={"lg"} color={"nobel"}>
        {item}:
      </Paragraph>

      {!hideValue && !isColor ? (
        <Paragraph size={"lg"} color={"black"}>
          {`${
            value.toString()[0].toUpperCase() + value.toString().slice(1)
          } ${unit}`.trim()}
        </Paragraph>
      ) : null}

      {isColor && (
        <div
          style={{
            backgroundColor: value,
            borderRadius: 4,
            width: 22,
            height: 22
          }}
        ></div>
      )}
    </FlexGroup>
  );
};
