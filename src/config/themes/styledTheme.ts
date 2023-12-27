import { DefaultTheme } from "styled-components";
import { SizesType } from "src/types/sizes.type";

export const themeColors = {
  cornflower: "#5f2eea",
  lavender: "#e359f9",
  tundora: "#414141",
  purple: "#CD97FF",
  red: "#FF0404",
  silver: "#cbcbcb",
  white: "#ffffff",
  dark: "#141414",
  gray: "#E7E7E7",
  gray400: "rgba(0, 0, 0, 0.33)",
  gray500: "rgba(255,255,255,0.5)",
  gray600: "#4E4B66",
  gray700: "#414141",
  gray800: "#8D8D8D",
  dovegray: "#6F6F6F",
  gray7: "#c0c0c0",
  scorpion: "#090909",
  chalice: "#a2a2a2",
  codgray: "#1a1a1a",
  malibu: "#8BA0FF",
  malibu600: "#6e88ff",
  malibuLight: "#738CFE",
  mineshaft: "#202020",
  mineshaft600: "#262626",
  mineshaft700: "#272727",
  mineshaft800: "#282828",
  mineshaft1: "#1f1f1f",
  mineshaft3: "#3f3f3f",
  mineshaft8: "#383838",
  dustyGray: "#9b9b9b",
  nobel: "#b6b6b6",
  chateau: "#9AA0A3",
  silver400: "#c4c4c4",
  mystic: "#e5e9f0",
  royalblue: "#7135ed",
  athens: "#f8f9fb",
  zircon: "#EEF2FF",
  yellow: "#D9FF43"
} as const;

const themeBackgrounds = {
  dark: "#141414",
  mineshaft: "#2B2B2B",
  shark: "#272B30",
  alto: "#d9d9d9",
  dustyGray700: "#171717"
};

const themeParagraphSizes: Record<SizesType, string> = {
  sm: `
    font-size: 10px;
  `,
  md: `
    font-size: 12px;
  `,
  lg: `
    font-size: 14px;
  `,
  xl: `
    font-size: 16px;
  `
} as const;

const themeTitleLevels = {
  "1": `
    font-size: 18px;
    font-weight: bold;
  `,
  "2": `
    font-size: 16px;
    font-weight: bold;
    `,
  "3": `
    font-size: 14px;
    font-weight: bold;
    `,
  "4": `
    font-size: 14px;
    font-wight: 500;
  `,
  "5": `
    font-size: 14px;
  `,
  "6": `
    font-size: 14px;
  `
} as const;

const themeTypography = {
  fontFamily: "Urbanist, Poppins, sans-serif",
  fontSize: 14,
  lineHeight: 1.6,
  paragraphSizes: themeParagraphSizes,
  titleLevels: themeTitleLevels
} as const;

const themeGeneral = {
  borderRadius: 8
} as const;

const themeBreakpoints = {
  breakpoints: {
    xl: "1200px",
    lg: "992px",
    md: "768px",
    sm: "568px",
    xs: "480px"
  }
};

export const darkTheme: DefaultTheme = {
  general: themeGeneral,
  config: {
    darkMode: true
  },
  typography: themeTypography,
  colors: {
    ...themeColors,
    white: "#000",
    black: "#fff",
    primary: "#fff"
  },
  background: {
    ...themeBackgrounds,
    sidebar: "#fff",
    primary: "#000",
    secondary: themeColors.mineshaft,
    dark: "#F1F1F1",
    modalHeader: themeColors.mineshaft,
    modalBody: themeColors.scorpion,
    inputBgColor: themeColors.mineshaft600
  },
  ...themeBreakpoints
};

export const lightTheme: DefaultTheme = {
  general: themeGeneral,
  config: {
    darkMode: false
  },
  typography: themeTypography,
  colors: {
    ...themeColors,
    white: "#FFFFFF",
    black: "#000000",
    primary: "#000"
  },
  background: {
    ...themeBackgrounds,
    sidebar: "#171717",
    primary: "#f8f9fb",
    secondary: themeColors.gray,
    dark: "#141414",
    modalHeader: themeColors.gray7,
    modalBody: themeColors.white,
    inputBgColor: themeColors.white
  },
  ...themeBreakpoints
};
