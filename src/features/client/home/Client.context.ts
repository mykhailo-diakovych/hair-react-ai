import { createContext } from "react";
import { ClinicPublicInfo } from "@services/Clinic/interfaces/Clinic.interface";

interface IClientContext {
  clinic?: ClinicPublicInfo | null;
  clinicId?: string;
}

const DEFAULT_CLIENT_TABS_CONTEXT: IClientContext = {};

export const ClientContext = createContext<IClientContext>(
  DEFAULT_CLIENT_TABS_CONTEXT
);
