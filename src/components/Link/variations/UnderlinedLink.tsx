import React from "react";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledLink } from "@components/Link/styled/Link.styled";

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  iconName?: string;
  href: string;
  center?: boolean;
}

export const UnderlinedLink = ({
  children,
  color,
  href,
  iconName,
  center,
  ...props
}: LinkProps) => {
  return (
    <StyledLink color={color} href={href} center={center} {...props}>
      <Paragraph
        iconName={iconName}
        color="inherit"
        size={"lg"}
        style={{
          padding: 5,
          margin: -5,
          textDecoration: "underline"
        }}
      >
        {children}
      </Paragraph>
    </StyledLink>
  );
};
