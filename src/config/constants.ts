import React from "react";
import customParse from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { SliderMarks } from "antd/es/slider";
import { DefaultOptionType } from "antd/es/select";
import { ModelSimulationRequest } from "@services/Simulation/interfaces/ModelSimulationRequest.interface";

import {
  SimulationLightingSettings,
  SimulationModelSettings,
  SimulationRotateSettings,
  SimulationScaleSettings,
  SimulationTranslateSettings
} from "../interfaces/simulationSettings.interface";
import { IFilterTypeOption } from "../interfaces/filterTypeOption.interface";

dayjs.extend(advancedFormat);
dayjs.extend(customParse);

export const ROUTES = {
  LOGIN: "/",
  SIGNUP: "/registration",
  RESET_PASSWORD_EMAIL: "/account/reset/email",
  RESET_PASSWORD: "/account/reset",
  CLINIC_HOME: "/clinic/home",
  CLINIC_PATIENTS: "/clinic/patients",
  CLINIC_PATIENT_PROFILE: "/clinic/patients/profile/:id",
  CLINICS_HOME: "/clinics/home",
  CLINICS_PATIENTS: "/clinics/patients",
  CLINICS: "/clinics/list",
  SIMULATION_PREVIEW: "/simulation/preview/:id",
  EDIT_SIMULATION: "/simulation/edit/:id",
  SIMULATION_PREVIEW_ALL: "/simulation/preview/all/:id",
  SIMULATOR: "/simulator/:id",
  TUTORIALS: "/clinic/tutorials",
  SETTINGS: "/clinic/settings",
  CLIENT: "/client/:clinic_ref",
  CLIENT_SIMULATIONS: "/client/simulations/:id",
  SUCCESS_PAYMENT: "thank-you/",
  EDIT_SIMULATION_BY_ID: function (id: string) {
    return `/simulation/edit/${id}`;
  },
  PROCESS_SIMULATION_BY_ID: function (id: string) {
    return `/simulator/${id}`;
  },
  PREVIEW_SIMULATION_BY_ID: function (id: string, simulationId: string) {
    return `/simulation/preview/${id}?simulationId=${simulationId}`;
  },
  PREVIEW_ALL_SIMULATION_BY_ID: function (id: string) {
    return `/simulation/preview/all/${id}`;
  },
  VIEW_PATIENT_BY_ID: function (id: string) {
    return `/clinic/patients/profile/${id}`;
  }
};

export const ROUTES_TITLES = {
  DEFAULT_TITLE: "Website",
  LOGIN: "Login",
  SIGNUP: "Sign Up",
  RESET_PASSWORD_EMAIL: "Reset Password",
  RESET_PASSWORD: "Reset Password",
  CLINIC_HOME: "Home",
  CLINIC_PATIENTS: "Patients",
  CLINIC_PATIENT_PROFILE: "Profile",
  CLINICS_HOME: "Simulations",
  CLINICS_PATIENTS: "Patients",
  CLINICS: "Clinics",
  SIMULATION_PREVIEW: "Preview",
  EDIT_SIMULATION: "Editor",
  SIMULATION_PREVIEW_ALL: "Preview All",
  SIMULATOR: "Simulator",
  TUTORIALS: "Tutorials",
  SETTINGS: "Settings",
  CLIENT: "",
  CLIENT_SIMULATIONS: "Simulations",
  SUCCESS_PAYMENT: "Payment successfull"
};

export type FunctionService = (id: string) => string;
export interface ServiceOptions {
  serviceName: string;
  // invalidationKey?: string;
  [key: string]: string | FunctionService;
}
export interface ApiServiceOptions {
  AUTHENTICATION: ServiceOptions;
  ACCOUNT: ServiceOptions;
  PATIENTS: ServiceOptions;
  FILES: ServiceOptions;
  SIMULATIONS: ServiceOptions;
  CLINIC: ServiceOptions;
  PLAN: ServiceOptions;
  MODEL_IMAGE: ServiceOptions;
  MODEL: ServiceOptions;
  [key: string]: ServiceOptions;
}

