import React, { useRef } from "react";
import { InputRef } from "antd";
import { useDebounceFn } from "@reactuses/core";
import { useToggle } from "@hooks/useToggle";
import { ControlledSearch } from "@components/Tabs/variants/ControlledTabSearch/styled/ControlledSearch.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const ControlledTabSearch = ({
  setSearchValue
}: {
  setSearchValue: (search: string) => void | any;
}) => {
  const searchRef = useRef<InputRef>(null);
  const [isActive, toggleIsActive] = useToggle(false);

  const handleSearch = useDebounceFn((e: any, query: string | null = null) => {
    if (
      searchRef.current?.input?.value &&
      searchRef.current?.input?.value?.length <= 2 &&
      searchRef.current?.input?.value !== ""
    ) {
      return;
    }

    if (query !== null) {
      setSearchValue(query);
      return;
    }

    setSearchValue(searchRef.current?.input?.value || "");
  }, 300);

  return (
    <ControlledSearch
      $isActive={isActive}
      innerRef={searchRef}
      style={{
        maxWidth: 288
      }}
      allowClear={{
        clearIcon: (
          <ButtonIcon
            iconName="common/cross"
            $noHoverBg
            color="#000"
            onClick={(e: any) => handleSearch.run(e, "")}
          />
        )
      }}
      onBlur={(e: any) => {
        if (!e.target.value) {
          toggleIsActive();
        }

        handleSearch.run(null, e.target.value);
      }}
      onChange={(e: any) => {
        handleSearch.run(e);
      }}
      prefix={
        <ButtonIcon
          style={{
            flex: "0 0 20px",
            width: "100%",
            height: "100%"
          }}
          onClick={(e: any) => toggleIsActive()}
        >
          <IconSprite style={{ marginRight: 0 }} iconName="input/search" />
        </ButtonIcon>
      }
      name="search"
      onPressEnter={(e: any) => handleSearch.run(e)}
    />
  );
};
