import { useTheme } from "styled-components";
import { NavLink, NavLinkProps } from "react-router-dom";
import React, { HTMLAttributes } from "react";
import { ConditionalWrapper } from "@helpers/conditionalWrapper";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";

interface NavigationLinkProps
  extends HTMLAttributes<HTMLAnchorElement & NavLinkProps> {
  title?: string;
  url?: string;
  to?: string;
  textColor?: string;
  [key: string]: any;
}

export const NavigationLink = ({
  title,
  url,
  to,
  onClick,
  textColor,
  ...props
}: NavigationLinkProps) => {
  const theme = useTheme();

  return (
    <ConditionalWrapper
      wrapper={(children) =>
        url ? (
          <a
            href={url}
            style={{ ...(props.style || {}), alignSelf: "flex-start" }}
            {...props}
          >
            {children}
          </a>
        ) : (
          <NavLink
            to={to as string}
            onClick={onClick}
            style={{ ...(props.style || {}), alignSelf: "flex-start" }}
            {...props}
          >
            {children}
          </NavLink>
        )
      }
    >
      <FlexGroup centerY>
        <IconSprite
          iconName={"pagination/arrow-left"}
          style={{ width: 24, height: 24, color: theme.colors.nobel }}
        />

        <Paragraph ml={10} size={"lg"} color={textColor || "mineshaft3"}>
          {title}
        </Paragraph>
      </FlexGroup>
    </ConditionalWrapper>
  );
};