export const API_SERVICES: ApiServiceOptions = {
  AUTHENTICATION: {
    serviceName: "auth/jwt/",
    LOGIN: "create/",
    REFRESH_TOKEN: "refresh/"
  },
  ACCOUNT: {
    serviceName: "auth/",
    RESET_PASSWORD_EMAIL: "password/reset/",
    RESET_PASSWORD: "password/reset/confirm/"
  },
  PATIENTS: {
    serviceName: "",
    GET_ALL: "patients/",
    CREATE_CONSULTATION: "patients/",
    CREATE_LEAD: "patient/",
    DELETE: (id: string) => {
      return `patients/${id}/`;
    },
    EDIT_CONSULTATION: (id: string) => {
      return `patients/${id}/`;
    },
    GET_BY_ID: (id: string) => {
      return `patients/${id}/`;
    },
    GET_BY_REF_CODE: (ref_code: string) => {
      return `patient/${ref_code}/`;
    },
    UPDATE: (id?: string) => {
      return `patients/${id}/`;
    },
    invalidationKey: "patients"
  },
  SIMULATIONS: {
    serviceName: "",
    DELETE: "simulations/",
    CREATE_MODEL_SIMULATION: "model-simulations/",
    GET_MODEL_SIMULATIONS: "model-simulations/",
    GET_MODEL_SIMULATION: (id: string) => `model-simulations/${id}/`,
    LEAD_SIMULATION: (id: string) => `image/${id}/getSimulation`,
    CREATE_SIMULATION: (id: string) => `image/${id}/createSimulation/`,
    UPDATE_SIMULATION: (id: string) => `model-simulations/${id}/`
  },
  CLINIC: {
    serviceName: "",
    GET_ALL: "clinic/",
    UPDATE: "clinic/",
    CREATE: "clinic/",
    GET: (id: string) => `clinic/${id}/`,
    CREATE_USER: (id: string) => `clinic/${id}/createUser/`
  },
  CLINIC_LEAD: {
    serviceName: "clinic-lead",
    CREATE: ""
  },
  FILES: {
    serviceName: "",
    IMAGE: "image/",
    UPLOAD_PATIENT_IMAGE: "images/",
    UPDATE_PATIENT_IMAGE: (id: string) => `images/${id}/`,
    IMAGE_BY_ID: (id: string) => `image/${id}/`,
    PATIENT_IMAGE_BY_ID: (id: string) => `images/${id}/`,
    IMAGES: (parentImgId: string) => `image/${parentImgId}/`,
    GET_AR_SETTINGS: (id: string) => `image-mcp/${id}/`
  },
  PLAN: {
    serviceName: "plan",
    GET_ALL: "",
    GET_BY_ID: (id: string) => {
      return `${id}/`;
    }
  },
  MODEL_IMAGE: {
    serviceName: "model-image",
    CREATE: "",
    BY_ID: (id: string) => {
      return `${id}/`;
    }
  },
  MODEL: {
    serviceName: "patient-model",
    CREATE: "",
    BY_ID: (id: string) => {
      return `${id}/`;
    },
    invalidationKey: "patient-model"
  }
};

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export enum FilterTypes {
  Date = "Date",
  Name = "Name"
}

export const FilterOptions: IFilterTypeOption[] = [
  {
    index: 0,
    value: "Newest first",
    type: FilterTypes.Date,
    ordering: "-created_at"
  },
  {
    index: 1,
    value: "Oldest first",
    type: FilterTypes.Date,
    ordering: "created_at"
  },
  { index: 2, value: "Name A-Z", type: FilterTypes.Name, ordering: "name" },
  { index: 3, value: "Name Z-A", type: FilterTypes.Name, ordering: "-name" }
];

export interface IClinicSimulationData {
  key: React.Key;
  photoAndSimulation: React.ReactNode;
  info: React.ReactNode;
  simulations: number;
  // sessions: number;
  created: Date | string;
  // lastOpened: Date | string;
}

export interface ISimulationData {
  key: React.Key;
  photoAndSimulation: React.ReactNode;
  info: React.ReactNode;
  title: React.ReactNode;
  visibility: React.ReactNode;
  created: Date | string;
  // lastOpened: Date | string;
}

export interface IPatientsData {
  key: React.Key;
  photo: React.ReactNode;
  info: React.ReactNode;
  created: Date | string;
  photos: number;
  simulations: number;
  // sessions: number;
  // lastOpened: Date | string;
}

