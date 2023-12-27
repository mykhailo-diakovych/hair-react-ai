import React from "react";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledLink } from "@components/Link/styled/Link.styled";

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  iconName?: string;
  href: string;
  innerStyles?: React.CSSProperties;
  center?: boolean;
}

export const Link = ({
  children,
  color,
  href,
  iconName,
  center,
  innerStyles = {},
  ...props
}: LinkProps) => {
  return (
    <StyledLink color={color} href={href} center={center} {...props}>
      <Paragraph
        as={"span"}
        iconName={iconName}
        color="inherit"
        style={{
          padding: 5,
          margin: -5,
          ...innerStyles
        }}
      >
        {children}
      </Paragraph>
    </StyledLink>
  );
};
