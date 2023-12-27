import "styled-components";

import { SizesType } from "src/types/sizes.type";

import { TitleLevelsType } from "../../types/titleLevels.type";

declare module "styled-components" {
  export interface DefaultTheme {
    general: {
      borderRadius: number;
    };
    config: {
      darkMode: boolean;
    };
    typography: {
      fontFamily: string;
      fontSize: number;
      lineHeight: number;
      paragraphSizes: Record<SizesType, string>;
      titleLevels: Record<TitleLevelsType, string>;
    };
    colors: {
      cornflower: string;
      lavender: string;
      primary: string;
      tundora: string;
      purple: string;
      gray: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      dovegray: string;
      red: string;
      silver: string;
      white: string;
      black: string;
      dark: string;
      scorpion: string;
      chalice: string;
      codgray: string;
      malibu: string;
      malibu600: string;
      malibuLight: string;
      gray7: string;
      mineshaft: string;
      mineshaft600: string;
      mineshaft700: string;
      mineshaft800: string;
      mineshaft3: string;
      mineshaft8: string;
      mineshaft1: string;
      dustyGray: string;
      nobel: string;
      chateau: string;
      silver400: string;
      mystic: string;
      royalblue: string;
      athens: string;
      zircon: string;
      yellow: string;
    };
    background: {
      sidebar: string;
      primary: string;
      secondary: string;
      dark: string;
      mineshaft: string;
      shark: string;
      alto: string;
      dustyGray700: string;
      modalHeader: string;
      modalBody: string;
      inputBgColor: string;
    };
    breakpoints: {
      xl: string;
      lg: string;
      md: string;
      sm: string;
      xs: string;
      [key: string]: string;
    };
  }
}
