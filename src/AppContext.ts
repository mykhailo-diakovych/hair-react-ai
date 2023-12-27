import React, { createContext } from "react";
import { AuthenticationCredentials } from "@features/authentication/interfaces/AuthenticationCredentials.interface";
import { VIEWMODS } from "@config/constants";

interface IGlobalStorage {
  viewMode: VIEWMODS | null;
  setViewMode: React.Dispatch<React.SetStateAction<VIEWMODS>>;
  user: AuthenticationCredentials | null;
  setUser: React.Dispatch<
    React.SetStateAction<AuthenticationCredentials | null>
  >;
}

const DEFAULT_GLOBAL_STORAGE: IGlobalStorage = {
  viewMode: VIEWMODS.CLINIC,
  setViewMode: () => {},
  user: null,
  setUser: () => {}
};

export const GlobalStorage = createContext<IGlobalStorage>(
  DEFAULT_GLOBAL_STORAGE
);
