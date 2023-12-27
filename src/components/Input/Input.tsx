import React, { CSSProperties } from "react";
import { Input as AntInput, InputProps as AntInputProps, InputRef } from "antd";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

export interface InputProps extends AntInputProps {
  className?: string;
  label?: string;
  labelExtraContent?: React.ReactNode;
  labelStyles?: CSSProperties;
  innerRef?: React.MutableRefObject<InputRef>;
  [key: string]: any;
}

export const InputBase = ({
  className,
  label,
  hLabel,
  labelExtraContent,
  labelStyles = {},
  innerRef,
  ...props
}: InputProps) => {
  return (
    <>
      {label ? (
        <FlexGroup compact spread>
          <Paragraph style={labelStyles} mb={hLabel ? 0 : 10}>
            {label}
          </Paragraph>

          {labelExtraContent}
        </FlexGroup>
      ) : null}
      <AntInput ref={innerRef} className={className} {...props} />
    </>
  );
};
