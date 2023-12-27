import React from "react";
import { SegmentedValue } from "antd/es/segmented";
import { Segmented } from "antd";
import { FilterOptions } from "@config/constants";

import { StyledFilterPopover } from "@components/Tabs/components/FilterButton/components/FilterPopover/styled/FilterPopover.styled";

import { IFilterTypeOption } from "../../../../../../interfaces/filterTypeOption.interface";

export const FilterPopover = ({
  className,
  selectedFilter,
  setSelectedFilter,
  toggleFilterOpen
}: {
  className?: string;
  selectedFilter: IFilterTypeOption;
  setSelectedFilter: (filter: IFilterTypeOption) => any | void;
  toggleFilterOpen: (state?: boolean) => any | void;
}) => {
  const handleOnChangeFilter = (value: SegmentedValue) => {
    const filterOption = FilterOptions.find((option) => option.value === value);

    if (filterOption) {
      setSelectedFilter(filterOption);
      toggleFilterOpen(false);
    }
  };

  return (
    <StyledFilterPopover index={selectedFilter.index}>
      <Segmented
        className={className}
        options={FilterOptions.map((option) => option.value)}
        onChange={handleOnChangeFilter}
      />
    </StyledFilterPopover>
  );
};
