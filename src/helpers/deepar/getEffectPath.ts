import {
  SIMULATION_HAIR_STYLE,
  SIMULATION_HAIR_TYPES
} from "@config/constants";

export const getEffectPath = ({
  style = SIMULATION_HAIR_STYLE[0],
  type = SIMULATION_HAIR_TYPES[0],
  slotInd = 1,
  hairloss = "hl_2"
} = {}) => {
  return `ml/wt/${hairloss}/${style.value}/${type.value}/model_${slotInd}`;
};
