import React, { useEffect } from "react";

import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { PreviewImage } from "@features/simulation/preview/components/PreviewImage/PreviewImage";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { GenerateSimulationHistoryButton } from "@components/Button/styled/GenerateSimulationHistoryButton.styled";

export const PreviewDensityImage = ({
  selectedSimulation,
  currentDensity,
  densitySimulations,
  setSelectedSimulation,
  simulationId,
  setSimulationId,
  orderedSimulations,
  isMobile = false
}: {
  selectedSimulation: ModelSimulation | undefined;
  setSelectedSimulation: React.Dispatch<
    React.SetStateAction<ModelSimulation | undefined>
  >;
  currentDensity: number;
  setCurrentDensity: React.Dispatch<React.SetStateAction<number>>;
  densitySimulations: ModelSimulation[];
  orderedSimulations: ModelSimulation[];
  simulationId: string | null;
  isMobile?: boolean;
  setSimulationId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const currentPosition = orderedSimulations.findIndex(
    (simulation) => simulation.id === simulationId
  );

  useEffect(() => {
    setSelectedSimulation(densitySimulations.at(currentDensity - 1));
  }, [currentDensity]);

  return (
    <FlexGroup column gap={16}>
      {!isMobile ? (
        <FlexGroup
          bg={"mineshaft700"}
          compact
          spread
          centerY
          style={{ padding: 8, height: 47 }}
          {...(!selectedSimulation ? { center: true } : {})}
        >
          <GenerateSimulationHistoryButton
            $buttonIconBg
            disabled={currentPosition <= 0}
            onClick={() => {
              setSimulationId(
                orderedSimulations?.at(currentPosition - 1)?.id || ""
              );
            }}
            iconName={"common/chevron-left"}
            iconStyle={{ width: 16, height: 16 }}
          />

          <Paragraph
            style={{ flex: "1 1 auto", textAlign: "center" }}
            color={selectedSimulation ? "black" : "gray7"}
            size={"lg"}
          >
            {selectedSimulation?.name ||
              densitySimulations?.at(0)?.name ||
              "Preview image"}
          </Paragraph>

          <GenerateSimulationHistoryButton
            $buttonIconBg
            disabled={
              currentPosition === Number(orderedSimulations?.length) - 1
            }
            onClick={() => {
              setSimulationId(
                orderedSimulations?.at(currentPosition + 1)?.id || ""
              );
            }}
            iconName={"common/chevron-right"}
            iconStyle={{ width: 16, height: 16 }}
          />
        </FlexGroup>
      ) : (
        <FlexGroup
          style={{ position: "absolute", top: "50%", translateY: "-50%" }}
          spread
        >
          <GenerateSimulationHistoryButton
            $buttonIconBg
            disabled={currentPosition <= 0}
            onClick={() => {
              setSimulationId(
                orderedSimulations?.at(currentPosition - 1)?.id || ""
              );
            }}
            iconName={"common/chevron-left"}
            iconStyle={{ width: 16, height: 16 }}
          />

          <GenerateSimulationHistoryButton
            $buttonIconBg
            disabled={
              currentPosition === Number(orderedSimulations?.length) - 1
            }
            onClick={() => {
              setSimulationId(
                orderedSimulations?.at(currentPosition + 1)?.id || ""
              );
            }}
            iconName={"common/chevron-right"}
            iconStyle={{ width: 16, height: 16 }}
          />
        </FlexGroup>
      )}

      <PreviewImage src={selectedSimulation?.image?.image} />
    </FlexGroup>
  );
};
