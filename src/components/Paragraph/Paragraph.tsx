import { ColorProps, SpaceProps, TypographyProps } from "styled-system";
import { StyledComponentProps } from "styled-components";
import { SizesType } from "src/types/sizes.type";
import React from "react";
import { StyledParagraph } from "@components/Paragraph/styled/ParagraphStyled";
import { IconSprite } from "@components/Icon/IconSprite";

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    SpaceProps,
    ColorProps,
    TypographyProps,
    StyledComponentProps<"p", any, any, any> {
  children?: React.ReactNode;
  size?: SizesType;
  color?: string;
  center?: boolean;
  iconName?: string;
  iconStyles?: React.CSSProperties;
  flexCenter?: boolean;
  $uppercase?: boolean;
}

export const Paragraph = ({
  size = "xl",
  children,
  center,
  iconName,
  iconStyles,
  $uppercase,
  ...props
}: ParagraphProps) => {
  return (
    <StyledParagraph
      size={size}
      center={center}
      iconName={iconName}
      $uppercase={$uppercase}
      {...props}
    >
      {iconName && <IconSprite iconName={iconName} style={iconStyles} />}
      {children}
    </StyledParagraph>
  );
};
