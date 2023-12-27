export type SexId = "ml" | "fml";
export type EthnicityId = "wt" | "bl" | "az";
export type HairlossId = "hl_1" | "hl_2" | "hl_3";
export type TypeId = "st" | "cr";
export type StyleId = "ur" | "ul" | "sr" | "sl";
export type LengthId = "s" | "m" | "l";
// export type ColorId = 'black' | 'grey' | 'brown' | 'blonde' | 'red';
export type ColorId = string;

export interface ColorSettings {
  tone?: number; // 1-100% real null (take 12345)
  color: ColorId;
  brightness: number; // 0-2 // real 2,3,4
  lightDirection: number; // -10 - 10  real 12345
}

export interface VolumeSettings {
  r1: number;
  r2: number;
  r3: number;
}

export interface ModelSettings {
  sex: SexId;
  ethnicity: EthnicityId;
  hairloss: HairlossId;
  type: TypeId;
  style: StyleId;
  length: LengthId;
  volume: VolumeSettings;
}

export interface PositionSettings {
  volume?: number; // 0-12 used locally only!!!
  width: number; // 0.8 - 1.2
  height: number; // -0.5 - 0.5
  depth: number; // -0.5 - 0.5
  hairline: number; // -100 - 100
}

export interface DeepArSettings {
  image?: string;
  color: ColorSettings;
  model: ModelSettings;
  position: PositionSettings;
}
