import React from "react";
import { StyledTabBar } from "@components/Tabs/styled/TabBar.styled";
import { FlexGroupProps } from "@components/FlexGroup/FlexGroup";

interface TabBarProps extends FlexGroupProps {
  tabBarProps: any;
  tabBarExtraContent?: any;
  DefaultTabBar: React.ComponentType<any>;
}

export const Tabbar = ({
  tabBarProps,
  tabBarExtraContent,
  DefaultTabBar,
  ...props
}: TabBarProps) => {
  return (
    <StyledTabBar centerY spread {...props}>
      {tabBarExtraContent}

      <DefaultTabBar {...tabBarProps} />
    </StyledTabBar>
  );
};
