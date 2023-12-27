import { NavLink } from "react-router-dom";
import React from "react";
import { ConditionalWrapper } from "@helpers/conditionalWrapper";
import { Title } from "@components/Title/Title";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { IconSprite } from "@components/Icon/IconSprite";
import { CardBody } from "@components/Card/styled/CardBody.styled";
import { StyledCard } from "@components/Card/styled/Card.styled";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  cardLink: string;
  iconName?: string;
  text?: string;
  footer?: React.ReactNode;
  href?: string;
}

export const Card = ({
  title,
  cardLink,
  iconName,
  text,
  footer,
  href,
  className
}: CardProps) => {
  return (
    <ConditionalWrapper
      wrapper={(children) =>
        href ? (
          <a href={href} className={className}>
            {children}
          </a>
        ) : (
          <NavLink to={cardLink} className={className}>
            {children}
          </NavLink>
        )
      }
    >
      <StyledCard>
        <CardBody>
          <div className="card__header">
            <Title
              level={3}
              style={{ marginBottom: 6 }}
              className="card__title"
            >
              {title}
            </Title>

            {text && <Paragraph size="sm">{text}</Paragraph>}
          </div>

          {iconName && (
            <IconSprite
              iconName={iconName}
              style={{
                alignSelf: "flex-start",
                marginTop: -12
              }}
            />
          )}
        </CardBody>

        {footer}
      </StyledCard>
    </ConditionalWrapper>
  );
};