export interface IClinicsData {
  key: React.Key;
  logo: React.ReactNode;
  info: React.ReactNode;
  created: Date | string;
  patients: number;
  leads: number;
  consultations: number;
  simulations: number;
  // sessions: number;
  // lastOpened: Date | string;
  actions: React.ReactNode;
}

export interface ISimulationClinicData {
  key: React.Key;
  photoAndSimulation: React.ReactNode;
  info: React.ReactNode;
  created: Date | string;
  simulations: number;
  // sessions: number;
  // lastOpened: Date | string;
}

export interface IClinicsPatientsData {
  key: React.Key;
  photo: React.ReactNode;
  clinic: React.ReactNode;
  info: React.ReactNode;
  created: Date | string;
  photos: number;
  simulations: number;
  // sessions: number;
  // lastOpened: Date | string;
}

type dateFields = "created"; // | "lastOpened";

const tableSorters = {
  date:
    (field: dateFields, format = "Do MMM YY") =>
    <
      T extends
        | ISimulationData
        | IPatientsData
        | IClinicsData
        | ISimulationClinicData
        | IClinicsPatientsData
    >(
      a: T,
      b: T
    ) => {
      return (
        dayjs(a[field], format).toDate().getTime() -
        dayjs(b[field], format).toDate().getTime()
      );
    },
  simulations: <T extends IPatientsData | IClinicsData | ISimulationClinicData>(
    a: T,
    b: T
  ) => a.simulations - b.simulations,
  // sessions: <T extends IPatientsData | IClinicsData | ISimulationClinicData>(
  //   a: T,
  //   b: T
  // ) => a.sessions - b.sessions,
  photos: <T extends IPatientsData>(a: T, b: T) => a.photos - b.photos
};

export const SIMULATIONS_TABLE_COLUMNS: ColumnsType<ISimulationData> = [
  {
    title: "Before & after",
    dataIndex: "photoAndSimulation"
  },
  {
    title: "Full name",
    dataIndex: "info"
  },
  {
    title: "Title",
    dataIndex: "title"
  },
  {
    title: "Visibility",
    dataIndex: "visibility"
  },
  {
    title: "Created",
    dataIndex: "created",
    sorter: tableSorters.date("created")
  },
  // {
  //   title: "Last Opened",
  //   dataIndex: "lastOpened",
  //   sorter: tableSorters.date("created")
  // },
  {
    title: "",
    dataIndex: "actions",
    width: "30%"
  }
];

export const PATIENTS_TABLE_COLUMNS: ColumnsType<IPatientsData> = [
  {
    title: "Photo",
    dataIndex: "photo"
  },
  {
    title: "Full name",
    dataIndex: "info"
  },
  {
    title: "Created",
    dataIndex: "created",
    sorter: tableSorters.date("created")
  },
  {
    title: "Images",
    dataIndex: "photos",
    sorter: tableSorters.photos
  },
  {
    title: "Simulations",
    dataIndex: "simulations",
    sorter: tableSorters.simulations
  },
  // {
  //   title: "Sessions",
  //   dataIndex: "sessions",
  //   sorter: tableSorters.sessions
  // },
  // {
  //   title: "Last Opened",
  //   dataIndex: "lastOpened",
  //   sorter: tableSorters.date("lastOpened")
  // },
  {
    title: "View profile",
    dataIndex: "actions"
  }
];

export const CLINICS_TABLE_COLUMNS: ColumnsType<IClinicsData> = [
  {
    title: "Logo",
    dataIndex: "logo"
  },
  {
    title: "Info",
    dataIndex: "info"
  },
  {
    title: "Created",
    dataIndex: "created",
    sorter: tableSorters.date("created")
  },
  {
    title: "Patients",
    dataIndex: "patients"
  },
  {
    title: "Leads",
    dataIndex: "leads"
  },
  {
    title: "Consultations",
    dataIndex: "consultations"
  },
  {
    title: "Simulations",
    dataIndex: "simulations",
    sorter: tableSorters.simulations
  },
  // {
  //   title: "Sessions",
  //   dataIndex: "sessions",
  //   sorter: tableSorters.sessions
  // },
  // {
  //   title: "Last Opened",
  //   dataIndex: "lastOpened",
  //   sorter: tableSorters.date("lastOpened")
  // },
  {
    title: "",
    dataIndex: "actions"
  }
];

