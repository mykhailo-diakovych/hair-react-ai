import React from "react";
import AntTextArea from "antd/es/input/TextArea";
import { TextAreaProps as AntTextAreaProps } from "antd/es/input";
import { IconSprite } from "@components/Icon/IconSprite";

export interface TextAreaProps extends AntTextAreaProps {
  className?: string;
  icon?: string;
}

export const TextAreaBase = ({ className, ...props }: TextAreaProps) => {
  return (
    <div className={className}>
      <IconSprite
        className="text-area__icon"
        iconName={props.icon || ""}
        style={{ width: 16, height: 16 }}
      />

      <AntTextArea {...props} />
    </div>
  );
};
