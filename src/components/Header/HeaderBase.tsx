import { PositionProps } from "styled-system";
import React from "react";
import { Title } from "@components/Title/Title";

interface HeaderBaseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PositionProps {
  title?: string;
  className?: string;
  icon?: React.ReactNode;
  wrapperStyles?: React.CSSProperties;
  titleStyles?: React.CSSProperties;
}

export const HeaderBase = ({
  title,
  icon,
  className,
  wrapperStyles,
  titleStyles,
  ...props
}: HeaderBaseProps) => {
  return (
    <header className={className} style={wrapperStyles} {...props}>
      {icon}

      {title && (
        <Title
          level={2}
          style={{
            flex: "1 1 auto",
            textAlign: "center",
            lineHeight: 1,
            ...titleStyles
          }}
        >
          {title}
        </Title>
      )}
    </header>
  );
};
