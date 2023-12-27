import { useTheme } from "styled-components";
import { useUpdateEffect } from "react-use";
import React, { useContext, useEffect, useState } from "react";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { useUpdateModelImageFieldsMutation } from "@hooks/query/modelImage/useUpdateModelImageFieldsMutation";
import { SimulatorContext } from "@features/simulator/Simulator.context";
import { SimulationProcessSettingsStyled } from "@features/simulator/components/SimulationProcessSettings/styled/SimulationProcessSettings.styled";
import { SavedSimulationSettingsModal } from "@features/simulator/components/SimulationProcessSettings/styled/SavedSimulationSettingsModal.styled";
import { SavedSimulationSettings } from "@features/simulator/components/SimulationProcessSettings/components/SavedSimulationSettings/SavedSimulationSettings";
import { SimulationSettingsWrapper } from "@features/simulation/home/components/SimulationControls/components/SimulationSettings/styled/SimulationSettingsWrapper.styled";
import { SimulationSettingItem } from "@features/simulation/home/components/SimulationControls/components/SimulationSettings/styled/SimulationSettingItem.styled";
import {
  HAIR_TREATMENT_OPTIONS,
  MODEL_ACCURACY_SLIDER,
  MODEL_RESOLUTION_SLIDER,
  SEED_RANGE,
  SIMULATOR_DEFAULT_SETTINGS,
  SimulatorSettings
} from "@config/constants";
import { Slider } from "@components/Slider/styled/Slider.styled";
import { Select } from "@components/Select/styled/Select.styled";
import { Input } from "@components/Input/styled/Input.styled";
import { IconSprite } from "@components/Icon/IconSprite";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { FlexGroup } from "@components/FlexGroup/FlexGroup";
import { ButtonPrimaryOutlined } from "@components/Button/styled/ButtonPrimaryOutlined.styled";

import { SimulationModelSettings } from "../../../../interfaces/simulationSettings.interface";

