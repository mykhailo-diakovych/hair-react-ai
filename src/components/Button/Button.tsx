import { ColorProps, SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { ButtonType } from "src/types/buttonTypes.type";
import React from "react";
import { Button as AntButton } from "antd";
import { IconSprite } from "@components/Icon/IconSprite";
import { IconProps } from "@components/Icon/Icon";

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    SpaceProps,
    ColorProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: any) => void; // to handle onClick functions
  children?: React.ReactNode;
  size?: "large" | "middle" | "small";
  color?: string;
  $hoverColor?: string;
  iconName?: string;
  type?: ButtonType;
  disabled?: boolean;
  iconStyle?: React.CSSProperties;
  $buttonIconBg?: boolean;
  iconProps?: IconProps;
  [key: string]: any;
}

export const ButtonBase = React.forwardRef<ButtonProps, any>(
  (
    {
      className,
      style,
      children,
      onClick,
      color,
      size = "middle",
      type = "primary",
      iconName,
      disabled = false,
      iconStyle = {},
      $buttonIconBg = false,
      iconProps = {},
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const buttonSmallStyles = {
      width: "auto",
      padding: "5px 27px",
      height: "auto",
      borderRadius: theme.general.borderRadius
    };

    return (
      <AntButton
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        type={type}
        color={color}
        className={className}
        style={{ ...style, ...(size === "small" ? buttonSmallStyles : {}) }}
        size={size}
        {...props}
      >
        {iconName && (
          <IconSprite iconName={iconName} style={iconStyle} {...iconProps} />
        )}
        {children}
      </AntButton>
    );
  }
);
