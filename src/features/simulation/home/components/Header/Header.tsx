import React from "react";
import cn from "classnames";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { FlexGroup, FlexGroupProps } from "@components/FlexGroup/FlexGroup";

import { BreadcrumbsStyled } from "@components/Breadcrumbs/styled/Breadcrumbs.styled";

interface SimulationHeaderProps extends FlexGroupProps {
  actionButton?: React.ReactNode;
  firstItem?: React.ReactNode;
  middleItem?: React.ReactNode;
  breadCrumbsItems: ItemType[];
}

export const HeaderBase = ({
  actionButton,
  firstItem,
  middleItem,
  breadCrumbsItems,
  className,
  ...props
}: SimulationHeaderProps) => {
  return (
    <FlexGroup
      className={cn("header__inner", className)}
      compact
      centerY
      spread
      {...props}
    >
      {firstItem || (
        <BreadcrumbsStyled
          className={"header-breadcrumbs"}
          items={breadCrumbsItems}
        />
      )}

      <FlexGroup className={"header-title"} compact centerY>
        {middleItem}
      </FlexGroup>

      {actionButton}
    </FlexGroup>
  );
};
