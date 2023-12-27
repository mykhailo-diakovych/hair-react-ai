import React from "react";
import { useToggle } from "@hooks/useToggle";
import { SidebarBody } from "@components/Sidebar/components/SidebarBody/SidebarBody";
import { Navigation } from "@components/Navigation/Navigation";
import { IconSprite } from "@components/Icon/IconSprite";
import { StyledHeader } from "@components/Header/styled/Header.styled";
import { HeaderBase } from "@components/Header/HeaderBase";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const Header = ({ title }: { title?: string }) => {
  const [menuOpen, toggleMenuOpen] = useToggle(false);

  return (
    <>
      <Navigation
        menuOpen={menuOpen}
        toggleMenuOpen={toggleMenuOpen}
        element={<SidebarBody toggleMenuOpen={toggleMenuOpen} />}
      />

      <StyledHeader
        $menuOpen={menuOpen}
        component={
          <HeaderBase
            wrapperStyles={{ alignItems: "flex-start", flexWrap: "wrap" }}
            titleStyles={{ flex: "0 0 100%" }}
            title={title}
            icon={
              <ButtonIcon onClick={toggleMenuOpen}>
                <IconSprite
                  style={{ width: 26, height: 26 }}
                  iconName="button/menu"
                />
              </ButtonIcon>
            }
          />
        }
      />
    </>
  );
};
