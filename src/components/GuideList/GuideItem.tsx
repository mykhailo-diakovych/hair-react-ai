import React from "react";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

import { IGuideItem } from "../../interfaces/guideItem.interface";

export const GuideItem = ({
  item,
  bullet,
  counter
}: {
  item: IGuideItem;
  bullet?: string;
  counter: string;
}) => {
  return (
    <FlexGroup column>
      <FlexGroup centerY>
        {bullet ? <IconSprite iconName={bullet} /> : counter}

        <Paragraph size="xl">{item.title}</Paragraph>
      </FlexGroup>

      {item.component}
    </FlexGroup>
  );
};
