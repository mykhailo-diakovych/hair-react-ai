import { useTheme } from "styled-components";
import React, { useRef } from "react";
import { useField, useFormikContext } from "formik";
import { InputRef, InputProps as AntInputProps } from "antd";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Input } from "@components/Input/styled/Input.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";

export interface InputProps extends AntInputProps {
  className?: string;
  iconName?: string;
  fieldName: string;
  label?: string;
  showErrorLabel?: boolean;
}

export const FieldInput = React.forwardRef<InputRef, InputProps>(
  (
    {
      className,
      fieldName,
      iconName,
      label,
      onChange,
      showErrorLabel = false,
      ...props
    }: InputProps,
    ref
  ) => {
    const formik = useFormikContext<{ [key: string]: any }>();

    const [, meta] = useField(fieldName);

    const theme = useTheme();

    const showFieldError = meta.error && meta.touched;

    const inputRef = useRef<any>();

    return (
      <GroupItems gap={0}>
        <Input
          ref={ref || inputRef}
          label={label}
          id={fieldName}
          className={className}
          value={formik.values[fieldName]}
          name={fieldName}
          onBlur={(e: any) => {
            formik.handleBlur(e);
          }}
          onChange={(e: any) => {
            formik.setFieldValue(fieldName, e.target.value);
            onChange?.(e);
          }}
          prefix={iconName ? <IconSprite iconName={iconName} /> : null}
          {...props}
          {...(showFieldError
            ? {
                style: {
                  ...(props.style ? props.style : {}),
                  borderColor: theme.colors.red
                }
              }
            : {})}
        />

        {showFieldError && showErrorLabel ? (
          <Paragraph
            size={"lg"}
            style={{ textAlign: "right" }}
            color={theme.colors.red}
          >
            {meta.error}
          </Paragraph>
        ) : null}
      </GroupItems>
    );
  }
);
