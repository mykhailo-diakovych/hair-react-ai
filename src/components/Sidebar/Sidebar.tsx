import styled, { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Sider from "antd/es/layout/Sider";
import { Skeleton } from "antd";
import { ClinicBrief } from "@services/Clinic/interfaces/Clinic.interface";
import { useToggle } from "@hooks/useToggle";
import { useSwitchRole } from "@hooks/useSwitchRole";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { useAuthentication } from "@hooks/useAuthentication";
import { useGetClinicQuery } from "@hooks/query/clinic/useGetClinicQuery";
import { CLINIC_STORAGE_KEY, ROUTES, VIEWMODS } from "@config/constants";
import { Title, TitleProps } from "@components/Title/Title";
import { StyledSidebarFooter } from "@components/Sidebar/styled/SidebarFooter.styled";
import { Sidebar } from "@components/Sidebar/styled/Sidebar.styled";
import { SidebarBody } from "@components/Sidebar/components/SidebarBody/SidebarBody";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Navigation } from "@components/Navigation/Navigation";
import { NavigationLink } from "@components/Link/variations/NavigationLink";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItemsProps } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Divider } from "@components/Divider/styled/Divider.styled";
import { CardProps } from "@components/Card/Card";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

import { GlobalStorage } from "../../AppContext";

export const SidebarBase = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) => {
  const [menuOpen, toggleMenuOpen] = useToggle(false);

  const { isAdmin } = useAuthentication();

  const { viewMode } = useContext(GlobalStorage);

  const { breakpoints } = useTheme();
  const sidebarHidden = useMediaQuery(`(max-width: ${breakpoints.md})`);

  const switchRole = useSwitchRole();

  useDebounceEffect(
    () => {
      if (menuOpen) {
        toggleMenuOpen();
      }
    },
    500,
    [sidebarHidden]
  );

  return (
    <>
      <Sider {...props}>
        {isAdmin && viewMode === VIEWMODS.CLINIC && !sidebarHidden && (
          <>
            <NavigationLink
              onClick={() => {
                switchRole({ viewMode: VIEWMODS.SUPERADMIN });
              }}
              to={ROUTES.CLINICS}
              title={"Super Admin"}
              textColor={"inherit"}
            />

            <Divider $color={"#535353"} />
          </>
        )}

        <Sidebar.MenuButton onClick={toggleMenuOpen}>
          <IconSprite
            style={{ width: 26, height: 26 }}
            iconName="button/menu"
          />
        </Sidebar.MenuButton>

        <Navigation
          menuOpen={menuOpen}
          toggleMenuOpen={toggleMenuOpen}
          element={<SidebarBody toggleMenuOpen={toggleMenuOpen} />}
        />

        <SidebarBody
          toggleMenuOpen={toggleMenuOpen}
          style={{
            ...(sidebarHidden
              ? {
                  display: "none"
                }
              : {})
          }}
        />
      </Sider>
    </>
  );
};

SidebarBase.Title = ({ children, ...props }: TitleProps) => {
  return <Title {...props}>{children}</Title>;
};

SidebarBase.Content = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SidebarFooterProps extends GroupItemsProps {
  cardProps?: CardProps;
}

SidebarBase.Footer = ({ cardProps, ...props }: SidebarFooterProps) => {
  const { user, isAdmin } = useAuthentication();

  const clinicId = localStorage.getItem(CLINIC_STORAGE_KEY) as string;

  const { data: clinic } = useGetClinicQuery<unknown, ClinicBrief>(
    clinicId,
    isAdmin
  );

  const navigate = useNavigate();

  return (
    <StyledSidebarFooter
      onClick={() => {
        navigate(ROUTES.SETTINGS);
      }}
      {...props}
    >
      <FlexGroup mb={10} spread>
        {clinic?.logo ? (
          <StyledImage
            style={{ width: 24, height: 24 }}
            imageStyles={{ objectFit: "contain" }}
            src={clinic?.logo}
          />
        ) : (
          <Skeleton.Image style={{ width: 24, height: 24 }} active />
        )}

        <IconSprite
          iconName={"navigation/settings"}
          style={{ width: 18, height: 16 }}
        />
      </FlexGroup>

      <Paragraph color={"nobel"} size={"md"}>
        {clinic?.simulationsAmount?.thisMonth}/
        {clinic?.simulationsAmount?.available} patients this month
      </Paragraph>

      <Paragraph style={{ fontWeight: 500 }} size={"lg"}>
        {clinic?.name}
      </Paragraph>
    </StyledSidebarFooter>
  );
};

SidebarBase.MenuButton = styled(ButtonIcon)`
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;
