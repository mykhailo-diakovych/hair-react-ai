import React, { useContext, useMemo } from "react";
import { Skeleton } from "antd";
import { ModelImage } from "@services/ModelImage/interfaces/ModelImage.interface";
import { useGetImageUrlQuery } from "@hooks/query/image/useGetImageUrlQuery";
import { SimulatorContext } from "@features/simulator/Simulator.context";
import { SimulationProcessTabs } from "@features/simulator/components/SimulationProcessOriginal/styled/SimulationProcessTabs.styled";
import { SimulationProcessImage } from "@features/simulator/components/shared/styled/SimulationProcessImage.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";

export const SimulationProcessOriginal = ({
  modelImage
}: {
  modelImage?: ModelImage;
}) => {
  const {
    generatedSimulations,
    simulationsHistory,
    simulationsHistoryLength,
    faceId,
    faceImages
  } = useContext(SimulatorContext);

  const { data: originalImageData } = useGetImageUrlQuery(modelImage?.image);
  const originalImage = originalImageData?.image;

  const simulationImageUrl =
    simulationsHistory?.position === simulationsHistoryLength
      ? (faceId as string)
      : faceImages.find(
          (faceImage) =>
            faceImage.modelImageId === modelImage?.id &&
            faceImage.group_index ===
              generatedSimulations?.simulations.at(0)?.group_index
        )?.face || modelImage?.face;
  const { data: simulationImageData } = useGetImageUrlQuery(simulationImageUrl);
  const simulationImage = simulationImageData?.image;

  const tabsItems = useMemo(() => {
    return [
      {
        key: "original",
        label: <Paragraph>Original photo</Paragraph>,
        children: originalImage ? (
          <SimulationProcessImage src={originalImage} />
        ) : (
          <Skeleton.Image
            style={{
              borderRadius: 8,
              overflow: "hidden",
              maxHeight: "max(100vh - 270px, 500px)",
              width: "100%",
              height: "100%"
            }}
            active
          />
        )
      },
      {
        key: "model",
        label: <Paragraph>Model image</Paragraph>,
        children: simulationImage ? (
          <SimulationProcessImage src={simulationImage} />
        ) : (
          <Skeleton.Image
            style={{
              borderRadius: 8,
              overflow: "hidden",
              maxHeight: "max(100vh - 270px, 500px)",
              width: "100%",
              height: "100%"
            }}
            active
          />
        )
      }
    ];
  }, [originalImage, simulationImage]);

  return <SimulationProcessTabs items={tabsItems} />;
};
