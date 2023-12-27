import { useTheme } from "styled-components";
import React, { useContext, useState } from "react";
import { useSwitchRole } from "@hooks/useSwitchRole";
import { useNavigation } from "@hooks/useNavigation";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuthentication } from "@hooks/useAuthentication";
import { CreateClinic } from "@features/superadmin/clinics/create/CreateClinic";
import { ClinicCreatePatient } from "@features/clinic/patients/info/create/ClinicCreatePatient";
import { ACCESS_TOKEN, ROUTES, VIEWMODS } from "@config/constants";
import { Theme } from "@components/Theme/Theme";
import { Sidebar } from "@components/Sidebar/styled/Sidebar.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { NavigationList } from "@components/Navigation/components/NavigationList/NavigationList";
import { Modal } from "@components/Modal/styled/Modal.styled";
import { NavigationLink } from "@components/Link/variations/NavigationLink";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup, FlexGroupProps } from "@components/FlexGroup/FlexGroup";
import { Divider } from "@components/Divider/styled/Divider.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

import { GlobalStorage } from "../../../../AppContext";

interface SidebarBodyProps extends FlexGroupProps {
  toggleMenuOpen?: (state?: boolean) => any | void;
}

export const SidebarBody = ({
  toggleMenuOpen,
  style,
  ...props
}: SidebarBodyProps) => {
  const { navigationItems } = useNavigation();
  const [openCreatePatientModal, setOpenCreatePatientModal] = useState(false);
  const [openCreateClinicModal, setOpenCreateClinicModal] = useState(false);

  const { isAdmin } = useAuthentication();
  const { viewMode } = useContext(GlobalStorage);

  const switchRole = useSwitchRole();

  const { breakpoints } = useTheme();
  const sidebarHidden = useMediaQuery(`(max-width: ${breakpoints.md})`);

  const theme = useTheme();

  return (
    <FlexGroup
      column
      style={{
        ...style,
        color: theme.config.darkMode ? theme.colors.black : theme.colors.white
      }}
      {...props}
    >
      {toggleMenuOpen && (
        <>
          <FlexGroup flexDirection={"row-reverse"} compact centerY spread>
            <Sidebar.MenuButton onClick={() => toggleMenuOpen()}>
              <IconSprite
                style={{ width: 26, height: 26 }}
                iconName="button/menu"
              />
            </Sidebar.MenuButton>

            {isAdmin && viewMode === VIEWMODS.CLINIC && sidebarHidden ? (
              <NavigationLink
                onClick={() => {
                  switchRole({ viewMode: VIEWMODS.SUPERADMIN });
                }}
                to={ROUTES.CLINICS}
                title={"Super Admin"}
                style={{ alignSelf: "center" }}
                textColor={"inherit"}
              />
            ) : null}
          </FlexGroup>

          {sidebarHidden && <Divider $color={"#535353"} />}
        </>
      )}

      <Theme
        darkMode={false}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flex: "1 1 auto"
        }}
      >
        <Sidebar.Content>
          <Paragraph>Website logo</Paragraph>
          <FlexGroup marginBottom={30} spread column>
            <NavigationList open={true} items={navigationItems} />
          </FlexGroup>
        </Sidebar.Content>

        {viewMode === VIEWMODS.CLINIC && localStorage.getItem(ACCESS_TOKEN) ? (
          <>
            <FlexGroup column compact mt={"auto"}>
              <ButtonPrimary
                onClick={() => {
                  setOpenCreatePatientModal(true);
                }}
              >
                <FlexGroup center centerY>
                  New patient
                  <IconSprite
                    iconName={"common/plus"}
                    style={{ width: 14, height: 14 }}
                  />
                </FlexGroup>
              </ButtonPrimary>

              <Sidebar.Footer />
            </FlexGroup>

            <Modal
              title={"Add a new patient"}
              isOpen={openCreatePatientModal}
              setIsOpen={setOpenCreatePatientModal}
              maxWidth={440}
            >
              <ClinicCreatePatient
                setOpenCreatePatientModal={setOpenCreatePatientModal}
              />
            </Modal>
          </>
        ) : viewMode === VIEWMODS.SUPERADMIN &&
          localStorage.getItem(ACCESS_TOKEN) ? (
          <>
            <FlexGroup column compact mt={"auto"}>
              <ButtonPrimary
                onClick={() => {
                  setOpenCreateClinicModal(true);
                }}
              >
                <FlexGroup center centerY>
                  New clinic
                  <IconSprite
                    iconName={"common/plus"}
                    style={{ width: 14, height: 14 }}
                  />
                </FlexGroup>
              </ButtonPrimary>
            </FlexGroup>

            <Modal
              title={"Create new clinic"}
              isOpen={openCreateClinicModal}
              setIsOpen={setOpenCreateClinicModal}
              maxWidth={440}
            >
              <CreateClinic
                setOpenCreateClinicModal={setOpenCreateClinicModal}
              />
            </Modal>
          </>
        ) : (
          <> </>
        )}
      </Theme>
    </FlexGroup>
  );
};
