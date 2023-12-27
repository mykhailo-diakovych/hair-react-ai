import { useTheme } from "styled-components";
import React, { useContext, useState } from "react";
import { Skeleton } from "antd";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { Model } from "@services/Model/interfaces/Model.interface";
import { formatDate } from "@helpers/formatDate";
import { SimulatorContext } from "@features/simulator/Simulator.context";
import { SimulationProcessImageWrapper } from "@features/simulator/components/SimulationProcessVariations/styled/SimulationProcessImageWrapper.styled";
import { SimulationProcessHistoryWrapper } from "@features/simulator/components/SimulationProcessVariations/styled/SimulationProcessHistoryWrapper.styled";
import { SimulationProcessHistoryInfo } from "@features/simulator/components/SimulationProcessVariations/styled/SimulationProcessHistoryInfo.styled";
import { SimulationProcessHistoryButton } from "@features/simulator/components/SimulationProcessVariations/styled/SImulationProcessHistoryButton.styled";
import { SimulationProcessItem } from "@features/simulator/components/SimulationProcessVariations/components/SimulationProcessItem/SimulationProcessItem";
import { SimulationProcessWrapper } from "@features/simulator/components/shared/styled/SimulationProcessWrapper.styled";
import { SaveSimulationForm } from "@features/simulator/components/SaveSimulationForm/SaveSimulationForm";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { Modal } from "@components/Modal/styled/Modal.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { GenerateSimulationHistoryButton } from "@components/Button/styled/GenerateSimulationHistoryButton.styled";
import { ButtonText } from "@components/Button/styled/ButtonText.styled";
import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

