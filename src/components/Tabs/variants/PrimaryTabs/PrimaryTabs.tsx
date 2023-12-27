import { useLocation, useSearchParams } from "react-router-dom";
import React from "react";
import { Tabs, TabsProps } from "antd";

interface PrimaryTabsProps extends TabsProps {
  tabSearchParam: string;
  defaultActiveTab: string;
}

export const PrimaryTabsBase = ({
  tabSearchParam,
  items,
  defaultActiveTab,
  ...props
}: PrimaryTabsProps) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get(tabSearchParam);
  const activeTab = activeTabParam ? activeTabParam : defaultActiveTab;

  const handleTabChange = (key: string) => {
    const params = new URLSearchParams(location.search);

    params.set(tabSearchParam, key);

    setSearchParams(params.toString());
  };

  return (
    <Tabs
      items={items}
      activeKey={activeTab.toString()}
      onChange={handleTabChange}
      {...props}
    />
  );
};
