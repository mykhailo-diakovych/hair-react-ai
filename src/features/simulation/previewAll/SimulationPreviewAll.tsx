import { useTheme } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Link as NavigationLink } from "react-router-dom";
import React, { useEffect } from "react";
import { Empty } from "antd";
import { ClinicPublicInfo } from "@services/Clinic/interfaces/Clinic.interface";
import { useAuthentication } from "@hooks/useAuthentication";
import { useGetPatientByRefCodeQuery } from "@hooks/query/patients/useGetPatientByRefCode";
import { useGetClinicQuery } from "@hooks/query/clinic/useGetClinicQuery";
import { getRefCodeById } from "@helpers/getRefCodeById";
import { PreviewAllWrapper } from "@features/simulation/previewAll/styled/PreviewAllWrapper.styled";
import { Header } from "@features/simulation/home/components/Header/styled/Header.styled";
import { ROUTES } from "@config/constants";
import { Theme } from "@components/Theme/Theme";
import { Spinner } from "@components/Spinner/styled/Spinner.styled";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Link } from "@components/Link/Link";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Carousel } from "@components/Carousel/Carousel";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";

export const SimulationPreviewAll = () => {
  const { id } = useParams() as { id: string };
  const { data: patient, isLoading: isLoadingPatient } =
    useGetPatientByRefCodeQuery(getRefCodeById(id), {
      staleTime: 0
    });
  const { data: clinic } = useGetClinicQuery<any, ClinicPublicInfo>(
    patient?.clinicRefCode as string,
    false
  );

  const simulations = patient?.patientModels
    .flatMap(
      (patientModel) =>
        patientModel.modelImages?.flatMap((modelImage) => {
          return (
            modelImage.simulations.filter(() => patientModel?.is_active) || []
          );
        }) || []
    )
    .filter((simulation) => !simulation.is_deleted && simulation.is_active);

  const { user, getAuthenticationData } = useAuthentication();

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getAuthenticationData(false);
  }, []);

  return (
    <Theme style={{ height: "100%" }} darkMode>
      <SiteWrapper>
        <PreviewAllWrapper column gap={0}>
          <Header
            breadCrumbsItems={
              user
                ? [
                    {
                      title: (
                        <ButtonText
                          onClick={() =>
                            navigate(
                              ROUTES.VIEW_PATIENT_BY_ID(patient?.id as string)
                            )
                          }
                        >
                          <FlexGroup centerY>
                            <IconSprite
                              iconName={"pagination/arrow-left"}
                              style={{ width: 16, height: 16 }}
                            />

                            <Paragraph>Back to clinic view</Paragraph>
                          </FlexGroup>
                        </ButtonText>
                      )
                    }
                  ]
                : []
            }
            middleItem={
              <FlexGroup compact>
                <Paragraph>{patient?.name}</Paragraph>
                {/*<Paragraph color={theme.colors.white}>*/}
                {/*  {modelSimulation?.name || "Simulation"}*/}
                {/*</Paragraph>*/}
              </FlexGroup>
            }
            actionButton={
              <Link href={clinic?.website_url || "#!"}>
                <StyledImage
                  style={{ width: 36, height: 36 }}
                  imageStyles={{ objectFit: "contain" }}
                  src={clinic?.logoUrl}
                />
              </Link>
            }
          />

          {!patient || isLoadingPatient ? (
            <Spinner />
          ) : simulations && simulations?.length > 0 ? (
            <Carousel
              items={simulations?.map((simulation) => ({
                id: simulation.id,
                children: (
                  <FlexGroup gap={20} column compact>
                    <Paragraph
                      center
                      style={{
                        fontWeight: "bold",
                        color: theme.colors.white,
                        paddingTop: 20
                      }}
                    >
                      {simulation?.name}
                    </Paragraph>

                    <NavigationLink
                      to={ROUTES.PREVIEW_SIMULATION_BY_ID(
                        patient.id,
                        simulation.id
                      )}
                      style={{ width: "100%" }}
                    >
                      <StyledImage
                        style={{ height: "100%" }}
                        src={simulation?.image?.image}
                      />
                    </NavigationLink>

                    <ButtonPrimaryOutlined
                      onClick={() => {
                        navigate(
                          ROUTES.PREVIEW_SIMULATION_BY_ID(
                            patient.id,
                            simulation.id
                          )
                        );
                      }}
                    >
                      View
                    </ButtonPrimaryOutlined>
                  </FlexGroup>
                )
              }))}
              navigation={undefined}
              dynamicSlides={true}
            />
          ) : (
            <Empty
              style={{ margin: "auto" }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </PreviewAllWrapper>
      </SiteWrapper>
    </Theme>
  );
};