export const SimulationProcessVariations = ({
  model,
  setIsGenerating,
  setShowSavedSimulationSettings
}: {
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  model?: Model;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSavedSimulationSettings: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();

  const [showSaveSimulation, setShowSaveSimulation] = useState<boolean>(false);

  const {
    setAccuracy,
    setResolution,
    setPrompt,
    setNegativePrompt,
    setHairTreatment,
    generatedSimulations,
    simulationsHistory,
    processedSimulation,
    setProcessedSimulation,
    selectedModelImage,
    handleGenerateVariants,
    simulationsHistoryLength,
    isGeneratingVariants,
    isGenerationMode,
    setIsGenerationMode,
    setLoadedSimulations
  } = useContext(SimulatorContext);

  const simulationPosition =
    generatedSimulations?.simulations?.findIndex(
      (simulation) => simulation.id === processedSimulation?.id
    ) || 0;

  const setSelectedSimulationSettings = (simulation: ModelSimulation) => {
    setAccuracy(simulation.accuracy);
    setResolution(simulation.resolution);
    setPrompt(simulation.api_params.prompt);
    setNegativePrompt(simulation.api_params.negative_prompt);
    setHairTreatment(simulation.api_params.sampler_name);
  };

  const handleProcessSimulation = (simulation: ModelSimulation) => {
    setSelectedSimulationSettings(simulation);
    setProcessedSimulation(simulation);
  };

  const handleGenerateSimulations = async () => {
    await handleGenerateVariants();
    setIsGenerating(true);
    setIsGenerationMode(false);
  };

  const isGeneratedSimulationsBlank =
    (isGenerationMode &&
      simulationsHistoryLength === simulationsHistory?.position) ||
    simulationsHistory?.position === -1 ||
    simulationsHistoryLength === 0;

  return (
    <SimulationProcessWrapper
      style={{
        ...(!processedSimulation ? { paddingTop: "68px" } : {})
      }}
      column
      gap={20}
    >
      {!processedSimulation && simulationsHistoryLength !== 0 && (
        <SimulationProcessHistoryWrapper
          bg={theme.colors.mineshaft600}
          spread
          gap={24}
        >
          <SimulationProcessHistoryButton
            $buttonIconBg
            disabled={simulationsHistory?.position === 0}
            onClick={() => {
              setLoadedSimulations([]);

              simulationsHistory?.go(simulationsHistory.position - 1);
            }}
            iconName={"common/chevron-left"}
            iconStyle={{ width: 16, height: 16 }}
          />

          {!generatedSimulations?.createdAt ? (
            <Skeleton.Button style={{ width: 300 }} active />
          ) : (
            <SimulationProcessHistoryInfo compact centerY>
              <FlexGroup compact centerY>
                <Paragraph size={"lg"} color={"nobel"}>
                  History:
                </Paragraph>
                <Paragraph size={"lg"}>
                  {(simulationsHistory?.position || 0) + 1} of{" "}
                  {simulationsHistoryLength + (isGenerationMode ? 1 : 0)}
                </Paragraph>
              </FlexGroup>

              <FlexGroup flexWrap={"wrap"} center compact centerY>
                <Paragraph size={"lg"} color={"nobel"}>
                  Created:
                </Paragraph>
                <Paragraph size={"lg"}>
                  {formatDate(
                    new Date(
                      (generatedSimulations?.simulations?.at(-1)
                        ?.createdAt as string) ||
                        generatedSimulations?.createdAt
                    ),
                    "h:mm a, MMM Do"
                  )}
                </Paragraph>
              </FlexGroup>

              <ButtonText
                color={theme.colors.malibuLight}
                onClick={() => {
                  setShowSavedSimulationSettings(true);
                }}
              >
                Show settings
              </ButtonText>
            </SimulationProcessHistoryInfo>
          )}

          <SimulationProcessHistoryButton
            $buttonIconBg
            disabled={
              simulationsHistory?.position ===
              simulationsHistoryLength - (isGenerationMode ? 0 : 1)
            }
            onClick={() => {
              setLoadedSimulations([]);

              simulationsHistory?.go(simulationsHistory.position + 1);
            }}
            iconName={"common/chevron-right"}
            iconStyle={{ width: 16, height: 16 }}
          />
        </SimulationProcessHistoryWrapper>
      )}

      {!processedSimulation ? (
        <>
          <SimulationProcessImageWrapper
            // marginTop={!!selectedModelImage ? 68 : 0}
            // marginBottom={!!selectedModelImage ? -68 : 0}
            $columns={
              isGeneratedSimulationsBlank ||
              generatedSimulations?.simulations.length === 1
                ? 1
                : 2
            }
            gap={20}
          >
            {generatedSimulations?.simulations?.map((simulation) => (
              <SimulationProcessItem
                key={simulation?.id}
                simulation={simulation}
                selectSimulationCallback={handleProcessSimulation}
                setShowSaveSimulation={setShowSaveSimulation}
                onSimulationLoaded={(id) => {
                  setLoadedSimulations((prev) => [...prev, id]);
                }}
              />
            ))}

            {isGeneratedSimulationsBlank && (
              <FlexGroup
                padding={10}
                style={{
                  aspectRatio: "3/4",
                  maxHeight: "max(100vh - 270px, 500px)",
                  flex: "unset",
                  borderRadius: theme.general.borderRadius
                }}
                bg={theme.background.dustyGray700}
                column
                center
                centerY
              >
                <Paragraph>Simulations will appear here</Paragraph>

                <ButtonPrimary
                  style={{ maxWidth: 266 }}
                  disabled={!selectedModelImage?.face || isGeneratingVariants}
                  onClick={() => {
                    handleGenerateSimulations();
                  }}
                >
                  Generate simulations
                  {isGeneratingVariants && (
                    <IconSprite
                      iconName={"common/spinner"}
                      style={{
                        marginLeft: 5,
                        width: 16,
                        height: 16
                      }}
                    />
                  )}
                </ButtonPrimary>
              </FlexGroup>
            )}
          </SimulationProcessImageWrapper>
        </>
      ) : (
        <FlexGroup column gap={16}>
          <FlexGroup
            style={{ borderRadius: theme.general.borderRadius, padding: 10 }}
            bg={"mineshaft600"}
            spread
            centerY
          >
            <GenerateSimulationHistoryButton
              $buttonIconBg
              disabled={simulationPosition === 0}
              onClick={() => {
                setProcessedSimulation(
                  generatedSimulations?.simulations?.at(
                    Math.max(simulationPosition - 1, 0)
                  ) as ModelSimulation
                );
              }}
              iconName={"common/chevron-left"}
              iconStyle={{ width: 16, height: 16 }}
            />

            <Paragraph>{`Simulation: ${simulationPosition + 1} of ${
              generatedSimulations?.simulations?.length || 1
            }`}</Paragraph>

            <GenerateSimulationHistoryButton
              $buttonIconBg
              disabled={
                simulationPosition ===
                Number(generatedSimulations?.simulations?.length) - 1
              }
              onClick={() => {
                setProcessedSimulation(
                  generatedSimulations?.simulations?.at(
                    Math.min(
                      simulationPosition + 1,
                      generatedSimulations?.simulations?.length - 1
                    )
                  ) as ModelSimulation
                );
              }}
              iconName={"common/chevron-right"}
              iconStyle={{ width: 16, height: 16 }}
            />
          </FlexGroup>

          <SimulationProcessImageWrapper gap={20}>
            <SimulationProcessItem
              key={processedSimulation?.id}
              simulation={processedSimulation}
              selectSimulationCallback={handleProcessSimulation}
              setShowSaveSimulation={setShowSaveSimulation}
              onSimulationLoaded={(id) => {
                setLoadedSimulations((prev) => [...prev, id]);
              }}
            />
          </SimulationProcessImageWrapper>
        </FlexGroup>
      )}

      <Modal
        title={"Save simulation"}
        isOpen={showSaveSimulation}
        setIsOpen={setShowSaveSimulation}
        maxWidth={500}
      >
        <SaveSimulationForm
          model={model}
          closeModal={() => setShowSaveSimulation(false)}
        />
      </Modal>
    </SimulationProcessWrapper>
  );
};
