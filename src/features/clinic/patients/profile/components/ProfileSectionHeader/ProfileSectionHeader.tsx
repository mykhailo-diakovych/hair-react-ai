import React from "react";
import { Title } from "@components/Title/Title";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

interface ProfileSectionHeaderProps {
  title: string;
  subTitle?: string;
  additionalContent?: React.ReactNode;
}

export const ProfileSectionHeader = ({
  title,
  subTitle,
  additionalContent,
  ...props
}: ProfileSectionHeaderProps) => {
  return (
    <FlexGroup alignItems={"start"} flexWrap={"wrap"} spread {...props}>
      <FlexGroup compact column alignItems={"baseline"} gap={0}>
        <Title as={"h2"} level={1}>
          {title}
        </Title>

        <Paragraph size={"lg"} fontWeight={500} color={"mineshaft3"}>
          {subTitle}
        </Paragraph>
      </FlexGroup>

      {additionalContent}
    </FlexGroup>
  );
};
