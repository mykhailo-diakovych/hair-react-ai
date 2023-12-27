import { useDebounce, useMediaQuery } from "usehooks-ts";
import { useTheme } from "styled-components";
import { useUpdateEffect } from "react-use";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { ClinicPublicInfo } from "@services/Clinic/interfaces/Clinic.interface";
import { useGetPatientByRefCodeQuery } from "@hooks/query/patients/useGetPatientByRefCode";
import { useGetClinicQuery } from "@hooks/query/clinic/useGetClinicQuery";
import { getRefCodeById } from "@helpers/getRefCodeById";
import { SimulationPreviewTabs } from "@features/simulation/preview/styled/SimulationPreviewTabs.styled";
import {
  SimulationPreviewBeforeAfter,
  SimulationPreviewBeforeAfterWrapper
} from "@features/simulation/preview/styled/SimulationPreviewBeforeAfter.styled";
import { PreviewOriginalImage } from "@features/simulation/preview/components/PreviewOriginalImage/PreviewOriginalImage";
import { PreviewDensityImage } from "@features/simulation/preview/components/PreviewDensityImage/PreviewDensityImage";
import { Header } from "@features/simulation/home/components/Header/styled/Header.styled";
import {
  ACCESS_TOKEN,
  PREVIEW_SIMULATION_DENSITY_SLIDER,
  ROUTES
} from "@config/constants";
import { Theme } from "@components/Theme/Theme";
import { SliderVertical } from "@components/Slider/styled/SliderVertical.styled";
import { Slider } from "@components/Slider/styled/Slider.styled";
import { SiteWrapper } from "@components/SiteWrapper/SiteWrapper";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Link } from "@components/Link/Link";
import { StyledImage } from "@components/Image/styled/Image.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";