export const CLINICS_SIMULATIONS_TABLE_COLUMNS: ColumnsType<ISimulationClinicData> =
  [
    {
      title: "Before & after",
      dataIndex: "photoAndSimulation"
    },
    {
      title: "Info",
      dataIndex: "info"
    },
    {
      title: "Created",
      dataIndex: "created",
      sorter: tableSorters.date("created")
    },
    {
      title: "Simulations",
      dataIndex: "simulations",
      sorter: tableSorters.simulations
    },
    // {
    //   title: "Sessions",
    //   dataIndex: "sessions",
    //   sorter: tableSorters.sessions
    // },
    // {
    //   title: "Last Opened",
    //   dataIndex: "lastOpened",
    //   sorter: tableSorters.date("lastOpened")
    // },
    {
      title: "",
      dataIndex: "actions",
      width: "30%"
    }
  ];

export const CLINICS_PATIENTS_TABLE_COLUMNS: ColumnsType<IClinicsPatientsData> =
  [
    {
      title: "Photo",
      dataIndex: "photo"
    },
    {
      title: "Clinic",
      dataIndex: "clinic"
    },
    {
      title: "Info",
      dataIndex: "info"
    },
    {
      title: "Created",
      dataIndex: "created",
      sorter: tableSorters.date("created")
    },
    {
      title: "Photos",
      dataIndex: "photos",
      sorter: tableSorters.photos
    },
    {
      title: "Simulations",
      dataIndex: "simulations",
      sorter: tableSorters.simulations
    },
    // {
    //   title: "Sessions",
    //   dataIndex: "sessions",
    //   sorter: tableSorters.sessions
    // },
    // {
    //   title: "Last Opened",
    //   dataIndex: "lastOpened",
    //   sorter: tableSorters.date("lastOpened")
    // },
    {
      title: "",
      dataIndex: "actions"
    }
  ];

export const COLOR_PALETTE_BASE = [
  "#130C0A",
  "#18110B",
  "#160804",
  "#21110C",
  "#211711",
  "#25160F",
  "#28170D",
  "#301D12",
  "#3D2620",
  "#4D2715",
  "#432A1B",
  "#3E261A",
  "#43342D",
  "#3D1608",
  "#411E0D",
  "#764730",
  "#783A1E",
  "#814D35",
  "#9B593A",
  "#604126",
  "#856246",
  "#AE7E5B",
  "#C3A990",
  "#E2B785",
  "#F5D49E",
  "#F5E5C3"
];

export interface SimulationHairOption {
  id: string;
  label?: string;
  iconName?: string;
  isColor?: boolean;
  hideLabel?: boolean;
  format?: string;
  value: string;
  style?: React.CSSProperties;
}

export const SIMULATION_HAIR_TYPES: SimulationHairOption[] = [
  {
    id: "straight",
    label: "straight",
    iconName: "model/type/straight",
    value: "st",
    style: {
      width: 80,
      height: 80
    }
  },
  // {
  //   id: "curled",
  //   label: "curled",
  //   iconName: "model/type/curled",
  //   value: "cr"
  // },
  {
    id: "curly",
    label: "curly",
    iconName: "model/type/curly",
    value: "cr",
    style: {
      width: 80,
      height: 80
    }
  }
  // {
  //   id: "afro",
  //   label: "afro",
  //   iconName: "model/type/afro",
  //   value: "cr"
  // }
];

export const SIMULATION_HAIR_THICKNESS: SimulationHairOption[] = [
  {
    id: "fine",
    label: "fine",
    value: "fine"
  },
  {
    id: "medium",
    label: "medium",
    value: "medium"
  },
  {
    id: "coarse",
    label: "coarse",
    value: "coarse"
  }
];

export const SIMULATION_PROCESS_HAIR_COLOURS: SimulationHairOption[] = [
  {
    id: "blond",
    label: "Blond",
    isColor: true,
    value: "#F5E5C3"
  },
  {
    id: "gray",
    label: "Gray",
    isColor: true,
    value: "#A1A1A1"
  },
  {
    id: "brown",
    label: "Brown",
    isColor: true,
    value: "#392316"
  },
  {
    id: "black",
    label: "Black",
    isColor: true,
    value: "#000000"
  }
];

