import {
  SIMULATION_HAIR_STYLE,
  SIMULATION_HAIR_TYPES
} from "@config/constants";

export const getMaterialPath = ({
  style = SIMULATION_HAIR_STYLE[0],
  type = SIMULATION_HAIR_TYPES[0],
  material = "",
  hairloss = "hl_2"
} = {}) => {
  return new URL(
    `../../assets/effects/ml/wt/${hairloss}/${style.value}/${type.value}/m/${material}`,
    import.meta.url
  ).href;
};
