import { LayoutProps, SpaceProps, TypographyProps } from "styled-system";
import { StyledComponentProps } from "styled-components";
import React from "react";
import { StyledTitle } from "@components/Title/styled/StyledTitle.styled";
import { IconSprite } from "@components/Icon/IconSprite";

export interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    SpaceProps,
    TypographyProps,
    LayoutProps,
    StyledComponentProps<"h1", any, any, any> {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  iconName?: string;
  center?: boolean;
  $uppercase?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Title: React.FC<TitleProps> = ({
  level = 1,
  children,
  iconName,
  center,
  ...props
}) => {
  const titleLevel = `h${level}` as never;

  return (
    <StyledTitle
      $center={center}
      as={props.as || titleLevel}
      level={level}
      $iconName={iconName}
      {...props}
    >
      {iconName && <IconSprite iconName={iconName} />}

      {children as never}
    </StyledTitle>
  );
};