export const SIMULATION_HAIR_STYLE: SimulationHairOption[] = [
  {
    id: "swept-right",
    iconName: "model/style/style1",
    format: "png",
    value: "sr"
  },
  {
    id: "swept-left",
    iconName: "model/style/style2",
    format: "png",
    value: "sl"
  },
  {
    id: "quiff-right",
    iconName: "model/style/style3",
    format: "png",
    value: "ur"
  },
  {
    id: "quiff-left",
    iconName: "model/style/style4",
    format: "png",
    value: "ul"
  }
];

export interface SimulationSectionVolume {
  r1: number;
  r2: number;
  r3: number;
  [key: string]: number;
}

export const DEFAULT_SECTION_VOLUME = {
  r1: 3500,
  r2: 0,
  r3: 0
};

export const SIMULATION_SECTION_VOLUME_TYPE: SimulationHairOption[] = [
  {
    id: "section-volume-region-1",
    iconName: "model/volume/section/r1",
    value: "r1",
    label: "Region #1",
    hideLabel: true,
    style: {
      width: 64,
      height: 64
    }
  },
  {
    id: "section-volume-region-2",
    iconName: "model/volume/section/r2",
    value: "r2",
    label: "Region #2",
    hideLabel: true,
    style: {
      width: 64,
      height: 64
    }
  },
  {
    id: "section-volume-region-3",
    iconName: "model/volume/section/r3",
    value: "r3",
    label: "Region #3",
    hideLabel: true,
    style: {
      width: 64,
      height: 64
    }
  }
];

// Sliders default values
export interface SliderDefaultOptions {
  min: number;
  max: number;
  sliderMin: number;
  sliderMax: number;
  step?: number;
  default: number;
  marks?: SliderMarks;
}

export const HAIR_VOLUME_TOTAL_SLIDER: SliderDefaultOptions = {
  min: 0,
  max: 16500,
  sliderMin: 0,
  sliderMax: 16500,
  default: 3500
};

export const HAIRLINE_SLIDER: SliderDefaultOptions = {
  min: -100,
  max: 100,
  sliderMin: 0,
  sliderMax: 100,
  step: 1,
  default: 50
};

export enum SectionVolumeMarks {
  "v0" = 0,
  "v1200" = 1200,
  "v1500" = 1500,
  "v1800" = 1800,
  "v2100" = 2100,
  "v2400" = 2400,
  "v2700" = 2700,
  "v3000" = 3000,
  "v3500" = 3500,
  "v4000" = 4000,
  "v4500" = 4500,
  "v5000" = 5000,
  "v5500" = 5500
}

export const DENSITIES_VALUES = [
  0, 1200, 1500, 1800, 2100, 2400, 2700, 3000, 3500, 4000, 4500, 5000, 5500
];

export const SECTION_VOLUMES_DENSITY: SimulationSectionVolume[] = [
  {
    r1: SectionVolumeMarks.v1200,
    r2: SectionVolumeMarks.v1200,
    r3: SectionVolumeMarks.v1200
  },
  {
    r1: SectionVolumeMarks.v1500,
    r2: SectionVolumeMarks.v1500,
    r3: SectionVolumeMarks.v1500
  },
  {
    r1: SectionVolumeMarks.v1800,
    r2: SectionVolumeMarks.v1800,
    r3: SectionVolumeMarks.v1800
  },
  {
    r1: SectionVolumeMarks.v2100,
    r2: SectionVolumeMarks.v2100,
    r3: SectionVolumeMarks.v2100
  },
  {
    r1: SectionVolumeMarks.v2400,
    r2: SectionVolumeMarks.v2400,
    r3: SectionVolumeMarks.v2400
  },
  {
    r1: SectionVolumeMarks.v2700,
    r2: SectionVolumeMarks.v2700,
    r3: SectionVolumeMarks.v2700
  },
  {
    r1: SectionVolumeMarks.v3000,
    r2: SectionVolumeMarks.v3000,
    r3: SectionVolumeMarks.v3000
  },
  {
    r1: SectionVolumeMarks.v3500,
    r2: SectionVolumeMarks.v3500,
    r3: SectionVolumeMarks.v3500
  },
  {
    r1: SectionVolumeMarks.v4000,
    r2: SectionVolumeMarks.v4000,
    r3: SectionVolumeMarks.v4000
  }
];

