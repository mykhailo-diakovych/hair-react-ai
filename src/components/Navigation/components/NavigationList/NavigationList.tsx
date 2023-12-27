import React from "react";

import { StyledNavigationList } from "@components/Navigation/components/NavigationList/styled/NavigationList.styled";
import { NavigationItemType } from "@components/Navigation/components/NavigationItem/NavigationItem.interface";
import { NavigationItem } from "@components/Navigation/components/NavigationItem/NavigationItem";
import { GroupItems } from "@components/GroupItems/GroupItems";

export const NavigationList = ({
  open,
  items
}: {
  open: boolean;
  items: NavigationItemType[];
}) => {
  return (
    <StyledNavigationList>
      <GroupItems gap={0}>
        {items.map((item) => (
          <NavigationItem key={item.id} {...item} />
        ))}
      </GroupItems>
    </StyledNavigationList>
  );
};
