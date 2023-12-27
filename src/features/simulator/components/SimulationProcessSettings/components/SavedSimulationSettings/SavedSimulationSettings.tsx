import { useTheme } from "styled-components";
import { useParams } from "react-router-dom";
import React, { useContext, useMemo } from "react";
import { useGetModelByIdQuery } from "@hooks/query/model/useGetModelByIdQuery";
import { formatDate } from "@helpers/formatDate";
import { SimulatorContext } from "@features/simulator/Simulator.context";
import { SavedSimulationItem } from "@features/simulator/components/SimulationProcessSettings/components/SavedSimulationItem/SavedSimulationItem";
import {
  SIMULATION_HAIR_STYLE,
  SIMULATION_HAIR_TYPES,
  SIMULATION_SECTION_VOLUME_TYPE
} from "@config/constants";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { Divider } from "@components/Divider/styled/Divider.styled";

import { SimulationModelSettings } from "../../../../../../interfaces/simulationSettings.interface";

export const SavedSimulationSettings = () => {
  const theme = useTheme();
  const { simulationsHistory, generatedSimulations } =
    useContext(SimulatorContext);

  const { id } = useParams() as { id: string };
  const { data: model } = useGetModelByIdQuery(id, {
    staleTime: 0
  });

  const { selectedModelImage } = useContext(SimulatorContext);

  const modelSettings: SimulationModelSettings | null = useMemo(() => {
    if (!model) {
      return null;
    }

    return model.effect_settings?.history?.at(
      model.effect_settings?.historyIndex - 1
    ) as SimulationModelSettings;
  }, [model]);

  const simulatorSettings =
    generatedSimulations?.simulations.at(0)?.simulator_settings;

  const modelTotalSectionVolume = Object.values(
    simulatorSettings?.effect_settings?.sectionVolume ||
      modelSettings?.sectionVolume ||
      {}
  ).reduce((acc, item) => {
    return acc + item;
  }, 0);

  return (
    <GroupItems gap={0}>
      <FlexGroup spread flexWrap={"wrap"}>
        <SavedSimulationItem
          item={"History"}
          value={`${Number(simulationsHistory?.position) + 1} of ${
            simulationsHistory?.history.length
          }`}
        />
        <SavedSimulationItem
          item={"Created"}
          value={formatDate(
            new Date(generatedSimulations?.createdAt as string) || new Date(),
            "h:mma, MMM Do"
          )}
        />
      </FlexGroup>

      <Divider $color={theme.background.dustyGray700} />

      <FlexGroup>
        <SavedSimulationItem item={"Model template name"} value={model?.name} />
      </FlexGroup>

      <Divider $color={theme.background.dustyGray700} />

      <FlexGroup column>
        <SavedSimulationItem item={"COLOUR"} />

        <FlexGroup spread flexWrap={"wrap"}>
          <SavedSimulationItem
            minWidth={130}
            item={"Colour"}
            value={
              simulatorSettings?.effect_settings?.color || modelSettings?.color
            }
          />

          {/*<SavedSimulationItem
            minWidth={130}
            item={"Salt & Pepper"}
            value={modelSettings.saltAndPepper}
            unit={"%"}
          />

          <SavedSimulationItem
            minWidth={130}
            item={"Tone"}
            value={modelSettings.toneColor}
          />

          <SavedSimulationItem
            minWidth={130}
            item={"Shine"}
            value={modelSettings.shine}
            unit={"%"}
          />

          <SavedSimulationItem
            minWidth={130}
            item={"Ombre"}
            value={modelSettings.ombreColor}
          />

          <SavedSimulationItem
            minWidth={130}
            item={"Ombre shift"}
            value={modelSettings.ombreShift}
            unit={"%"}
          />*/}
        </FlexGroup>
      </FlexGroup>

      <Divider $color={theme.background.dustyGray700} />

      <FlexGroup column compact>
        <SavedSimulationItem $uppercase item={"Hair type"} />

        <SavedSimulationItem
          maxWidth={130}
          item={"Type"}
          value={
            SIMULATION_HAIR_TYPES.find(
              (item) =>
                item.value ===
                (simulatorSettings?.effect_settings?.hairType ||
                  modelSettings?.hairType)
            )?.label
          }
        />

        {/*<SavedSimulationItem
          maxWidth={130}
          item={"Thickness"}
          value={modelSettings?.thickness}
        />*/}
      </FlexGroup>

      <Divider $color={theme.background.dustyGray700} />

      <FlexGroup column compact>
        <SavedSimulationItem $uppercase item={"Style"} />

        <SavedSimulationItem
          maxWidth={130}
          item={"Style"}
          value={
            SIMULATION_HAIR_STYLE.find(
              (item) =>
                item.value ===
                (simulatorSettings?.effect_settings?.hairStyle ||
                  modelSettings?.hairStyle)
            )?.label
          }
        />
      </FlexGroup>

      <Divider $color={theme.background.dustyGray700} />

      <FlexGroup column compact>
        <SavedSimulationItem $uppercase item={"volume"} />

        <SavedSimulationItem
          maxWidth={130}
          item={"Norwood"}
          value={modelTotalSectionVolume}
        />
        <SavedSimulationItem
          maxWidth={130}
          item={"Hairline"}
          value={selectedModelImage?.position_settings?.hairLine}
        />
        <SavedSimulationItem
          maxWidth={130}
          item={"Section"}
          value={
            SIMULATION_SECTION_VOLUME_TYPE.find(
              (item) =>
                item.value ===
                (simulatorSettings?.effect_settings?.sectionVolumeType ||
                  modelSettings?.sectionVolumeType)
            )?.label
          }
        />
        <SavedSimulationItem
          maxWidth={130}
          item={"Grafts"}
          value={
            simulatorSettings?.effect_settings?.sectionVolume[
              simulatorSettings?.effect_settings?.sectionVolumeType
            ] || modelSettings?.sectionVolume[modelSettings?.sectionVolumeType]
          }
        />
      </FlexGroup>
    </GroupItems>
  );
};