export const SECTION_VOLUMES_DENSITY_MARKS = SECTION_VOLUMES_DENSITY.reduce(
  (prev, simulationDensity) => {
    const densityKey = String(
      simulationDensity.r1 + simulationDensity.r2 + simulationDensity.r3
    );

    return {
      ...prev,
      [densityKey]: densityKey
    };
  },
  { "0": "0" }
);

export const PREVIEW_SIMULATION_DENSITY_SLIDER: SliderDefaultOptions = {
  min: 1,
  max: 10,
  sliderMin: 1,
  sliderMax: 10,
  // marks: SECTION_VOLUMES_DENSITY_MARKS,
  default: 1
};

export const SECTION_VOLUME_SLIDER: SliderDefaultOptions = {
  min: 0,
  max: 5500,
  sliderMin: 0,
  sliderMax: 5500,
  marks: {
    0: "0",
    1200: "1200",
    1500: "1500",
    1800: "1800",
    2100: "2100",
    2400: "2400",
    2700: "2700",
    3000: "3000",
    3500: "3500",
    4000: "4000",
    4500: "4500",
    5000: "5000",
    5500: "5500"
  },
  default: 0
};

export const ZOOM_DEFAULT_OPTIONS = {
  minZoom: 100,
  defaultZoom: 100,
  maxZoom: 325,
  zoomStep: 25
};

export const SIMULATION_SESSIONS_COUNT_KEY = "patientSessionsCountKey";

export const BASIC_PLAN_ID = "7cbf8086-a7a3-491a-83e3-1cbdbf19feac";
export const PREMIUM_PLAN_ID = "b89d2793-63f1-4a7e-a901-3e289bf94d08";

export interface SimulationVisibilityItem {
  id: string;
  title: string;
  visible: boolean;
}

export const SIMULATION_VISIBILITY_ITEMS: SimulationVisibilityItem[] = [
  {
    id: "v1",
    title: "Sim v1 visible",
    visible: true
  },
  {
    id: "v2",
    title: "Sim v2 visible",
    visible: true
  }
];

export const CLINIC_STORAGE_KEY = "clinicId";

export enum ROLES {
  SUPER_ADMIN = 5
}

export enum VIEWMODS {
  CLINIC = "clinic",
  SUPERADMIN = "superadmin"
}

export const VIEWMODE_STORAGE_KEY = "viewmode";

export enum UPLOAD_IMAGE_TYPES {
  TOP = "top",
  FRONT = "front",
  BACK = "back",
  SIDE_LEFT = "side-left",
  SIDE_RIGHT = "side-right",
  PLACEHOLDER = "type"
}

export const TRANSLATE_SLIDER: SliderDefaultOptions = {
  min: -3,
  max: 3,
  sliderMin: -3,
  sliderMax: 3,
  step: 0.05,
  default: 0
};

export const DEFAULT_TRANSLATE_SLIDER = {
  x: TRANSLATE_SLIDER.default,
  y: TRANSLATE_SLIDER.default,
  z: TRANSLATE_SLIDER.default
};

export const ROTATE_SLIDER: SliderDefaultOptions = {
  min: -10,
  max: 10,
  sliderMin: -10,
  sliderMax: 10,
  step: 0.05,
  default: 0.4,
  marks: {
    [-20]: "-20",
    [-10]: "-10",
    0: "0",
    10: "10",
    20: "20"
  }
};

export const DEFAULT_ROTATE_SLIDER = {
  x: ROTATE_SLIDER.default,
  y: ROTATE_SLIDER.default,
  z: 0
};

export const SCALE_SLIDER: SliderDefaultOptions = {
  min: 0.01,
  max: 0.08,
  sliderMin: 0.01,
  sliderMax: 0.08,
  step: 0.001,
  default: 0.04
};

export const DEFAULT_SCALE_SLIDER = {
  x: SCALE_SLIDER.default,
  y: SCALE_SLIDER.default,
  z: SCALE_SLIDER.default,
  all: SCALE_SLIDER.default
};

export const LIGHTING_AXIS_SLIDER: SliderDefaultOptions = {
  min: -3,
  max: 3,
  sliderMin: 1,
  sliderMax: 10,
  step: 0.05,
  default: 1
};

export const LIGHTING_BRIGHTNESS_SLIDER: SliderDefaultOptions = {
  min: -3,
  max: 3,
  sliderMin: -6,
  sliderMax: 3,
  step: 0.05,
  default: 1
};