export const SimulationPreview = () => {
  const { id } = useParams() as { id: string };
  const { data: patient } = useGetPatientByRefCodeQuery(getRefCodeById(id));

  const { data: clinic } = useGetClinicQuery<unknown, ClinicPublicInfo>(
    patient?.clinicRefCode as string,
    false
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [simulationId, setSimulationId] = useState(
    queryParams.get("simulationId")
  );

  const modelSimulations: ModelSimulation[] =
    patient?.patientModels?.flatMap(
      (model) =>
        model?.modelImages?.flatMap(
          (modelImage) =>
            modelImage?.simulations.filter(
              (simulation) => simulation?.is_active && model?.is_active
            ) || []
        ) || []
    ) || [];

  const modelSimulation = modelSimulations?.find(
    (modelSim) => modelSim?.id === simulationId
  ) as ModelSimulation;

  const [orderedSimulations, setOrderedSimulations] = useState<
    ModelSimulation[]
  >([]);

  const childDensitySimulations =
    (modelSimulations
      ?.filter((modelSimulation) => modelSimulation?.parent === simulationId)
      .sort(
        (a, b) => Number(a?.density) - Number(b?.density)
      ) as (ModelSimulation & { originalImage: string })[]) || [];

  const densitySimulations =
    childDensitySimulations.length !== 0 ? [...childDensitySimulations] : [];

  const previewSimulations =
    Array.from(densitySimulations || [])?.length > 0
      ? densitySimulations
      : [modelSimulation];

  const navigate = useNavigate();

  const [selectedSimulation, setSelectedSimulation] = useState<
    ModelSimulation | undefined
  >(undefined);

  const hiddenToUser =
    modelSimulation &&
    !modelSimulation?.is_active &&
    !localStorage.getItem(ACCESS_TOKEN);

  const [currentDensity, setCurrentDensity] = useState(1);

  useEffect(() => {
    if (densitySimulations?.length > 0 && !selectedSimulation) {
      setSelectedSimulation(densitySimulations[0]);
      setCurrentDensity(densitySimulations.length);
    } else if (densitySimulations?.length === 0 && !selectedSimulation) {
      setSelectedSimulation(modelSimulation);
    }
  }, [densitySimulations]);

  useUpdateEffect(() => {
    setSelectedSimulation(densitySimulations[0] || modelSimulation);
    setCurrentDensity(densitySimulations.length);
  }, [simulationId]);

  useEffect(() => {
    if (modelSimulation && modelSimulation && orderedSimulations.length === 0) {
      setOrderedSimulations([
        modelSimulation,
        ...(modelSimulations?.filter(
          (simulation) =>
            simulation?.id !== simulationId &&
            // (simulation?.model_image === modelSimulation.model_image ||
            //   simulation?.model_image === modelSimulation.parent) &&
            !simulation?.is_deleted
        ) || [])
      ]);
    }
  }, [modelSimulations]);

  const { breakpoints } = useTheme();
  const hideOnMobile = useMediaQuery(`(min-width: ${breakpoints.md})`);

  const imagesWidth = useDebounce(
    modelSimulation?.original_image_url && selectedSimulation?.image?.image,
    10
  );

  if ((status === "error" && !modelSimulation) || hiddenToUser) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <Theme style={{ height: "100%" }} darkMode>
      <SiteWrapper>
        <FlexGroup column style={{ height: "100%" }} gap={0}>
          <Header
            breadCrumbsItems={[
              {
                title: (
                  <ButtonText
                    onClick={() =>
                      navigate(
                        ROUTES.PREVIEW_ALL_SIMULATION_BY_ID(
                          patient?.id as string
                        )
                      )
                    }
                  >
                    <FlexGroup centerY>
                      <IconSprite
                        iconName={"pagination/arrow-left"}
                        style={{ width: 16, height: 16 }}
                      />

                      <Paragraph>All simulations</Paragraph>
                    </FlexGroup>
                  </ButtonText>
                )
              }
            ]}
            middleItem={
              <FlexGroup
                compact
                // style={{
                //   position: "absolute",
                //   left: "50%",
                //   transform: "translateX(-50%)"
                // }}
              >
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

          <SimulationPreviewBeforeAfterWrapper
            alignItems={"end"}
            center
            compact
            style={{
              ...(imagesWidth && hideOnMobile
                ? { width: "auto", height: "auto" }
                : { width: "100%", height: "100%" })
            }}
          >
            {hideOnMobile ? (
              <SimulationPreviewBeforeAfter
                style={{
                  ...(imagesWidth
                    ? { width: "auto", height: "auto" }
                    : { width: "100%", height: "100%" })
                }}
              >
                <PreviewOriginalImage
                  src={modelSimulation?.original_image_url}
                />

                <PreviewDensityImage
                  selectedSimulation={selectedSimulation}
                  setSelectedSimulation={setSelectedSimulation}
                  currentDensity={currentDensity}
                  setCurrentDensity={setCurrentDensity}
                  orderedSimulations={orderedSimulations}
                  simulationId={simulationId}
                  setSimulationId={setSimulationId}
                  densitySimulations={previewSimulations}
                />
              </SimulationPreviewBeforeAfter>
            ) : (
              <SimulationPreviewTabs
                items={[
                  {
                    key: "original",
                    label: <Paragraph>Original photo</Paragraph>,
                    children: (
                      <PreviewOriginalImage
                        src={modelSimulation?.original_image_url}
                        isMobile={true}
                      />
                    )
                  },
                  {
                    key: "simulation",
                    label: (
                      <Paragraph>
                        {previewSimulations?.at(currentDensity - 1)?.name ||
                          "Simulation photo"}
                      </Paragraph>
                    ),
                    children: (
                      <PreviewDensityImage
                        selectedSimulation={selectedSimulation}
                        setSelectedSimulation={setSelectedSimulation}
                        currentDensity={currentDensity}
                        setCurrentDensity={setCurrentDensity}
                        orderedSimulations={orderedSimulations}
                        simulationId={simulationId}
                        setSimulationId={setSimulationId}
                        isMobile={true}
                        densitySimulations={previewSimulations}
                      />
                    )
                  }
                ]}
              />
            )}

            {hideOnMobile ? (
              <SliderVertical
                vertical={true}
                $isActive
                min={PREVIEW_SIMULATION_DENSITY_SLIDER.min}
                max={
                  densitySimulations.length ||
                  PREVIEW_SIMULATION_DENSITY_SLIDER.max
                }
                marks={PREVIEW_SIMULATION_DENSITY_SLIDER.marks}
                value={currentDensity}
                onValueChange={(value: number) => {
                  setCurrentDensity(value);
                }}
                outerStyles={
                  densitySimulations?.length === 0 ? { opacity: 0 } : undefined
                }
                label={"Density"}
              />
            ) : (
              <Slider
                $isActive
                min={PREVIEW_SIMULATION_DENSITY_SLIDER.min}
                max={
                  densitySimulations.length ||
                  PREVIEW_SIMULATION_DENSITY_SLIDER.max
                }
                value={currentDensity}
                onValueChange={(value: number) => {
                  setCurrentDensity(value);
                }}
                outerStyles={
                  densitySimulations?.length === 0 ? { opacity: 0 } : undefined
                }
                label={"Density"}
              />
            )}
          </SimulationPreviewBeforeAfterWrapper>
        </FlexGroup>
      </SiteWrapper>
    </Theme>
  );
};
