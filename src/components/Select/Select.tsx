import React from "react";
import { SelectProps } from "antd";
import { Select as AntSelect } from "antd";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

interface ISelectProps extends SelectProps {
  $isSelected?: boolean;
  label?: string;
}

export const SelectBase = ({ label, ...props }: ISelectProps) => {
  return (
    <FlexGroup
      column
      style={
        props.disabled
          ? { opacity: 0.3, cursor: "not-allowed", transition: "opacity 0.2s" }
          : { transition: "opacity 0.2s" }
      }
    >
      {label && (
        <Paragraph fontWeight={500} size={"lg"}>
          {label}
        </Paragraph>
      )}

      <AntSelect {...props} />
    </FlexGroup>
  );
};
