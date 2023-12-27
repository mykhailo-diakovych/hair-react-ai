import { SliderDefaultOptions } from "@config/constants";

function formatNumber(number: number, decimalPlaces = 2) {
  return Number(
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    }).format(number)
  );
}

export const normalizeValue = (
  value: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
) => {
  return formatNumber(
    ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin
  );
};

export const normalizeComponent = (component: number) => {
  return normalizeValue(component, 0, 255, 0, 1);
};

export const normalizeSliderValue = (
  value: number,
  sliderDefaults: SliderDefaultOptions
) => {
  return normalizeValue(
    value,
    sliderDefaults.sliderMin,
    sliderDefaults.sliderMax,
    sliderDefaults.min,
    sliderDefaults.max
  );
};
