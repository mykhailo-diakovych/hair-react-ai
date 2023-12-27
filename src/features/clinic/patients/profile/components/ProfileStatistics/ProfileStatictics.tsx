import React from "react";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

interface ProfileStatisticsProps {
  label: string;
  value: number;
}

export const ProfileStaticticsBase = ({
  label,
  value,
  ...props
}: ProfileStatisticsProps) => {
  return (
    <FlexGroup centerY compact {...props}>
      <Paragraph size={"lg"} as={"span"}>
        {label}:
      </Paragraph>
      <Paragraph size={"lg"} fontWeight={600} as={"span"}>
        {value}
      </Paragraph>
    </FlexGroup>
  );
};
