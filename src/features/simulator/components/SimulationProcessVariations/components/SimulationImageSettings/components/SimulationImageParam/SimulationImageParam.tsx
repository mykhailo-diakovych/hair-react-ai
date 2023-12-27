import React from "react";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup, FlexGroupProps } from "@components/FlexGroup/FlexGroup";

interface SimulationImageParamProps extends FlexGroupProps {
  item: string;
  value?: any;
  $uppercase?: boolean;
}

export const SimulationImageParam = ({
  item,
  value,
  $uppercase,
  ...props
}: SimulationImageParamProps) => {
  return (
    <FlexGroup compact spread {...props}>
      <Paragraph $uppercase={$uppercase} size={"lg"} color={"malibu600"}>
        {item}:
      </Paragraph>

      <Paragraph size={"lg"} color={"black"}>
        {`${value?.toString().toUpperCase()}`}
      </Paragraph>
    </FlexGroup>
  );
};
