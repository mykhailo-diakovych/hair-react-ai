import { PositionProps } from "styled-system";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IconSprite } from "@components/Icon/IconSprite";
import { StyledHeader } from "@components/Header/styled/Header.styled";
import { HeaderBase } from "@components/Header/HeaderBase";
import { ButtonCircle } from "@components/Button/styled/ButtonCircle.styled";

interface HeaderNavigationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PositionProps {
  title?: string;
}

export const HeaderNavigation = ({
  title,
  style,
  ...props
}: HeaderNavigationProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <StyledHeader
      component={
        <HeaderBase
          title={title}
          icon={
            <ButtonCircle onClick={goBack}>
              <IconSprite iconName="backArrow" />
            </ButtonCircle>
          }
          wrapperStyles={style}
          titleStyles={{ marginLeft: -40 }}
        />
      }
      {...props}
    />
  );
};
