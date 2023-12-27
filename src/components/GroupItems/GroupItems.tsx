import { GridProps, LayoutProps, SpaceProps } from "styled-system";
import { StyledComponentProps, useTheme } from "styled-components";
import React, { forwardRef } from "react";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledGroupItems } from "@components/GroupItems/styled/GroupItems.styled";

export interface GroupItemsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SpaceProps,
    GridProps,
    LayoutProps,
    StyledComponentProps<any, any, any, any> {
  groupTitle?: string;
  children?: React.ReactNode | JSX.Element[];
  style?: React.CSSProperties;
  compact?: boolean;
  bgColor?: string;
  $columns?: number;
  $haveLead?: boolean;
  gap?: number;
  [key: string]: any;
}

export const GroupItems = forwardRef<HTMLDivElement, GroupItemsProps>(
  (
    { groupTitle, children, compact, style, ...props }: GroupItemsProps,
    ref
  ) => {
    const theme = useTheme();

    return (
      <StyledGroupItems ref={ref} compact={compact} style={style} {...props}>
        {groupTitle && (
          <Paragraph style={{ color: theme.colors.gray500 }}>
            {groupTitle}
          </Paragraph>
        )}
        {children}
      </StyledGroupItems>
    );
  }
);