interface SimulationProcessSettingsProps {
  isGenerating: boolean;
  showSettings: boolean;
  showSavedSimulationSettings: boolean;
  setShowSavedSimulationSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SimulationProcessSettings = ({
  showSettings,
  showSavedSimulationSettings,
  setShowSavedSimulationSettings
}: SimulationProcessSettingsProps) => {
  const theme = useTheme();

  // const [thickness, setThickness] = useState<SimulationHairOption>(
  //   SIMULATION_HAIR_THICKNESS[0]
  // );
  // const [color, setColor] = useState<SimulationHairOption>(
  //   SIMULATION_PROCESS_HAIR_COLOURS[0]
  // );
  const [isOpenAdvancedSettings, toggleOpenAdvancedSettings] = useState(false);

  const {
    model,
    selectedModelImage,
    accuracy,
    setAccuracy,
    seed,
    setSeed,
    resolution,
    setResolution,
    hairTreatment,
    setHairTreatment,
    simulationAmount,
    setSimulationAmount,
    prompt,
    setPrompt,
    negativePrompt,
    setNegativePrompt,
    processedSimulation,
    generatedSimulations,
    simulationsHistory,
    handleGenerateVariants,
    simulationsHistoryLength,
    isGeneratingVariants,
    handleResetSettings
  } = useContext(SimulatorContext);

  const isSelected = !!processedSimulation;

  const updateModelImageFieldsMutation = useUpdateModelImageFieldsMutation();

  useEffect(() => {
    if (processedSimulation) {
      return;
    }

    const lastSimulation = generatedSimulations?.simulations.at(-1);

    setAccuracy(
      lastSimulation?.simulator_settings?.accuracy ||
        SIMULATOR_DEFAULT_SETTINGS.accuracy
    );
    setResolution(
      lastSimulation?.simulator_settings?.resolution ||
        SIMULATOR_DEFAULT_SETTINGS.resolution
    );
    setSimulationAmount(
      lastSimulation?.simulator_settings?.simulationAmount ||
        SIMULATOR_DEFAULT_SETTINGS.simulationAmount
    );
    setPrompt(
      lastSimulation?.simulator_settings?.prompt ||
        SIMULATOR_DEFAULT_SETTINGS.prompt
    );
    setNegativePrompt(
      lastSimulation?.simulator_settings?.negativePrompt ||
        SIMULATOR_DEFAULT_SETTINGS.negativePrompt
    );
    setHairTreatment(
      lastSimulation?.simulator_settings?.hairTreatment ||
        SIMULATOR_DEFAULT_SETTINGS.hairTreatment
    );
  }, [generatedSimulations, processedSimulation]);

  const handleChangeSimulatorSettings = () => {
    const simulatorSettings: SimulatorSettings = {
      accuracy,
      resolution,
      simulationAmount,
      prompt,
      seed: seed || processedSimulation?.seed || null,
      negativePrompt,
      hairTreatment,
      effect_settings: model?.effect_settings?.history?.at(
        Math.min(
          model?.effect_settings?.historyIndex - 1,
          model?.effect_settings?.history.length - 1
        )
      ) as SimulationModelSettings,
      face: selectedModelImage?.simulator_settings?.face,
      mask: selectedModelImage?.simulator_settings?.mask
    };

    updateModelImageFieldsMutation({
      id: selectedModelImage?.id as string,
      simulator_settings: simulatorSettings
    });
  };

  useDebounceEffect(
    () => {
      handleChangeSimulatorSettings();
    },
    1000,
    [
      accuracy,
      resolution,
      simulationAmount,
      prompt,
      seed,
      negativePrompt,
      hairTreatment
    ]
  );

  useEffect(() => {
    if (selectedModelImage) {
      handleChangeSimulatorSettings();
    }
  }, [selectedModelImage]);

  useUpdateEffect(() => {
    if (processedSimulation) {
      toggleOpenAdvancedSettings(false);
    }
  }, [processedSimulation]);

  return (
    <SimulationProcessSettingsStyled $isHidden={showSettings}>
      <FlexGroup column p={20} gap={0}>
        <Slider
          label={"Settings"}
          auto
          showQuantity={false}
          onClickAuto={handleResetSettings}
        />
      </FlexGroup>

      <FlexGroup p={20} bg={theme.colors.mineshaft} column>
        <Slider
          $isActive
          disabled={isSelected}
          label={"Model accuracy"}
          min={MODEL_ACCURACY_SLIDER.min}
          max={MODEL_ACCURACY_SLIDER.max}
          step={MODEL_ACCURACY_SLIDER.step}
          value={accuracy}
          onValueChange={(value: number) => setAccuracy(value)}
          unit={" %"}
        />

        <Slider
          $isActive
          label={"Simulations generated"}
          min={1}
          max={10}
          value={simulationAmount}
          onValueChange={(value: number) => setSimulationAmount(value)}
        />

        <SimulationSettingsWrapper
          $disabled={isSelected}
          isOpen={isOpenAdvancedSettings}
          onChange={() => toggleOpenAdvancedSettings(!isOpenAdvancedSettings)}
          accordionItems={[
            {
              id: "simulation-settings",
              title: isOpenAdvancedSettings
                ? "Close advanced settings"
                : "Advanced settings",
              children: (
                <GroupItems>
                  <SimulationSettingItem>
                    <Select
                      disabled={isSelected}
                      label={"HAIR TREATMENT"}
                      defaultValue={HAIR_TREATMENT_OPTIONS[1].value}
                      options={HAIR_TREATMENT_OPTIONS}
                      value={
                        HAIR_TREATMENT_OPTIONS.find(
                          (option) => option.label === hairTreatment
                        )?.value as string
                      }
                      onChange={(value: number) => {
                        setHairTreatment(
                          HAIR_TREATMENT_OPTIONS.find(
                            (option) => option.value === value
                          )?.label as string
                        );
                      }}
                    />

                    <Slider
                      $isActive
                      disabled={isSelected}
                      label={"Resolution"}
                      min={MODEL_RESOLUTION_SLIDER.min}
                      max={MODEL_RESOLUTION_SLIDER.max}
                      step={MODEL_RESOLUTION_SLIDER.step}
                      value={resolution}
                      onValueChange={(value: number) => setResolution(value)}
                      unit={" %"}
                    />
                  </SimulationSettingItem>

                  {/*<SimulationSettingItem>
                    <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
                      Thickness
                    </Paragraph>

                    <SimulationOptions
                      selectedOption={thickness}
                      setSelectedOption={setThickness}
                      options={SIMULATION_HAIR_THICKNESS}
                      columns={3}
                    />

                    <Paragraph color={"dustyGray"} size={"lg"} $uppercase>
                      Colour
                    </Paragraph>

                    <SimulationOptions
                      selectedOption={color}
                      setSelectedOption={setColor}
                      options={SIMULATION_PROCESS_HAIR_COLOURS}
                    />
                  </SimulationSettingItem>*/}

                  <SimulationSettingItem>
                    <Input
                      label={"Prompt"}
                      labelStyles={{
                        color: theme.colors.dustyGray,
                        textTransform: "uppercase"
                      }}
                      placeholder={"Type here"}
                      value={prompt}
                      name={"prompt"}
                      onChange={(e: any) => setPrompt(e.target.value)}
                    />

                    <Input
                      label={"Seed"}
                      type={"number"}
                      min={1}
                      max={1000000}
                      labelStyles={{
                        color: theme.colors.dustyGray,
                        textTransform: "uppercase"
                      }}
                      placeholder={"Variation seed number"}
                      name={"seed"}
                      value={seed}
                      onChange={(e: any) => {
                        setSeed(e.target.value);
                      }}
                      onBlur={(e: any) => {
                        const value = Number(e.target.value);

                        if (!e.target.value) {
                          setSeed(null);
                          return;
                        }

                        if (value < SEED_RANGE.min) {
                          setSeed(SEED_RANGE.min);
                        } else if (value > SEED_RANGE.max) {
                          setSeed(SEED_RANGE.max);
                        } else {
                          setSeed(value);
                        }
                      }}
                    />

                    <Input
                      label={"Negative Prompt"}
                      labelStyles={{
                        color: theme.colors.dustyGray,
                        textTransform: "uppercase"
                      }}
                      value={negativePrompt}
                      placeholder={"Type here"}
                      name={"negativePrompt"}
                      onChange={(e: any) => setNegativePrompt(e.target.value)}
                    />
                  </SimulationSettingItem>
                </GroupItems>
              )
            }
          ]}
        />
      </FlexGroup>

      <FlexGroup gap={0} p={20}>
        <ButtonPrimaryOutlined
          disabled={
            simulationsHistory?.position === simulationsHistoryLength ||
            isGeneratingVariants
          }
          style={{ width: "100%" }}
          onClick={() => handleGenerateVariants()}
        >
          {isSelected ? "Generate Variants" : "Re-generate"}
          {isGeneratingVariants && (
            <IconSprite
              iconName={"common/spinner"}
              style={{ marginLeft: 5, width: 16, height: 16 }}
            />
          )}
        </ButtonPrimaryOutlined>
      </FlexGroup>

      <SavedSimulationSettingsModal
        title={"Settings"}
        setIsOpen={setShowSavedSimulationSettings}
        isOpen={showSavedSimulationSettings}
        maxWidth={360}
      >
        <SavedSimulationSettings />
      </SavedSimulationSettingsModal>
    </SimulationProcessSettingsStyled>
  );
};
