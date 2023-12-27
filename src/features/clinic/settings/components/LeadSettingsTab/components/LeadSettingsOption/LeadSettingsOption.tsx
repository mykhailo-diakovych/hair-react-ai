import React from "react";
import { StyledLeadSettingsOption } from "@features/clinic/settings/components/LeadSettingsTab/components/LeadSettingsOption/styled/LeadSettingsOption.styled";
import { Switch } from "@components/Switch/styled/Switch.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export const LeadSettingsOption = ({
  iconName,
  title,
  switchValue,
  onSwitchChange
}: {
  iconName: string;
  title: string;
  switchValue?: boolean;
  onSwitchChange?: (state: boolean) => void | any;
}) => {
  return (
    <StyledLeadSettingsOption spread>
      <FlexGroup gap={16} centerY>
        <IconSprite iconName={iconName} style={{ width: 24, height: 24 }} />

        <Paragraph size={"lg"}>{title}</Paragraph>
      </FlexGroup>

      <Switch
        checked={switchValue}
        onChange={(state) => {
          if (onSwitchChange) {
            onSwitchChange(state);
          }
        }}
      />
    </StyledLeadSettingsOption>
  );
};
