import { useParams } from "react-router-dom";
import React from "react";
import { ClinicPublicInfo } from "@services/Clinic/interfaces/Clinic.interface";
import { useGetClinicQuery } from "@hooks/query/clinic/useGetClinicQuery";
import { getRefCodeById } from "@helpers/getRefCodeById";
import { Header } from "@features/simulation/home/components/Header/styled/Header.styled";
import { StyledHeaderTabBar } from "@features/client/home/styled/HeaderTabBar.styled";
import { ClientTabs } from "@features/client/home/components/ClientTabs/ClientTabs";
import { ClientContext } from "@features/client/home/Client.context";
import { Theme } from "@components/Theme/Theme";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Link } from "@components/Link/Link";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Container } from "@components/Container/Container.styled";

export const Client = () => {
  const { clinic_ref: clinicId } = useParams();
  const { data: clinic } = useGetClinicQuery<any, ClinicPublicInfo>(
    getRefCodeById(clinicId)
  );

  return (
    <ClientContext.Provider value={{ clinic, clinicId }}>
      <Theme style={{ height: "100%" }} darkMode>
        <SiteWrapper>
          <FlexGroup
            style={{
              height: "100%"
            }}
            column
            gap={0}
          >
            <Header
              className={"client-header"}
              firstItem={
                <Link
                  innerStyles={{ display: "flex" }}
                  style={{ flex: "none" }}
                  href="https://app.website.com/"
                >
                  LOGO
                </Link>
              }
              middleItem={<StyledHeaderTabBar className={"header-tabbar"} />}
              actionButton={
                <Link
                  href={clinic?.website_url || "#!"}
                  style={{ display: "inline-flex" }}
                >
                  <StyledImage
                    style={{
                      maxWidth: 90,
                      minWidth: 36,
                      alignItems: "center",
                      display: "flex"
                    }}
                    imageStyles={{ objectFit: "contain" }}
                    src={clinic?.logoUrl}
                  />
                </Link>
              }
            />

            <Container style={{ maxWidth: 800 }}>
              <ClientTabs />
            </Container>
          </FlexGroup>
        </SiteWrapper>
      </Theme>
    </ClientContext.Provider>
  );
};
