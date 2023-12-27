import React, { HTMLAttributes } from "react";

import { IconSprite } from "@components/Icon/IconSprite";

interface ICheckboxProps extends HTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  setChecked?: (state: boolean) => any | void;
  handleOnChange?: (state: boolean) => any | void;
  label?: string;
  disabled?: boolean;
}

export const CheckboxBase = ({
  label,
  checked,
  setChecked,
  className,
  handleOnChange,
  disabled = false,
  ...props
}: ICheckboxProps) => {
  return (
    <label
      className={className}
      style={disabled ? { cursor: "not-allowed" } : {}}
    >
      <input
        checked={checked}
        disabled={disabled}
        style={disabled ? { cursor: "not-allowed" } : {}}
        onChange={(e) => {
          if (setChecked) {
            setChecked(!checked);
          }

          if (handleOnChange) {
            handleOnChange(!checked);
          }
        }}
        type="checkbox"
        {...props}
      />

      <span className="checkbox-icon">
        {
          <IconSprite
            iconName={"input/checkmark"}
            style={{ width: 16, height: 16 }}
          />
        }
      </span>

      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};
