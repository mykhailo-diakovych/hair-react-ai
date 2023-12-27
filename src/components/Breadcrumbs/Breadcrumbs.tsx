import React from "react";
import { Breadcrumb, BreadcrumbProps } from "antd";
import { IconSprite } from "@components/Icon/IconSprite";

export const BreadcrumbsBase = ({ ...props }: BreadcrumbProps) => {
  return (
    <Breadcrumb
      separator={
        <IconSprite
          iconName={"common/chevron-right"}
          style={{ width: 16, height: 16 }}
        />
      }
      {...props}
    />
  );
};