export const DEFAULT_LIGHTING_SLIDER = {
  x: LIGHTING_AXIS_SLIDER.default,
  y: LIGHTING_AXIS_SLIDER.default,
  z: LIGHTING_AXIS_SLIDER.default,
  brightness: LIGHTING_BRIGHTNESS_SLIDER.default
};

export const HAIR_TREATMENT_OPTIONS: DefaultOptionType[] = [
  {
    value: 1,
    label: "DDIM"
  },
  {
    value: 2,
    label: "DPM++SDE"
  },
  {
    value: 3,
    label: "DPM Adaptive"
  },
  {
    value: 4,
    label: "DPM++SDE Karras"
  }
];

export const MODEL_ACCURACY_SLIDER: SliderDefaultOptions = {
  min: 0,
  max: 100,
  sliderMin: 0,
  sliderMax: 100,
  step: 1,
  default: 50
};

export const MODEL_RESOLUTION_SLIDER: SliderDefaultOptions = {
  min: 0,
  max: 100,
  sliderMin: 0,
  sliderMax: 100,
  step: 1,
  default: 50
};

export const SEED_RANGE = {
  min: 1,
  max: 1000000
};

export const LEAD_FLOW_DEFAULT_VOLUMES = [1200, 1200, 1200];
export const LEAD_FLOW_DEFAULT_OPTIONS: Omit<
  ModelSimulationRequest,
  "model_image" | "patientId"
> = {
  accuracy: 30,
  api_params: {
    sampler_name: HAIR_TREATMENT_OPTIONS[0].label as string
  }
};

export const mapSettingsLobeColor = [
  {
    id: "moon",
    icon: "moon",
    diffuseColor: [0.369, 0.434, 0.513],
    ambientColor: [0.012, 0.012, 0.014],
    colorDir: [1.0, 1.0, 1.001]
  },
  {
    id: "ice",
    icon: "ice",
    diffuseColor: [0.505, 0.505, 0.505],
    ambientColor: [0.505, 0.505, 0.505],
    colorDir: [0.505, 0.505, 0.505]
  },
  {
    id: "silver",
    icon: "silver",
    diffuseColor: [0.421, 0.458, 0.51],
    ambientColor: [0.557, 0.614, 0.654],
    colorDir: [0.394, 0.569, 0.544]
  },
  {
    id: "stone",
    icon: "stone",
    diffuseColor: [0.524, 0.409, 0.325],
    ambientColor: [0.0, 0.0, 0.0],
    colorDir: [1.0, 1.0, 1.001]
  },
  {
    id: "coal",
    icon: "coal",
    diffuseColor: [0.486, 0.498, 0.486],
    ambientColor: [0.0, 0.0, 0.0],
    colorDir: [0.407, 0.499, 0.596]
  },
  {
    id: "chestnut",
    icon: "chestnut",
    diffuseColor: [0.532, 0.294, 0.208],
    ambientColor: [0.012, 0.012, 0.012],
    colorDir: [0.301, 0.32, 0.349]
  },
  {
    id: "ash",
    icon: "ash",
    diffuseColor: [0.497, 0.496, 0.396],
    ambientColor: [0.012, 0.012, 0.012],
    colorDir: [0.965, 0.758, 0.615]
  },
  {
    id: "golden",
    icon: "golden",
    diffuseColor: [0.54, 0.3, 0.202],
    ambientColor: [0.012, 0.012, 0.012],
    colorDir: [0.995, 1.0, 0.52]
  },
  {
    id: "caramel",
    icon: "caramel",
    diffuseColor: [0.537, 0.325, 0.177],
    ambientColor: [0.012, 0.012, 0.012],
    colorDir: [0.703, 0.67, 0.461]
  },
  {
    id: "mahogany",
    icon: "mahogany",
    diffuseColor: [0.53, 0.306, 0.16],
    ambientColor: [0.163, 0.101, 0.101],
    colorDir: [0.508, 0.379, 0.312]
  },
  {
    id: "honey",
    icon: "honey",
    diffuseColor: [0.675, 0.638, 0.429],
    ambientColor: [0.305, 0.266, 0.236],
    colorDir: [0.623, 0.623, 0.393]
  },
  {
    id: "platinum",
    icon: "platinum",
    diffuseColor: [0.751, 0.751, 0.595],
    ambientColor: [0.7, 0.652, 0.524],
    colorDir: [0.623, 0.623, 0.391]
  },
  {
    id: "gold",
    icon: "gold",
    diffuseColor: [0.761, 0.703, 0.341],
    ambientColor: [0.305, 0.266, 0.235],
    colorDir: [0.623, 0.623, 0.392]
  },
  {
    id: "sandy",
    icon: "sandy",
    diffuseColor: [0.769, 0.657, 0.409],
    ambientColor: [0.084, 0.084, 0.084],
    colorDir: [0.623, 0.623, 0.394]
  },
  {
    id: "beige",
    icon: "beige",
    diffuseColor: [0.781, 0.58, 0.469],
    ambientColor: [0.084, 0.084, 0.084],
    colorDir: [0.623, 0.623, 0.394]
  },
  {
    id: "copper",
    icon: "copper",
    diffuseColor: [0.521, 0.289, 0.182],
    ambientColor: [0.17, 0.087, 0.067],
    colorDir: [0.504, 0.268, 0.212]
  },
  {
    id: "red ash",
    icon: "redash",
    diffuseColor: [0.625, 0.526, 0.453],
    ambientColor: [0.357, 0.183, 0.142],
    colorDir: [0.478, 0.442, 0.418]
  },
  {
    id: "strawberry",
    icon: "strawberry",
    diffuseColor: [0.508, 0.391, 0.166],
    ambientColor: [0.357, 0.183, 0.143],
    colorDir: [0.507, 0.231, 0.26]
  },
  {
    id: "cherry",
    icon: "cherry",
    diffuseColor: [0.498, 0.447, 0.338],
    ambientColor: [0.17, 0.087, 0.068],
    colorDir: [0.531, 0.36, 0.339]
  },
  {
    id: "burgundy",
    icon: "burgundy",
    diffuseColor: [0.442, 0.204, 0.114],
    ambientColor: [0.097, 0.022, 0.014],
    colorDir: [0.318, 0.175, 0.036]
  }
];

