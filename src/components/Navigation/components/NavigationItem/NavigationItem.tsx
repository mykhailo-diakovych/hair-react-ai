import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { StyledNavigationItem } from "@components/Navigation/components/NavigationItem/styled/NavigationItem.styled";
import { NavigationItemType } from "@components/Navigation/components/NavigationItem/NavigationItem.interface";
import { IconSprite } from "@components/Icon/IconSprite";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const NavigationItem = ({
  name,
  iconName,
  path,
  href,
  clickHandler
}: NavigationItemType) => {
  const navigate = useNavigate();

  const location = useLocation();

  const buttonClickHandler = () => {
    if (path) {
      navigate(path);
    } else if (href) {
      window.open(href, "_blank");
    }

    if (clickHandler) {
      clickHandler();
    }
  };

  return (
    <StyledNavigationItem
      $active={location.pathname === path}
      className="menu-item"
    >
      <ButtonText
        style={{ justifyContent: "start", width: "100%", padding: "25px 29px" }}
        onClick={buttonClickHandler}
      >
        <IconSprite
          iconName={iconName}
          style={{
            flex: "0 0 24px",
            width: 24,
            height: 24,
            marginRight: 12
          }}
        />

        <Paragraph>{name}</Paragraph>
      </ButtonText>
    </StyledNavigationItem>
  );
};
