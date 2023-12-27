import React from "react";
import { useToggle } from "@hooks/useToggle";
import { FilterPopover } from "@components/Tabs/components/FilterButton/components/FilterPopover/FilterPopover";
import { Popover } from "@components/Popover/Popover";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";

import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Button } from "@components/Button/styled/Button.styled";
import { ButtonProps } from "@components/Button/Button";

import { IFilterTypeOption } from "../../../../interfaces/filterTypeOption.interface";

interface IFilterButtonProps extends ButtonProps {
  className?: string;
  selectedFilter: IFilterTypeOption;
  setSelectedFilter: (filter: IFilterTypeOption) => void | any;
}

export const FilterButtonBase = ({
  className,
  selectedFilter,
  setSelectedFilter,
  ...props
}: IFilterButtonProps) => {
  const [filterOpen, toggleFilterOpen] = useToggle(false);

  return (
    <Popover
      open={filterOpen}
      placement="bottomLeft"
      content={
        <FilterPopover
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          toggleFilterOpen={toggleFilterOpen}
        />
      }
      onOpenChange={toggleFilterOpen}
      trigger="click"
      overlayStyle={{ margin: -5 }}
    >
      <Button className={className} {...props}>
        <FlexGroup gap={5} centerY>
          <IconSprite style={{ flex: "0 0 20px" }} iconName="common/filter" />
          <Paragraph size={"md"}>Filter by {selectedFilter.type}</Paragraph>
        </FlexGroup>
      </Button>
    </Popover>
  );
};
