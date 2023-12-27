import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  API_SERVICES,
  CLINIC_STORAGE_KEY,
  VIEWMODE_STORAGE_KEY,
  VIEWMODS
} from "@config/constants";

import { GlobalStorage } from "../AppContext";

export const useSwitchRole = () => {
  const { setViewMode } = useContext(GlobalStorage);

  const queryClient = useQueryClient();

  const invalidateQueriesOnSwitch = () => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        [
          API_SERVICES.PATIENTS.invalidationKey,
          API_SERVICES.CLINIC.invalidationKey
        ].some((key) => query.queryKey.includes(key))
    });
  };

  const switchRole = ({
    viewMode,
    clinicId
  }: {
    viewMode: VIEWMODS;
    clinicId?: string;
  }) => {
    switch (viewMode) {
      case VIEWMODS.SUPERADMIN:
        setViewMode(VIEWMODS.SUPERADMIN);
        localStorage.removeItem(CLINIC_STORAGE_KEY);
        localStorage.setItem(VIEWMODE_STORAGE_KEY, VIEWMODS.SUPERADMIN);

        break;
      case VIEWMODS.CLINIC:
        localStorage.setItem(CLINIC_STORAGE_KEY, clinicId || "");

        setViewMode(VIEWMODS.CLINIC);
        localStorage.setItem(VIEWMODE_STORAGE_KEY, VIEWMODS.CLINIC);

        invalidateQueriesOnSwitch();

        break;
    }
  };

  return switchRole;
};
