import React, { useContext, useEffect, useState } from "react";
import { ModelSimulation } from "@services/Simulation/interfaces/ModelSimulation.interface";
import { useGetModelSimulationQuery } from "@hooks/query/simulation/useGetModelSimulationQuery";
import { SimulatorContext } from "@features/simulator/Simulator.context";
import { SimulationProcessImageSelectButtons } from "@features/simulator/components/SimulationProcessVariations/styled/SimulationProcessImageSelectButtons.styled";
import { SimulationImageSettings } from "@features/simulator/components/SimulationProcessVariations/components/SimulationImageSettings/SimulationImageSettings";
import { SimulationProcessImage } from "@features/simulator/components/shared/styled/SimulationProcessImage.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";

import { ButtonPrimary } from "@components/Button/styled/ButtonPrimary.styled";

import { SimulationStatus } from "../../../../../../types/SimulationStatus.enum";

export const SimulationProcessItem = ({
  simulation,
  selectSimulationCallback,
  onSimulationLoaded,
  setShowSaveSimulation
}: {
  simulation: ModelSimulation;
  selectSimulationCallback: (simulation: ModelSimulation) => void;
  onSimulationLoaded?: (id: string) => void;
  setShowSaveSimulation: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const { generatedSimulations, processedSimulation, setProcessedSimulation } =
    useContext(SimulatorContext);

  const {
    data: modelSimulation,
    isStale,
    isFetching,
    refetch
  } = useGetModelSimulationQuery(simulation.id, {
    staleTime: 1000 * 10
  });

  useEffect(() => {
    if (
      modelSimulation?.status === SimulationStatus.FAILURE &&
      modelSimulation?.image
    ) {
      setIsImageLoading(false);
    }

    if (!isImageLoading && modelSimulation?.image) {
      generatedSimulations?.simulations?.forEach((simulation) => {
        if (simulation.id === modelSimulation.id && !simulation.image) {
          onSimulationLoaded?.(modelSimulation.id);
          simulation.image = modelSimulation.image;
        }
      });
    }

    if (
      isStale &&
      !modelSimulation?.image &&
      modelSimulation?.status !== SimulationStatus.FAILURE
    ) {
      refetch();
    }
  }, [simulation, isStale, isFetching]);

  return (
    <FlexGroup gap={6} column>
      <FlexGroup style={{ position: "relative" }}>
        <SimulationProcessImage
          onLoaded={() => {
            setIsImageLoading(false);
          }}
          defaultPlaceholder={false}
          src={modelSimulation?.image?.image}
          isError={modelSimulation?.status === SimulationStatus.FAILURE}
        />

        <SimulationImageSettings apiParams={modelSimulation?.api_params} />
      </FlexGroup>

      {!processedSimulation ? (
        <ButtonPrimaryOutlined
          disabled={
            isImageLoading ||
            modelSimulation?.status === SimulationStatus.FAILURE
          }
          onClick={() =>
            selectSimulationCallback(modelSimulation as ModelSimulation)
          }
        >
          Select
          <IconSprite
            iconName={"pagination/arrow-right"}
            style={{ width: 16, height: 16 }}
          />
        </ButtonPrimaryOutlined>
      ) : (
        <SimulationProcessImageSelectButtons>
          <ButtonPrimaryOutlined
            disabled={isImageLoading}
            style={{ width: "100%" }}
            onClick={() => setProcessedSimulation(null)}
          >
            Back
          </ButtonPrimaryOutlined>

          <ButtonPrimary
            disabled={!processedSimulation?.is_deleted || isImageLoading}
            onClick={() => setShowSaveSimulation(true)}
          >
            Save
          </ButtonPrimary>
        </SimulationProcessImageSelectButtons>
      )}
    </FlexGroup>
  );
};
