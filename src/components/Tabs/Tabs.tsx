import { useLocation, useSearchParams } from "react-router-dom";
import React from "react";
import { Tabs, TabsProps } from "antd";
import { TabsWrapper } from "@components/Tabs/styled/Tabs.styled";
import { Tabbar } from "@components/Tabs/components/Tabbar/Tabbar";

interface ITabProps extends TabsProps {
  tabSearchParam: string;
  wrapperClassName?: string;
  $bgColor?: string;
  wrapperStyles?: React.CSSProperties;
  initiallyActiveTab?: number;
  $hideTabs?: boolean;
}

export const TabsBase = ({
  wrapperClassName,
  wrapperStyles,
  className,
  items,
  $bgColor,
  tabBarExtraContent,
  tabSearchParam,
  renderTabBar,
  initiallyActiveTab = 1
}: ITabProps) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get(tabSearchParam);
  const activeTab = activeTabParam
    ? parseInt(activeTabParam, 10)
    : initiallyActiveTab;

  const handleTabChange = (key: string) => {
    const params = new URLSearchParams(location.search);

    params.set(tabSearchParam, key);

    setSearchParams(params.toString());
  };

  const renderTabBarItems: TabsProps["renderTabBar"] = (
    props,
    DefaultTabBar
  ) => (
    <Tabbar
      tabBarExtraContent={tabBarExtraContent}
      DefaultTabBar={DefaultTabBar}
      tabBarProps={props}
    />
  );

  return (
    <TabsWrapper
      className={wrapperClassName}
      style={wrapperStyles}
      $bgColor={$bgColor}
    >
      <Tabs
        renderTabBar={renderTabBar || renderTabBarItems}
        className={className}
        activeKey={activeTab.toString()}
        items={items}
        onChange={handleTabChange}
      />
    </TabsWrapper>
  );
};
