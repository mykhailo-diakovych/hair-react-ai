import React, { useState } from "react";
import { LeadSettingsOption } from "@features/clinic/settings/components/LeadSettingsTab/components/LeadSettingsOption/LeadSettingsOption";
import {
  SIMULATION_VISIBILITY_ITEMS,
  SimulationVisibilityItem
} from "@config/constants";
import { GroupItems } from "@components/GroupItems/GroupItems";

export const LeadSettingVisibilityOptions = () => {
  const [simulationVisibilityItems, setSimulationVisibilityItems] = useState<
    SimulationVisibilityItem[]
  >(SIMULATION_VISIBILITY_ITEMS);

  return (
    <GroupItems>
      {simulationVisibilityItems.map((simulationVisibilityItem) => {
        return (
          <LeadSettingsOption
            key={simulationVisibilityItem.id}
            iconName={"common/eye-open"}
            title={simulationVisibilityItem.title}
            switchValue={simulationVisibilityItem.visible}
            onSwitchChange={(currentVisibleState) => {
              const simulationVisibleItems = simulationVisibilityItems.filter(
                (item) => item.visible
              );

              if (
                !(
                  simulationVisibleItems.length === 1 &&
                  simulationVisibleItems.some(
                    (item) => item.id === simulationVisibilityItem.id
                  ) &&
                  !currentVisibleState
                )
              ) {
                setSimulationVisibilityItems(
                  simulationVisibilityItems.map((item) => {
                    return item.id === simulationVisibilityItem.id
                      ? {
                          ...item,
                          visible: currentVisibleState
                        }
                      : item;
                  })
                );
              }
            }}
          />
        );
      })}
    </GroupItems>
  );
};
