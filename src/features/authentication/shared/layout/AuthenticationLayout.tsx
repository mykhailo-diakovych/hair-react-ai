import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { EmailLink } from "@features/authentication/shared/styled/EmailLink.styled";
import { AuthenticationLayoutWrapper } from "@features/authentication/shared/layout/styled/AuthenticationLayoutWrapper.styled";
import { ACCESS_TOKEN, ROUTES, VIEWMODS } from "@config/constants";
import { Title } from "@components/Title/Title";
import { Theme } from "@components/Theme/Theme";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { NavigationLink } from "@components/Link/variations/NavigationLink";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Container } from "@components/Container/Container.styled";
import { Chat } from "@components/Chat/styled/Chat.styled";

import { GlobalStorage } from "../../../../AppContext";

export const AuthenticationLayout = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const theme = useTheme();

  const { viewMode } = useContext(GlobalStorage);

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      navigate(
        viewMode === VIEWMODS.SUPERADMIN
          ? ROUTES.CLINICS_HOME
          : ROUTES.CLINIC_PATIENTS
      );
    }
  }, []);

  return (
    <AuthenticationLayoutWrapper gap={0}>
      <Theme
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          flexGrow: 1
        }}
        darkMode={false}
      >
        <Container style={{ flex: "1 1 100%", height: "100%" }}>
          <FlexGroup column spread style={{ height: "100%" }}>
            <NavigationLink
              url={"https://www.website.com"}
              title={"Back to website"}
            />

            <FlexGroup
              column
              center
              style={{ maxWidth: 460, alignSelf: "center" }}
            >
              <Title
                center
                style={{
                  marginBottom: 25,
                  marginTop: 10,
                  fontSize: 24,
                  color: theme.colors.gray600
                }}
              >
                {title}
              </Title>

              {children}
            </FlexGroup>

            <FlexGroup
              gap={0}
              center
              column
              compact
              style={{ maxWidth: 460, alignSelf: "center" }}
            >
              <Paragraph center>
                If you have any questions or problems please email us
              </Paragraph>

              <EmailLink center href={"mailto:info@website.com"}>
                info@website.com
              </EmailLink>

              <Chat position={"absolute"} right={32} bottom={32} />
            </FlexGroup>
          </FlexGroup>
        </Container>
      </Theme>

      <Theme
        style={{ height: "100%", width: "100%", flex: "unset" }}
        overlay
        darkMode={true}
      >
        <Container style={{ height: "100%" }}>
          <FlexGroup column>
            <IconSprite
              style={{ margin: "0 auto", maxWidth: 200, height: 50 }}
              iconName={"logo"}
            />

            {/*<StyledImage src={getImageUrl("placeholder.png")} />*/}
          </FlexGroup>
        </Container>
      </Theme>
    </AuthenticationLayoutWrapper>
  );
};
