import React from "react";
import { TabsProps } from "antd";
import { Title } from "@components/Title/Title";
import { ControlledTabSearch } from "@components/Tabs/variants/ControlledTabSearch/ControlledTabSearch";
import { StyledTabsExtraContent } from "@components/Tabs/styled/TabsExtraContent.styled";
import { Tabs } from "@components/Tabs/styled/Tabs.styled";

import { FilterButton } from "@components/Tabs/components/FilterButton/styled/FilterButton.styled";

import { ITabs } from "../../../interfaces/ITabs.interface";
import { IFilterTypeOption } from "../../../interfaces/filterTypeOption.interface";

interface IControlledTabsProps extends TabsProps {
  title: string;
  tabs: ITabs;
  searchValue: string;
  tabSearchParam: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter?: IFilterTypeOption;
  setSelectedFilter?: React.Dispatch<React.SetStateAction<IFilterTypeOption>>;
  showFilter?: boolean;
}

export function ControlledTabs({
  title,
  tabs,
  className,
  tabSearchParam,
  setSearchValue,
  selectedFilter,
  setSelectedFilter,
  showFilter,
  tabBarExtraContent,
  ...props
}: IControlledTabsProps) {
  return (
    <Tabs
      wrapperClassName={className + "-wrapper"}
      className={className}
      items={tabs}
      $hideTabs={!tabs || tabs?.length === 1}
      tabSearchParam={tabSearchParam}
      tabBarExtraContent={
        <StyledTabsExtraContent flexWrap={"wrap"} centerY>
          <Title level={2} style={{ fontWeight: 600 }}>
            {title}
          </Title>

          <ControlledTabSearch setSearchValue={setSearchValue} />

          {showFilter && (
            <FilterButton
              style={{ width: "auto" }}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          )}

          {tabBarExtraContent}
        </StyledTabsExtraContent>
      }
      {...props}
    />
  );
}
