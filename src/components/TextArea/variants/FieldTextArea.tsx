import React from "react";
import { useFormikContext } from "formik";
import { TextAreaProps as AntTextAreaProps } from "antd/es/input";

import { TextArea } from "@components/TextArea/styled/TextArea.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";

export interface InputProps extends AntTextAreaProps {
  className?: string;
  iconName?: string;
  fieldName: string;
  label?: string;
}

export const FieldTextArea = ({
  fieldName,
  iconName,
  label,
  ...props
}: InputProps) => {
  const formik = useFormikContext<{ [key: string]: any }>();

  return (
    <GroupItems gap={0}>
      <label htmlFor={fieldName}>
        <Paragraph mb={10}>{label}</Paragraph>
      </label>

      <TextArea
        id={fieldName}
        defaultValue={formik.values[fieldName]}
        name={fieldName}
        onChange={(e) => {
          formik.setFieldValue(fieldName, e.target.value);
        }}
        icon={iconName}
        {...props}
      />
    </GroupItems>
  );
};