export type IImageTypeEntry = [string, UPLOAD_IMAGE_TYPES];

export const IMAGE_TYPES_STORAGE_KEY = "imageTypes"; // default - FRONT image type

export interface SimulatorSettings {
  accuracy: number;
  resolution: number;
  simulationAmount: number;
  prompt: string;
  seed: number | null;
  negativePrompt: string;
  hairTreatment: string;
  effect_settings?: SimulationModelSettings;
  face?: string;
  mask?: string;
  lighting_settings?: {
    lighting: SimulationLightingSettings;
  };
  position_settings?: {
    translate: SimulationTranslateSettings;
    rotate: SimulationRotateSettings;
    scale: SimulationScaleSettings;
    hairLine: number;
  };
  [key: string]: any;
}

export const SIMULATOR_DEFAULT_SETTINGS: SimulatorSettings = {
  accuracy: 50,
  resolution: 30,
  simulationAmount: 4,
  prompt: "",
  seed: null,
  negativePrompt: "",
  hairTreatment: HAIR_TREATMENT_OPTIONS[0].label as string
};

export const IMAGE_ORIGINS = {
  CAMERA: "Camera",
  FE: "FE",
  FEHDI: "FEHDI",
  FELDI: "FELDI",
  FECROP: "FECROP",
  AIFMHDI: "AIFMHDI",
  AIFSHDI: "AIFSHDI",
  AIFMLDI: "AIFMLDI",
  AIFSLDI: "AIFSLDI",
  AISDIPHDI: "AISDIPHDI",
  AISDIPHLI: "AISDIPHLI",
  AIMASK: "AIMASK",
  AI_SDINPAINTING: "AI_SDINPAINTING"
};

export const UPLOAD_IMAGE_CUSTOM_UPLOADED = Object.values(
  IMAGE_ORIGINS
)?.filter(
  (origin) => origin !== IMAGE_ORIGINS.CAMERA || origin !== IMAGE_ORIGINS.FE
);

export const BASIC_VALIDATORS = Object.freeze({
  email: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  phone:
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/g,
  url: /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
});

export const CLIENT_UPLOAD_PHOTO_PLACEHOLDER =
  "https://hair-prod-public-779851926111-eu-west-2.s3.eu-west-2.amazonaws.com/media/images/8416c866-e956-4168-bf4c-15f0b0becc6e.jpg";
