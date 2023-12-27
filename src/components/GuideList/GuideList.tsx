import React from "react";
import { GuideItem } from "@components/GuideList/GuideItem";
import { GroupItems } from "@components/GroupItems/GroupItems";

import { IGuideItem } from "../../interfaces/guideItem.interface";

export const GuideList = ({
  guide,
  bullet,
  gap
}: {
  guide: IGuideItem[];
  bullet?: string;
  gap?: number;
}) => {
  return (
    <GroupItems paddingY={20} gap={gap || 30}>
      {guide.map((item, index) => (
        <GuideItem
          key={item.id}
          item={item}
          counter={`${index + 1}. `}
          bullet={bullet}
        />
      ))}
    </GroupItems>
  );
};
