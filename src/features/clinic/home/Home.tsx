import { useTheme } from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import { ClinicBrief } from "@services/Clinic/interfaces/Clinic.interface";
import { useSwitchRole } from "@hooks/useSwitchRole";
import { useAuthentication } from "@hooks/useAuthentication";
import { useGetClinicQuery } from "@hooks/query/clinic/useGetClinicQuery";
import { Simulations } from "@features/clinic/home/components/Simulations/Simulations";
import { CLINIC_STORAGE_KEY, ROUTES, VIEWMODS } from "@config/constants";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Sidebar } from "@components/Sidebar/styled/Sidebar.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Container } from "@components/Container/Container.styled";
import { BreadcrumbsStyled } from "@components/Breadcrumbs/styled/Breadcrumbs.styled";

export const Home = () => {
  const { isAdmin } = useAuthentication();

  const theme = useTheme();

  const switchRole = useSwitchRole();

  const clinicId = localStorage.getItem(CLINIC_STORAGE_KEY) as string;

  const { data: clinic } = useGetClinicQuery<unknown, ClinicBrief>(
    clinicId,
    true
  );

  return (
    <SiteWrapper>
      <Sidebar />

      <Container>
        {isAdmin && (
          <FlexGroup
            bg={"white"}
            style={{
              padding: "13px 20px",
              borderRadius: theme.general.borderRadius
            }}
          >
            <BreadcrumbsStyled
              items={[
                {
                  title: (
                    <Link
                      to={ROUTES.CLINICS_HOME}
                      onClick={() => {
                        switchRole({ viewMode: VIEWMODS.SUPERADMIN });
                      }}
                    >
                      <Paragraph>Super admin</Paragraph>
                    </Link>
                  )
                },
                {
                  title: (
                    <Link
                      to={ROUTES.CLINICS}
                      onClick={() => {
                        switchRole({ viewMode: VIEWMODS.SUPERADMIN });
                      }}
                    >
                      <Paragraph>{clinic?.name}</Paragraph>
                    </Link>
                  )
                },
                {
                  title: <Paragraph>Simulations</Paragraph>
                }
              ]}
            />
          </FlexGroup>
        )}

        <Simulations />
      </Container>
    </SiteWrapper>
  );
};
